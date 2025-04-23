package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Classes {
    private int id;
    private String name;

    public static Classes fromResultSet(ResultSet res) throws SQLException {
        return Classes.builder()
                .id(res.getInt("class_id"))
                .name(res.getString("class_name"))
                .build();
    }
}
