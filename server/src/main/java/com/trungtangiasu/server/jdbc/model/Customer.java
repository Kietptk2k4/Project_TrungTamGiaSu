package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Customer {
    private int id; // customer_id
    private int userId;
    private int personalInfoId;
    private String address;

    public static Customer fromResultSet(ResultSet res) throws SQLException {
        return Customer.builder()
                .id(res.getInt("customer_id"))
                .userId(res.getInt("user_id"))
                .personalInfoId(res.getInt("personal_info_id"))
                .address(res.getString("address"))
                .build();
    }
}
