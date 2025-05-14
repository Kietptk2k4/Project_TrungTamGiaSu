package com.trungtangiasu.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.CourseRepository;
import com.trungtangiasu.server.jdbc.dto.RegisterCourse;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    public List<RegisterCourse> getAllRegisterCourses() {
        return courseRepository.getAllRegisterCourses();
    }
}
