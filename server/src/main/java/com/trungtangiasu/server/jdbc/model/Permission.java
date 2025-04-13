package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Permission {
    public static Permission fromResultSet(ResultSet res)throws SQLException{
        return Permission.builder()
                .id(res.getInt("permission_id"))
                .name(res.getString("permission_name"))
                .description(res.getString("description"))
                .build();
    }

    /**
     * key auto_increment
     */
    private int id;

    private String name;
    private String description;

}
