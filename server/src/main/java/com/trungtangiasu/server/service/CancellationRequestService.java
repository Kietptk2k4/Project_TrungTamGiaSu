package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.CancellationRequest;
import com.trungtangiasu.server.repository.CancellationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CancellationRequestService {

    @Autowired
    private CancellationRequestRepository cancellationRequestRepository;

    public CancellationRequest saveCancellationRequest(CancellationRequest request) {
        return cancellationRequestRepository.save(request);
    }
}
