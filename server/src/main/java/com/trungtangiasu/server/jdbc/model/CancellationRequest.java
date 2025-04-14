package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CancellationRequest {
    public static CancellationRequest fromResultSet(ResultSet res) throws SQLException {
        return CancellationRequest.builder()
                .id(res.getInt("cancellation_request_id"))
                .courseId(res.getInt("course_id"))
                .requesterType(RequesterType.valueOf(res.getString("requester_type")))
                .createdAt(res.getTimestamp("created_at").toLocalDateTime())
                .reason(res.getString("reason"))
                .build();
    }

    public enum RequesterType {
        Tutor, Customer
    }

    private int id;

    private int courseId;

    private RequesterType requesterType;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private String reason;
}
