package com.trungtangiasu.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.CustomerRepository;
import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

@Service
public class CustomerServices {
    
    CustomerRepository customerRepository = new CustomerRepository();

    public ReponseCreateTutoringRequest createTutoringRequest(TutoringRequest tutoringRequest) {
        return customerRepository.createTutoringRequest(tutoringRequest);
    }
    // public int saveTutoringRequest(TutoringRequest request) {
    //     return customerRepository.saveTutoringRequest(request);
    // }
}
