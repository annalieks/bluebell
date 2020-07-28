package com.bluebell.backend.users;

import com.bluebell.backend.users.dto.UpdateUserDto;
import com.bluebell.backend.users.dto.UserDto;
import com.bluebell.backend.users.modal.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper( UserMapper.class );

    UserDto userToUserDto(User user);

    User updateUserDtoToUser(UpdateUserDto userDto);
}