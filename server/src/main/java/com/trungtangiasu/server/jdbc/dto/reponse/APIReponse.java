package com.trungtangiasu.server.jdbc.dto.reponse;

import org.springframework.security.access.method.P;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class APIReponse<T> {
    private int statusCode;
    private String message;
    private T data;

    public APIReponse() {
        this.statusCode = 1000;
        this.message = "Success";
    }
    public APIReponse( int statusCode, String message, T data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}
