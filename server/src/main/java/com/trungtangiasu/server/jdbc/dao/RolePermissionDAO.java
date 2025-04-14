package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.RolePermission;

public class RolePermissionDAO {
    public static List<RolePermission> selectAll() throws SQLException {
        String sql = "SELECT * FROM Role_Permission";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet res = stmt.executeQuery()) {

            List<RolePermission> list = new ArrayList<>();
            while (res.next()) {
                list.add(RolePermission.fromResultSet(res));
            }
            return list;
        }
    }

    public static RolePermission select(int roleId, int permissionId) throws SQLException {
        String sql = "SELECT * FROM Role_Permission WHERE role_id = ? AND permission_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, roleId);
            stmt.setInt(2, permissionId);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return RolePermission.fromResultSet(res);
                }
                return null;
            }
        }
    }

    public static void insert(RolePermission rp) throws SQLException {
        String sql = "INSERT INTO Role_Permission (role_id, permission_id) VALUES (?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, rp.getRoleId());
            stmt.setInt(2, rp.getPermissionId());
            stmt.executeUpdate();
        }
    }

    // public static void update(RolePermission rp) throws SQLException {
    // }

    public static void delete(int roleId, int permissionId) throws SQLException {
        String sql = "DELETE FROM Role_Permission WHERE role_id = ? AND permission_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, roleId);
            stmt.setInt(2, permissionId);
            stmt.executeUpdate();
        }
    }
}
