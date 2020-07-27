package com.bluebell.backend.auth;

import com.bluebell.backend.auth.dto.UserRegisterDto;
import com.bluebell.backend.users.modal.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AuthUserMapper {
    AuthUserMapper MAPPER = Mappers.getMapper(AuthUserMapper.class);

    @Mapping(target = "id", ignore = true)
    User userRegisterDtoToUser(UserRegisterDto userDto);
}
