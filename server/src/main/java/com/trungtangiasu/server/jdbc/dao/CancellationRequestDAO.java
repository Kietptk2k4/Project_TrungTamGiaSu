package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CancellationRequest;

public class CancellationRequestDAO {

    public static List<CancellationRequest> selectAll() throws SQLException {
        List<CancellationRequest> list = new ArrayList<>();
        String sql = "SELECT * FROM Cancellation_Request";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet res = stmt.executeQuery()) {

            while (res.next()) {
                list.add(CancellationRequest.fromResultSet(res));
            }
        }

        return list;
    }

    public static CancellationRequest select(int id) throws SQLException {
        String sql = "SELECT * FROM Cancellation_Request WHERE cancellation_request_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return CancellationRequest.fromResultSet(res);
                }
            }
        }
        return null;
    }

    public static void insert(CancellationRequest dto) throws SQLException {
        String sql = "INSERT INTO Cancellation_Request (course_id, requester_type, created_at, reason) VALUES (?, ?, ?, ?)";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, dto.getCourseId());
            stmt.setString(2, dto.getRequesterType().name());
            stmt.setTimestamp(3, Timestamp.valueOf(dto.getCreatedAt()));
            stmt.setString(4, dto.getReason());

            stmt.executeUpdate();
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    dto.setId(res.getInt(1));
            }
        }
    }

    public static void update(CancellationRequest dto) throws SQLException {
        String sql = "UPDATE Cancellation_Request SET course_id = ?, requester_type = ?, created_at = ?, reason = ? WHERE cancellation_request_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, dto.getCourseId());
            stmt.setString(2, dto.getRequesterType().name());
            stmt.setTimestamp(3, Timestamp.valueOf(dto.getCreatedAt()));
            stmt.setString(4, dto.getReason());
            stmt.setInt(5, dto.getId());

            stmt.executeUpdate();
        }
    }

    public static void delete(int id) throws SQLException {
        String sql = "DELETE FROM Cancellation_Request WHERE cancellation_request_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
