package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CourseSchedule {
    public static CourseSchedule fromResultSet(ResultSet res) throws SQLException {
        return CourseSchedule.builder()
                .dayOfWeek(res.getInt("day_of_week"))
                .startTime(res.getTime("start_time").toLocalTime())
                .endTime(res.getTime("end_time").toLocalTime())
                .build();
    }

    private int courseId;
    private int id;
    private int dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}
