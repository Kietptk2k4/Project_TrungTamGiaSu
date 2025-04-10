package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cancellation_Response")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CancellationResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cancellation_response_id")
    private Integer cancellationResponseId;

    @OneToOne
    @JoinColumn(name = "cancellation_request_id", referencedColumnName = "cancellation_request_id", nullable = false)
    private CancellationRequest cancellationRequest;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "admin_id")
    private Admin admin;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "refund_deposit", precision = 15, scale = 2, columnDefinition = "DECIMAL(15,2) DEFAULT 0")
    private BigDecimal refundDeposit;

    @Column(name = "refund_tuition", precision = 15, scale = 2, columnDefinition = "DECIMAL(15,2) DEFAULT 0")
    private BigDecimal refundTuition;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
