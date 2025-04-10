package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByCourseCourseId(Integer courseId);
}
