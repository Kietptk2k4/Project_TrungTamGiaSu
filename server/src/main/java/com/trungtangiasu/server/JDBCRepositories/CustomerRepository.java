package com.trungtangiasu.server.JDBCRepositories;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Types;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.RequestSchedules;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

@Repository
public class CustomerRepository {
    private final ConDB connection = new ConDB();

    public ReponseCreateTutoringRequest createTutoringRequest(TutoringRequest request) {
        try {
            connection.getConnection(); // Mở kết nối 1 lần duy nhất ở đây

            Integer subjectClassId = getSubjectClassId(request.getSubjectId(), request.getClassId());
            if (subjectClassId == null) {
                throw new IllegalArgumentException("Không tồn tại mapping subject_class");
            }

            String sql = """
                INSERT INTO TutoringRequests
                  (customer_id, tutor_id, subject_class_id, sessions_per_week, ward_id, address_detail, proposed_fee_per_session)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """;

            PreparedStatement ps = connection.getConnection().prepareStatement(sql);
            ps.setInt(1, request.getCustomerId());
            if (request.getTutorId() != null) {
                ps.setInt(2, request.getTutorId());
            } else {
                ps.setNull(2, Types.INTEGER);
            }
            ps.setInt(3, subjectClassId);   
            ps.setInt(4, request.getSessionsPerWeek());
            ps.setString(5, request.getWardId());
            ps.setString(6, request.getAddressDetail());
            ps.setInt(7, request.getFeePerSession());
            
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

    private Integer getSubjectClassId(int subjectId, int classId) throws SQLException {
        String sql = """
            SELECT subject_class_id FROM SubjectClassMappings
            WHERE subject_id = ? AND class_id = ?
        """;
        PreparedStatement ps = connection.getConnection().prepareStatement(sql);
        ps.setInt(1, subjectId);
        ps.setInt(2, classId);
        ResultSet rs = ps.executeQuery();
        Integer result = null;
        if (rs.next()) {
            result = rs.getInt("subject_class_id");
        }
        rs.close();
        ps.close();
        return result;
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
}

