package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.Payment;

public class PaymentDAO {

    public static List<Payment> selectAll() throws SQLException {
        List<Payment> list = new ArrayList<>();
        String sql = "SELECT * FROM Payment";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet res = stmt.executeQuery()) {
            while (res.next()) {
                list.add(Payment.fromResultSet(res));
            }
        }

        return list;
    }

    public static Payment select(int id) throws SQLException {
        String sql = "SELECT * FROM Payment WHERE payment_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet res = stmt.executeQuery()) {
                if (res.next()) {
                    return Payment.fromResultSet(res);
                }
            }
        }

        return null;
    }

    public static void insert(Payment dto) throws SQLException {
        String sql = "INSERT INTO Payment (course_id, customer_id, amount, payment_date, payment_method, transaction_code, payment_status, processed_by_user_id, description, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, dto.getCourseId());
            stmt.setInt(2, dto.getCustomerId());
            stmt.setDouble(3, dto.getAmount());

            stmt.setTimestamp(4, Timestamp.valueOf(dto.getPaymentDate()));
            stmt.setString(5, dto.getPaymentMethod());
            stmt.setString(6, dto.getTransactionCode());
            stmt.setString(7, dto.getPaymentStatus());

            if (dto.getProcessedByUserId() != null)
                stmt.setInt(8, dto.getProcessedByUserId());
            else
                stmt.setNull(8, Types.INTEGER);

            stmt.setString(9, dto.getDescription());
            stmt.setString(10, dto.getNotes());

            stmt.executeUpdate();
            try(ResultSet res = stmt.getGeneratedKeys()){
                if(res.next())
                    dto.setId(res.getInt(1));
            }
        }
    }

    public static void update(Payment dto) throws SQLException {
        String sql = "UPDATE Payment SET course_id = ?, customer_id = ?, amount = ?, payment_date = ?, payment_method = ?, transaction_code = ?, payment_status = ?, processed_by_user_id = ?, description = ?, notes = ? WHERE payment_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, dto.getCourseId());
            stmt.setInt(2, dto.getCustomerId());
            stmt.setDouble(3, dto.getAmount());

            stmt.setTimestamp(4, Timestamp.valueOf(dto.getPaymentDate()));
            stmt.setString(5, dto.getPaymentMethod());
            stmt.setString(6, dto.getTransactionCode());
            stmt.setString(7, dto.getPaymentStatus());

            if (dto.getProcessedByUserId() != null)
                stmt.setInt(8, dto.getProcessedByUserId());
            else
                stmt.setNull(8, Types.INTEGER);

            stmt.setString(9, dto.getDescription());
            stmt.setString(10, dto.getNotes());

            stmt.setInt(11, dto.getId());

            stmt.executeUpdate();
        }
    }

    public static void delete(int id) throws SQLException {
        String sql = "DELETE FROM Payment WHERE payment_id = ?";

        try (Connection conn = MySql.createConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
