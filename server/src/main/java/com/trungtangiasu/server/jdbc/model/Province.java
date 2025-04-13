package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Province {
    private String id;
    private String name;

    public static Province fromResultSet(ResultSet res) throws SQLException {
        return Province.builder()
                .id(res.getString("province_id"))
                .name(res.getString("name"))
                .build();
    }
}
