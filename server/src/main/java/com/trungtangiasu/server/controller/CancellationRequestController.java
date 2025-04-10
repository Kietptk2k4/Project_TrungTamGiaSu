package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.CancellationRequest;
import com.trungtangiasu.server.service.CancellationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cancellation-requests")
public class CancellationRequestController {

    @Autowired
    private CancellationRequestService cancellationRequestService;

    @PostMapping
    public ResponseEntity<CancellationRequest> createCancellationRequest(@RequestBody CancellationRequest request) {
        return ResponseEntity.ok(cancellationRequestService.saveCancellationRequest(request));
    }
}
