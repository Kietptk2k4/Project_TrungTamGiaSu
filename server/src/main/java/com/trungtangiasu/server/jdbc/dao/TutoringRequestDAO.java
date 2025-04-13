package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

public class TutoringRequestDAO {
    public List<TutoringRequest> selectAll() throws SQLException {
        String sql = "SELECT * FROM Tutoring_Request";
        List<TutoringRequest> list = new ArrayList<>();
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql); ResultSet res = stmt.executeQuery()) {
            while (res.next()) {
                list.add(TutoringRequest.fromResultSet(res));
            }
        }
        return list;
    }
    
    public TutoringRequest select(int id) throws SQLException {
        String sql = "SELECT * FROM Tutoring_Request WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return TutoringRequest.fromResultSet(res);
                }
                return null;
            }
        }
    }

    public void insert(TutoringRequest request) throws SQLException {
        String sql = "INSERT INTO Tutoring_Request (customer_id, tutor_id, subject_class_id, sessions_per_week, ward_id, address_detail, proposed_fee_per_session, created_at, expired_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, request.getCustomerId());
            if (request.getTutorId() != null) stmt.setInt(2, request.getTutorId());
            else stmt.setNull(2, Types.INTEGER);
            stmt.setInt(3, request.getSubjectClassId());
            stmt.setInt(4, request.getSessionsPerWeek());
            stmt.setString(5, request.getWardId());
            stmt.setString(6, request.getAddressDetail());
            stmt.setDouble(7, request.getProposedFeePerSession());
            stmt.setTimestamp(8, request.getCreatedAt() != null ? Timestamp.valueOf(request.getCreatedAt()) : null);
            stmt.setTimestamp(9, request.getExpiredAt() != null ? Timestamp.valueOf(request.getExpiredAt()) : null);
            stmt.setString(10, request.getStatus().name());
            stmt.executeUpdate();
        }
    }

    public void update(TutoringRequest request) throws SQLException {
        String sql = "UPDATE Tutoring_Request SET customer_id=?, tutor_id=?, subject_class_id=?, sessions_per_week=?, ward_id=?, address_detail=?, proposed_fee_per_session=?, created_at=?, expired_at=?, status=? WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, request.getCustomerId());
            if (request.getTutorId() != null) stmt.setInt(2, request.getTutorId());
            else stmt.setNull(2, Types.INTEGER);
            stmt.setInt(3, request.getSubjectClassId());
            stmt.setInt(4, request.getSessionsPerWeek());
            stmt.setString(5, request.getWardId());
            stmt.setString(6, request.getAddressDetail());
            stmt.setDouble(7, request.getProposedFeePerSession());
            stmt.setTimestamp(8, request.getCreatedAt() != null ? Timestamp.valueOf(request.getCreatedAt()) : null);
            stmt.setTimestamp(9, request.getExpiredAt() != null ? Timestamp.valueOf(request.getExpiredAt()) : null);
            stmt.setString(10, request.getStatus().name());
            stmt.setInt(11, request.getId());
            stmt.executeUpdate();

            try(ResultSet genKey = stmt.getGeneratedKeys()){
                if (genKey.next())
                    request.setId(genKey.getInt(1));
            }
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM Tutoring_Request WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }


}
