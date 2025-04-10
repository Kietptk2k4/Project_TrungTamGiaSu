package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class CourseScheduleDTO {
    private Integer scheduleId;
    private Integer courseId;
    private Integer dayOfWeek; // 1 (Monday) to 7 (Sunday)
    private String startTime; // Format: HH:mm
    private String endTime;   // Format: HH:mm
}
