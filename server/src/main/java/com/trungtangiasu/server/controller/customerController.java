package com.trungtangiasu.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;
import com.trungtangiasu.server.services.CustomerServices;


@RestController
@RequestMapping("/api/customers/tutoringRequest")
@CrossOrigin(origins = "http://localhost:5173")

public class CustomerController {
    private final CustomerServices customerServices;

    public CustomerController () {
        this.customerServices = new CustomerServices();
    }

    @PostMapping()
    public ResponseEntity<ReponseCreateTutoringRequest> saveTutoringRequest(@RequestBody TutoringRequest tutoringRequest) {
        
        return ResponseEntity.ok(customerServices.createTutoringRequest(tutoringRequest));
    }   

}
