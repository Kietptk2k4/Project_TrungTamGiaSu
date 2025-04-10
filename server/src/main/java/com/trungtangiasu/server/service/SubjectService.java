package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Subject;
import com.trungtangiasu.server.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject findSubjectByName(String subjectName) {
        return subjectRepository.findBySubjectName(subjectName);
    }
}
