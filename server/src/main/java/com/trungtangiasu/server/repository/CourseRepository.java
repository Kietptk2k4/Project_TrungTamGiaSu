package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    // Tìm khóa học theo yêu cầu gia sư
    Course findByRequestRequestId(Integer requestId);
}