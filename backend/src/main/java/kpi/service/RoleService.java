package kpi.service;

import kpi.models.Role;

public interface RoleService {
    Role add(Role role);

    Role getRoleByName(String roleName);
}
