package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.Admin;
import com.trungtangiasu.server.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{adminId}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Integer adminId) {
        Optional<Admin> admin = adminService.findAdminById(adminId);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.saveAdmin(admin));
    }
}
