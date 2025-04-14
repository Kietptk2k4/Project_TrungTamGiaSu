package com.trungtangiasu.server.jdbc.model;

import lombok.*;

import java.sql.*;
import java.time.LocalDateTime;


/**
 * 
 * 
 * Represents a tutoring request in the system.
 * This table stores information about requests made by customers for tutoring services.
 * @author Tule
 * Database table definition:
 * <pre>
 * CREATE TABLE `Tutoring_Request` (
 * `request_id` INT PRIMARY KEY AUTO_INCREMENT,
 * `customer_id` INT NOT NULL,
 * `tutor_id` INT,
 * `subject_class_id` INT,
 * `sessions_per_week` INT,
 * `ward_id` VARCHAR(20) NOT NULL,
 * `address_detail` VARCHAR(255),
 * `proposed_fee_per_session` DECIMAL(15, 2),
 * `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
 * `expired_at` DATETIME,
 * `status` ENUM("Pending", "Approved", "Rejected", "Assigned", "Cancelled") DEFAULT "Pending",
 * FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
 * FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
 * FOREIGN KEY (`subject_class_id`) REFERENCES `Subject_Class_Mapping` (`subject_class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
 * FOREIGN KEY (`ward_id`) REFERENCES `Ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE
 * );
 * </pre>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TutoringRequest {
    private int id;

    private int customerId;

    private Integer tutorId;

    private int subjectClassId;

    private int sessionsPerWeek;

    private String wardId;

    private String addressDetail;

    private double proposedFeePerSession;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime expiredAt = LocalDateTime.now().plusDays(7);

    @Builder.Default
    private Status  status = Status.Pending;

    public static TutoringRequest fromResultSet(ResultSet res) throws SQLException {
        return TutoringRequest.builder()
                .id(res.getInt("request_id"))
                .customerId(res.getInt("customer_id"))
                .tutorId((Integer) res.getObject("tutor_id"))
                .subjectClassId(res.getInt("subject_class_id"))
                .sessionsPerWeek(res.getInt("sessions_per_week"))
                .wardId(res.getString("ward_id"))
                .addressDetail(res.getString("address_detail"))
                .proposedFeePerSession(res.getDouble("proposed_fee_per_session"))
                .createdAt(res.getTimestamp("created_at") != null ? res.getTimestamp("created_at").toLocalDateTime() : null)
                .expiredAt(res.getTimestamp("expired_at") != null ? res.getTimestamp("expired_at").toLocalDateTime() : null)
                .status(Status.valueOf(res.getString("status")))
                .build();
    }

    public static enum Status{
        Pending, 
        Approved, 
        Rejected, 
        Assigned, 
        Cancelled
    }
}
