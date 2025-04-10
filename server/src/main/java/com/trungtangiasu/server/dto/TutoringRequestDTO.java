package com.trungtangiasu.server.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TutoringRequestDTO {
    private Integer requestId;
    private Integer customerId;
    private Integer tutorId;
    private Integer subjectClassId;
    private Integer sessionsPerWeek;
    private String wardId;
    private String addressDetail;
    private BigDecimal proposedFeePerSession;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private String status; // Pending, Approved, Rejected, Assigned, Cancelled
}
