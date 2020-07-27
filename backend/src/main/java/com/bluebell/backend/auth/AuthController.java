package com.bluebell.backend.auth;

import com.bluebell.backend.auth.dto.AuthUserDTO;
import com.bluebell.backend.auth.dto.UserLoginDTO;
import com.bluebell.backend.auth.dto.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthUserDTO signUp(@RequestBody UserRegisterDto user) throws Exception {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthUserDTO login(@RequestBody UserLoginDTO user) throws Exception {
        return authService.login(user);
    }
}
