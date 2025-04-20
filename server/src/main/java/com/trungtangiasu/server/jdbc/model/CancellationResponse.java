package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CancellationResponse {
    public static CancellationResponse fromResultSet(ResultSet res) throws SQLException {
        return CancellationResponse.builder()
                .id(res.getInt("cancellation_response_id"))
                .cancellationRequestId(res.getInt("cancellation_request_id"))
                .adminId(res.getInt("admin_id"))
                .isApproved(res.getBoolean("is_approved"))
                .reason(res.getString("reason"))
                .createdAt(res.getTimestamp("created_at") != null ? res.getTimestamp("created_at").toLocalDateTime() : null)
                .build();
    }

    private int id;

    private int cancellationRequestId;

    private int adminId;

    @Builder.Default
    private boolean isApproved = false;

    private String reason;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
