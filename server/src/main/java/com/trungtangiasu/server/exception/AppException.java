package com.trungtangiasu.server.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;

import lombok.Getter;
import lombok.Setter;

@ControllerAdvice
@Getter
@Setter
public class AppException extends RuntimeException{
    private ErrorCode errorCode;

    public AppException() {
        super();
    }
    public AppException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    public AppException(ErrorCode errorCode, String message) {
        super(message);  // Truyền thông báo lỗi tùy chỉnh
        this.errorCode = errorCode;
    }


}
