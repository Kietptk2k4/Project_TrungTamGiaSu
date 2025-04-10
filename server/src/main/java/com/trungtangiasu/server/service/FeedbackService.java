package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Feedback;
import com.trungtangiasu.server.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Optional<Feedback> findFeedbackById(Integer feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public List<Feedback> findFeedbacksByCourseId(Integer courseId) {
        return feedbackRepository.findByCourseCourseId(courseId);
    }

    public void deleteFeedback(Integer feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}