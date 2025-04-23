package com.trungtangiasu.server.JDBCRepositories;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.jdbc.model.Subject;

@Repository
public class SubjectRepository {
    public ConDB conDB;

    public SubjectRepository() {
        conDB = new ConDB();
    }
    public List<Subject> getAllSubjects() {
        String sql = "SELECT * FROM subjects";
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            List<Subject> subjects = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Subject subject = Subject.fromResultSet(resultSet);
                subjects.add(subject);
            }
            return subjects;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            conDB.closeConnection();
        }
        return null;
    }
}
