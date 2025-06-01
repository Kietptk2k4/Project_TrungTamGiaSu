package com.trungtangiasu.server.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import com.trungtangiasu.server.utils.*;
import static com.trungtangiasu.server.utils.DebugPrinter.*;

public abstract class MySql {
    private static String userName;
    private static String password;
    private static String url;

    // Load username, password, database url from file "resource/application.properties"
    static{
        try{
            var prop = PropertyLoader.loadProperties();
            String uname = prop.getProperty("spring.datasource.username"),
                pass = prop.getProperty("spring.datasource.password"),
                url = prop.getProperty("spring.datasource.url");
            
            printSeparator();
            printTitle("Config Mysql(load from application.properties) & test create connection");
            print(
                String.format("username: '%s'", uname),
                String.format("password: '%s'", pass),
                String.format("url: '%s'", url)
            );
            
            // Config default username, password, url
            MySql.config(uname, pass, url);

            // Test: create connection
            try(var con = MySql.createConnection()){
                print("Config ok!");
            }
        }
        catch (Exception e){
            printError("Can not connect to Mysql");
            printError("Exception message: " + e.getMessage());
        }
        printSeparator();
    }


    public static void config(String userName, String password, String url){
        MySql.userName = userName;
        MySql.password = password;
        MySql.url = url;
    }

    public static Connection createConnection() throws SQLException {
        return DriverManager.getConnection(
                url,
                userName,
                password);
    }
}