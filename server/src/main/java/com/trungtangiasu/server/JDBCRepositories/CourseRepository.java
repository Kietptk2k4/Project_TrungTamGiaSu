package com.trungtangiasu.server.JDBCRepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.exception.AppException;
import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.RegisterCourse;

@Repository
public class CourseRepository {
    ConDB conDB;
    public CourseRepository() {
        this.conDB = new ConDB();
    }

    public List<RegisterCourse> getAllRegisterCourses() {
        List<RegisterCourse> registerCourses = new ArrayList<>();
        String sql = """
            SELECT request_id, sessions_per_week, proposed_fee_per_session, created_at, grade_name, subject_name,
                ward.name as ward_name, district.name as district_name, province.name as province_name
            FROM tutoringrequests TR
            JOIN grades G
            ON G.grade_id = TR.grade_id
            JOIN subjects S
            ON S.subject_id = TR.subject_id
            JOIN ward 
            ON ward.ward_id = TR.ward_id
            JOIN district 
            ON ward.district_id = district.district_id
            JOIN province
            ON province.province_id = district.province_id
            WHERE TR.tutor_id is null and status ="APPROVED"

            """;
        try {
            conDB = new ConDB();
            Connection connection = conDB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet rs =  preparedStatement.executeQuery();
            while (rs.next()) {
                RegisterCourse registerCourse = new RegisterCourse();
                registerCourse.setRequestId(rs.getInt("request_id"));
                registerCourse.setSessionsPerWeek(rs.getInt("sessions_per_week"));
                registerCourse.setFeePerSession(rs.getInt("proposed_fee_per_session"));
                registerCourse.setCreatedAt(rs.getDate("created_at").toLocalDate());
                registerCourse.setSubjectName(rs.getString("subject_name"));
                registerCourse.setClassName(rs.getString("grade_name"));
                registerCourse.setAddress(rs.getString("ward_name")+ ", "+ rs.getString("district_name")+ ", " +rs.getString("province_name"));
               
                registerCourses.add(registerCourse);
            }
            if (registerCourses.isEmpty()) {
                throw new  AppException(ErrorCode.EMPTY_POST_EXCEPTION);
            }
            return registerCourses;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;
    }
}
