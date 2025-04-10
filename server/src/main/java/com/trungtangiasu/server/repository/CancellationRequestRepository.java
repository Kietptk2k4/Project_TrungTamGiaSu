package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.CancellationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CancellationRequestRepository extends JpaRepository<CancellationRequest, Integer> {
}
