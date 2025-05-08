package com.trungtangiasu.server.services;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.CustomerRepository;
import com.trungtangiasu.server.jdbc.dto.CourseDTO;
import com.trungtangiasu.server.jdbc.dto.reponse.ReponseCreateTutoringRequest;
import com.trungtangiasu.server.jdbc.model.TutoringRequest;

@Service
public class CustomerServices {
    
    CustomerRepository customerRepository = new CustomerRepository();

    public ReponseCreateTutoringRequest createTutoringRequest(TutoringRequest tutoringRequest) {
        return customerRepository.createTutoringRequest(tutoringRequest);
    }
    public List<CourseDTO> getCoursesByCustomerId(String customerId) throws SQLException {
        return customerRepository.getCoursesByCustomerId(customerId);
    }
    public List<CourseDTO> getAllCoursesInprogress(String customerId) throws SQLException {
        return customerRepository.getAllCoursesInprogress(customerId);
    }
    public List<TutoringRequest> getAllTutoringRequest(String customerId) throws SQLException {
        return customerRepository.getAllTutoringRequest(customerId);
    }
}
