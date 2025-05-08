package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import lombok.Builder.Default;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TutoringRequest {
    public static TutoringRequest fromResultSet(ResultSet res) throws SQLException {
        return TutoringRequest.builder()
                .id(res.getInt("request_id"))
                .customerId(res.getInt("customer_id"))
                .tutorId((Integer) res.getObject("tutor_id"))
                .subjectClassId(res.getInt("subject_class_id"))
                .sessionsPerWeek(res.getInt("sessions_per_week"))
                .wardId(res.getString("ward_id"))
                .addressDetail(res.getString("address_detail"))
                .feePerSession(res.getInt("proposed_fee_per_session"))
                .createdAt(res.getTimestamp("created_at") != null ? res.getTimestamp("created_at").toLocalDateTime() : null)
                .expiredAt(res.getTimestamp("expired_at") != null ? res.getTimestamp("expired_at").toLocalDateTime() : null)
                .status(Status.valueOf(res.getString("status")))
                .build();
    }
    private int id;

    private int customerId;

    /**
     * default: null
     */
    @Builder.Default
    private Integer tutorId = null;

    private int subjectClassId;

    private int sessionsPerWeek;

    private String wardId;

    private String addressDetail;

    private int feePerSession;
    int classId;
    int subjectId;
    String subjectName;
    String className;
    @Builder.Default
    private Status  status = Status.PENDING;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime expiredAt = LocalDateTime.now().plusDays(7);

    List<RequestSchedules> schedules = new ArrayList<>();

    public static enum Status{
        PENDING, 
        APPROVED, 
        REJECTED, 
        ASSIGNED, 
        CANCELLED,
        REFUNDED
    }
}
