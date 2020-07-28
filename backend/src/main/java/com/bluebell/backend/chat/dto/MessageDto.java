package com.bluebell.backend.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    UUID id;
    UUID userId;
    String avatar;
    String user;
    String text;
    String createdAt;
    String editedAt;
    int likeCount;
}
