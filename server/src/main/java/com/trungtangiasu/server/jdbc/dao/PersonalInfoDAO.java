package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.PersonalInfo;

public class PersonalInfoDAO {
    public static void main(String []args) throws SQLException{
        PersonalInfo per = PersonalInfo.builder()
                                .userId(1)
                                .fullName("Le Ngoc Tu")
                                .gender(PersonalInfo.Gender.MALE)
                                .phoneNumber("02347627834")
                                .address("Dia chi nha ne")
                                .build();
        PersonalInfoDAO.insert(per);
        System.out.println(per);
        System.out.println(PersonalInfoDAO.selectAll());
        System.out.println(PersonalInfoDAO.select(1));
    }
    public static ArrayList<PersonalInfo> selectAll() throws SQLException {
        ArrayList<PersonalInfo> list = new ArrayList<>();
        String sql = "SELECT * FROM PersonalInfos";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(PersonalInfo.fromResultSet(res));
            }
        }

        return list;
    }

    public static PersonalInfo select(int user_id) throws SQLException {
        PersonalInfo info = null;
        String sql = "SELECT * FROM PersonalInfos WHERE user_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, user_id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    info = PersonalInfo.fromResultSet(res);
                }
            }
        }

        return info;
    }

    public static void insert(PersonalInfo info) throws SQLException {
        String sql = "INSERT INTO PersonalInfos(user_id, full_name, gender, phone_number, address) VALUES (?, ?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, info.getUserId());
            stm.setString(2, info.getFullName());
            stm.setString(3, info.getGender().name());
            stm.setString(4, info.getPhoneNumber());
            stm.setString(5, info.getAddress());
            stm.executeUpdate();

        }
    }

    public static boolean update(PersonalInfo info) throws SQLException {
        String sql = "UPDATE PersonalInfos SET full_name = ?, gender = ?, phone_number = ? , address = ? WHERE user_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, info.getFullName());
            stm.setString(2, info.getGender().name());
            stm.setString(3, info.getPhoneNumber());
            stm.setString(4, info.getAddress());
            stm.setInt(5, info.getUserId());
            

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int user_id) throws SQLException {
        String sql = "DELETE FROM PersonalInfos WHERE user_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, user_id);
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }
}
