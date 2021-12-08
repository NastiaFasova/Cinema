package cinema.security;

import cinema.exception.AuthenticationException;
import cinema.model.Role;
import cinema.model.User;
import cinema.service.RoleService;
import cinema.service.ShoppingCartService;
import cinema.service.UserService;
import java.util.Set;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;

    private final ShoppingCartService shoppingCartService;

    private final RoleService roleService;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(UserService userService,
                                     ShoppingCartService shoppingCartService,
                                     RoleService roleService,
                                     PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(String email, String password) throws AuthenticationException {
        User userFromDb = userService.getByEmail(email);
        if (userFromDb != null && passwordEncoder.matches(password, userFromDb.getPassword())) {
            return userFromDb;
        }
        throw new AuthenticationException("Wrong login or password");
    }

    @Override
    public User register(String email, String password) {
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password);
        Role role = roleService.getRoleByName("USER");
        newUser.setRoles(Set.of(role));
        userService.add(newUser);
        shoppingCartService.registerNewShoppingCart(newUser);
        return newUser;
    }
}
