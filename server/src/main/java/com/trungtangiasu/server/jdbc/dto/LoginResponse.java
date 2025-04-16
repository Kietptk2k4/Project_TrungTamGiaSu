package com.trungtangiasu.server.jdbc.dto;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;



@Setter
@Getter
public class LoginResponse {
    private String token;
    private Map<String, Object> user;

    public LoginResponse(String token, Map<String, Object> user) {
        this.token = token;
        this.user = user;
    }

    // Getters & Setters
}