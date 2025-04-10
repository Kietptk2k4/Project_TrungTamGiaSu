package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.Class;
import com.trungtangiasu.server.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class ClassController {

    @Autowired
    private ClassService classService;

    @GetMapping
    public ResponseEntity<List<Class>> getAllClasses() {
        return ResponseEntity.ok(classService.getAllClasses());
    }

    @PostMapping
    public ResponseEntity<Class> createClass(@RequestBody Class clazz) {
        return ResponseEntity.ok(classService.saveClass(clazz));
    }
}
