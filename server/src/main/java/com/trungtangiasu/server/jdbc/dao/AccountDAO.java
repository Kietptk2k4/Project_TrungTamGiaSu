package com.trungtangiasu.server.jdbc.dao;

import java.util.*;

import com.trungtangiasu.server.jdbc.*;
import com.trungtangiasu.server.jdbc.model.*;

import java.sql.*;

public class AccountDAO {
    public static void main(String []args) throws SQLException{
        Account acc= Account.builder().email("tuleaibk@gmail.com")
            .hashedPassword("akjdh")
            .roleId(1)
            .build();
        
        
        AccountDAO.insert(acc);
        System.out.println(acc);
        System.out.println(AccountDAO.selectAll());
        System.out.println(AccountDAO.select(1));
        
    }
    public static ArrayList<Account> selectAll()throws SQLException{
        ArrayList<Account> accounts = new ArrayList<>();
        String sql = "SELECT * FROM Accounts";
        try(
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ){
            while(res.next())
                accounts.add(Account.fromResultSet(res));
        }
        return accounts;
    }

    public static Account select(int user_id) throws SQLException{
        Account account = null;

        String sql = "SELECT * FROM Accounts WHERE user_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
        )
        {
            stm.setInt(1, user_id);
            try(ResultSet res = stm.executeQuery()){
                if(res.next())
                    account = Account.fromResultSet(res);
            }
                
        }
        return account;
    }

    public static void insert(Account account) throws SQLException{
        String sql = "INSERT INTO Accounts"
            + " (email, hashed_password, otp, otp_expired_time, unread_notifications, role_id, created_at, is_active) "
            + "VALUES (?, ?, ?, ?, ?, ? , ?, ?)";
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            )
        {

            stm.setString(1, account.getEmail());
            stm.setString(2, account.getHashedPassword());
            stm.setString(3, account.getOtp());
            stm.setTimestamp(4, account.getOtpExpiredDate() != null ? Timestamp.valueOf(account.getOtpExpiredDate()) : null);
            
            stm.setInt(5, account.getUnreadNotification());
            stm.setInt(6, account.getRoleId());
            stm.setTimestamp(7, account.getCreatedAt() != null ? Timestamp.valueOf(account.getCreatedAt()) : null);
            stm.setBoolean(8, account.isActive());

            stm.executeUpdate();

            try (ResultSet generatedKeys = stm.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    account.setUserId(generatedKeys.getInt(1));
                }
            }
            

        }
    }

    public static boolean update(Account account) throws SQLException {
        String sql = "UPDATE Accounts SET "
                + "email = ?, "
                + "hashed_password = ?, "
                + "otp = ?, "
                + "otp_expired_time = ?, "
                + "unread_notifications = ?, "
                + "role_id = ?, "
                + "created_at = ?, "
                + "is_active = ? "
                + "WHERE user_id = ?";
        
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
        ) {
            stm.setString(1, account.getEmail());
            stm.setString(2, account.getHashedPassword());
            stm.setString(3, account.getOtp());
            stm.setTimestamp(4, account.getOtpExpiredDate() != null ? Timestamp.valueOf(account.getOtpExpiredDate()) : null);
            stm.setInt(5, account.getUnreadNotification());
            stm.setInt(6, account.getRoleId());
            stm.setTimestamp(7, account.getCreatedAt() != null ? Timestamp.valueOf(account.getCreatedAt()) : null);
            stm.setBoolean(8, account.isActive());
            stm.setInt(9, account.getUserId());
    
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int user_id) throws SQLException {
        String sql = "DELETE FROM Accounts WHERE user_id = ?";
        
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
        ) {
            stm.setInt(1, user_id);
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }
    
}
 