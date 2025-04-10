package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.TutoringRequest;
import com.trungtangiasu.server.repository.TutoringRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutoringRequestService {

    @Autowired
    private TutoringRequestRepository tutoringRequestRepository;

    public TutoringRequest saveTutoringRequest(TutoringRequest request) {
        return tutoringRequestRepository.save(request);
    }

    public Optional<TutoringRequest> findTutoringRequestById(Integer requestId) {
        return tutoringRequestRepository.findById(requestId);
    }

    public List<TutoringRequest> findTutoringRequestsByCustomerId(Integer customerId) {
        return tutoringRequestRepository.findByCustomerCustomerId(customerId);
    }
}
