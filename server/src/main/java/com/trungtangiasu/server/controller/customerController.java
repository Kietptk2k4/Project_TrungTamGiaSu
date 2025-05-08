package com.trungtangiasu.server.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.CourseDTO;
import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;
import com.trungtangiasu.server.services.CustomerServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")

public class CustomerController {
    private final CustomerServices customerServices;

    public CustomerController () {
        this.customerServices = new CustomerServices();
    }

    @PostMapping("/tutoringRequest")
    public ResponseEntity<ReponseCreateTutoringRequest> saveTutoringRequest(@RequestBody TutoringRequest tutoringRequest) {
        return ResponseEntity.ok(customerServices.createTutoringRequest(tutoringRequest));
    }   
    @GetMapping("/getAllCourses/{customerId}")
    public ResponseEntity<List<CourseDTO>> getCoursesByCustomerId(@PathVariable  String customerId) throws SQLException {
        System.out.println("Customer ID = " + customerId); 
        return ResponseEntity.ok(customerServices.getCoursesByCustomerId(customerId));
    }
    
    @GetMapping("/getAllCoursesInprogress/{customerId}")
    public ResponseEntity<List<CourseDTO>> getAllCoursesInprogress(@PathVariable  String customerId) throws SQLException {
        System.out.println("Customer ID = " + customerId); 
        return ResponseEntity.ok(customerServices.getAllCoursesInprogress(customerId));
    }
    
    @GetMapping("/getAllTutoringRequest/{customerId}")
    public ResponseEntity<List<TutoringRequest>> getAllTutoringRequest(@PathVariable  String customerId) throws SQLException {
        System.out.println("Customer ID = " + customerId); 
        return ResponseEntity.ok(customerServices.getAllTutoringRequest(customerId));
    }

    
    
}
