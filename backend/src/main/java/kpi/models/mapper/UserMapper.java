package kpi.models.mapper;

import kpi.models.User;
import kpi.models.dto.request.UserRequestDto;
import kpi.models.dto.response.UserResponseDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponseDto getUserResponseDto(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(user.getId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setFirstname(user.getFirstname());
        userResponseDto.setLastname(user.getLastname());
        userResponseDto.setAvatarUrl(user.getAvatarUrl());
        return userResponseDto;
    }

    public User getUser(UserRequestDto userRequestDto) {
        User user = new User();
        user.setEmail(userRequestDto.getEmail());
        user.setFirstname(userRequestDto.getFirstname());
        user.setLastname(userRequestDto.getLastname());
        user.setAvatarUrl(userRequestDto.getAvatarUrl());
        return user;
    }
}
