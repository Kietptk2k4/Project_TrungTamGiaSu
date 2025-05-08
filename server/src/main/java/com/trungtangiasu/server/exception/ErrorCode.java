package com.trungtangiasu.server.exception;

import lombok.Getter;

import org.hibernate.annotations.processing.SQL;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "LỖI KHÔNG XÁC ĐỊNH", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_NOT_FOUND_EXCEPTION(104, "KHÔNG TÌM THẤY NGƯỜI DÙNG", HttpStatus.NOT_FOUND),
    EXISTED_USER_EXCEPTION(105, "NGƯỜI DÙNG ĐÃ TỒN TẠI", HttpStatus.CONFLICT),
    LOGIN_FAILED_EXCEPTION(106, "EMAIL HOẶC MẬT KHẨU KHÔNG ĐÚNG", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN_EXCEPTION(107, "TOKEN KHÔNG HỢP LỆ", HttpStatus.UNAUTHORIZED),
    INVALID_ARGUMENT_EXCEPTION(108, "THAM SỐ KHÔNG HỢP LỆ", HttpStatus.BAD_REQUEST),
    SQL_EXCEPTION(109, "LỖI CƠ SỞ DỮ LIỆU", HttpStatus.INTERNAL_SERVER_ERROR),
    EXISTED_EMAIL_EXCEPTION(110, "EMAIL ĐÃ TỒN TẠI", HttpStatus.CONFLICT),
    EXISTED_PHONE_NUMBER_EXCEPTION(111, "SỐ ĐIỆN THOẠI ĐÃ TỒN TẠI", HttpStatus.CONFLICT),
    LOCKED_USER_EXCEPTION(112, "TÀI KHOẢN BỊ KHÓA", HttpStatus.UNAUTHORIZED);    



    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
