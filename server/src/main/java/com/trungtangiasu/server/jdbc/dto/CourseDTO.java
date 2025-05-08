package com.trungtangiasu.server.jdbc.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.trungtangiasu.server.jdbc.model.CourseSchedule;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseDTO {
    private int id;
    private String subject;
    private String className;
    private String tutorName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private int sessionsPerWeek;
    private int feePerSession;
    private List<CourseSchedule> schedule;

    // constructors, getters, setters
}