package com.trungtangiasu.server.repositories;

import java.sql.Connection;

import com.trungtangiasu.server.configJDBC.ConDB;

public class AdminRepository {
    public AdminRepository() {
        ConDB conDB = new ConDB();
        Connection connection = conDB.connection;
    }    
    
    public String getAdminName(String username) {
        String sql = "SELECT * FROM admin WHERE username = '" + username + "'";
        String name = null;
        try {
            // conDB.statement = conDB.connection.createStatement();
            // conDB.resultSet = conDB.statement.executeQuery(sql);
            // if (conDB.resultSet.next()) {
            //     name = conDB.resultSet.getString("name");
            // }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return name;
    }

}    

