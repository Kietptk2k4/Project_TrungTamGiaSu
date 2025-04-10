package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByCustomerCustomerId(Integer customerId);
    List<Payment> findByCourseCourseId(Integer courseId);
}
