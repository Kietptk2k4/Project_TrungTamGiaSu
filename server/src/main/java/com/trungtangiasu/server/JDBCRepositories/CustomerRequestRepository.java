package com.trungtangiasu.server.JDBCRepositories;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.jdbc.dto.reponse.CustomerRequestDTO;

@Repository
public class CustomerRequestRepository {
    private static final Logger logger = LoggerFactory.getLogger(CustomerRequestRepository.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<CustomerRequestDTO> getAllCustomerRequestsWithDetails() {
    String sql = "SELECT tr.request_id AS id, p.full_name AS customer_name, s.subject_name AS subject, " +
                 "g.grade_name AS class, (pr.name) AS location, " +
                 "tr.proposed_fee_per_session AS fee, tr.created_at, tr.status " +
                 "FROM tutoringrequests tr " +
                 "JOIN customers c ON tr.customer_id = c.customer_id " +
                 "JOIN personalinfos p ON c.user_id = p.user_id " +
                 "JOIN subjects s ON tr.subject_id = s.subject_id " +
                 "JOIN grades g ON tr.grade_id = g.grade_id " +
                 "JOIN ward w ON tr.ward_id = w.ward_id " +
                 "JOIN district d ON w.district_id = d.district_id " +
                 "JOIN province pr ON d.province_id = pr.province_id";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            CustomerRequestDTO request = new CustomerRequestDTO();
            request.setId(rs.getInt("id"));
            request.setCustomer_name(rs.getString("customer_name"));
            request.setSubject(rs.getString("subject"));
            request.setClass_name(rs.getString("class"));
            request.setLocation(rs.getString("location"));
            request.setFee(rs.getInt("fee"));
            request.setCreated_at(rs.getString("created_at"));
            request.setStatus(rs.getString("status"));
            return request;
        });
    }


    // Lấy yêu cầu theo trạng thái với thông tin chi tiết, bao gồm cả tỉnh/thành
    public List<CustomerRequestDTO> getCustomerRequestsByStatusWithDetails(String status) {
        String sql = "SELECT tr.request_id AS id, p.full_name AS customer_name, s.subject_name AS subject, " +
                     "g.grade_name AS class, (pr.name) AS location, " +
                     "tr.proposed_fee_per_session AS fee, tr.created_at, tr.status " +
                     "FROM tutoringrequests tr " +
                     "JOIN customers c ON tr.customer_id = c.customer_id " +
                     "JOIN personalinfos p ON c.user_id = p.user_id " +
                     "JOIN subjects s ON tr.subject_id = s.subject_id " +
                     "JOIN grades g ON tr.grade_id = g.grade_id " +
                     "JOIN ward w ON tr.ward_id = w.ward_id " +
                     "JOIN district d ON w.district_id = d.district_id " +
                     "JOIN province pr ON d.province_id = pr.province_id " +
                     "WHERE tr.status = ?";

        return jdbcTemplate.query(sql, new Object[]{status}, (rs, rowNum) -> {
            CustomerRequestDTO request = new CustomerRequestDTO();
            request.setId(rs.getInt("id"));
            request.setCustomer_name(rs.getString("customer_name"));
            request.setSubject(rs.getString("subject"));
            request.setClass_name(rs.getString("class"));
            request.setLocation(rs.getString("location"));
            request.setFee(rs.getInt("fee"));
            request.setCreated_at(rs.getString("created_at"));
            request.setStatus(rs.getString("status"));
            return request;
        });
    }

    public int updateStatus(int id, String status) {
        String sql = "UPDATE tutoringrequests SET status = ? WHERE request_id = ?";
        return jdbcTemplate.update(sql, status, id);
    }


    public int updateStatusWithReason(int id, String status, String rejectionReason) {
        logger.debug("Updating request ID {} to status: {} with rejection reason: {}", id, status, rejectionReason);
        String sql = "UPDATE tutoringrequests SET " +
                     "status = ?, " +
                     "updated_at = CURRENT_TIMESTAMP, " +
                     "rejected_at = CURRENT_TIMESTAMP, " +
                     "rejected_by = 'Admin', " +
                     "rejection_reason = ? " +
                     "WHERE request_id = ?";
        try {
            return jdbcTemplate.update(sql, status, rejectionReason, id);
        } catch (Exception e) {
            logger.error("Failed to update request ID {} to status {} with reason: {}", id, status, e.getMessage());
            throw new RuntimeException("Failed to update request status with reason", e);
        }
    }
}
