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
        config.put("api_key", "593247694313349");
        config.put("api_secret", "JUh2_fVn_nenOkACuSnj5v1yMpE");

        return new Cloudinary(config);
    }
}
