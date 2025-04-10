package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    Permission findByPermissionName(String permissionName);
}
