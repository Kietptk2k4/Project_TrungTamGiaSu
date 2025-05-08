package com.trungtangiasu.server.JDBCRepositories;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.jdbc.model.Classes;

@Repository
public class ClassRepository {
    public ConDB conDB;
    public ClassRepository() {
        conDB = new ConDB();
    }
    public List<Classes> getAllClasses() {
        String sql = "SELECT * FROM grades order by grade_id";
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            List<Classes> classes = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Classes subject = Classes.fromResultSet(resultSet);
                classes.add(subject);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            conDB.closeConnection();
        }
        return null;
    }
 
}
