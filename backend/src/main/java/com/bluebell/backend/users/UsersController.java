package com.bluebell.backend.users;

import com.bluebell.backend.users.dto.UserDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UsersController {

    @GetMapping("/{id}")
    public Optional<UserDto> getUser(@RequestParam UUID id) {
        return Optional.empty();
    }

}
