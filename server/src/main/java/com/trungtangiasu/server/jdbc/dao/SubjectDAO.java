package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Subject;

public class SubjectDAO {

    public static ArrayList<Subject> selectAll() throws SQLException {
        ArrayList<Subject> list = new ArrayList<>();
        String sql = "SELECT * FROM Subject";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(Subject.fromResultSet(res));
            }
        }
        return list;
    }

    public static Subject select(int id) throws SQLException {
        String sql = "SELECT * FROM Subject WHERE subject_id = ?";
        Subject subject = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    subject = Subject.fromResultSet(res);
                }
            }
        }

        return subject;
    }

    public static void insert(Subject subject) throws SQLException {
        String sql = "INSERT INTO Subject(subject_name) VALUES (?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setString(1, subject.getName());
            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    subject.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(Subject subject) throws SQLException {
        String sql = "UPDATE Subject SET subject_name = ? WHERE subject_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, subject.getName());
            stm.setInt(2, subject.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Subject WHERE subject_id = ?";

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
