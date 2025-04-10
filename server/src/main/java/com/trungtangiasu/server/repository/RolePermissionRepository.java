package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {
}
