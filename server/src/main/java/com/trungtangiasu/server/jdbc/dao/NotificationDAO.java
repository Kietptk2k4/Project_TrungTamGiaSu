package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.*;

public class NotificationDAO {
    public static void main(String []args) throws SQLException{
        Notification noti = Notification.builder().content("ban co thong bao")
        .userId(1).build();

        NotificationDAO.insert(noti);
        System.err.println(noti);
        System.out.println(NotificationDAO.select(1));
        System.out.println(NotificationDAO.selectAll());
    }

    public static ArrayList<Notification> selectAll() throws SQLException {
        ArrayList<Notification> list = new ArrayList<>();
        String sql = "SELECT * FROM Notifications";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(Notification.fromResultSet(res));
            }
        }

        return list;
    }

    public static Notification select(int id) throws SQLException {
        Notification notification = null;
        String sql = "SELECT * FROM Notifications WHERE notification_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    notification = Notification.fromResultSet(res);
                }
            }
        }

        return notification;
    }

    public static void insert(Notification notification) throws SQLException {
        String sql = "INSERT INTO Notifications (content, user_id, created_at, is_read) VALUES (?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setString(1, notification.getContent());
            stm.setInt(2, notification.getUserId());
            stm.setTimestamp(3, notification.getCreatedAt() != null ? Timestamp.valueOf(notification.getCreatedAt()) : null);
            stm.setBoolean(4, notification.isRead());

            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    notification.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(Notification notification) throws SQLException {
        String sql = "UPDATE Notifications SET content = ?, user_id = ?, created_at = ?, is_read = ? WHERE notification_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setString(1, notification.getContent());
            stm.setInt(2, notification.getUserId());
            stm.setTimestamp(3, notification.getCreatedAt() != null ? Timestamp.valueOf(notification.getCreatedAt()) : null);
            stm.setBoolean(4, notification.isRead());
            stm.setInt(5, notification.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Notifications WHERE notification_id = ?";

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
