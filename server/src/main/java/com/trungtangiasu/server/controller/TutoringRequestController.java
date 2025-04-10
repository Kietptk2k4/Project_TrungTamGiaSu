package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.TutoringRequest;
import com.trungtangiasu.server.service.TutoringRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tutoring-requests")
public class TutoringRequestController {

    @Autowired
    private TutoringRequestService tutoringRequestService;

    @PostMapping
    public ResponseEntity<TutoringRequest> createTutoringRequest(@RequestBody TutoringRequest request) {
        return ResponseEntity.ok(tutoringRequestService.saveTutoringRequest(request));
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<TutoringRequest> getTutoringRequestById(@PathVariable Integer requestId) {
        Optional<TutoringRequest> request = tutoringRequestService.findTutoringRequestById(requestId);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<TutoringRequest>> getTutoringRequestsByCustomerId(@PathVariable Integer customerId) {
        return ResponseEntity.ok(tutoringRequestService.findTutoringRequestsByCustomerId(customerId));
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<Void> deleteTutoringRequest(@PathVariable Integer requestId) {
        tutoringRequestService.deleteTutoringRequest(requestId);
        return ResponseEntity.noContent().build();
    }
}