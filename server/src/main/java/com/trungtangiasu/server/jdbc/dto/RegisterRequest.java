package com.trungtangiasu.server.jdbc.dto;
// RegisterRequest.java

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    public String name;
    public String email;
    public String phone;
    public String password;
    public String gender;
    public String role;
}
