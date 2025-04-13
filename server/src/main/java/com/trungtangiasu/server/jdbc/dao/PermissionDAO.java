package com.trungtangiasu.server.jdbc.dao;

import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.*;
import com.trungtangiasu.server.jdbc.model.*;

import java.sql.*;


public class PermissionDAO {
    public static ArrayList<Permission> selectAll() throws SQLException{
        ArrayList<Permission> permissions = new ArrayList<>();
        String sql = "SELECT * FROM Permission";

        try(
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ){
            while(res.next())
                permissions.add(Permission.fromResultSet(res));
        }

        return permissions;
    }    

    public static Permission select(int id)throws SQLException{
        Permission permission = null;
        String sql = "SELECT * FROM Permission WHERE permission_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
            
        ){
            stm.setInt(1, id);
            try(ResultSet res = stm.executeQuery()){
                if (res.next())
                    permission = Permission.fromResultSet(res);
            }
        }

        return permission;
    }

    public static void insert(Permission permission) throws SQLException{
        String sql = "INSERT INTO Permission(permission_name, description) VALUES (?,?)";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ){
            stm.setString(1, permission.getName());
            stm.setString(2, permission.getDescription());
            stm.executeUpdate();
            try(ResultSet res = stm.getGeneratedKeys()){
                if(res.next())
                    permission.setId(res.getInt(1));
            }
        }
    }

    public static boolean update(Permission permission) throws SQLException{
        String sql = "UPDATE Permission SET permission_name = ?, description = ? WHERE permission_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
        ){
            stm.setString(1, permission.getName());
            stm.setString(2, permission.getDescription());
            stm.setInt(3, permission.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException{
        String sql = "DELETE FROM Permission WHERE permission_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql);
        ){
            stm.setInt(1, id);

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

}
