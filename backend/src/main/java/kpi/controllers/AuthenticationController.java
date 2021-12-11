package kpi.controllers;

import kpi.exception.AuthenticationException;
import kpi.models.dto.request.UserRequestDto;
import kpi.security.AuthenticationService;
import javax.validation.Valid;

import kpi.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService,
                                    UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    @CrossOrigin
    public void addUser(@RequestBody @Valid UserRequestDto userRequestDto)
            throws AuthenticationException {
        authenticationService.register(userRequestDto.getEmail(), userRequestDto.getPassword());
    }

    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody kpi.models.User getAuthUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        User user = (principal instanceof User) ? (User) principal : null;
        return Objects.nonNull(user) ? userService.getByEmail(user.getUsername()) : null;
    }

}
