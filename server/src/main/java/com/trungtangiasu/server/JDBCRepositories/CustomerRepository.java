package com.trungtangiasu.server.JDBCRepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Types;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.jdbc.dto.CourseDTO;
import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.CourseSchedule;
import com.trungtangiasu.server.jdbc.model.RequestSchedules;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

@Repository
public class CustomerRepository {
    private final ConDB connection = new ConDB();


    
    public ReponseCreateTutoringRequest createTutoringRequest(TutoringRequest request) {
        try {
            connection.getConnection(); // Mở kết nối 1 lần duy nhất ở đây

            // Integer subjectClassId = getSubjectClassId(request.getSubjectId(), request.getClassId());
            // if (subjectClassId == null) {
            //     throw new IllegalArgumentException("Không tồn tại mapping subject_class");
            // }

            String sql = """
                INSERT INTO TutoringRequests
                  (customer_id, tutor_id, subject_id, grade_id, sessions_per_week, ward_id, address_detail, proposed_fee_per_session)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """;

            PreparedStatement ps = connection.getConnection().prepareStatement(sql);
            ps.setInt(1, request.getCustomerId());
            if (request.getTutorId() != null) {
                ps.setInt(2, request.getTutorId());
            } else {
                ps.setNull(2, Types.INTEGER);
            }
            ps.setInt(3, request.getSubjectId());   
            ps.setInt(4, request.getClassId());
            ps.setInt(5, request.getSessionsPerWeek());
            ps.setString(6, request.getWardId());
            ps.setString(7, request.getAddressDetail());
            ps.setInt(8, request.getFeePerSession());
            
            int rowChange = ps.executeUpdate();
            ps.close();

            if (rowChange == 0) {
                throw new SQLException("Thất bại khi thêm vào bảng TutoringRequests");
            }

            // Lấy request_id vừa chèn
            int requestId = 0;
            String sqlGetId = """
                SELECT request_id 
                FROM tutorlink.tutoringrequests
                order by  created_at desc
                limit 1 ;
                """;
            PreparedStatement psGetId = connection.getConnection().prepareStatement(sqlGetId);
            ResultSet rs = psGetId.executeQuery();
            if (rs.next()) {
                requestId = rs.getInt("request_id");
            }
            rs.close();
            psGetId.close();

            // Chèn vào bảng RequestSchedules
            int scheduleRows = saveSchedules(requestId, request.getSchedules());
            if (scheduleRows == 0) {
                throw new SQLException("Thêm lịch học thất bại cho request_id: " + requestId);
            }

            return new ReponseCreateTutoringRequest("Tutoring request created successfully", "success");

        } catch (SQLException e) {
            e.printStackTrace();
            return new ReponseCreateTutoringRequest("Tutoring request created fail", "fail");
        } finally {
            connection.closeConnection(); // Đóng kết nối sau cùng
        }
    }


    private int saveSchedules(int requestId, List<RequestSchedules> schedules) throws SQLException {
        String sql = """
            INSERT INTO RequestSchedules (request_id, day_of_week, start_time, end_time)
            VALUES (?, ?, ?, ?)
        """;
        int insertedCount = 0;
        for (RequestSchedules schedule : schedules) {
            PreparedStatement ps = connection.getConnection().prepareStatement(sql);
            ps.setInt(1, requestId);
            ps.setInt(2, schedule.getDayOfWeek());
            ps.setTime(3, Time.valueOf(schedule.getStartTime()));
            ps.setTime(4, Time.valueOf(schedule.getEndTime()));
            insertedCount += ps.executeUpdate();
            ps.close();
        }
        return insertedCount;
    }

    //Lay ra tat ca cac khoa hoc cua nguoi dung 
    public List<CourseDTO> getCoursesByCustomerId(String customerId) throws SQLException {
        Connection conn = null;
        List<CourseDTO> courses = new ArrayList<>();
        String courseSql = """
            SELECT C.course_id, S.subject_name, G.grade_name, PI.full_name,
            C.start_date, C.end_date, C.status, C.sessions_per_week,
            TR.proposed_fee_per_session
            FROM courses C
            JOIN tutoringrequests TR ON C.request_id = TR.request_id
            JOIN subjects S ON TR.subject_id = S.subject_id
            JOIN grades G ON TR.grade_id = G.grade_id
            JOIN tutors T ON TR.tutor_id = T.tutor_id
            JOIN personalinfos PI ON T.user_id = PI.user_id
            WHERE TR.customer_id = ?
            """;
        try {
            conn = connection.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement(courseSql);
            preparedStatement.setString(1, customerId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                CourseDTO course = new CourseDTO();
                course.setId(rs.getInt("course_id"));
                course.setSubject(rs.getString("subject_name"));
                course.setClassName(rs.getString("grade_name"));
                course.setTutorName(rs.getString("full_name"));
                course.setStartDate(rs.getDate("start_date").toLocalDate());
                course.setEndDate(rs.getDate("end_date") != null ? rs.getDate("end_date").toLocalDate() : null);
                course.setStatus(rs.getString("status"));
                course.setSessionsPerWeek(rs.getInt("sessions_per_week"));
                course.setFeePerSession(rs.getInt("proposed_fee_per_session"));
                
                course.setSchedule(new ArrayList<>()); 
                courses.add(course);  
            }          
            for (CourseDTO course : courses) {
                String scheduleSql = "SELECT course_id, schedule_id, day_of_week, start_time, end_time FROM courseschedules WHERE course_id = ?";
                conn = connection.getConnection();
                
                PreparedStatement scheduleStmt = conn.prepareStatement(scheduleSql);
                scheduleStmt.setInt(1, course.getId());
                ResultSet scheduleRs = scheduleStmt.executeQuery();
                List<CourseSchedule> schedules = new ArrayList<>();

                while (scheduleRs.next()) {
                    CourseSchedule s = new CourseSchedule();
                    s.setDayOfWeek(scheduleRs.getInt("day_of_week"));
                    s.setId(scheduleRs.getInt("schedule_id"));

                    s.setCourseId(scheduleRs.getInt("course_id"));
                    s.setStartTime(LocalTime.parse(scheduleRs.getString("start_time")));
                    s.setEndTime(LocalTime.parse(scheduleRs.getString("end_time")));
                    schedules.add(s);
                };
                course.setSchedule(schedules);
            }
            return courses;

        } catch (Exception e) {
            throw new SQLException("Loi khi lay danh sach khoa hoc: " + e.getMessage());
        } finally{
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    };
   
    public List<CourseDTO> getAllCoursesInprogress(String customerId) throws SQLException {
        Connection conn = null;
        List<CourseDTO> courses = new ArrayList<>();
        String courseSql = """
            SELECT C.course_id, S.subject_name, G.grade_name, PI.full_name,
            C.start_date, C.end_date, C.status, C.sessions_per_week
            FROM courses C
            JOIN tutoringrequests TR ON C.request_id = TR.request_id
            JOIN subjects S ON TR.subject_id = S.subject_id
            JOIN grades G ON TR.grade_id = G.grade_id
            JOIN tutors T ON TR.tutor_id = T.tutor_id
            JOIN personalinfos PI ON T.user_id = PI.user_id
            WHERE C.status ='INPROGRESS' AND TR.customer_id = ? 
            """;
        try {
            conn = connection.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement(courseSql);
            preparedStatement.setString(1, customerId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                CourseDTO course = new CourseDTO();
                course.setId(rs.getInt("course_id"));
                course.setSubject(rs.getString("subject_name"));
                course.setClassName(rs.getString("grade_name"));
                course.setTutorName(rs.getString("full_name"));
                course.setStartDate(rs.getDate("start_date").toLocalDate());
                course.setEndDate(rs.getDate("end_date") != null ? rs.getDate("end_date").toLocalDate() : null);
                course.setStatus(rs.getString("status"));
                course.setSessionsPerWeek(rs.getInt("sessions_per_week"));
                course.setSchedule(new ArrayList<>()); 
                courses.add(course);  
            }     
        return courses;
        } catch (Exception e) {
            throw new SQLException("Loi khi lay danh sach khoa hoc dang dien ra : " + e.getMessage());
        } finally{
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }     
    }

    public List<TutoringRequest> getAllTutoringRequest(String customerId) throws SQLException {
        Connection conn = null;
        List<TutoringRequest> myTutoringRequests = new ArrayList<>();
        String tutoringRequestSql = """
                SELECT TR.request_id, S.subject_name, G.grade_name, TR.created_at, TR.status
                FROM tutoringrequests TR
                JOIN subjects S
                ON TR.subject_id = S.subject_id
                JOIN grades G
                ON TR.grade_id = G.grade_id
                WHERE status='PENDING' AND customer_id = ?
            """;
        try {
            conn = connection.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement (tutoringRequestSql);
            preparedStatement.setString(1, customerId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                TutoringRequest myTutoringRequest = new TutoringRequest();
                myTutoringRequest.setId(rs.getInt("request_id"));
                myTutoringRequest.setSubjectName(rs.getString("subject_name"));
                myTutoringRequest.setClassName(rs.getString("grade_name"));
                myTutoringRequest.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
                myTutoringRequest.setStatus(TutoringRequest.Status.valueOf(rs.getString("status")));
                
            
                myTutoringRequests.add(myTutoringRequest);  
            }     
            return myTutoringRequests;
        } catch (Exception e) {
            throw new SQLException("Loi khi lay danh sach khoa hoc dang dien ra : " + e.getMessage());
        } finally{
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }     
    }

}