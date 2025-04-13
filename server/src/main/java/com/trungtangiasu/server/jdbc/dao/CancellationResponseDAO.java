package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.CancellationResponse;

public class CancellationResponseDAO {

    public static List<CancellationResponse> selectAll() throws SQLException {
        List<CancellationResponse> list = new ArrayList<>();
        String sql = "SELECT * FROM Cancellation_Response";

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
        String sql = "SELECT * FROM Cancellation_Response WHERE cancellation_response_id = ?";
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

    public static void insert(CancellationResponse dto) throws SQLException {
        String sql = "INSERT INTO Cancellation_Response (cancellation_request_id, admin_id, is_approved, reason, refund_deposit, refund_tuition, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, dto.getCancellationRequestId());

            if (dto.getAdminId() != null) stmt.setInt(2, dto.getAdminId());
            else stmt.setNull(2, Types.INTEGER);

            stmt.setBoolean(3, dto.isApproved());
            stmt.setString(4, dto.getReason());
            stmt.setDouble(5, dto.getRefundDeposit());
            stmt.setDouble(6, dto.getRefundTuition());

            if (dto.getCreatedAt() != null) stmt.setTimestamp(7, Timestamp.valueOf(dto.getCreatedAt()));
            else stmt.setNull(7, Types.TIMESTAMP);

            stmt.executeUpdate();
            
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    dto.setId(res.getInt(1));
            }

        }
    }

    public static void update(CancellationResponse dto) throws SQLException {
        String sql = "UPDATE Cancellation_Response SET cancellation_request_id = ?, admin_id = ?, is_approved = ?, reason = ?, refund_deposit = ?, refund_tuition = ?, created_at = ? WHERE cancellation_response_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, dto.getCancellationRequestId());

            if (dto.getAdminId() != null) stmt.setInt(2, dto.getAdminId());
            else stmt.setNull(2, Types.INTEGER);
            stmt.setBoolean(3, dto.isApproved());
            stmt.setString(4, dto.getReason());
            stmt.setDouble(5, dto.getRefundDeposit());
            stmt.setDouble(6, dto.getRefundTuition());

            if (dto.getCreatedAt() != null) stmt.setTimestamp(7, Timestamp.valueOf(dto.getCreatedAt()));
            else stmt.setNull(7, Types.TIMESTAMP);

            stmt.setInt(8, dto.getId());

            stmt.executeUpdate();
        }
    }

    public static void delete(int id) throws SQLException {
        String sql = "DELETE FROM Cancellation_Response WHERE cancellation_response_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
