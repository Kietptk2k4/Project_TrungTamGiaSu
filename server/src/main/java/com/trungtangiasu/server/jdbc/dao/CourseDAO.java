package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Course;

public class CourseDAO {

    public static void main(String []args)throws SQLException{
        Course course = Course.builder()
                        .requestId(2)
                        .startDate(LocalDate.of(2025, 4, 30))
                        .endDate(LocalDate.of(2025,5, 29))
                        .sessionsPerWeek(3)
                        .build();
        CourseDAO.insert(course);
        System.out.println(course);
        System.out.println(CourseDAO.selectAll());
        System.out.println(CourseDAO.select(1));
    }

    public static List<Course> selectAll() throws SQLException {
        String sql = "SELECT * FROM Courses";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Course> list = new ArrayList<>();
            while (rs.next()) {
                list.add(Course.fromResultSet(rs));
            }
            return list;
        }
    }

    public static Course select(int course_id) throws SQLException {
        String sql = "SELECT * FROM Courses WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, course_id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Course.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public static void insert(Course course) throws SQLException {
        String sql = "INSERT INTO Courses (request_id, start_date, end_date, status, sessions_per_week) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, course.getRequestId());
            ps.setDate(2, course.getStartDate() != null ? Date.valueOf(course.getStartDate()) : null);
            ps.setDate(3, course.getEndDate() != null ? Date.valueOf(course.getEndDate()) : null);
            ps.setString(4, course.getStatus().name());
            ps.setInt(5, course.getSessionsPerWeek());
            ps.executeUpdate();
            try (ResultSet generatedKey = ps.getGeneratedKeys()) {
                if (generatedKey.next()) 
                    course.setId(generatedKey.getInt(1));
            }
        }
    }

    public static boolean update(Course course) throws SQLException {
        String sql = "UPDATE Courses SET request_id = ?, start_date = ?, end_date = ?, status = ?, sessions_per_week = ? WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, course.getRequestId());
            ps.setDate(2, course.getStartDate() != null ? Date.valueOf(course.getStartDate()) : null);
            ps.setDate(3, course.getEndDate() != null ? Date.valueOf(course.getEndDate()) : null);
            ps.setString(4, course.getStatus().name());
            ps.setInt(5, course.getSessionsPerWeek());
            ps.setInt(6, course.getId());
            return ps.executeUpdate() > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Courses WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
