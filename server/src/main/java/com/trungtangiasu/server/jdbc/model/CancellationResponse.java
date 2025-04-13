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
                .adminId(res.getObject("admin_id") != null ? res.getInt("admin_id") : null)
                .isApproved(res.getBoolean("is_approved"))
                .reason(res.getString("reason"))
                .refundDeposit(res.getDouble("refund_deposit"))
                .refundTuition(res.getDouble("refund_tuition"))
                .createdAt(res.getTimestamp("created_at") != null ? res.getTimestamp("created_at").toLocalDateTime() : null)
                .build();
    }

    private int id;

    private int cancellationRequestId;

    private Integer adminId;

    @Builder.Default
    private boolean isApproved = false;

    private String reason;

    private double refundDeposit;

    private double refundTuition;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
