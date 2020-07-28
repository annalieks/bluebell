package com.bluebell.backend.chat;

import com.bluebell.backend.chat.dto.AddMessageDto;
import com.bluebell.backend.chat.dto.MessageDto;
import com.bluebell.backend.chat.dto.UpdateMessageDto;
import com.bluebell.backend.chat.modal.Message;
import com.bluebell.backend.exception.MessageNotFoundException;
import com.bluebell.backend.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ChatRepository chatRepository;

    void addMessage(AddMessageDto addMessageDto) {
        var user = usersRepository.findById(addMessageDto.getUserId());
        if(user.isEmpty()) {
            throw new MessageNotFoundException();
        }
        var message = Message
                .builder()
                .text(addMessageDto.getText())
                .createdAt(addMessageDto.getCreatedAt())
                .user(user.get())
                .build();

        chatRepository.save(message);
    }

    void updateMessage(UpdateMessageDto updateMessageDto) {
        chatRepository.updateMessage(updateMessageDto.getId(),
                updateMessageDto.getText(), updateMessageDto.getEditedAt());
    }

    List<MessageDto> getMessages() {
        return chatRepository
                .findAll()
                .stream()
                .map(MessageMapper.MAPPER::messageToMessageDto)
                .collect(Collectors.toList());
    }

    MessageDto getMessageById(UUID id) {
        return chatRepository
                .findById(id)
                .map(MessageMapper.MAPPER::messageToMessageDto)
                .orElseThrow(MessageNotFoundException::new);
    }

    void deleteMessage(UUID id) {
        chatRepository.deleteById(id);
    }

    void updateLike(UUID id, boolean isLike) {
        int likeDiff = isLike ? 1 : -1;
        chatRepository.updateLike(id, likeDiff);
    }
}
