package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Course;

public class CourseDAO {

    public List<Course> selectAll() throws SQLException {
        String sql = "SELECT * FROM Course";
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

    public Course select(int id) throws SQLException {
        String sql = "SELECT * FROM Course WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Course.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public int insert(Course course) throws SQLException {
        String sql = "INSERT INTO Course (request_id, start_date, end_date, status, sessions_per_week) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, course.getRequestId());
            ps.setDate(2, course.getStartDate() != null ? Date.valueOf(course.getStartDate()) : null);
            ps.setDate(3, course.getEndDate() != null ? Date.valueOf(course.getEndDate()) : null);
            ps.setString(4, course.getStatus().name());
            ps.setInt(5, course.getSessionsPerWeek());
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) return rs.getInt(1);
            }
            return -1;
        }
    }

    public boolean update(Course course) throws SQLException {
        String sql = "UPDATE Course SET request_id = ?, start_date = ?, end_date = ?, status = ?, sessions_per_week = ? WHERE course_id = ?";
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

    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Course WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
