package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import java.time.*;
import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CourseSchedule;

public class CourseScheduleDAO {

    public static void main(String []args)throws SQLException{
        List<CourseSchedule> list = new ArrayList<>();
        list.add(CourseSchedule.builder()
            // .courseId(1)
            .dayOfWeek(1)
            .startTime(LocalTime.of(7, 0))
            .endTime(LocalTime.of(10, 0))
            .build());
        
        // list.add(CourseSchedule.builder()
        //     // .courseId(1)
        //     .dayOfWeek(3)
        //     .startTime(LocalTime.of(7, 0))
        //     .endTime(LocalTime.of(10, 0))
        //     .build());
        
        // list.add(CourseSchedule.builder()
        //     // .courseId(1)
        //     .dayOfWeek(7)
        //     .startTime(LocalTime.of(7, 0))
        //     .endTime(LocalTime.of(10, 0))
        //     .build());
        
        for (CourseSchedule c: list){
            CourseScheduleDAO.insert(c);
            System.out.println(c);
        }

        System.out.println(CourseScheduleDAO.selectAll());
        System.out.println(CourseScheduleDAO.select(1));
        System.out.println(CourseScheduleDAO.selectByCourseId(1));
    }
    public static List<CourseSchedule> selectAll() throws SQLException {
        String sql = "SELECT * FROM CourseSchedules";
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

    public static CourseSchedule select(int scheduleId) throws SQLException {
        String sql = "SELECT * FROM CourseSchedules WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, scheduleId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return CourseSchedule.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public static List<CourseSchedule> selectByCourseId(int courseId) throws SQLException{
        List<CourseSchedule> list = new ArrayList<>();
        String sql = "SELECT * FROM CourseSchedules WHERE course_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, courseId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(CourseSchedule.fromResultSet(rs));
                }
                
            }
        }
        return list;
    }

    public static void insert(CourseSchedule schedule) throws SQLException {
        String sql = "INSERT INTO CourseSchedules (course_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, schedule.getCourseId());
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if(rs.next())
                    schedule.setId(rs.getInt(1));
            }
        }
    }

    public static boolean update(CourseSchedule schedule) throws SQLException {
        String sql = "UPDATE CourseSchedules SET course_id = ?, day_of_week = ?, start_time = ?, end_time = ? WHERE schedule_id = ?";
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

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM CourseSchedules WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
