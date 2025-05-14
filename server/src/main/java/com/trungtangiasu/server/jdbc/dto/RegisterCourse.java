package com.trungtangiasu.server.jdbc.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterCourse {
    private int requestId;
    private int sessionsPerWeek;
    private int feePerSession;
    private LocalDate createdAt;
    private String subjectName;
    private String className;
    private String address;
    
}