package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class District {
    private String id;
    private String name;
    private String provinceId;

    public static District fromResultSet(ResultSet res) throws SQLException {
        return District.builder()
                .id(res.getString("district_id"))
                .name(res.getString("name"))
                .provinceId(res.getString("province_id"))
                .build();
    }
}
