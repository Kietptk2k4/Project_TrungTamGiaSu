package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Course {
    public static Course fromResultSet(ResultSet res) throws SQLException {
        return Course.builder()
                .id(res.getInt("course_id"))
                .requestId(res.getInt("request_id"))
                .startDate(res.getDate("start_date") != null ? res.getDate("start_date").toLocalDate() : null)
                .endDate(res.getDate("end_date") != null ? res.getDate("end_date").toLocalDate() : null)
                .status(Status.valueOf(res.getString("status")))
                .sessionsPerWeek(res.getInt("sessions_per_week"))
                .build();
    }

    private int id;

    private int requestId;

    private LocalDate startDate;

    private LocalDate endDate;

    @Builder.Default
    private Status status = Status.InProgress;

    private int sessionsPerWeek;

    public static enum Status{
        InProgress, 
        Completed, 
        Cancelled
    }
}
