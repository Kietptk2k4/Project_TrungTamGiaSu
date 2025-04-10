package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.TutoringRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutoringRequestRepository extends JpaRepository<TutoringRequest, Integer> {
    // Tìm các yêu cầu gia sư theo khách hàng
    List<TutoringRequest> findByCustomerCustomerId(Integer customerId);

    // Tìm các yêu cầu gia sư theo trạng thái
    List<TutoringRequest> findByStatus(TutoringRequest.Status status);
}