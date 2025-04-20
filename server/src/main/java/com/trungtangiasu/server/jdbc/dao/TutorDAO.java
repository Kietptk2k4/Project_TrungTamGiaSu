package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;


import com.trungtangiasu.server.jdbc.MySql;

import com.trungtangiasu.server.jdbc.model.Tutor;

public class TutorDAO {
    public static void main(String []args)throws SQLException{
        Tutor t = Tutor.builder().userId(1)
                        .introduction("Chao cac ban hs!")
                        .build();
        TutorDAO.insert(t);
        System.out.println(t);
        System.out.println(TutorDAO.select(1));
        System.out.println(TutorDAO.selectAll());
    }

    public static ArrayList<Tutor> selectAll() throws SQLException {
        ArrayList<Tutor> tutors = new ArrayList<>();
        String sql = "SELECT * FROM Tutors";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                tutors.add(Tutor.fromResultSet(res));
            }
        }

        return tutors;
    }

    public static Tutor select(int tutor_id) throws SQLException {
        Tutor tutor = null;
        String sql = "SELECT * FROM Tutors WHERE tutor_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutor_id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    tutor = Tutor.fromResultSet(res);
                }
            }
        }

        return tutor;
    }

    public static void insert(Tutor tutor) throws SQLException {
        String sql = "INSERT INTO Tutors(user_id, introduction, avg_rating, completed_courses, feedback_course_count, is_approved) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, tutor.getUserId());
            stm.setString(2, tutor.getIntroduction());
            stm.setDouble(3, tutor.getAvgRating());
            stm.setInt(4, tutor.getCompletedCourses());
            stm.setInt(5, tutor.getFeedbackCourseCount());
            stm.setBoolean(6, tutor.isApproved());

            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    tutor.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(Tutor tutor) throws SQLException {
        String sql = "UPDATE Tutors SET " +
                "user_id = ?, " +
                "introduction = ?, " +
                "avg_rating = ?, " +
                "completed_courses = ?, " +
                "feedback_course_count = ?, " +
                "is_approved = ? " +
                "WHERE tutor_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutor.getUserId());
            stm.setString(2, tutor.getIntroduction());
            stm.setDouble(3, tutor.getAvgRating());
            stm.setInt(4, tutor.getCompletedCourses());
            stm.setInt(5, tutor.getFeedbackCourseCount());
            stm.setBoolean(6, tutor.isApproved());
            stm.setInt(7, tutor.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Tutors WHERE tutor_id = ?";

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
