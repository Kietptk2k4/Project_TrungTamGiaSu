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
                .courseId(res.getInt("course_id"))
                .customerId(res.getInt("customer_id"))
                .amount(res.getDouble("amount"))
                .paymentDate(res.getTimestamp("payment_date").toLocalDateTime())
                .paymentMethod(res.getString("payment_method"))
                .transactionCode(res.getString("transaction_code"))
                .paymentStatus(res.getString("payment_status"))
                .processedByUserId(res.getObject("processed_by_user_id") != null ? res.getInt("processed_by_user_id") : null)
                .description(res.getString("description"))
                .notes(res.getString("notes"))
                .build();
    }

    private int id;
    private int courseId;
    private int customerId;
    private double amount;

    @Builder.Default
    private LocalDateTime paymentDate = LocalDateTime.now();
    private String paymentMethod;
    private String transactionCode;
    private String paymentStatus;
    private Integer processedByUserId;
    private String description;
    private String notes;
}
