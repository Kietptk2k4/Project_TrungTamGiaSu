package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private String username;
    private String email;
    private String password;
    private String name;
    private String gender;
    private String phoneNumber;
    private String address;
}
