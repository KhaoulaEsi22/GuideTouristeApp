package com.yourcompany.touristappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.yourcompany.touristappbackend.model")
public class TouristAppBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TouristAppBackendApplication.class, args);
    }

}
