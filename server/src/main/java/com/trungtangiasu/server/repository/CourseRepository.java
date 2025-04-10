package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    Course findByRequestRequestId(Integer requestId);
}
