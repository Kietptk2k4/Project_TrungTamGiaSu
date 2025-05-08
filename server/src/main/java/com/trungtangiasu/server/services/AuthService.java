package com.trungtangiasu.server.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.trungtangiasu.server.JDBCRepositories.AuthRepository;
import com.trungtangiasu.server.exception.AppException;
import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.reponse.LoginResponse;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(String email, String password) {
        Map<String, Object> account = authRepository.findAccountByEmail(email);

        if (account == null) {
            throw new AppException(ErrorCode.LOGIN_FAILED_EXCEPTION);
        }

        String hashedPassword = (String) account.get("hashed_password");
        Boolean isActive = (Boolean) account.get("is_active");

        if (!isActive) {
            throw new AppException(ErrorCode.LOCKED_USER_EXCEPTION);
        }

        if (!passwordEncoder.matches(password, hashedPassword)) {
            throw new AppException(ErrorCode.LOGIN_FAILED_EXCEPTION);
        }
        Map<String, Object> user = null;
        Object userIdObj = account.get("user_id");
        int userId = (userIdObj instanceof Integer) ? (Integer) userIdObj : Integer.parseInt((String) userIdObj);
        
        if (account.get("role_name").equals("CUSTOMER")) {
            user = authRepository.findCustomerIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        } else if (account.get("role_name").equals("TUTOR")) {
            user = authRepository.findTutorIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        } else if (account.get("role_name").equals("ADMIN")) {
            user = authRepository.findAdminIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        }

        // Tạo fake token (nếu dùng JWT thật thì tạo ở đây)
        String token = "fake-jwt-token";

        Map<String, Object> userRes = new HashMap<>();
        userRes.put("username", account.get("username"));
        userRes.put("email", account.get("email"));
        userRes.put("role", account.get("role_name"));


        if (account.get("role_name").equals("CUSTOMER")) {
            userRes.put("id", user.get("customer_id"));
        } else if (account.get("role_name").equals("TUTOR")) {
            userRes.put("id", user.get("tutor_id"));
        } else if (account.get("role_name").equals("ADMIN")) {
            userRes.put("id", user.get("admin_id"));
        }
        // userRes.put("id", account.get("user_id"));
        return new LoginResponse(token, userRes);
    }
}
