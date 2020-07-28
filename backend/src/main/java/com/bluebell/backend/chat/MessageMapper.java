package com.bluebell.backend.chat;

import com.bluebell.backend.chat.dto.MessageDto;
import com.bluebell.backend.chat.modal.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MessageMapper {
    MessageMapper MAPPER = Mappers.getMapper(MessageMapper.class);

    @Mapping(target="userId", source="user.id")
    @Mapping(target="avatar", source="user.avatar")
    @Mapping(target="user", source="user.username")
    MessageDto messageToMessageDto(Message message);

}
