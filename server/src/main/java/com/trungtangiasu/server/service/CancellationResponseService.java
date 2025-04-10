package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.CancellationResponse;
import com.trungtangiasu.server.repository.CancellationResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CancellationResponseService {

    @Autowired
    private CancellationResponseRepository cancellationResponseRepository;

    public CancellationResponse saveCancellationResponse(CancellationResponse response) {
        return cancellationResponseRepository.save(response);
    }

    public Optional<CancellationResponse> findCancellationResponseById(Integer responseId) {
        return cancellationResponseRepository.findById(responseId);
    }
}
