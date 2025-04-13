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
                .courseId(res.getInt("course_id"))
                .id(res.getInt("schedule_id"))
                .dayOfWeek(res.getInt("day_of_week"))
                .startTime(res.getTime("start_time").toLocalTime())
                .endTime(res.getTime("end_time").toLocalTime())
                .build();
    }

    private int id;
    private int courseId;
    private int dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}
