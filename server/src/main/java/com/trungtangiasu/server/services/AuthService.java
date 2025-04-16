package com.trungtangiasu.server.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.trungtangiasu.server.JDBCRepositories.AuthRepository;
import com.trungtangiasu.server.jdbc.dto.LoginResponse;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(String email, String password) {
        Map<String, Object> account = authRepository.findAccountByEmail(email);

        if (account == null) {
            throw new RuntimeException("Email không tồn tại");
        }

        String hashedPassword = (String) account.get("hashed_password");
        Boolean isActive = (Boolean) account.get("is_active");

        if (!isActive) {
            throw new RuntimeException("Tài khoản chưa được kích hoạt");
        }

        if (!passwordEncoder.matches(password, hashedPassword)) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        // Tạo fake token (nếu dùng JWT thật thì tạo ở đây)
        String token = "fake-jwt-token";

        Map<String, Object> user = new HashMap<>();
        user.put("id", account.get("user_id"));
        user.put("username", account.get("username"));
        user.put("email", account.get("email"));
        user.put("role", account.get("role_name"));

        return new LoginResponse(token, user);
    }
}
