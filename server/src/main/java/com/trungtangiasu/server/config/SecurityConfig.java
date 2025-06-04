package com.trungtangiasu.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring Spring Security");
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
            "/api/address/getAllProvinces",
            "/api/address/getAllWards",
            "/api/address/getAllDistricts",
            "/api/courses/allRegisterCourses",
            "/api/payment/vnpay",
            "/api/upload"
        };
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> {
                logger.debug("Setting up request matchers");
                auth
                .requestMatchers("OPTIONS", "/**").permitAll() // Cho phép tất cả yêu cầu OPTIONS
                .requestMatchers(WHITELIST_URLS).permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated();
            })
            .httpBasic().disable()
            .formLogin().disable()
            .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: " + authException.getMessage());
                });
        return http.build();
    }
}