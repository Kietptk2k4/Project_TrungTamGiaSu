package com.trungtangiasu.server.services;

import java.sql.Connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.UserRepository;
import com.trungtangiasu.server.jdbc.dto.RegisterRequest;




@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    public void registerUser(RegisterRequest request) throws Exception {
        try (Connection conn = userRepository.getConnection()) {
            conn.setAutoCommit(false); // transaction bắt đầu

            if (userRepository.emailExists(request.email)) {
                throw new Exception("Email đã tồn tại.");
            }
            if (userRepository.phoneExists(request.phone)) {
                throw new Exception("Số điện thoại đã tồn tại.");
            }

            if (request.gender == "Nam"){
                request.gender = "MALE";
            }else if( request.gender.equals("Nữ")) {
                request.gender = "FEMALE";
            }
            Long personalInfoId = userRepository.insertPersonalInfo(
                request.name, request.gender, request.phone, conn
            );

            Long roleId = userRepository.getRoleIdByName(request.role, conn);

            String hashedPassword = new BCryptPasswordEncoder().encode(request.password);

            userRepository.insertAccount(
                request.email, hashedPassword, roleId, personalInfoId, conn
            );

            conn.commit(); // commit nếu thành công
        } catch (Exception e) {
            throw new Exception("Đăng ký thất bại: " + e.getMessage());
        }
    }
}
