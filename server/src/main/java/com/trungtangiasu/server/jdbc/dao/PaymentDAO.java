package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Payment;

public class PaymentDAO {

    public static void main(String []args) throws SQLException{
        Payment payment = Payment.builder()
                .type(Payment.Type.PAYMENT)
                .amount(1000000)
                .description("test")
                .build();

        PaymentDAO.insert(payment);
        System.out.println(payment);
        System.err.println(PaymentDAO.selectAll());
        System.out.println(PaymentDAO.select(2));
    }

    public static List<Payment> selectAll() throws SQLException{
        List<Payment> list = new ArrayList<>();
        String sql = "SELECT * FROM Payments";
        try(
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ){
            while (res.next())
                list.add(Payment.fromResultSet(res));
        }
        return list;
    }

    public static Payment select(int paymentID)throws SQLException{
        String sql = "SELECT * FROM Payments WHERE payment_id = ?";

        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ){
            stm.setInt(1, paymentID);
            try(ResultSet res = stm.executeQuery()){
                if (res.next())
                    return Payment.fromResultSet(res);
            }
        }
        return null;
    }

    public static void insert(Payment payment) throws SQLException{
        String sql = "INSERT INTO Payments "
                + "(user_id, tutoring_request_id, type, amount, description, created_at) "
                + "VALUES (?, ?, ?, ?, ?, ?)";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ){
            stm.setObject(1, payment.getUserId());
            stm.setObject(2, payment.getTutoringRequestId());
            stm.setString(3, payment.getType().name());
            stm.setInt(4, payment.getAmount());
            stm.setString(5, payment.getDescription());
            stm.setTimestamp(6, Timestamp.valueOf(payment.getCreatedAt()));
            stm.executeUpdate();

            try(ResultSet generatedKey = stm.getGeneratedKeys()){
                if(generatedKey.next())
                    payment.setId(generatedKey.getInt(1));
            }
        }
    }
}
