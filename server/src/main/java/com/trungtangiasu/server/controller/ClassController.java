package com.trungtangiasu.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.jdbc.model.Classes;
import com.trungtangiasu.server.services.ClassService;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClassController {
    private final ClassService classService;
    public ClassController(ClassService classService) {
        this.classService = classService;
    }


    @GetMapping("/getAllClasses")
    public ResponseEntity<APIReponse<List<Classes>>> getAllClasses() {
        APIReponse<List<Classes>> apiReponse = new APIReponse<>();
        List<Classes> classes = classService.getAllClasses();
        apiReponse.setData(classes);
        if (classes.isEmpty()) { 
            ErrorCode errorCode = ErrorCode.EMPTY_GRADE_EXCEPTION;
            apiReponse.setStatusCode(errorCode.getCode());  
            apiReponse.setMessage(errorCode.getMessage());
            return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiReponse);  
        }
        return ResponseEntity.ok(apiReponse);
    }
}
