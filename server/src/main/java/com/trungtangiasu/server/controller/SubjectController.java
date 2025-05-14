package com.trungtangiasu.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.jdbc.model.Subject;
import com.trungtangiasu.server.services.SubjectService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {
    private final SubjectService subjectService;
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/getAllSubjects")  
    public ResponseEntity<APIReponse<List<Subject>>> getAllSubjects() {
        APIReponse<List<Subject>> apiReponse = new APIReponse<>();
        apiReponse.setData(subjectService.getAllSubjects());
       
        return ResponseEntity.ok(apiReponse);
    }
}
