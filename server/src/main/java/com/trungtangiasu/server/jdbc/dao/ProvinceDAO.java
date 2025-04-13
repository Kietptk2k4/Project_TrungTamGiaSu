package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Province;

public class ProvinceDAO {

    public static ArrayList<Province> selectAll() throws SQLException {
        ArrayList<Province> provinces = new ArrayList<>();
        String sql = "SELECT * FROM Province";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                provinces.add(Province.fromResultSet(res));
            }
        }

        return provinces;
    }

    public static Province select(String id) throws SQLException {
        Province province = null;
        String sql = "SELECT * FROM Province WHERE province_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    province = Province.fromResultSet(res);
                }
            }
        }

        return province;
    }

    public static void insert(Province province) throws SQLException {
        String sql = "INSERT INTO Province(province_id, name) VALUES (?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, province.getId());
            stm.setString(2, province.getName());
            stm.executeUpdate();
        }
    }

    public static boolean update(Province province) throws SQLException {
        String sql = "UPDATE Province SET name = ? WHERE province_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, province.getName());
            stm.setString(2, province.getId());
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(String id) throws SQLException {
        String sql = "DELETE FROM Province WHERE province_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, id);
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }
}
