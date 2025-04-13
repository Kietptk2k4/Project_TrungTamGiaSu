package com.trungtangiasu.server.jdbc.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.ResultSet;
import java.sql.SQLException;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Role {

    /**
     * primary key auto_increment
     */
    private int id;

    //unique
    private String name;

    public static Role fromResultSet(ResultSet res) throws SQLException{
        return Role.builder()
                .id(res.getInt("role_id"))
                .name(res.getString("role_name"))
                .build();
    }

    public static void main(String []args){
        System.err.println("helo");
        Role r = new Role();
        System.out.println(r);
    }
}
