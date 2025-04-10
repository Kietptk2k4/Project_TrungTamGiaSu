package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Payment;
import com.trungtangiasu.server.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Lưu một Payment
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Lấy danh sách Payment theo Customer ID
    public List<Payment> findPaymentsByCustomerId(Integer customerId) {
        return paymentRepository.findByCustomerCustomerId(customerId);
    }

    // Lấy danh sách Payment theo Course ID
    public List<Payment> findPaymentsByCourseId(Integer courseId) {
        return paymentRepository.findByCourseCourseId(courseId);
    }
}
