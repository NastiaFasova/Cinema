package cinema.controllers;

import cinema.model.Role;
import cinema.model.User;
import cinema.service.RoleService;
import cinema.service.UserService;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.stereotype.Controller;

@Controller
public class InjectDataController {
    private final RoleService roleService;

    private final UserService userService;

    public InjectDataController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void injectRoles() {
        Role userRole = new Role();
        userRole.setRoleName(Role.RoleName.USER);
        User user = new User();
        user.setEmail("fasovaaa@ukr.net");
        user.setPassword("1111");
        user.setRoles(Set.of(userRole));
        roleService.add(userRole);
        userService.add(user);

        Role adminRole = new Role();
        adminRole.setRoleName(Role.RoleName.ADMIN);
        User admin = new User();
        admin.setEmail("fasovaaa@gmail.com");
        admin.setPassword("9999");
        admin.setRoles(Set.of(adminRole));
        roleService.add(adminRole);
        userService.add(admin);
    }
}
