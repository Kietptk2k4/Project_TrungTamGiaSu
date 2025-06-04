package com.trungtangiasu.server.services;

import com.trungtangiasu.server.JDBCRepositories.CustomerRequestRepository;
import com.trungtangiasu.server.exception.AppException;
import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.reponse.CustomerRequestDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {
    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);
    private final CustomerRequestRepository customerRequestRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public AdminService(CustomerRequestRepository customerRequestRepository) {
        this.customerRequestRepository = customerRequestRepository;
    }

    public List<CustomerRequestDTO> getAllRequests() {
        logger.debug("Fetching all customer requests");
        return customerRequestRepository.getAllCustomerRequestsWithDetails();
    }

    public List<CustomerRequestDTO> getRequestsByStatus(String status) {
        logger.debug("Fetching customer requests with status: {}", status);
        if (status == null || status.trim().isEmpty()) {
            return customerRequestRepository.getAllCustomerRequestsWithDetails();
        }
        return customerRequestRepository.getCustomerRequestsByStatusWithDetails(status.toUpperCase());
    }

    public Map<String, Object> findAdminByUserId(int userId) {
        logger.debug("Finding admin by userId: {}", userId);
        String sql = "SELECT a.admin_id, a.user_id, r.role_name " +
                     "FROM admins a " +
                     "JOIN accounts acc ON a.user_id = acc.user_id " +
                     "JOIN roles r ON acc.role_id = r.role_id " +
                     "WHERE a.user_id = ? AND r.role_name = 'ADMIN'";
        
        try {
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, userId);
            if (results.isEmpty()) {
                logger.warn("No admin found for userId: {}", userId);
                return null;
            }
            Map<String, Object> admin = new HashMap<>();
            admin.put("admin_id", results.get(0).get("admin_id"));
            admin.put("user_id", results.get(0).get("user_id"));
            admin.put("role_name", results.get(0).get("role_name"));
            return admin;
        } catch (Exception e) {
            logger.error("Error in findAdminByUserId for userId {}: {}", userId, e.getMessage());
            return null;
        }
    }

    public void updateRequestStatus(int id, String status) {
        logger.info("Updating request ID {} to status: {}", id, status);
        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            logger.warn("Invalid status: {}", status);
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        try {
            String checkSql = "SELECT status FROM tutoringrequests WHERE request_id = ?";
            List<String> currentStatus = jdbcTemplate.query(checkSql, new Object[]{id}, (rs, rowNum) -> rs.getString("status"));
            if (currentStatus.isEmpty()) {
                logger.warn("No request found with ID: {}", id);
            throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
            if (!currentStatus.get(0).equals("PENDING")) {
                logger.warn("Request ID {} is not in PENDING status, current status: {}", id, currentStatus.get(0));
                throw new AppException(ErrorCode.INVALID_REQUEST);
            }

            int rowsAffected = customerRequestRepository.updateStatus(id, status);
            if (rowsAffected == 0) {
                logger.warn("Update failed for request ID: {}", id);
                throw new AppException(ErrorCode.NOT_FOUND);
            }
            logger.debug("Updated request ID {} to status: {}", id, status);
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Failed to update request ID {} to status {}: {}", id, status, e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public void updateRequestStatusWithReason(int id, String status, String rejectionReason) {
        logger.info("Updating request ID {} to status: {} with rejection reason: {}", id, status, rejectionReason);
        if (!status.equals("REJECTED")) {
            logger.warn("Invalid status for rejection: {}", status);
            throw new AppException(ErrorCode.INVALID_REQUEST, "Status must be REJECTED for rejection with reason");
        }
        if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
            logger.warn("Rejection reason is empty for request ID: {}", id);
            throw new AppException(ErrorCode.INVALID_REQUEST, "Rejection reason is required");
        }
        try {
            // Check if request exists and is in PENDING status
            String checkSql = "SELECT status FROM tutoringrequests WHERE request_id = ?";
            List<String> currentStatus = jdbcTemplate.query(checkSql, new Object[]{id}, (rs, rowNum) -> rs.getString("status"));
            if (currentStatus.isEmpty()) {
                logger.warn("No request found with ID: {}", id);
                throw new AppException(ErrorCode.REQUEST_NOT_FOUND, "No request found with ID: " + id);
            }
            if (!currentStatus.get(0).equals("PENDING")) {
                logger.warn("Request ID {} is not in PENDING status, current status: {}", id, currentStatus.get(0));
                throw new AppException(ErrorCode.INVALID_REQUEST, "Request must be in PENDING status to reject");
            }

            // Update status with rejection reason
            int rowsAffected = customerRequestRepository.updateStatusWithReason(id, status, rejectionReason);
            if (rowsAffected == 0) {
                logger.warn("Update failed for request ID: {}", id);
                throw new AppException(ErrorCode.REQUEST_NOT_FOUND, "Request not found or update failed for ID: " + id);
            }
            logger.info("Successfully updated request ID {} to status: {} with reason: {}", id, status, rejectionReason);
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Failed to update request ID {} to status {} with reason: {}", id, status, rejectionReason, e);
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION, "Failed to update request: " + e.getMessage());
        }
    }
}