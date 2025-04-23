package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Classes;

public class ClassDAO {
    public static void main(String []args)throws SQLException{
        Classes [] l = {
            Classes.builder().name("Lop 1").build(),
            Classes.builder().name("Lop 2").build(),
            Classes.builder().name("Lop 3").build(),
            Classes.builder().name("Lop 4").build(),
            Classes.builder().name("Lop 5").build(),
            Classes.builder().name("Lop 6").build(),
            Classes.builder().name("Lop 7").build(),
            Classes.builder().name("Lop 8").build(),
            Classes.builder().name("Lop 9").build(),
            Classes.builder().name("Lop 10").build(),
            Classes.builder().name("Lop 11").build(),
            Classes.builder().name("Lop 12").build()
        };

        for (Classes c : l){
            ClassDAO.insert(c);
            System.out.println(c);
        }

        System.out.println(ClassDAO.selectAll());
        System.out.println(ClassDAO.select(10));
    }

    public static ArrayList<Classes> selectAll() throws SQLException {
        ArrayList<Classes> list = new ArrayList<>();
        String sql = "SELECT * FROM Classes";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(Classes.fromResultSet(res));
            }
        }
        return list;
    }

    public static Classes select(int id) throws SQLException {
        String sql = "SELECT * FROM Classes WHERE class_id = ?";
        Classes clazz = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    clazz = Classes.fromResultSet(res);
                }
            }
        }

        return clazz;
    }

    public static void insert(Classes clazz) throws SQLException {
        String sql = "INSERT INTO Classes(class_name) VALUES (?)";

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

    public static boolean update(Classes clazz) throws SQLException {
        String sql = "UPDATE Classes SET class_name = ? WHERE class_id = ?";

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
        String sql = "DELETE FROM Classes WHERE class_id = ?";

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
