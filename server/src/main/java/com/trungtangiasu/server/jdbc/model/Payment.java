package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {
    public static Payment fromResultSet(ResultSet res) throws SQLException {
        return Payment.builder()
                .id(res.getInt("payment_id"))
                .userId((Integer)res.getObject("user_id"))
                .tutoringRequestId((Integer)res.getObject("tutoring_request_id"))
                .type(Type.valueOf(res.getString("type")))
                .amount(res.getInt("amount"))
                .description(res.getString("description"))
                .createdAt(res.getTimestamp("created_at").toLocalDateTime())
                .build();
    }

    private int id;

    @Builder.Default
    private Integer userId = null;

    @Builder.Default
    private Integer tutoringRequestId = null;
    private Type type;
    private int amount;
    private String description;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Type{
        DEPOSIT,
        PAYMENT,
        REFUND
    }
}
