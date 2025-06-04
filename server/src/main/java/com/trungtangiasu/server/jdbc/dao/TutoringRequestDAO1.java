// package com.trungtangiasu.server.jdbc.dao;

// import java.sql.Connection;
// import java.sql.PreparedStatement;
// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.sql.Statement;
// import java.sql.Timestamp;
// import java.util.ArrayList;
// import java.util.List;

// import com.trungtangiasu.server.jdbc.MySql;
// import com.trungtangiasu.server.jdbc.dto.reponse.CustomerRequestDTO;
// import com.trungtangiasu.server.jdbc.model.TutoringRequestModel.Status;

// public class TutoringRequestDAO1 {

//     // Phương thức helper để ánh xạ ResultSet sang CustomerRequestDTO
//     private static CustomerRequestDTO mapResultSetToDTO(ResultSet rs) throws SQLException {
//         CustomerRequestDTO dto = new CustomerRequestDTO();
//         dto.setId(rs.getInt("request_id"));
//         dto.setCustomerId(rs.getInt("tr_customer_id"));
//         dto.setCustomerName(rs.getString("customer_full_name"));

//         int subjectIdVal = rs.getInt("tr_subject_id");
//         dto.setSubjectId(rs.wasNull() ? null : subjectIdVal);
//         dto.setSubjectName(rs.getString("subject_name"));

//         int gradeIdVal = rs.getInt("tr_grade_id");
//         dto.setGradeId(rs.wasNull() ? null : gradeIdVal);
//         dto.setGradeName(rs.getString("grade_name"));

//         dto.setWardId(rs.getString("tr_ward_id"));
//         dto.setAddressDetail(rs.getString("tr_address_detail"));

//         // Xây dựng location
//         String wardName = rs.getString("ward_name");
//         String districtName = rs.getString("district_name"); // Giả sử có từ JOIN Ward -> District
//         String provinceName = rs.getString("province_name"); // Giả sử có từ JOIN District -> Province
//         StringBuilder locationBuilder = new StringBuilder();
//         if (dto.getAddressDetail() != null && !dto.getAddressDetail().isEmpty()) {
//             locationBuilder.append(dto.getAddressDetail()).append(", ");
//         }
//         if (wardName != null && !wardName.isEmpty()) locationBuilder.append(wardName).append(", ");
//         if (districtName != null && !districtName.isEmpty()) locationBuilder.append(districtName).append(", ");
//         if (provinceName != null && !provinceName.isEmpty()) locationBuilder.append(provinceName);
//         String location = locationBuilder.toString().trim();
//         if (location.endsWith(",")) {
//             location = location.substring(0, location.length() - 1).trim();
//         }
//         dto.setLocation(location.isEmpty() ? null : location);


//         int proposedFeeVal = rs.getInt("tr_proposed_fee_per_session");
//         dto.setFee(rs.wasNull() ? null : proposedFeeVal);

//         Timestamp createdAtTs = rs.getTimestamp("tr_created_at");
//         if (createdAtTs != null) {
//             dto.setCreatedAt(createdAtTs.toLocalDateTime());
//         }

//         String statusStr = rs.getString("tr_status");
//         if (statusStr != null) {
//             dto.setStatus(Status.valueOf(statusStr.toUpperCase()));
//         }

//         int sessionsPerWeekVal = rs.getInt("tr_sessions_per_week");
//         dto.setSessionsPerWeek(rs.wasNull() ? null : sessionsPerWeekVal);

//         // Các trường tùy chọn khác có thể thêm ở đây nếu DTO cần
//         // dto.setSubjectClassId(rs.getInt("tr_subject_class_id")); // Nếu cần
//         // dto.setTutorId(rs.getInt("tr_tutor_id")); // Nếu cần
//         return dto;
//     }

//     // Câu SQL cơ sở với các JOIN cần thiết
//     // Bạn cần điều chỉnh tên bảng và cột cho phù hợp với schema của bạn:
//     // Customers, PersonalInfos, Subjects, Grades, Ward, District, Province
//     private static final String SELECT_DTO_SQL_BASE = """
//         SELECT 
//             tr.request_id,
//             tr.customer_id AS tr_customer_id,
//             pi.full_name AS customer_full_name,
//             tr.subject_id AS tr_subject_id,
//             s.subject_name,
//             tr.grade_id AS tr_grade_id,
//             g.grade_name,
//             tr.ward_id AS tr_ward_id,
//             w.name AS ward_name, 
//             dist.name AS district_name, 
//             prov.name AS province_name, 
//             tr.address_detail AS tr_address_detail,
//             tr.proposed_fee_per_session AS tr_proposed_fee_per_session,
//             tr.created_at AS tr_created_at,
//             tr.status AS tr_status,
//             tr.sessions_per_week AS tr_sessions_per_week,
//             tr.tutor_id AS tr_tutor_id,                 -- Các cột tùy chọn
//             tr.subject_class_id AS tr_subject_class_id, -- Các cột tùy chọn
//             tr.expired_at AS tr_expired_at              -- Các cột tùy chọn
//         FROM tutoringrequests tr
//         JOIN customers cust ON tr.customer_id = cust.customer_id     -- Bảng Customers
//         JOIN personalinfos pi ON cust.user_id = pi.user_id         -- Bảng PersonalInfos
//         LEFT JOIN subjects s ON tr.subject_id = s.subject_id       -- Bảng Subjects
//         LEFT JOIN grades g ON tr.grade_id = g.grade_id             -- Bảng Grades
//         LEFT JOIN ward w ON tr.ward_id = w.ward_id                 -- Bảng Ward
//         LEFT JOIN district dist ON w.district_id = dist.district_id -- Giả sử Ward có district_id -> District
//         LEFT JOIN province prov ON dist.province_id = prov.province_id -- Giả sử District có province_id -> Province
//         """;

//     public static List<CustomerRequestDTO> selectAllWithDetails() throws SQLException {
//         List<CustomerRequestDTO> requests = new ArrayList<>();
//         String sql = SELECT_DTO_SQL_BASE + "ORDER BY tr.created_at DESC";

//         try (Connection conn = MySql.createConnection();
//              Statement stmt = conn.createStatement();
//              ResultSet rs = stmt.executeQuery(sql)) {
//             while (rs.next()) {
//                 requests.add(mapResultSetToDTO(rs));
//             }
//         }
//         return requests;
//     }

//     public static List<CustomerRequestDTO> selectByStatusWithDetails(String status) throws SQLException {
//         List<CustomerRequestDTO> requests = new ArrayList<>();
//         String sql = SELECT_DTO_SQL_BASE + "WHERE UPPER(tr.status) = ? ORDER BY tr.created_at DESC";

//         try (Connection conn = MySql.createConnection();
//              PreparedStatement ps = conn.prepareStatement(sql)) {
//             ps.setString(1, status.toUpperCase());
//             try (ResultSet rs = ps.executeQuery()) {
//                 while (rs.next()) {
//                     requests.add(mapResultSetToDTO(rs));
//                 }
//             }
//         }
//         return requests;
//     }
    
//     // Thêm các phương thức khác nếu cần: selectByIdWithDetails, updateStatus, ...
// }