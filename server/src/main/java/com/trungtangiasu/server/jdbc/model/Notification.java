package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {

    /**
     * auto increment
     */
    private int id;
    
    private int userId;

    private String content;

    @Builder.Default
    private boolean isRead = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public static Notification fromResultSet(ResultSet res) throws SQLException {
        return Notification.builder()
                .id(res.getInt("notification_id"))
                .userId(res.getInt("user_id"))
                .content(res.getString("content"))
                .isRead(res.getBoolean("is_read"))
                .createdAt(res.getTimestamp("created_at").toLocalDateTime())
                .build();
    }
}
