package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    // Tìm thanh toán theo mã khách hàng
    List<Payment> findByCustomerCustomerId(Integer customerId);

    // Tìm thanh toán theo mã khóa học
    List<Payment> findByCourseCourseId(Integer courseId);
}