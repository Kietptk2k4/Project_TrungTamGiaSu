package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Permission;
import com.trungtangiasu.server.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public Permission savePermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission findPermissionByName(String permissionName) {
        return permissionRepository.findByPermissionName(permissionName);
    }
}
