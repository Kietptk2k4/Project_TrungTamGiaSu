package com.trungtangiasu.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.SubjectRepository;
import com.trungtangiasu.server.jdbc.dto.CourseDTO;
import com.trungtangiasu.server.jdbc.model.CourseSchedule;
import com.trungtangiasu.server.jdbc.model.Subject;

@Service
public class SubjectService {
    private SubjectRepository subjectRepository;
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    public List<Subject> getAllSubjects() {
        List<Subject> subjects = subjectRepository.getAllSubjects(); 
        return subjects;
    }


  
}