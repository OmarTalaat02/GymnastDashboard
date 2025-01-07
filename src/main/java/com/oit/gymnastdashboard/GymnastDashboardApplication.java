package com.oit.gymnastdashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GymnastDashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymnastDashboardApplication.class, args);

		System.out.println("**************GymnastDashboardApplication is running on http://localhost:8081/  **************");
	}

}
