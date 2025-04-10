package com.trungtangiasu.server.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CancellationResponseDTO {
    private Integer cancellationResponseId;
    private Integer cancellationRequestId;
    private Integer adminId;
    private Boolean isApproved;
    private String reason;
    private BigDecimal refundDeposit;
    private BigDecimal refundTuition;
    private LocalDateTime createdAt;
}
