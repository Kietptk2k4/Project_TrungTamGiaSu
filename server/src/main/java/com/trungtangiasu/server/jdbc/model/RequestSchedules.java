package com.trungtangiasu.server.jdbc.model;


import java.sql.Time;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RequestSchedules {
    int schedule_id;
    int request_id;
    int dayOfWeek; //note ngay  2 = Monday, 3 = Tuesday, ..., 1 = Sunday
    // Time startTime;
    // Time endTime;
    
    @JsonFormat(pattern = "HH:mm")
    LocalTime startTime;

    @JsonFormat(pattern = "HH:mm")
    LocalTime endTime;
    
}
