package com.bluebell.backend.chat.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateMessageDto {
    private UUID id;
    private String text;
    private String editedAt;
}
