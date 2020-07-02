package cinema.service;

import cinema.model.User;

public interface UserService {
    User add(User user);

    User getByEmail(String email);

    User get(Long id);
}
