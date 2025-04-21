package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.TutorCertificate;

public class TutorCertificateDAO {
    public static void main (String []args) throws SQLException{
        TutorCertificate cert = TutorCertificate.builder()
                        .tutorId(1)
                        .certificateName("Su pham Toan")
                        .issueDate(LocalDateTime.now())
                        .issuingAuthority("Dai hoc su pham")
                        .note("test data")
                        .build();

        TutorCertificateDAO.insert(cert);

        System.out.println(cert);
        System.out.println(TutorCertificateDAO.select(1));
        System.out.println(TutorCertificateDAO.selectAll());
        System.out.println(TutorCertificateDAO.selectByTutorId(1));

    }

    public static ArrayList<TutorCertificate> selectAll() throws SQLException {
        ArrayList<TutorCertificate> list = new ArrayList<>();
        String sql = "SELECT * FROM TutorCertificates";

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

    public static TutorCertificate select(int certificateId) throws SQLException {
        TutorCertificate cert = null;
        String sql = "SELECT * FROM TutorCertificates WHERE certificate_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, certificateId);
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
        String sql = "SELECT * FROM TutorCertificates WHERE tutor_id = ?";

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
        String sql = "INSERT INTO TutorCertificates(tutor_id, certificate_name, issue_date, issuing_authority, note) VALUES (?, ?, ?, ?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, cert.getTutorId());
            stm.setString(2, cert.getCertificateName());
            stm.setTimestamp(3, cert.getIssueDate() != null ? Timestamp.valueOf(cert.getIssueDate()) : null);
            stm.setString(4, cert.getIssuingAuthority());
            stm.setString(5, cert.getNote());

            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    cert.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(TutorCertificate cert) throws SQLException {
        String sql = "UPDATE TutorCertificates SET tutor_id = ?, certificate_name = ?, issue_date = ?, issuing_authority = ?, note = ? WHERE certificate_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, cert.getTutorId());
            stm.setString(2, cert.getCertificateName());
            stm.setTimestamp(3, cert.getIssueDate() != null ? Timestamp.valueOf(cert.getIssueDate()) : null);
            stm.setString(4, cert.getIssuingAuthority());
            stm.setString(5, cert.getNote());
            stm.setInt(6, cert.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM TutorCertificates WHERE certificate_id = ?";

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
