package kpi.service.impl;

import kpi.repository.UserRepository;
import kpi.models.User;
import kpi.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User add(User user, String id) {
        User current = get(Long.parseLong(id));
        current.setEmail(user.getEmail());
        current.setLastname(user.getLastname());
        current.setFirstname(user.getFirstname());
        current.setAvatarUrl(user.getAvatarUrl());
        current.setFirstname(user.getFirstname());
        return userRepository.save(current);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User get(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public User block(Long userId) {
        User user = get(userId);
        user.setBlocked(true);
        return userRepository.save(user);
    }

    @Override
    public User unblock(Long userId) {
        User user = get(userId);
        user.setBlocked(false);
        return userRepository.save(user);
    }

    @Override
    public Page<User> findAllPaginated(String keyword, int page, int size, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        if (keyword == null) {
            return userRepository.findAll(pageable);
        }
        return userRepository.findAllByLastnameContaining(keyword, pageable);
    }
}
