package com.trungtangiasu.server.configJDBC;

import java.sql.*;



public class ConDB {
    
    public Connection connection;
    public Statement statement;

    public ConDB(){
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/tutorlink", "root", "");
            System.out.println("ket noi voi db cua dat thanh cong");
            statement = connection.createStatement();
        }  
        catch (Exception e1) {

            System.out.println("Không thể kết nối toi Mysql cua dat, thử kết nối toi mysql cua Tu");
            try {
                connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/tutorlink", "root", "");
                statement = connection.createStatement();
            } catch (Exception e2) {
                System.out.println("Không thể kết nối với database.");
               
            }
        }
    }
}