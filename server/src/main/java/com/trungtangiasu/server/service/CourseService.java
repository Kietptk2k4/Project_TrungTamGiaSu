package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Course;
import com.trungtangiasu.server.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Optional<Course> findCourseById(Integer courseId) {
        return courseRepository.findById(courseId);
    }
}
