package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Tutoring_Request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutoringRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "tutor_id", referencedColumnName = "tutor_id")
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "subject_class_id", referencedColumnName = "subject_class_id")
    private SubjectClassMapping subjectClass;

    @Column(name = "sessions_per_week")
    private Integer sessionsPerWeek;

    @ManyToOne
    @JoinColumn(name = "ward_id", referencedColumnName = "ward_id", nullable = false)
    private Ward ward;

    @Column(name = "address_detail", length = 255)
    private String addressDetail;

    @Column(name = "proposed_fee_per_session", precision = 15, scale = 2)
    private BigDecimal proposedFeePerSession;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('Pending', 'Approved', 'Rejected', 'Assigned', 'Cancelled') DEFAULT 'Pending'")
    private Status status;

    public enum Status {
        Pending, Approved, Rejected, Assigned, Cancelled
    }
}