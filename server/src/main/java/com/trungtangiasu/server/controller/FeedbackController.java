package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.Feedback;
import com.trungtangiasu.server.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByCourseId(@PathVariable Integer courseId) {
        return ResponseEntity.ok(feedbackService.findFeedbacksByCourseId(courseId));
    }

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.saveFeedback(feedback));
    }
}
