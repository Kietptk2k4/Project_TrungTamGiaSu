package com.trungtangiasu.server.exception.example.demo.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error"),
    USER_NOT_FOUND_EXCEPTION(104,"USER NOT FOUND"),
    EXISTED_USER_EXCEPTION(105,"USER IS EXISTED"),


    
    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
    private final int code;
    private final String message;


}




