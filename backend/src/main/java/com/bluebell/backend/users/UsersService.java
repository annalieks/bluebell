package com.bluebell.backend.users;

import com.bluebell.backend.auth.model.AuthUser;
import com.bluebell.backend.users.dto.UserDto;
import com.bluebell.backend.users.modal.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsersService implements UserDetailsService {
    @Autowired
    private UsersRepository usersRepository;

    @Override
    public AuthUser loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository
                .findByUsername(username)
                .map(user -> new AuthUser(user.getId(), user.getEmail(), user.getPassword()))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public String getRole(String username) {
        return username.equals("admin") ? "admin" : "default";
    }

    public UserDto findById(UUID id) {
        return usersRepository.findById(id)
                .map(UserMapper.MAPPER::userToUserDto)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with username"));
    }

    public void save(User user) {
        usersRepository.save(user);
    }
}