package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SubjectClassMapping {
    private int id;
    private int subjectId;
    private int classId;

    public static SubjectClassMapping fromResultSet(ResultSet res) throws SQLException {
        return SubjectClassMapping.builder()
                .id(res.getInt("subject_class_id"))
                .subjectId(res.getInt("subject_id"))
                .classId(res.getInt("class_id"))
                .build();
    }
}
