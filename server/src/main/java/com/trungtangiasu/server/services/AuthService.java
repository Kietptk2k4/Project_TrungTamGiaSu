package com.trungtangiasu.server.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.trungtangiasu.server.JDBCRepositories.AuthRepository;
import com.trungtangiasu.server.exception.AppException;
import com.trungtangiasu.server.exception.ErrorCode;
import com.trungtangiasu.server.jdbc.dto.reponse.LoginResponse;

import lombok.experimental.NonFinal;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    @NonFinal
    protected String SIGNER_KEY ="1TjXchw5FloESb63Kc+DFhTARvpWL4jUGCwfGWxuG5SIf/1y/LgJxHnMqaF6A/ij";

    @NonFinal
    protected long VALID_DURATION=10000;


    public LoginResponse login(String email, String password) {
        Map<String, Object> account = authRepository.findAccountByEmail(email);

        if (account == null) {
            throw new AppException(ErrorCode.LOGIN_FAILED_EXCEPTION);
        }

        String hashedPassword = (String) account.get("hashed_password");
        Boolean isActive = (Boolean) account.get("is_active");

        if (!isActive) {
            throw new AppException(ErrorCode.LOCKED_USER_EXCEPTION);
        }

        if (!passwordEncoder.matches(password, hashedPassword)) {
            throw new AppException(ErrorCode.LOGIN_FAILED_EXCEPTION);
        }
        Map<String, Object> user = new HashMap<>();
        Object userIdObj = account.get("user_id");
        int userId = (userIdObj instanceof Integer) ? (Integer) userIdObj : Integer.parseInt((String) userIdObj);
        
        if (account.get("role_name").equals("CUSTOMER")) {
            user = authRepository.findCustomerIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        } else if (account.get("role_name").equals("TUTOR")) {
            user = authRepository.findTutorIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        } else if (account.get("role_name").equals("ADMIN")) {
            user = authRepository.findAdminIDByUserId(userId);
            if (user == null) {
                throw new AppException(ErrorCode.USER_NOT_FOUND_EXCEPTION);
            }
        }

        // Tạo fake token (nếu dùng JWT thật thì tạo ở đây)
        String token = generateToken(userId);

        Map<String, Object> userRes = new HashMap<>();
        userRes.put("username", account.get("username"));
        userRes.put("email", account.get("email"));
        userRes.put("role", account.get("role_name"));


        if (account.get("role_name").equals("CUSTOMER")) {
            userRes.put("id", user.get("customer_id"));
        } else if (account.get("role_name").equals("TUTOR")) {
            userRes.put("id", user.get("tutor_id"));
        } else if (account.get("role_name").equals("ADMIN")) {
            userRes.put("id", user.get("admin_id"));
        }
        // userRes.put("id", account.get("user_id"));
        return new LoginResponse(token, userRes);
    }
    private String generateToken(int userID) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                
                .issuer("devteria.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("user_id", userID)
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }
}
