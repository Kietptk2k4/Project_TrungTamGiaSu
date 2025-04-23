package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestSchedule {
    public static RequestSchedule fromResultSet(ResultSet res) throws SQLException {
        return RequestSchedule.builder()
                .id(res.getInt("schedule_id"))
                .requestId(res.getInt("request_id"))
                .dayOfWeek(res.getInt("day_of_week"))
                .startTime(res.getTime("start_time").toLocalTime())
                .endTime(res.getTime("end_time").toLocalTime())
                .build();
    }

    private int id;
    private int requestId;
    private int dayOfWeek;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
}
