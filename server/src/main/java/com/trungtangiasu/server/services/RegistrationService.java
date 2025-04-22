package com.trungtangiasu.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.UserRepository;
import com.trungtangiasu.server.jdbc.dto.RegisterRequest;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    public Long registerUser(RegisterRequest request) throws Exception {
        // Kiểm tra hợp lệ đầu vào
        validateRegisterRequest(request);

        // Chuyển đổi gender từ tiếng Việt sang giá trị ENUM
        String gender = convertGender(request.getGender());

        // Mã hóa mật khẩu
        String hashedPassword = new BCryptPasswordEncoder().encode(request.getPassword());

        // Gọi phương thức createUser từ UserRepository để tạo người dùng
        try {
            return userRepository.createUser(
                request.getEmail(),
                hashedPassword,
                request.getRole(),
                request.getName(),
                gender,
                request.getPhone()
            );
        } catch (Exception e) {
            throw new Exception("Đăng ký thất bại: " + e.getMessage());
        }
    }

    private void validateRegisterRequest(RegisterRequest request) throws Exception {
        if (request == null) {
            throw new Exception("Thông tin đăng ký không được null.");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new Exception("Email không được để trống.");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new Exception("Mật khẩu không được để trống.");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new Exception("Tên không được để trống.");
        }
        if (request.getPhone() == null || request.getPhone().trim().isEmpty()) {
            throw new Exception("Số điện thoại không được để trống.");
        }
        if (request.getRole() == null || request.getRole().trim().isEmpty()) {
            throw new Exception("Vai trò không được để trống.");
        }
        if (request.getGender() == null || request.getGender().trim().isEmpty()) {
            throw new Exception("Giới tính không được để trống.");
        }
    }

   
    private String convertGender(String gender) throws Exception {
        if (gender == null) {
            throw new Exception("Giới tính không được null.");
        }
        String normalizedGender = gender.trim().toLowerCase();
        if (normalizedGender.equals("nam") || normalizedGender.equals("male")) {
            return "MALE";
        } else if (normalizedGender.equals("nữ") || normalizedGender.equals("female")) {
            return "FEMALE";
        } else {
            throw new Exception("Giới tính không hợp lệ. Chỉ chấp nhận 'Nam', 'Nữ', 'MALE' hoặc 'FEMALE'.");
        }
    }
}