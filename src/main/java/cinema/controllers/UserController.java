package cinema.controllers;

import cinema.model.dto.response.UserResponseDto;
import cinema.model.mapper.UserMapper;
import cinema.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/users/byemail")
    public UserResponseDto getByEmail(@RequestParam(name = "email") String email) {
        return userMapper.getUserResponseDto(userService.findByEmail(email));
    }
}
