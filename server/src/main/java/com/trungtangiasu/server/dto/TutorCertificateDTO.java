package com.trungtangiasu.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TutorCertificateDTO {
    private Integer certificateId;
    private Integer tutorId;
    private String certificateName;
    private LocalDateTime issueDate;
    private String issuingAuthority;
}
