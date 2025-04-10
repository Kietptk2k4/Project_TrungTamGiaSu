package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.CourseSchedule;
import com.trungtangiasu.server.repository.CourseScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseScheduleService {

    @Autowired
    private CourseScheduleRepository courseScheduleRepository;

    public CourseSchedule saveCourseSchedule(CourseSchedule courseSchedule) {
        return courseScheduleRepository.save(courseSchedule);
    }

    public Optional<CourseSchedule> findCourseScheduleById(Integer scheduleId) {
        return courseScheduleRepository.findById(scheduleId);
    }

    public List<CourseSchedule> findSchedulesByCourseId(Integer courseId) {
        return courseScheduleRepository.findByCourseCourseId(courseId);
    }

    public void deleteCourseSchedule(Integer scheduleId) {
        courseScheduleRepository.deleteById(scheduleId);
    }
}