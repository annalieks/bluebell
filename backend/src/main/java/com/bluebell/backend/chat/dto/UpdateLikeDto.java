package com.bluebell.backend.chat.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateLikeDto {
    private UUID id;
    private Boolean isLike;
}
