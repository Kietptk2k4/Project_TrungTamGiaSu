package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Admin;

public class AdminDAO {

    public static ArrayList<Admin> selectAll() throws SQLException {
        ArrayList<Admin> admins = new ArrayList<>();
        String sql = "SELECT * FROM Admin";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                admins.add(Admin.fromResultSet(res));
            }
        }

        return admins;
    }

    public static Admin select(int id) throws SQLException {
        Admin admin = null;
        String sql = "SELECT * FROM Admin WHERE admin_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    admin = Admin.fromResultSet(res);
                }
            }
        }

        return admin;
    }

    public static void insert(Admin admin) throws SQLException {
        String sql = "INSERT INTO Admin(user_id, name, personal_info_id) VALUES (?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, admin.getUserId());
            stm.setString(2, admin.getName());
            stm.setInt(3, admin.getPersonalInfoId());
            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    admin.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(Admin admin) throws SQLException {
        String sql = "UPDATE Admin SET user_id = ?, name = ?, personal_info_id = ? WHERE admin_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, admin.getUserId());
            stm.setString(2, admin.getName());
            stm.setInt(3, admin.getPersonalInfoId());
            stm.setInt(4, admin.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Admin WHERE admin_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }
}
