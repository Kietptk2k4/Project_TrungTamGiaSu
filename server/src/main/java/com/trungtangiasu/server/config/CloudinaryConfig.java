package com.trungtangiasu.server.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dsfgzdr5z");
        config.put("api_key", "842329694719172");
        config.put("api_secret", "LDI5Q4TVdgt6lc_JWj_gA2xD1HY");

        return new Cloudinary(config);
    }
}
