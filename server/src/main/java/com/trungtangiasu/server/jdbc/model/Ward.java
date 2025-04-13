package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Ward {
    private String id;
    private String name;
    private String districtId;

    public static Ward fromResultSet(ResultSet res) throws SQLException {
        return Ward.builder()
                .id(res.getString("ward_id"))
                .name(res.getString("name"))
                .districtId(res.getString("district_id"))
                .build();
    }
}
