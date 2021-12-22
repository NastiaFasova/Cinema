package kpi.controllers;

import kpi.models.User;
import kpi.models.dto.request.UserRequestDto;
import kpi.models.dto.response.UserResponseDto;
import kpi.models.mapper.UserMapper;
import kpi.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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


    @PatchMapping("/{id}")
    public UserResponseDto update(@RequestBody @Valid UserRequestDto userRequestDto,
                                          @PathVariable("id") String id) {
        return userMapper.getUserResponseDto(userService
                .add(userMapper.getUser(userRequestDto), id));
    }

    @GetMapping
    public List<User> viewUsers(@RequestParam(required = false) String keyword,
                                  @RequestParam(defaultValue = "1") int page,
                                  @RequestParam(defaultValue = "7") int size,
                                  @RequestParam(value = "sortField", defaultValue = "surname") String sortField,
                                  @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir) {
        Page<User> pageTuts = userService.findAllPaginated(keyword, page, size, sortField, sortDir);
        return pageTuts.getContent();
    }

    @GetMapping("/block/{id}")
    public UserResponseDto block(@PathVariable(value = "id") long id) {
        return userMapper.getUserResponseDto(userService.block(id));
    }

    @GetMapping("/unblock/{id}")
    public UserResponseDto unblock(@PathVariable(value = "id") long id) {
        return userMapper.getUserResponseDto(userService.unblock(id));
    }
}
