package com.trungtangiasu.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FeedbackDTO {
    private Integer feedbackId;
    private Integer courseId;
    private Integer rating; // 0 to 5
    private String content;
    private LocalDateTime createdAt;
}