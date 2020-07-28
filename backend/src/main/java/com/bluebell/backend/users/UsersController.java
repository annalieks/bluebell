package com.bluebell.backend.users;

import com.bluebell.backend.users.dto.UpdateUserDto;
import com.bluebell.backend.users.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
public class UsersController {

    @Autowired
    UsersService usersService;

    //TODO:
    @GetMapping("/user/{id}")
    public UserDto getUser(@PathVariable UUID id) {
        return usersService.findById(id);
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return usersService.getAllUsers();
    }

    @PostMapping("/user")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void addUser(@RequestBody UpdateUserDto userDto) {
        usersService.addUser(userDto);
    }

    @PostMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateUser(@PathVariable UUID id, @RequestBody UpdateUserDto updateUserDto) {
        usersService.updateUser(id, updateUserDto);
    }

    @DeleteMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable UUID id) {
        usersService.deleteUser(id);
    }

}
