package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.TutorCertificate;

public class TutorCertificateDAO {

    public static ArrayList<TutorCertificate> selectAll() throws SQLException {
        ArrayList<TutorCertificate> list = new ArrayList<>();
        String sql = "SELECT * FROM Tutor_Certificate";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(TutorCertificate.fromResultSet(res));
            }
        }
        return list;
    }

    public static TutorCertificate select(int id) throws SQLException {
        TutorCertificate cert = null;
        String sql = "SELECT * FROM Tutor_Certificate WHERE certificate_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    cert = TutorCertificate.fromResultSet(res);
                }
            }
        }

        return cert;
    }

    public static TutorCertificate selectByTutorId(int tutorId) throws SQLException{
        TutorCertificate cert = null;
        String sql = "SELECT * FROM Tutor_Certificate WHERE tutor_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutorId);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    cert = TutorCertificate.fromResultSet(res);
                }
            }
        }

        return cert;
    }

    public static void insert(TutorCertificate cert) throws SQLException {
        String sql = "INSERT INTO Tutor_Certificate(tutor_id, certificate_name, issue_date, issuing_authority) VALUES (?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, cert.getTutorId());
            stm.setString(2, cert.getCertificateName());
            stm.setTimestamp(3, cert.getIssueDate() != null ? Timestamp.valueOf(cert.getIssueDate()) : null);
            stm.setString(4, cert.getIssuingAuthority());

            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    cert.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(TutorCertificate cert) throws SQLException {
        String sql = "UPDATE Tutor_Certificate SET tutor_id = ?, certificate_name = ?, issue_date = ?, issuing_authority = ? WHERE certificate_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, cert.getTutorId());
            stm.setString(2, cert.getCertificateName());
            stm.setTimestamp(3, cert.getIssueDate() != null ? Timestamp.valueOf(cert.getIssueDate()) : null);
            stm.setString(4, cert.getIssuingAuthority());
            stm.setInt(5, cert.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM Tutor_Certificate WHERE certificate_id = ?";

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
