package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CancellationRequest;

public class CancellationRequestDAO {
    public static void main(String []args)throws SQLException{
        CancellationRequest request = CancellationRequest.builder()
                        .courseId(1)
                        .requesterType(CancellationRequest.RequesterType.TUTOR)
                        .reason("Hoc sinh ngu qua")
                        .build();

        CancellationRequestDAO.insert(request);
        System.out.println(request);
        System.out.println(CancellationRequestDAO.selectAll());
        System.out.println(CancellationRequestDAO.select(1));

    }

    public static List<CancellationRequest> selectAll() throws SQLException {
        List<CancellationRequest> list = new ArrayList<>();
        String sql = "SELECT * FROM CancellationRequests";

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
        String sql = "SELECT * FROM CancellationRequests WHERE cancellation_request_id = ?";
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

    public static void insert(CancellationRequest request) throws SQLException {
        String sql = "INSERT INTO CancellationRequests (course_id, requester_type, created_at, reason) VALUES (?, ?, ?, ?)";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, request.getCourseId());
            stmt.setString(2, request.getRequesterType().name());
            stmt.setTimestamp(3, Timestamp.valueOf(request.getCreatedAt()));
            stmt.setString(4, request.getReason());

            stmt.executeUpdate();
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    request.setId(res.getInt(1));
            }
        }
    }

    public static boolean update(CancellationRequest request) throws SQLException {
        String sql = "UPDATE CancellationRequests SET course_id = ?, requester_type = ?, created_at = ?, reason = ? WHERE cancellation_request_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, request.getCourseId());
            stmt.setString(2, request.getRequesterType().name());
            stmt.setTimestamp(3, Timestamp.valueOf(request.getCreatedAt()));
            stmt.setString(4, request.getReason());
            stmt.setInt(5, request.getId());

            int affected = stmt.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM CancellationRequests WHERE cancellation_request_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            int affected = stmt.executeUpdate();
            return affected > 0;
        }
    }
}
