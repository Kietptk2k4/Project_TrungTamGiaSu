package com.trungtangiasu.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CancellationRequestDTO {
    private Integer cancellationRequestId;
    private Integer courseId;
    private String requesterType; // Tutor or Customer
    private LocalDateTime createdAt;
    private String reason;
}
