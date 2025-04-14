package com.trungtangiasu.server.jdbc.dao;

import java.sql.*;
import java.util.ArrayList;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.SubjectClassMapping;

public class SubjectClassMappingDAO {

    public static ArrayList<SubjectClassMapping> selectAll() throws SQLException {
        ArrayList<SubjectClassMapping> list = new ArrayList<>();
        String sql = "SELECT * FROM Subject_Class_Mapping";

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

    public static SubjectClassMapping select(int id) throws SQLException {
        String sql = "SELECT * FROM Subject_Class_Mapping WHERE subject_class_id = ?";
        SubjectClassMapping mapping = null;

        try (
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ) {
            stm.setInt(1, id);
            try (ResultSet res = stm.executeQuery()) {
                if (res.next()) {
                    mapping = SubjectClassMapping.fromResultSet(res);
                }
            }
        }

        return mapping;
    }

    public static void insert(SubjectClassMapping mapping) throws SQLException {
        String sql = "INSERT INTO Subject_Class_Mapping(subject_id, class_id) VALUES (?, ?)";

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
        String sql = "UPDATE Subject_Class_Mapping SET subject_id = ?, class_id = ? WHERE subject_class_id = ?";

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
        String sql = "DELETE FROM Subject_Class_Mapping WHERE subject_class_id = ?";

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
