package com.trungtangiasu.server.jdbc.dao;

import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.*;

import java.sql.*;


public class RoleDAO {
    public static ArrayList<Role> selectAll() throws SQLException{
        String sql = "SELECT * FROM Role";
        ArrayList<Role> roles = new ArrayList<>();
        try(
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ){
            while(res.next())
                roles.add(Role.fromResultSet(res));
        }
        
        return roles;
    }  
    
    public static Role select(int id) throws SQLException {
        Role role = null;
        String sql = "SELECT * FROM Role WHERE role_id = ?";
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) 
                    role = Role.fromResultSet(res);
            }
        }
        return role;
    }

    public static void insert(Role role) throws SQLException{
        String sql = "INSERT INTO Role(role_name) VALUES (?)";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ){
            stm.setString(1, role.getName());
            stm.executeUpdate();
            try(ResultSet generatedKey = stm.getGeneratedKeys()){
                if(generatedKey.next())
                    role.setId(generatedKey.getInt(1));
            }
        }
    }

        public static boolean update(Role role) throws SQLException {
            String sql = "UPDATE Role SET role_name = ? WHERE role_id = ?";
            try (
                Connection con = MySql.createConnection();
                PreparedStatement stm = con.prepareStatement(sql)
            ) {
                stm.setString(1, role.getName());
                stm.setInt(2, role.getId());
                int affected = stm.executeUpdate();
                return affected > 0;
            }
        }

        public static boolean delete(int id) throws SQLException {
            String sql = "DELETE FROM Role WHERE role_id = ?";
            try (
                Connection con = MySql.createConnection();
                PreparedStatement stm = con.prepareStatement(sql)
            ) {
                stm.setInt(1, id);
                int affected = stm.executeUpdate();
                return affected > 0;
            }
        }


}
