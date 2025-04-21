package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CancellationResponse;

public class CancellationResponseDAO {
    public static void main(String []args)throws SQLException{
        CancellationResponse response = CancellationResponse.builder()
                            .cancellationRequestId(1)
                            .adminId(1)
                            .isApproved(false)
                            .reason("Khong cho")
                            .build();
        
        System.out.println(response);
        CancellationResponseDAO.insert(response);
        System.out.println(response);
        System.out.println(CancellationResponseDAO.selectAll());
        System.out.println(CancellationResponseDAO.select(4));
        System.out.println(CancellationResponseDAO.selectByRequestId(1));
    }

    public static List<CancellationResponse> selectAll() throws SQLException {
        List<CancellationResponse> list = new ArrayList<>();
        String sql = "SELECT * FROM CancellationResponses";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet res = stmt.executeQuery()) {
            while (res.next()) {
                list.add(CancellationResponse.fromResultSet(res));
            }
        }

        return list;
    }

    public static CancellationResponse select(int id) throws SQLException {
        String sql = "SELECT * FROM CancellationResponses WHERE cancellation_response_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return CancellationResponse.fromResultSet(res);
                }
            }
        }
        return null;
    }

    public static CancellationResponse selectByRequestId(int requestId) throws SQLException {
        String sql = "SELECT * FROM CancellationResponses WHERE cancellation_request_id = ?";
        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, requestId);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return CancellationResponse.fromResultSet(res);
                }
            }
        }
        return null;
    }



    public static void insert(CancellationResponse response) throws SQLException {
        String sql = "INSERT INTO CancellationResponses (cancellation_request_id, admin_id, is_approved, reason,  created_at) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, response.getCancellationRequestId());
            stmt.setInt(2, response.getAdminId());
            stmt.setBoolean(3, response.isApproved());
            stmt.setString(4, response.getReason());
            stmt.setTimestamp(5, Timestamp.valueOf(response.getCreatedAt()));

            stmt.executeUpdate();
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    response.setId(res.getInt(1));
            }

        }
    }

    public static void update(CancellationResponse response) throws SQLException {
        String sql = "UPDATE CancellationResponses SET cancellation_request_id = ?, admin_id = ?, is_approved = ?, reason = ?, created_at = ? WHERE cancellation_response_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, response.getCancellationRequestId());
            stmt.setInt(2, response.getAdminId());
            stmt.setBoolean(3, response.isApproved());
            stmt.setString(4, response.getReason());
            stmt.setTimestamp(5, Timestamp.valueOf(response.getCreatedAt()));
            stmt.setInt(6, response.getId());

            stmt.executeUpdate();
        }
    }

    public static void delete(int id) throws SQLException {
        String sql = "DELETE FROM CancellationResponses WHERE cancellation_response_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
