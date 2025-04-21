package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Customer;

public class CustomerDAO {
        public static void main(String []args)throws SQLException{
        Customer cus = Customer.builder().userId(1).build();
        CustomerDAO.insert(cus);
        System.out.println(cus);
        System.out.println(CustomerDAO.select(1));
        System.out.println(CustomerDAO.selectAll());
    }
    public static ArrayList<Customer> selectAll() throws SQLException {
        ArrayList<Customer> customers = new ArrayList<>();
        String sql = "SELECT * FROM Customers";

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

    public static Customer select(int customer_id) throws SQLException {
        Customer customer = null;
        String sql = "SELECT * FROM Customers WHERE customer_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, customer_id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    customer = Customer.fromResultSet(res);
                }
            }
        }

        return customer;
    }

    public static void insert(Customer customer) throws SQLException {
        String sql = "INSERT INTO Customers(user_id) VALUES (?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, customer.getUserId());
            stm.executeUpdate();

            try (ResultSet res = stm.getGeneratedKeys()) {
                if (res.next()) {
                    customer.setId(res.getInt(1));
                }
            }
        }
    }

    public static boolean update(Customer customer) throws SQLException {
        String sql = "UPDATE Customers SET user_id = ? WHERE customer_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, customer.getUserId());
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
