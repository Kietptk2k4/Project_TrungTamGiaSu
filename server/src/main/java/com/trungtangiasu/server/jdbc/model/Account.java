package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Account {
    public static Account fromResultSet(ResultSet res) throws SQLException{
        return Account.builder()
                .userId(res.getInt("user_id"))
                .userName(res.getString("username"))
                .email(res.getString("email"))
                .hashedPassword(res.getString("hashed_password"))
                .otp(res.getString("otp"))
                .otpExpiredDate(res.getTimestamp("otp_expired_date") != null ? res.getTimestamp("otp_expired_date").toLocalDateTime() : null)
                .unreadNotification(res.getInt("unread_notifications"))
                .roleId(res.getInt("role_id"))
                .createdAt(res.getTimestamp("created_at") != null ? res.getTimestamp("created_at").toLocalDateTime() : null)
                .isActive(res.getBoolean("is_active"))
                .build();
    }

    private int userId;
    private String userName;
    private String email;
    private String hashedPassword;
    private String otp;
    private LocalDateTime otpExpiredDate;
    private int unreadNotification;
    private int roleId;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private boolean isActive = true;
}
