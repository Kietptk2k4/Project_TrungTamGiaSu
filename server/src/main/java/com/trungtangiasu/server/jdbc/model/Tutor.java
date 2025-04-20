package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tutor {
    private int id; // tutor_id
    
    private int userId;

    private String introduction;

    @Builder.Default
    private double avgRating = 0;

    @Builder.Default
    private int completedCourses = 0;

    @Builder.Default
    private int feedbackCourseCount = 0;

    @Builder.Default
    private boolean isApproved = false;

    public static Tutor fromResultSet(ResultSet res) throws SQLException {
        return Tutor.builder()
                .id(res.getInt("tutor_id"))
                .userId(res.getInt("user_id"))
                .introduction(res.getString("introduction"))
                .avgRating(res.getDouble("avg_rating"))
                .completedCourses(res.getInt("completed_courses"))
                .feedbackCourseCount(res.getInt("feedback_course_count"))
                .isApproved(res.getBoolean("is_approved"))
                .build();
    }
}
