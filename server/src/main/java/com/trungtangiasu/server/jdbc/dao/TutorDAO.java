package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Tutor;

public class TutorDAO {

    public static ArrayList<Tutor> selectAll() throws SQLException {
        ArrayList<Tutor> tutors = new ArrayList<>();
        String sql = "SELECT * FROM Tutor";

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

    public static Tutor select(int id) throws SQLException {
        Tutor tutor = null;
        String sql = "SELECT * FROM Tutor WHERE tutor_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    tutor = Tutor.fromResultSet(res);
                }
            }
        }

        return tutor;
    }

    public static void insert(Tutor tutor) throws SQLException {
        String sql = "INSERT INTO Tutor(user_id, personal_info_id, introduction, avg_rating, completed_courses, feedback_course_count, is_approved) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, tutor.getUserId());
            stm.setInt(2, tutor.getPersonalInfoId());
            stm.setString(3, tutor.getIntroduction());
            stm.setDouble(4, tutor.getAvgRating());
            stm.setInt(5, tutor.getCompletedCourses());
            stm.setInt(6, tutor.getFeedbackCourseCount());
            stm.setBoolean(7, tutor.isApproved());

            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    tutor.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(Tutor tutor) throws SQLException {
        String sql = "UPDATE Tutor SET " +
                "user_id = ?, " +
                "personal_info_id = ?, " +
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
            stm.setInt(2, tutor.getPersonalInfoId());
            stm.setString(3, tutor.getIntroduction());
            stm.setDouble(4, tutor.getAvgRating());
            stm.setInt(5, tutor.getCompletedCourses());
            stm.setInt(6, tutor.getFeedbackCourseCount());
            stm.setBoolean(7, tutor.isApproved());
            stm.setInt(8, tutor.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Tutor WHERE tutor_id = ?";

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
