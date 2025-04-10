package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.RequestSchedule;
import com.trungtangiasu.server.service.RequestScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request-schedules")
public class RequestScheduleController {

    @Autowired
    private RequestScheduleService requestScheduleService;

    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<RequestSchedule>> getSchedulesByRequestId(@PathVariable Integer requestId) {
        return ResponseEntity.ok(requestScheduleService.findSchedulesByRequestId(requestId));
    }

    @PostMapping
    public ResponseEntity<RequestSchedule> createRequestSchedule(@RequestBody RequestSchedule schedule) {
        return ResponseEntity.ok(requestScheduleService.saveRequestSchedule(schedule));
    }
}
