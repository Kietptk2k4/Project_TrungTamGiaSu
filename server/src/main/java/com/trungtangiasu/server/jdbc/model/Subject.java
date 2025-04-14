package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Subject {
    private int id;
    private String name;

    public static Subject fromResultSet(ResultSet res) throws SQLException {
        return Subject.builder()
                .id(res.getInt("subject_id"))
                .name(res.getString("subject_name"))
                .build();
    }
}
