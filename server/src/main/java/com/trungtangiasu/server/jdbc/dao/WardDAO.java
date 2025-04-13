package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Ward;

public class WardDAO {

    public static ArrayList<Ward> selectAll() throws SQLException {
        ArrayList<Ward> wards = new ArrayList<>();
        String sql = "SELECT * FROM Ward";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                wards.add(Ward.fromResultSet(res));
            }
        }

        return wards;
    }

    public static Ward select(String id) throws SQLException {
        Ward ward = null;
        String sql = "SELECT * FROM Ward WHERE ward_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    ward = Ward.fromResultSet(res);
                }
            }
        }

        return ward;
    }

    public static ArrayList<Ward> selectByDistrictId(String districtId) throws SQLException {
        ArrayList<Ward> wards = new ArrayList<>();
        String sql = "SELECT * FROM Ward WHERE district_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, districtId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    wards.add(Ward.fromResultSet(res));
                }
            }
        }

        return wards;
    }

    public static void insert(Ward ward) throws SQLException {
        String sql = "INSERT INTO Ward(ward_id, name, district_id) VALUES (?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, ward.getId());
            stm.setString(2, ward.getName());
            stm.setString(3, ward.getDistrictId());
            stm.executeUpdate();
        }
    }

    public static boolean update(Ward ward) throws SQLException {
        String sql = "UPDATE Ward SET name = ?, district_id = ? WHERE ward_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, ward.getName());
            stm.setString(2, ward.getDistrictId());
            stm.setString(3, ward.getId());
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(String id) throws SQLException {
        String sql = "DELETE FROM Ward WHERE ward_id = ?";

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
