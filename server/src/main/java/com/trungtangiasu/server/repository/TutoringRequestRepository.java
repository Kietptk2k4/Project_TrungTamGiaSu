package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.TutoringRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutoringRequestRepository extends JpaRepository<TutoringRequest, Integer> {
    List<TutoringRequest> findByCustomerCustomerId(Integer customerId);
    List<TutoringRequest> findByStatus(TutoringRequest.Status status);
}
