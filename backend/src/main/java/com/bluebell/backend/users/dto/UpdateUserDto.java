package com.bluebell.backend.users.dto;

import lombok.Data;

@Data
public class UpdateUserDto {
    String username;
    String email;
    String password;
}
