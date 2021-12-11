package kpi.service.impl;

import kpi.repository.RoleRepository;
import kpi.models.Role;
import kpi.service.RoleService;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role add(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.getRoleByName(Role.RoleName.valueOf(roleName)).orElseThrow();
    }
}
