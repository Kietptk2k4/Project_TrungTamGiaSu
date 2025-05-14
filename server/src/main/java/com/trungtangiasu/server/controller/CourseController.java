package com.trungtangiasu.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.CourseDTO;
import com.trungtangiasu.server.jdbc.dto.RegisterCourse;
import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.services.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService courseService;
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @GetMapping("/allRegisterCourses")
    public ResponseEntity<APIReponse<List<RegisterCourse>>> getAllRegisterCourses() {
        APIReponse<List<RegisterCourse>> apiReponse = new APIReponse<>();
        apiReponse.setData(courseService.getAllRegisterCourses());

        return ResponseEntity.ok(apiReponse);
    }
}
