package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.District;

public class DistrictDAO {

    public static ArrayList<District> selectAll() throws SQLException {
        ArrayList<District> districts = new ArrayList<>();
        String sql = "SELECT * FROM District";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                districts.add(District.fromResultSet(res));
            }
        }

        return districts;
    }

    public static District select(String id) throws SQLException {
        District district = null;
        String sql = "SELECT * FROM District WHERE district_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    district = District.fromResultSet(res);
                }
            }
        }

        return district;
    }

    public static ArrayList<District> selectByProvinceId(String provinceId) throws SQLException {
        ArrayList<District> districts = new ArrayList<>();
        String sql = "SELECT * FROM District WHERE province_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, provinceId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    districts.add(District.fromResultSet(res));
                }
            }
        }

        return districts;
    }

    public static void insert(District district) throws SQLException {
        String sql = "INSERT INTO District(district_id, name, province_id) VALUES (?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, district.getId());
            stm.setString(2, district.getName());
            stm.setString(3, district.getProvinceId());
            stm.executeUpdate();
        }
    }

    public static boolean update(District district) throws SQLException {
        String sql = "UPDATE District SET name = ?, province_id = ? WHERE district_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, district.getName());
            stm.setString(2, district.getProvinceId());
            stm.setString(3, district.getId());
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(String id) throws SQLException {
        String sql = "DELETE FROM District WHERE district_id = ?";

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
