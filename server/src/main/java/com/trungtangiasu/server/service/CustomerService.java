package com.trungtangiasu.server.service;

import com.trungtangiasu.server.dto.CustomerDTO;
import com.trungtangiasu.server.models.Account;
import com.trungtangiasu.server.models.Customer;
import com.trungtangiasu.server.models.PersonalInfo;
import com.trungtangiasu.server.repository.AccountRepository;
import com.trungtangiasu.server.repository.CustomerRepository;
import com.trungtangiasu.server.repository.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> findCustomerById(Integer customerId) {
        return customerRepository.findById(customerId);
    }

    public void deleteCustomer(Integer customerId) {
        customerRepository.deleteById(customerId);
    }

    public void registerCustomer(CustomerDTO registrationDTO) {
        // Kiểm tra username hoặc email đã tồn tại
        if (accountRepository.findByUsername(registrationDTO.getUsername()) != null) {
            throw new RuntimeException("Username đã tồn tại!");
        }
        if (accountRepository.findByEmail(registrationDTO.getEmail()) != null) {
            throw new RuntimeException("Email đã tồn tại!");
        }

        // Tạo tài khoản
        Account account = new Account();
        account.setUsername(registrationDTO.getUsername());
        account.setEmail(registrationDTO.getEmail());
        account.setHashedPassword(passwordEncoder.encode(registrationDTO.getPassword())); // Hash mật khẩu
        account.setIsActive(true);
        Account savedAccount = accountRepository.save(account);

        // Tạo thông tin cá nhân
        PersonalInfo personalInfo = new PersonalInfo();
        personalInfo.setName(registrationDTO.getName());
        personalInfo.setGender(PersonalInfo.Gender.valueOf(registrationDTO.getGender().toUpperCase()));
        personalInfo.setPhoneNumber(registrationDTO.getPhoneNumber());
        PersonalInfo savedPersonalInfo = personalInfoRepository.save(personalInfo);

        // Tạo bản ghi Customer
        Customer customer = new Customer();
        customer.setUser(savedAccount);
        customer.setPersonalInfo(savedPersonalInfo);
        customer.setAddress(registrationDTO.getAddress());
        customerRepository.save(customer);
    }
}
