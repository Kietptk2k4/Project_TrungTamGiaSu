package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class TutorDTO {
    private Integer tutorId;
    private Integer userId;
    private Integer personalInfoId;
    private String introduction;
    private Double avgRating;
    private Integer completedCourses;
    private Integer feedbackCourseCount;
    private Boolean isApproved;
}
