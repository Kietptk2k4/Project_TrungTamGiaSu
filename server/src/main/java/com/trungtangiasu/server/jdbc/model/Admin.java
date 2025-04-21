package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Admin {
    private int id; // admin_id
    private int userId;


    public static Admin fromResultSet(ResultSet res) throws SQLException {
        return Admin.builder()
                .id(res.getInt("admin_id"))
                .userId(res.getInt("user_id"))
                .build();
    }
}
