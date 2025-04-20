package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PersonalInfo {
    private int userId;
    private String fullName;
    private Gender gender;
    private String phoneNumber;
    private String address;

    public static PersonalInfo fromResultSet(ResultSet res) throws SQLException {
        return PersonalInfo.builder()
                .userId(res.getInt("user_id"))
                .fullName(res.getString("full_name"))
                .gender(Gender.valueOf(res.getString("gender")))
                .phoneNumber(res.getString("phone_number"))
                .address(res.getString("address"))
                .build();
    }

    public static enum Gender {
        MALE,
        FEMALE
    }
}
