package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.SubjectClassMapping;
import com.trungtangiasu.server.repository.SubjectClassMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectClassMappingService {

    @Autowired
    private SubjectClassMappingRepository subjectClassMappingRepository;

    public SubjectClassMapping saveSubjectClassMapping(SubjectClassMapping mapping) {
        return subjectClassMappingRepository.save(mapping);
    }

    public List<SubjectClassMapping> getAllSubjectClassMappings() {
        return subjectClassMappingRepository.findAll();
    }
}
