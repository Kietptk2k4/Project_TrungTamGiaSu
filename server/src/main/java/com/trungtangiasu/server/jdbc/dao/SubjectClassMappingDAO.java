package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.SubjectClassMapping;

public class SubjectClassMappingDAO {
    public static void main(String []args)throws SQLException{
        List<SubjectClassMapping> l = new ArrayList<>();
        for (int sub  = 1; sub <= 3; sub ++)
            for (int clas = 1; clas <= 12; clas ++){
                
                SubjectClassMapping sc =  SubjectClassMapping.builder().
                                classId(clas).subjectId(sub).
                                build();
                l.add(sc);
                SubjectClassMappingDAO.insert(sc);
                System.err.println(sc);
            }
        
        System.out.println(SubjectClassMappingDAO.selectAll());
        System.out.println(SubjectClassMappingDAO.select(1));
        System.out.println(SubjectClassMappingDAO.selectByClass(10));
        System.out.println(SubjectClassMappingDAO.selectBySubject(2));
        System.out.println(SubjectClassMappingDAO.selectBySubjectAndClass(1, 12));

    }

    public static ArrayList<SubjectClassMapping> selectAll() throws SQLException {
        ArrayList<SubjectClassMapping> list = new ArrayList<>();
        String sql = "SELECT * FROM SubjectClassMappings";

        try (
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)
        ) {
            while (res.next()) {
                list.add(SubjectClassMapping.fromResultSet(res));
            }
        }
        return list;
    }

    public static SubjectClassMapping select(int subjectClasssId) throws SQLException {
        String sql = "SELECT * FROM SubjectClassMappings WHERE subject_class_id = ?";
        SubjectClassMapping mapping = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, subjectClasssId);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    mapping = SubjectClassMapping.fromResultSet(res);
                }
            }
        }
        return mapping;
    }

    public static List<SubjectClassMapping> selectBySubject(int subjectId) throws SQLException {
        String sql = "SELECT * FROM SubjectClassMappings WHERE subject_id = ?";
        List<SubjectClassMapping> list = new ArrayList<>();

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, subjectId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    list.add(SubjectClassMapping.fromResultSet(res));
                }
            }
        }
        return list;
    }
    public static List<SubjectClassMapping> selectByClass(int classId) throws SQLException {
        String sql = "SELECT * FROM SubjectClassMappings WHERE class_id = ?";
        List<SubjectClassMapping> list = new ArrayList<>();

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, classId);
            try (ResultSet res = stm.executeQuery()) {
                while (res.next()) {
                    list.add(SubjectClassMapping.fromResultSet(res));
                }
            }
        }
        return list;
    }

    public static SubjectClassMapping selectBySubjectAndClass(int subjectId, int classId) throws SQLException {
        String sql = "SELECT * FROM SubjectClassMappings WHERE subject_id = ? AND class_id = ?";
        SubjectClassMapping mapping = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, subjectId);
            stm.setInt(2, classId);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    mapping = SubjectClassMapping.fromResultSet(res);
                }
            }
        }
        return mapping;
    }

    public static void insert(SubjectClassMapping mapping) throws SQLException {
        String sql = "INSERT INTO SubjectClassMappings(subject_id, class_id) VALUES (?, ?)";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
        ) {
            stm.setInt(1, mapping.getSubjectId());
            stm.setInt(2, mapping.getClassId());
            stm.executeUpdate();

            try (ResultSet keys = stm.getGeneratedKeys()) {
                if (keys.next()) {
                    mapping.setId(keys.getInt(1));
                }
            }
        }
    }

    public static boolean update(SubjectClassMapping mapping) throws SQLException {
        String sql = "UPDATE SubjectClassMappings SET subject_id = ?, class_id = ? WHERE subject_class_id = ?";

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, mapping.getSubjectId());
            stm.setInt(2, mapping.getClassId());
            stm.setInt(3, mapping.getId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }

    public static boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM SubjectClassMappings WHERE subject_class_id = ?";

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
