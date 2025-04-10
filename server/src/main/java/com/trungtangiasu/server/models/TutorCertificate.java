package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Tutor_Certificate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorCertificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certificate_id")
    private Integer certificateId;

    @ManyToOne
    @JoinColumn(name = "tutor_id", referencedColumnName = "tutor_id")
    private Tutor tutor;

    @Column(name = "certificate_name", length = 255)
    private String certificateName;

    @Column(name = "issue_date")
    private LocalDateTime issueDate;

    @Column(name = "issuing_authority", length = 255)
    private String issuingAuthority;
}
