package com.oit.gymnastdashboard;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Applies to all endpoints
                registry.addMapping("/**")

                        // Allwos requests from this origin *can make it broader with astrix to accept from all origins
                        .allowedOrigins("http://localhost:3000")

                        //Allows specific methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}

