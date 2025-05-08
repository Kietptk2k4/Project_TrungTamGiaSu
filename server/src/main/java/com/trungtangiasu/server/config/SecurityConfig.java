package com.trungtangiasu.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;
// @Configuration
// public class SecurityConfig {
//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.POST, "/api/customers/tutoringRequest").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/customers/getAllCourses/**").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/subjects/getAllSubjects").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/classes/getAllClasses").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/address/getAllProvinces").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/address/getAllDistricts").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/address/getAllWards").permitAll()
//                 .requestMatchers("/api/auth/register", "/api/auth/login", "/api/tutors").permitAll()
//                 .anyRequest().authenticated()
//             )
//             .httpBasic().disable()
//             .formLogin().disable()
//             .exceptionHandling()
//                 .authenticationEntryPoint((request, response, authException) -> {
//                     response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//                 });

//         return http.build();
//     }
// }

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        final String[] WHITELIST_URLS = {
            "/api/auth/register",
            "/api/auth/login",
            "/api/tutors",
            "/api/customers/tutoringRequest",
            "/api/customers/getAllCoursesInprogress/{customerId}",
            "/api/customers/getAllTutoringRequest/{customerId}",
            
            "/api/customers/getAllCourses/**",
            "/api/subjects/getAllSubjects",
            "/api/classes/getAllClasses",
            "/api/address/getAllProvinces","/api/address/getAllWards",
            "/api/address/getAllDistricts",
        };
        http
            .csrf().disable() // Tắt CSRF cho REST API
            .authorizeHttpRequests(auth -> auth
            .requestMatchers(WHITELIST_URLS).permitAll() // Áp dụng cho mọi phương thức HTTP
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
