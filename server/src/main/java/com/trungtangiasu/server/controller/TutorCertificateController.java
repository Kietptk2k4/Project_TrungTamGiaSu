package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.TutorCertificate;
import com.trungtangiasu.server.service.TutorCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutor-certificates")
public class TutorCertificateController {

    @Autowired
    private TutorCertificateService tutorCertificateService;

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<TutorCertificate>> getCertificatesByTutorId(@PathVariable Integer tutorId) {
        return ResponseEntity.ok(tutorCertificateService.findCertificatesByTutorId(tutorId));
    }

    @PostMapping
    public ResponseEntity<TutorCertificate> createTutorCertificate(@RequestBody TutorCertificate certificate) {
        return ResponseEntity.ok(tutorCertificateService.saveTutorCertificate(certificate));
    }
}
