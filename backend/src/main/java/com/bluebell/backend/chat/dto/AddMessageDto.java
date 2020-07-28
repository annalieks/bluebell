package com.bluebell.backend.chat.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AddMessageDto {
    private UUID userId;
    private String text;
    private String createdAt;
}
