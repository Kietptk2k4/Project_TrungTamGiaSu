package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

public class TutoringRequestDAO {
    public static void main(String []args) throws SQLException{
        TutoringRequest request = TutoringRequest.builder()
                                .customerId(1)
                                .subjectClassId(1)
                                .sessionsPerWeek(3)
                                .wardId("00004")
                                .addressDetail("Dia chi chi tiet,,,")
                                .proposedFeePerSession(100000)
                                .build();
        
        TutoringRequestDAO.insert(request);
        System.out.println(request);
        System.out.println(TutoringRequestDAO.selectAll());
        System.out.println(TutoringRequestDAO.select(1));
    }

    public static List<TutoringRequest> selectAll() throws SQLException {
        String sql = "SELECT * FROM TutoringRequests";
        List<TutoringRequest> list = new ArrayList<>();
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql); ResultSet res = stmt.executeQuery()) {
            while (res.next()) {
                list.add(TutoringRequest.fromResultSet(res));
            }
        }
        return list;
    }
    
    public static TutoringRequest select(int request_id) throws SQLException {
        String sql = "SELECT * FROM TutoringRequests WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, request_id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return TutoringRequest.fromResultSet(res);
                }
                return null;
            }
        }
    }

    public static void insert(TutoringRequest request) throws SQLException {
        String sql = "INSERT INTO TutoringRequests (customer_id, tutor_id, subject_class_id, sessions_per_week, ward_id, address_detail, proposed_fee_per_session, created_at, expired_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = MySql.createConnection(); 
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, request.getCustomerId());
            stmt.setObject(2, request.getTutorId());
            // if (request.getTutorId() != null) stmt.setInt(2, request.getTutorId());
            // else stmt.setNull(2, Types.INTEGER);
            stmt.setInt(3, request.getSubjectClassId());
            stmt.setInt(4, request.getSessionsPerWeek());
            stmt.setString(5, request.getWardId());
            stmt.setString(6, request.getAddressDetail());
            stmt.setInt(7, request.getProposedFeePerSession());
            stmt.setTimestamp(8, request.getCreatedAt() != null ? Timestamp.valueOf(request.getCreatedAt()) : null);
            stmt.setTimestamp(9, request.getExpiredAt() != null ? Timestamp.valueOf(request.getExpiredAt()) : null);
            stmt.setString(10, request.getStatus().name());
            stmt.executeUpdate();

            try(ResultSet gegeratedKey = stmt.getGeneratedKeys()){
                if(gegeratedKey.next())
                    request.setId(gegeratedKey.getInt(1));
            }

        }
    }

    public static boolean update(TutoringRequest request) throws SQLException {
        String sql = "UPDATE TutoringRequests SET customer_id=?, tutor_id=?, subject_class_id=?, sessions_per_week=?, ward_id=?, address_detail=?, proposed_fee_per_session=?, created_at=?, expired_at=?, status=? WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); 
        PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, request.getCustomerId());
            // if (request.getTutorId() != null) stmt.setInt(2, request.getTutorId());
            // else stmt.setNull(2, Types.INTEGER);
            stmt.setObject(2, request.getTutorId());
            stmt.setInt(3, request.getSubjectClassId());
            stmt.setInt(4, request.getSessionsPerWeek());
            stmt.setString(5, request.getWardId());
            stmt.setString(6, request.getAddressDetail());
            stmt.setInt(7, request.getProposedFeePerSession());
            stmt.setTimestamp(8, request.getCreatedAt() != null ? Timestamp.valueOf(request.getCreatedAt()) : null);
            stmt.setTimestamp(9, request.getExpiredAt() != null ? Timestamp.valueOf(request.getExpiredAt()) : null);
            stmt.setString(10, request.getStatus().name());
            stmt.setInt(11, request.getId());
            int affected = stmt.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM TutoringRequests WHERE request_id=?";
        try (Connection conn = MySql.createConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            int affected = stmt.executeUpdate();
            return affected > 0;
        }
    }


}
