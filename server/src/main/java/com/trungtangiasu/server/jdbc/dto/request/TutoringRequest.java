package com.trungtangiasu.server.jdbc.dto.request;

import java.util.List;

import com.trungtangiasu.server.jdbc.model.RequestSchedule;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutoringRequest {
    int subjectId;
    int classId;
    int sessionsPerWeek;
    int feePerSession;  
    int wardId;
    String addressDetail;
    int specificTutorId;
    String specificTutorName;
    List<RequestSchedule> schedules; // List of schedule objects, each containing day_of_week, start_time, and end_time





}
