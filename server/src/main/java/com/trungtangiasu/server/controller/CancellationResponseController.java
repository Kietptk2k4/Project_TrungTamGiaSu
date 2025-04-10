package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.CancellationResponse;
import com.trungtangiasu.server.service.CancellationResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cancellation-responses")
public class CancellationResponseController {

    @Autowired
    private CancellationResponseService cancellationResponseService;

    @PostMapping
    public ResponseEntity<CancellationResponse> createCancellationResponse(@RequestBody CancellationResponse response) {
        return ResponseEntity.ok(cancellationResponseService.saveCancellationResponse(response));
    }
}
