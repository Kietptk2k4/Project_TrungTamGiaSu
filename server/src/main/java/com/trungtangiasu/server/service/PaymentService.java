package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Payment;
import com.trungtangiasu.server.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> findPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public List<Payment> findPaymentsByCustomerId(Integer customerId) {
        return paymentRepository.findByCustomerCustomerId(customerId);
    }

    public List<Payment> findPaymentsByCourseId(Integer courseId) {
        return paymentRepository.findByCourseCourseId(courseId);
    }

    public void deletePayment(Integer paymentId) {
        paymentRepository.deleteById(paymentId);
    }
}