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
        String sql = "SELECT COUNT(*) FROM account WHERE email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            return rs.next() && rs.getInt(1) > 0;
        }
    }
    public boolean phoneExists(String phone) throws SQLException {
        String sql = "SELECT COUNT(*) FROM personal_info WHERE phone_number = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, phone);
            ResultSet rs = stmt.executeQuery();
            return rs.next() && rs.getInt(1) > 0;
        }
    }

    public Long insertPersonalInfo(String name, String gender, String phone, Connection conn) throws SQLException {
        String sql = "INSERT INTO personal_info (name, gender, phone_number) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, name);
            stmt.setString(2, gender);
            stmt.setString(3, phone);
            stmt.executeUpdate();
            ResultSet keys = stmt.getGeneratedKeys();
            if (keys.next()) {
                return keys.getLong(1);
            } else {
                throw new SQLException("Không thể lấy personal_info_id.");
            }
        }
    }

    public Long getRoleIdByName(String roleName, Connection conn) throws SQLException {
        String sql = "SELECT role_id FROM role WHERE role_name = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, roleName);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getLong("role_id");
            } else {
                throw new SQLException("Không tìm thấy role.");
            }
        }
    }

    public void insertAccount(String email, String hashedPassword, Long roleId, Long personalInfoId, Connection conn) throws SQLException {
        String sql = "INSERT INTO account (email, hashed_password, role_id, created_at, is_active) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, hashedPassword);
            stmt.setLong(3, roleId);
            stmt.setTimestamp(4, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setBoolean(5, true);
            stmt.executeUpdate();
        }
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}
