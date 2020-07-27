package com.bluebell.backend.auth;

import com.bluebell.backend.auth.dto.AuthUserDTO;
import com.bluebell.backend.auth.dto.UserLoginDTO;
import com.bluebell.backend.auth.dto.UserRegisterDto;
import com.bluebell.backend.auth.model.AuthUser;
import com.bluebell.backend.users.UsersService;
import com.bluebell.backend.users.dto.UserDto;
import com.bluebell.backend.users.modal.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsersService userDetailsService;

    public AuthUserDTO register(UserRegisterDto userDto) throws Exception {
        User user = AuthUserMapper.MAPPER.userRegisterDtoToUser(userDto);
        var loginDTO = new UserLoginDTO(user.getUsername(), user.getPassword());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userDetailsService.save(user);
        return login(loginDTO);
    }

    public AuthUserDTO login(UserLoginDTO user) throws Exception {
        Authentication auth;
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        var currentUser = (AuthUser)auth.getPrincipal();
        var userDto = userDetailsService.findById(currentUser.getId());
        final var userRole = userDetailsService.getRole(userDto.getUsername());
        return new AuthUserDTO(userDto, userRole, true);
    }
}