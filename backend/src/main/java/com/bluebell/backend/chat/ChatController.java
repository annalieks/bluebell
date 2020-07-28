package com.bluebell.backend.chat;

import com.bluebell.backend.chat.dto.AddMessageDto;
import com.bluebell.backend.chat.dto.MessageDto;
import com.bluebell.backend.chat.dto.UpdateLikeDto;
import com.bluebell.backend.chat.dto.UpdateMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    ChatService chatService;

    @PostMapping("/message")
    @ResponseStatus(code = HttpStatus.CREATED)
    void addMessage(@RequestBody AddMessageDto addMessageDto) {
        chatService.addMessage(addMessageDto);
    }

    @GetMapping
    List<MessageDto> getMessages() {
        return chatService.getMessages();
    }

    @GetMapping("/message/{id}")
    MessageDto getMessage(@PathVariable UUID id) {
        return chatService.getMessageById(id);
    }

    @PutMapping("/message")
    @ResponseStatus(code = HttpStatus.CREATED)
    void updateMessage(@RequestBody UpdateMessageDto updateMessageDto) {
        chatService.updateMessage(updateMessageDto);
    }

    @DeleteMapping("/message/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    void deleteMessage(@PathVariable UUID id) {
        chatService.deleteMessage(id);
    }

    @PutMapping("/message/like")
    @ResponseStatus(code = HttpStatus.OK)
    void updateLike(@RequestBody UpdateLikeDto like) {
        chatService.updateLike(like.getId(), like.getIsLike());
    }
}
