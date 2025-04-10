package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Admin;
import com.trungtangiasu.server.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Optional<Admin> findAdminById(Integer adminId) {
        return adminRepository.findById(adminId);
    }

    public void deleteAdmin(Integer adminId) {
        adminRepository.deleteById(adminId);
    }
}
