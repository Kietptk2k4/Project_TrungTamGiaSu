package com.trungtangiasu.server.exception;
import java.sql.SQLException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;

@ControllerAdvice
public class GlobalExceptionHandle{
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<String> handlingRuntimeException (RuntimeException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
    @ExceptionHandler(value = SQLException.class)
    ResponseEntity<APIReponse> handlingSQLException (SQLException exception){
        APIReponse apiReponse = new APIReponse();
        apiReponse.setStatusCode(ErrorCode.SQL_EXCEPTION.getCode());
        apiReponse.setMessage(ErrorCode.SQL_EXCEPTION.getMessage()+" "+exception.getMessage());
        return ResponseEntity.status(ErrorCode.SQL_EXCEPTION.getHttpStatusCode()).body(apiReponse);
    }
    
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
     public ResponseEntity<APIReponse> handlingNotFoundException(MethodArgumentNotValidException exception) {
        APIReponse apiReponse = new APIReponse();
        apiReponse.setStatusCode(ErrorCode.INVALID_ARGUMENT_EXCEPTION.getCode());
        apiReponse.setMessage(ErrorCode.INVALID_ARGUMENT_EXCEPTION.getMessage());
         return ResponseEntity.status(ErrorCode.INVALID_ARGUMENT_EXCEPTION.getHttpStatusCode()).body(apiReponse);  
     }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<APIReponse> handlingAppException (AppException exception){
        ErrorCode errorCode = exception.getErrorCode();
        APIReponse apiReponse = new APIReponse();
        apiReponse.setStatusCode(errorCode.getCode());
        apiReponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiReponse); 
    }
    

}