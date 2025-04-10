package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.RequestSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestScheduleRepository extends JpaRepository<RequestSchedule, Integer> {
    // Tìm lịch trình theo yêu cầu gia sư
    List<RequestSchedule> findByRequestRequestId(Integer requestId);
}