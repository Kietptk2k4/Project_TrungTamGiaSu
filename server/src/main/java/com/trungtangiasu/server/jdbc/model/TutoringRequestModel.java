package com.trungtangiasu.server.jdbc.model;


import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutoringRequestModel {
    private int requestId;
    private int customerId;
    private Integer tutorId;
    private Integer subjectClassId; // Vẫn giữ lại nếu có dùng
    private Integer sessionsPerWeek;
    private String wardId;
    private String addressDetail;
    private Integer proposedFeePerSession;
    private Timestamp createdAt;
    private Timestamp expiredAt;
    private Status status;
    private Integer subjectId; // Mới
    private Integer gradeId;   // Mới

    public static enum Status {
        PENDING, APPROVED, REJECTED, ASSIGNED, CANCELLED, REFUNDED
    }
}