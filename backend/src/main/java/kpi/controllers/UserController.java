package kpi.controllers;

import kpi.models.dto.response.UserResponseDto;
import kpi.models.mapper.UserMapper;
import kpi.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/by-email")
    public UserResponseDto getByEmail(@RequestParam(name = "email") String email) {
        return userMapper.getUserResponseDto(userService.getByEmail(email));
    }
}
