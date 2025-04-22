package com.trungtangiasu.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        final String[] WHITELIST_URLS = {
            "/api/auth/register",
            "/api/auth/login",
            "/api/tutors"
        };
        http
            .csrf().disable() // Tắt CSRF cho REST API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST,WHITELIST_URLS).permitAll() // Cho phép truy cập không cần xác thực
                .requestMatchers(HttpMethod.GET,WHITELIST_URLS).permitAll() // Cho phép truy cập không cần xác thực
                .requestMatchers(HttpMethod.OPTIONS,WHITELIST_URLS).permitAll() // Cho phép truy cập không cần xác thực
                .anyRequest().authenticated() // Các request còn lại yêu cầu xác thực
            )
            .httpBasic().disable() // Tắt Basic Authentication
            .formLogin().disable() // Tắt form login
            .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                }); // Xử lý lỗi nếu người dùng chưa xác thực

        return http.build();
    }
}
