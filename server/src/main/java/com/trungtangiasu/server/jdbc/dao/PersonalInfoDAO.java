package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.PersonalInfo;

public class PersonalInfoDAO {
    public static ArrayList<PersonalInfo> selectAll() throws SQLException {
        ArrayList<PersonalInfo> list = new ArrayList<>();
        String sql = "SELECT * FROM Personal_Info";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(PersonalInfo.fromResultSet(res));
            }
        }

        return list;
    }

    public static PersonalInfo select(int id) throws SQLException {
        PersonalInfo info = null;
        String sql = "SELECT * FROM Personal_Info WHERE personal_info_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    info = PersonalInfo.fromResultSet(res);
                }
            }
        }

        return info;
    }

    public static void insert(PersonalInfo info) throws SQLException {
        String sql = "INSERT INTO Personal_Info(name, gender, phone_number) VALUES (?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setString(1, info.getName());
            stm.setString(2, info.getGender().name());
            stm.setString(3, info.getPhoneNumber());
            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    info.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(PersonalInfo info) throws SQLException {
        String sql = "UPDATE Personal_Info SET name = ?, gender = ?, phone_number = ? WHERE personal_info_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, info.getName());
            stm.setString(2, info.getGender().name());
            stm.setString(3, info.getPhoneNumber());
            stm.setInt(4, info.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Personal_Info WHERE personal_info_id = ?";

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
