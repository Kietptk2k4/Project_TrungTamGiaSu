package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.Tutor;
import com.trungtangiasu.server.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tutors")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping("/{tutorId}")
    public ResponseEntity<Tutor> getTutorById(@PathVariable Integer tutorId) {
        Optional<Tutor> tutor = tutorService.findTutorById(tutorId);
        return tutor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tutor> createTutor(@RequestBody Tutor tutor) {
        return ResponseEntity.ok(tutorService.saveTutor(tutor));
    }
}
