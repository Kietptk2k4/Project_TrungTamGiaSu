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
    LOCKED_USER_EXCEPTION(112, "TÀI KHOẢN BỊ KHÓA", HttpStatus.UNAUTHORIZED),    
    EMPTY_GRADE_EXCEPTION(113, "LỚP(kHỐI) TRỐNG", HttpStatus.BAD_REQUEST),
    EMPTY_SUBJECT_EXCEPTION(114, "MÔN HỌC TRỐNG", HttpStatus.BAD_REQUEST),
    EMPTY_POST_EXCEPTION(115, "DANH SÁCH BÀI ĐĂNG KHÓA HỌC RỖNG", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(116, "KHÔNG CÓ QUYỀN TRUY CẬP", HttpStatus.UNAUTHORIZED),
    INVALID_REQUEST(117, "YÊU CẦU KHÔNG HỢP LỆ", HttpStatus.BAD_REQUEST),
    NOT_FOUND(118, "KHÔNG TÌM THẤY TÀI NGUYÊN", HttpStatus.NOT_FOUND),
    INTERNAL_SERVER_ERROR(119, "LỖI MÁY CHỦ NỘI BỘ", HttpStatus.INTERNAL_SERVER_ERROR),
    REQUEST_NOT_FOUND(120, "YÊU CẦU KHÔNG TÌM THẤY", HttpStatus.NOT_FOUND);

    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    public HttpStatusCode getHttpStatus() {
        return httpStatusCode;
    }

}
