package com.trungtangiasu.server.exception;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandle{
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<String> handlingRuntimeException (RuntimeException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
     public ResponseEntity<String> handlingNotFoundException(MethodArgumentNotValidException exception) {
         return ResponseEntity.status(404).body(exception.getFieldError().getDefaultMessage());  // Sử dụng mã trạng thái 404 cho Not Found
     }
}