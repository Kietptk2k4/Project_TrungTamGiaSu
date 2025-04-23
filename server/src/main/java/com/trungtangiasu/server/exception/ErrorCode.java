package com.trungtangiasu.server.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "LỖI KHÔNG XÁC ĐỊNH"),
    USER_NOT_FOUND_EXCEPTION(104,"kHÔNG TIM THẤY NGƯỜI DÙNG"),
    EXISTED_USER_EXCEPTION(105,"NGƯỜI DÙNG ĐÃ TỒN TẠI"),
    LOGIN_FAILED_EXCEPTION(106,"EMAIL HOẶC MẬT KHẨU KHÔNG ĐÚNG"),
    INVALID_TOKEN_EXCEPTION(107,"TOKEN KHÔNG HỢP LỆ"),

    
    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
    private final int code;
    private final String message;


}




