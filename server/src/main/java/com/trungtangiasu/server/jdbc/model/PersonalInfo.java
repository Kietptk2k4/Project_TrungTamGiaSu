package com.trungtangiasu.server.jdbc.model;

import lombok.*;
import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PersonalInfo {
    private int id;
    private String name;
    private Gender gender;
    private String phoneNumber;

    public static PersonalInfo fromResultSet(ResultSet res) throws SQLException {
        return PersonalInfo.builder()
                .id(res.getInt("personal_info_id"))
                .name(res.getString("name"))
                .gender(Gender.valueOf(res.getString("gender")))
                .phoneNumber(res.getString("phone_number"))
                .build();
    }

    public static enum Gender {
        MALE,
        FEMALE
    }
}
