package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Class {
    private int id;
    private String name;

    public static Class fromResultSet(ResultSet res) throws SQLException {
        return Class.builder()
                .id(res.getInt("class_id"))
                .name(res.getString("class_name"))
                .build();
    }
}
