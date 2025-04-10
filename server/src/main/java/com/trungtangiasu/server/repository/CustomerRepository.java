package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}
