package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cancellation_Request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CancellationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cancellation_request_id")
    private Integer cancellationRequestId;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(name = "requester_type", columnDefinition = "ENUM('Tutor', 'Customer')")
    private RequesterType requesterType;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    public enum RequesterType {
        Tutor, Customer
    }
}
