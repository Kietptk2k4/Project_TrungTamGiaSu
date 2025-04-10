package com.trungtangiasu.server.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDTO {
    private Integer paymentId;
    private Integer courseId;
    private Integer customerId;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String transactionCode;
    private String paymentStatus;
    private String description;
    private String notes;
}
