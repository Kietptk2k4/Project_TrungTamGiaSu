package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.SubjectClassMapping;
import com.trungtangiasu.server.service.SubjectClassMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject-class-mappings")
public class SubjectClassMappingController {

    @Autowired
    private SubjectClassMappingService subjectClassMappingService;

    @GetMapping
    public ResponseEntity<List<SubjectClassMapping>> getAllSubjectClassMappings() {
        return ResponseEntity.ok(subjectClassMappingService.getAllSubjectClassMappings());
    }

    @PostMapping
    public ResponseEntity<SubjectClassMapping> createSubjectClassMapping(@RequestBody SubjectClassMapping mapping) {
        return ResponseEntity.ok(subjectClassMappingService.saveSubjectClassMapping(mapping));
    }
}
