package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.TutorSubjectClass;

public class TutorSubjectClassDAO {

    public static ArrayList<TutorSubjectClass> selectAll() throws SQLException {
        ArrayList<TutorSubjectClass> list = new ArrayList<>();
        String sql = "SELECT * FROM Tutor_Subject_Class";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(TutorSubjectClass.fromResultSet(res));
            }
        }
        return list;
    }

    public static TutorSubjectClass select(int tutorId, int subjectClassId) throws SQLException {
        String sql = "SELECT * FROM Tutor_Subject_Class WHERE tutor_id = ? AND subject_class_id = ?";
        TutorSubjectClass result = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutorId);
            stm.setInt(2, subjectClassId);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    result = TutorSubjectClass.fromResultSet(res);
                }
            }
        }

        return result;
    }

    public static ArrayList<TutorSubjectClass> selectByTutorId(int tutorId) throws SQLException {
        ArrayList<TutorSubjectClass> list = new ArrayList<>();
        String sql = "SELECT * FROM Tutor_Subject_Class WHERE tutor_id = ?";
    
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutorId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    list.add(TutorSubjectClass.fromResultSet(res));
                }
            }
        }
    
        return list;
    }

    public static ArrayList<TutorSubjectClass> selectBySubjectClassId(int subjectClassId) throws SQLException {
        ArrayList<TutorSubjectClass> list = new ArrayList<>();
        String sql = "SELECT * FROM Tutor_Subject_Class WHERE subject_class_id = ?";
    
        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, subjectClassId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    list.add(TutorSubjectClass.fromResultSet(res));
                }
            }
        }
    
        return list;
    }
    

    public static void insert(TutorSubjectClass tsc) throws SQLException {
        String sql = "INSERT INTO Tutor_Subject_Class (tutor_id, subject_class_id) VALUES (?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tsc.getTutorId());
            stm.setInt(2, tsc.getSubjectClassId());
            stm.executeUpdate();
        }
    }

    public static boolean delete(int tutorId, int subjectClassId) throws SQLException {
        String sql = "DELETE FROM Tutor_Subject_Class WHERE tutor_id = ? AND subject_class_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, tutorId);
            stm.setInt(2, subjectClassId);
            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }


}
