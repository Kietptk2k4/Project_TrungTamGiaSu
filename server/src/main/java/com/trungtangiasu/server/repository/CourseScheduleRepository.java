package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.CourseSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseScheduleRepository extends JpaRepository<CourseSchedule, Integer> {
    // Tìm lịch trình khóa học theo mã khóa học
    List<CourseSchedule> findByCourseCourseId(Integer courseId);
}