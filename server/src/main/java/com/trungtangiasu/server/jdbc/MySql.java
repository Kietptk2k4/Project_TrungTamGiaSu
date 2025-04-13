package com.trungtangiasu.server.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public abstract class MySql {
    static{
        MySql.config("root", "n22dccn193", "TutorLink");
    }
    private static String userName;
    private static String password;
    private static String databaseName;
    private static final String url = "jdbc:mysql://localhost:3306/";

    public static void config(String userName, String password, String databaseName){
        MySql.userName = userName;
        MySql.password = password;
        MySql.databaseName = databaseName;
    }

    public static Connection createConnection() throws SQLException {
        return DriverManager.getConnection(
                url+databaseName,
                userName,
                password);
    }
}