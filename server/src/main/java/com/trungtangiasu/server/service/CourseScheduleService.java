package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.CourseSchedule;
import com.trungtangiasu.server.repository.CourseScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseScheduleService {

    @Autowired
    private CourseScheduleRepository courseScheduleRepository;

    public List<CourseSchedule> findSchedulesByCourseId(Integer courseId) {
        return courseScheduleRepository.findByCourseCourseId(courseId);
    }
}
