package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Feedback;
import com.trungtangiasu.server.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Lưu một Feedback
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Lấy danh sách Feedback theo Course ID
    public List<Feedback> findFeedbacksByCourseId(Integer courseId) {
        return feedbackRepository.findByCourseCourseId(courseId);
    }
}
