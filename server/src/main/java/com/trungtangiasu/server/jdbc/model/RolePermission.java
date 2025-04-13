package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RolePermission {
    public static RolePermission fromResultSet(ResultSet res) throws SQLException {
        return RolePermission.builder()
                .roleId(res.getInt("role_id"))
                .permissionId(res.getInt("permission_id"))
                .build();
    }

    private int roleId;
    private int permissionId;
}
