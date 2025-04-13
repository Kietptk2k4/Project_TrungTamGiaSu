package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Class;

public class ClassDAO {

    public static ArrayList<Class> selectAll() throws SQLException {
        ArrayList<Class> list = new ArrayList<>();
        String sql = "SELECT * FROM Class";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(Class.fromResultSet(res));
            }
        }
        return list;
    }

    public static Class select(int id) throws SQLException {
        String sql = "SELECT * FROM Class WHERE class_id = ?";
        Class clazz = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    clazz = Class.fromResultSet(res);
                }
            }
        }

        return clazz;
    }

    public static void insert(Class clazz) throws SQLException {
        String sql = "INSERT INTO Class(class_name) VALUES (?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setString(1, clazz.getName());
            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    clazz.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(Class clazz) throws SQLException {
        String sql = "UPDATE Class SET class_name = ? WHERE class_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, clazz.getName());
            stm.setInt(2, clazz.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Class WHERE class_id = ?";

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
