package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Feedback;

public class FeedbackDAO {
    public static void main(String []args)throws SQLException{
        Feedback f = Feedback.builder()
                    .courseId(1)
                    .rating(5)
                    .content("Giao vien xin xo")
                    .build();
        FeedbackDAO.insert(f);
        System.out.println(f);
        System.out.println(FeedbackDAO.selectAll());
        System.out.println(FeedbackDAO.select(1));
        System.out.println(FeedbackDAO.selectByCourseId(1));
    }
    public static List<Feedback> selectAll() throws SQLException {
        String sql = "SELECT * FROM Feedbacks";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet res = stmt.executeQuery()) {

            List<Feedback> list = new ArrayList<>();
            while (res.next()) {
                list.add(Feedback.fromResultSet(res));
            }
            return list;
        }
    }

    public static Feedback select(int feedback_id) throws SQLException {
        String sql = "SELECT * FROM Feedbacks WHERE feedback_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, feedback_id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return Feedback.fromResultSet(res);
                }
                return null;
            }
        }
    }

    public static Feedback selectByCourseId(int course_id) throws SQLException {
        String sql = "SELECT * FROM Feedbacks WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, course_id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return Feedback.fromResultSet(res);
                }
                return null;
            }
        }
    }

    public static void insert(Feedback feedback) throws SQLException {
        String sql = "INSERT INTO Feedbacks (course_id, rating, content, created_at) VALUES (?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, feedback.getCourseId());
            stmt.setInt(2, feedback.getRating());
            stmt.setString(3, feedback.getContent());
            stmt.setTimestamp(4, Timestamp.valueOf(feedback.getCreatedAt()));
            stmt.executeUpdate();
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    feedback.setId(res.getInt(1));
            }
        }
    }

    public static void update(Feedback feedback) throws SQLException {
        String sql = "UPDATE Feedbacks SET course_id = ?, rating = ?, content = ?, created_at = ? WHERE feedback_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, feedback.getCourseId());
            stmt.setInt(2, feedback.getRating());
            stmt.setString(3, feedback.getContent());
            stmt.setTimestamp(4, Timestamp.valueOf(feedback.getCreatedAt()));
            stmt.setInt(5, feedback.getId());
            stmt.executeUpdate();
        }
    }

    public static void delete(int id) throws SQLException {
        String sql = "DELETE FROM Feedbacks WHERE feedback_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
