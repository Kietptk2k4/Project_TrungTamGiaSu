package com.trungtangiasu.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.jdbc.dto.reponse.LoginResponse;
import com.trungtangiasu.server.jdbc.dto.request.LoginRequest;
import com.trungtangiasu.server.jdbc.dto.request.RegisterRequest;
import com.trungtangiasu.server.services.AuthService;
import com.trungtangiasu.server.services.RegistrationService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RegistrationService registrationService;


    @PostMapping("/login")
    public ResponseEntity<APIReponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        APIReponse<LoginResponse> apiReponse = new APIReponse<>();
        LoginResponse response = authService.login(request.getEmail(), request.getPassword());
        apiReponse.setData(response);
        return ResponseEntity.ok(apiReponse);
       
    }

    
    @PostMapping("/register")
    public ResponseEntity<APIReponse> register(@RequestBody RegisterRequest request) throws Exception {
        registrationService.registerUser(request);
        APIReponse apiReponse = new APIReponse();
        apiReponse.setStatusCode(1000);
        apiReponse.setMessage("Đăng ký thành công!");
        return ResponseEntity.ok(apiReponse);
      
    }
}
