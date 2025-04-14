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
    private String name;
    private int personalInfoId;

    public static Admin fromResultSet(ResultSet res) throws SQLException {
        return Admin.builder()
                .id(res.getInt("admin_id"))
                .userId(res.getInt("user_id"))
                .name(res.getString("name"))
                .personalInfoId(res.getInt("personal_info_id"))
                .build();
    }
}
