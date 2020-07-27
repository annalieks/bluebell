package com.bluebell.backend.auth.dto;

import com.bluebell.backend.users.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserDTO {
    UserDto user;
    String role;
    boolean isAuthorized;
}
