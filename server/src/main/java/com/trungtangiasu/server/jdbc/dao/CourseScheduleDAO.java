package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CourseSchedule;

public class CourseScheduleDAO {

    public List<CourseSchedule> selectAll() throws SQLException {
        String sql = "SELECT * FROM Course_Schedule";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<CourseSchedule> list = new ArrayList<>();
            while (rs.next()) {
                list.add(CourseSchedule.fromResultSet(rs));
            }
            return list;
        }
    }

    public CourseSchedule select(int id) throws SQLException {
        String sql = "SELECT * FROM Course_Schedule WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return CourseSchedule.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public void insert(CourseSchedule schedule) throws SQLException {
        String sql = "INSERT INTO Course_Schedule (course_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, schedule.getCourseId());
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                schedule.setId(rs.getInt(1));
            }
        }
    }

    public boolean update(CourseSchedule schedule) throws SQLException {
        String sql = "UPDATE Course_Schedule SET course_id = ?, day_of_week = ?, start_time = ?, end_time = ? WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, schedule.getCourseId());
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            ps.setInt(5, schedule.getId());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Course_Schedule WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
