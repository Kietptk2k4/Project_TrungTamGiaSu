package com.trungtangiasu.server.jdbc.model;

import lombok.*;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TutorSubjectClass {
    private int tutorId;
    private int subjectClassId;

    public static TutorSubjectClass fromResultSet(ResultSet res) throws SQLException {
        return TutorSubjectClass.builder()
                .tutorId(res.getInt("tutor_id"))
                .subjectClassId(res.getInt("subject_class_id"))
                .build();
    }
}
