package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Feedback {
    public static Feedback fromResultSet(ResultSet res) throws SQLException {
        return Feedback.builder()
                .id(res.getInt("feedback_id"))
                .courseId(res.getInt("course_id"))
                .rating(res.getInt("rating"))
                .content(res.getString("content"))
                .createdAt(res.getTimestamp("created_at").toLocalDateTime())
                .build();
    }

    private int id;
    private int courseId;
    private int rating;
    private String content;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
