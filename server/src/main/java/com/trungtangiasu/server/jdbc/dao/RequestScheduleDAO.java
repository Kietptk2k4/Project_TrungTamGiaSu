package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.RequestSchedule;

public class RequestScheduleDAO {

    public static void main(String []args)throws SQLException{
        // List<RequestSchedule> list = new ArrayList<>();
        // list.add(RequestSchedule.builder()
        //     .requestId(2)
        //     .dayOfWeek(1)
        //     .startTime(LocalTime.of(7, 0))
        //     .endTime(LocalTime.of(10, 0))
        //     .build());
        
        // list.add(RequestSchedule.builder()
        //     .requestId(2)
        //     .dayOfWeek(3)
        //     .startTime(LocalTime.of(7, 0))
        //     .endTime(LocalTime.of(10, 0))
        //     .build());
        
        // list.add(RequestSchedule.builder()
        //     .requestId(2)
        //     .dayOfWeek(7)
        //     .startTime(LocalTime.of(7, 0))
        //     .endTime(LocalTime.of(10, 0))
        //     .build());
        
        // for (RequestSchedule r: list){
        //     RequestScheduleDAO.insert(r);
        //     System.out.println(r);
        // }

        System.out.println(RequestScheduleDAO.selectAll());
        System.out.println(RequestScheduleDAO.select(2));
        System.out.println(RequestScheduleDAO.selectByRequestId(2));
    }

    public static List<RequestSchedule> selectAll() throws SQLException {
        String sql = "SELECT * FROM RequestSchedules";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<RequestSchedule> list = new ArrayList<>();
            while (rs.next()) {
                list.add(RequestSchedule.fromResultSet(rs));
            }
            return list;
        }
    }

    public static RequestSchedule select(int schedule_id) throws SQLException {
        String sql = "SELECT * FROM RequestSchedules WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, schedule_id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return RequestSchedule.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public static List<RequestSchedule> selectByRequestId(int request_id)throws SQLException{
        List<RequestSchedule> list = new ArrayList<>();
        String sql = "SELECT * FROM RequestSchedules WHERE request_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, request_id);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add( RequestSchedule.fromResultSet(rs));
                }   
            }
        }
        return list;
    }

    public static void insert(RequestSchedule schedule) throws SQLException {
        String sql = "INSERT INTO RequestSchedules (request_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, schedule.getRequestId());
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

    public static boolean update(RequestSchedule schedule) throws SQLException {
        String sql = "UPDATE RequestSchedules SET request_id = ?, day_of_week = ?, start_time = ?, end_time = ? WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, schedule.getRequestId());
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            ps.setInt(5, schedule.getId());
            return ps.executeUpdate() > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM RequestSchedules WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
