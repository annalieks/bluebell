package com.bluebell.backend.users.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    UUID id;
    String username;
    String email;
}
