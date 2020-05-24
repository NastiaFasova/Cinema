package cinema.security;

import cinema.exception.AuthenticationException;
import cinema.lib.Inject;
import cinema.lib.Service;
import cinema.model.User;
import cinema.service.UserService;
import cinema.util.HashUtil;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Inject
    private UserService userService;

    @Override
    public User login(String email, String password) throws AuthenticationException {
        User userFromDb = userService.findByEmail(email);
        if (userFromDb.getPassword().equals(HashUtil.hashPassword(password,
                userFromDb.getSalt()))) {
            return userFromDb;
        }
        throw new AuthenticationException("Wrong login or password");
    }

    @Override
    public User register(String email, String password) throws AuthenticationException {
        User newUser = new User();
        if (userService.findByEmail(email) == null) {
            newUser.setEmail(email);
            newUser.setPassword(password);
            userService.add(newUser);
            return newUser;
        }
        throw new AuthenticationException("User with this email already exists");
    }
}
