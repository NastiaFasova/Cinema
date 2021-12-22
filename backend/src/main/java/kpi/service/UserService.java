package kpi.service;

import kpi.models.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    User add(User user);

    User add(User user, String id);

    List<User> getAll();

    User getByEmail(String email);

    User get(Long id);

    User block(Long id);

    User unblock(Long id);

    Page<User> findAllPaginated(String keyword, int page, int size, String sortField, String sortDir);
}
