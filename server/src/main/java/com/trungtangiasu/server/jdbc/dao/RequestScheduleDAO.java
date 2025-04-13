package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.RequestSchedule;

public class RequestScheduleDAO {

    public List<RequestSchedule> selectAll() throws SQLException {
        String sql = "SELECT * FROM Request_Schedule";
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

    public RequestSchedule select(int id) throws SQLException {
        String sql = "SELECT * FROM Request_Schedule WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return RequestSchedule.fromResultSet(rs);
                }
                return null;
            }
        }
    }

    public void insert(RequestSchedule schedule) throws SQLException {
        String sql = "INSERT INTO Request_Schedule (request_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, schedule.getRequestId());
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                schedule.setId(rs.getInt(1));
            }
            
        }
    }

    public boolean update(RequestSchedule schedule) throws SQLException {
        String sql = "UPDATE Request_Schedule SET request_id = ?, day_of_week = ?, start_time = ?, end_time = ? WHERE schedule_id = ?";
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

    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Request_Schedule WHERE schedule_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
