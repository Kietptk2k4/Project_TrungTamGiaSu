package com.trungtangiasu.server.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CourseDTO {
    private Integer courseId;
    private Integer requestId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status; // In Progress, Completed, Cancelled
    private Integer sessionsPerWeek;
}
