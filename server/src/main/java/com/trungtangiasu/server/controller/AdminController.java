package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.exception.AppException;
import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.jdbc.dto.reponse.CustomerRequestDTO;
import com.trungtangiasu.server.services.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/customer-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<List<CustomerRequestDTO>>> getCustomerRequests(
            @RequestParam(required = false) String status) {
        logger.info("Fetching customer requests with status: {}", status);
        List<CustomerRequestDTO> requests = status != null
                ? adminService.getRequestsByStatus(status)
                : adminService.getAllRequests();
        return ResponseEntity.ok(new APIReponse<>(1000, "Success", requests));
    }

    @GetMapping("/tutor-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<List<CustomerRequestDTO>>> getTutorRequests(
            @RequestParam(required = false) String status) {
        logger.info("Fetching tutor refund requests with status: {}", status);
        List<CustomerRequestDTO> requests = status != null
                ? adminService.getRequestsByStatus(status)
                : adminService.getAllRequests();
        return ResponseEntity.ok(new APIReponse<>(1000, "Success", requests));
    }

    @PutMapping("/customer-requests/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<Void>> approveRequest(@PathVariable int id) {
        logger.info("Approving customer request with ID: {}", id);
        adminService.updateRequestStatus(id, "APPROVED");
        return ResponseEntity.ok(new APIReponse<>(1000, "Request approved successfully", null));
    }

    @PutMapping("/customer-requests/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<Void>> rejectRequest(@PathVariable int id) {
        logger.info("Rejecting customer request with ID: {}", id);
        adminService.updateRequestStatus(id, "REJECTED");
        return ResponseEntity.ok(new APIReponse<>(1000, "Request rejected successfully", null));
    }

    @PutMapping("/tutor-requests/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<Void>> approveTutorRequest(@PathVariable int id) {
        logger.info("Approving tutor refund request with ID: {}", id);
        adminService.updateRequestStatus(id, "APPROVED");
        return ResponseEntity.ok(new APIReponse<>(1000, "Tutor request approved successfully", null));
    }

    @PutMapping("/tutor-requests/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIReponse<Void>> rejectTutorRequest(
            @PathVariable int id,
            @RequestBody Map<String, String> body) {
        logger.info("Rejecting tutor refund request with ID: {}", id);
        String rejectionReason = body.get("rejection_reason");
        if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_REQUEST, "Rejection reason is required");
        }
        adminService.updateRequestStatusWithReason(id, "REJECTED", rejectionReason);
        return ResponseEntity.ok(new APIReponse<>(1000, "Tutor request rejected successfully", null));
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<APIReponse<Void>> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        APIReponse<Void> response = new APIReponse<>(errorCode.getCode(), errorCode.getMessage(), null);
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }
}