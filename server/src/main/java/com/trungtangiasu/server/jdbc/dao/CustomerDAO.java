package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Customer;

public class CustomerDAO {

    public static ArrayList<Customer> selectAll() throws SQLException {
        ArrayList<Customer> customers = new ArrayList<>();
        String sql = "SELECT * FROM Customer";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                customers.add(Customer.fromResultSet(res));
            }
        }

        return customers;
    }

    public static Customer select(int id) throws SQLException {
        Customer customer = null;
        String sql = "SELECT * FROM Customer WHERE customer_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    customer = Customer.fromResultSet(res);
                }
            }
        }

        return customer;
    }

    public static void insert(Customer customer) throws SQLException {
        String sql = "INSERT INTO Customer(user_id, personal_info_id, address) VALUES (?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, customer.getUserId());
            stm.setInt(2, customer.getPersonalInfoId());
            stm.setString(3, customer.getAddress());
            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    customer.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(Customer customer) throws SQLException {
        String sql = "UPDATE Customer SET user_id = ?, personal_info_id = ?, address = ? WHERE customer_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, customer.getUserId());
            stm.setInt(2, customer.getPersonalInfoId());
            stm.setString(3, customer.getAddress());
            stm.setInt(4, customer.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Customer WHERE customer_id = ?";

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
