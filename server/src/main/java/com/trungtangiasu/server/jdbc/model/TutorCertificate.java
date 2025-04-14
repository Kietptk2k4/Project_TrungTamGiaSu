package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TutorCertificate {
    private int id;
    private int tutorId;
    private String certificateName;
    private LocalDateTime issueDate;
    private String issuingAuthority;

    public static TutorCertificate fromResultSet(ResultSet res) throws SQLException {
        return TutorCertificate.builder()
                .id(res.getInt("certificate_id"))
                .tutorId(res.getInt("tutor_id"))
                .certificateName(res.getString("certificate_name"))
                .issueDate(res.getTimestamp("issue_date") != null ? res.getTimestamp("issue_date").toLocalDateTime() : null)
                .issuingAuthority(res.getString("issuing_authority"))
                .build();
    }
}

