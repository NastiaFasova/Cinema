package kpi.service;

import kpi.models.User;

public interface UserService {
    User add(User user);

    User getByEmail(String email);

    User get(Long id);
}
