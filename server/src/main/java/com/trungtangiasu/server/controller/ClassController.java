package com.trungtangiasu.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.model.Classes;
import com.trungtangiasu.server.services.ClassService;

@RestController
@RequestMapping("/api/classes")
public class ClassController {
    private final ClassService classService;
    public ClassController(ClassService classService) {
        this.classService = classService;
    }


    @GetMapping("/getAllClasses")
    public ResponseEntity<List<Classes>> getAllClasses() {
        List<Classes> classes = classService.getAllClasses();
        return ResponseEntity.ok(classes);
    }
}
