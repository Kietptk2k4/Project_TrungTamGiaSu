package com.trungtangiasu.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.ClassRepository;
import com.trungtangiasu.server.jdbc.model.Classes;

@Service
public class ClassService {
   private ClassRepository classRepository;
   public ClassService(ClassRepository classRepository) {
       this.classRepository = classRepository;
   }
   
    public List<Classes> getAllClasses() {
         List<Classes> classes = classRepository.getAllClasses(); 
         return classes;
    }
   
}
