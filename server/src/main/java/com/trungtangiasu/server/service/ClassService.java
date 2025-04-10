package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Class;
import com.trungtangiasu.server.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public Class saveClass(Class clazz) {
        return classRepository.save(clazz);
    }

    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    public Class findClassByName(String className) {
        return classRepository.findByClassName(className);
    }
}
