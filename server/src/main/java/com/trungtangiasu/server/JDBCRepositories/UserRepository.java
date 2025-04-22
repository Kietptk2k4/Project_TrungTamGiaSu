package com.trungtangiasu.server.JDBCRepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private DataSource dataSource;

    public boolean emailExists(String email) throws SQLException {
        String sql = "SELECT COUNT(*) FROM Accounts WHERE email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            return rs.next() && rs.getInt(1) > 0;
        }
    }

    public boolean phoneExists(String phone) throws SQLException {
        String sql = "SELECT COUNT(*) FROM PersonalInfos WHERE phone_number = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, phone);
            ResultSet rs = stmt.executeQuery();
            return rs.next() && rs.getInt(1) > 0;
        }
    }

    public Long getRoleIdByName(String roleName, Connection conn) throws SQLException {
        String sql = "SELECT role_id FROM Roles WHERE role_name = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, roleName);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getLong("role_id");
            } else {
                throw new SQLException("Không tìm thấy vai trò: " + roleName);
            }
        }
    }

    
    //   Chèn một bản ghi vào bảng Accounts và trả về user_id được tạo
     
    public Long insertAccount(String email, String hashedPassword, Long roleId, Connection conn) throws SQLException {
        String sql = "INSERT INTO Accounts (email, hashed_password, role_id, created_at, is_active) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, email);
            stmt.setString(2, hashedPassword);
            stmt.setLong(3, roleId);
            stmt.setTimestamp(4, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setBoolean(5, true);
            stmt.executeUpdate();
            ResultSet keys = stmt.getGeneratedKeys();
            if (keys.next()) {
                return keys.getLong(1); // Trả về user_id
            } else {
                throw new SQLException("Không thể lấy user_id.");
            }
        }
    }

    public void insertPersonalInfo(Long userId, String name, String gender, String phone, Connection conn) throws SQLException {
        String sql = "INSERT INTO PersonalInfos (user_id, full_name, gender, phone_number) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, userId);
            stmt.setString(2, name);
            stmt.setString(3, gender);
            stmt.setString(4, phone);
            stmt.executeUpdate();
        }
    }

    public Long createUser(String email, String hashedPassword, String roleName, String name, String gender, String phone) throws SQLException {
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            conn.setAutoCommit(false); // Bắt đầu giao dịch

            // Kiểm tra email và phone
            if (emailExists(email)) {
                throw new SQLException("Email đã tồn tại: " + email);
            }
            if (phoneExists(phone)) {
                throw new SQLException("Số điện thoại đã tồn tại: " + phone);
            }

            // Lấy role_id
            Long roleId = getRoleIdByName(roleName, conn);

            // Chèn vào Accounts và lấy user_id
            Long userId = insertAccount(email, hashedPassword, roleId, conn);

            // Chèn vào PersonalInfos với user_id
            insertPersonalInfo(userId, name, gender, phone, conn);

            conn.commit(); // Xác nhận giao dịch
            return userId;
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback(); // Hoàn tác giao dịch nếu có lỗi
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw e;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}