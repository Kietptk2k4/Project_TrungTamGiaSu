package com.trungtangiasu.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Thêm phép truy cập cho tất cả các API dưới đường dẫn "/api/**"
        registry.addMapping("/api/**") 
                .allowedOrigins("http://localhost:5173") // Cho phép frontend ở địa chỉ này
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
                .allowedHeaders("*") // Cho phép tất cả các header
                .allowCredentials(true); // Cho phép gửi cookie/tokens 
    }
}
