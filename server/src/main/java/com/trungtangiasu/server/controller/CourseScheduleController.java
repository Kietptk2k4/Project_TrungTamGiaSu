package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.CourseSchedule;
import com.trungtangiasu.server.service.CourseScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-schedules")
public class CourseScheduleController {

    @Autowired
    private CourseScheduleService courseScheduleService;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseSchedule>> getSchedulesByCourseId(@PathVariable Integer courseId) {
        return ResponseEntity.ok(courseScheduleService.findSchedulesByCourseId(courseId));
    }
}
