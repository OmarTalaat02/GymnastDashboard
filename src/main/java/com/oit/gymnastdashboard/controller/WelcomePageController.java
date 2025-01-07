package com.oit.gymnastdashboard.controller;

import com.oit.gymnastdashboard.service.WorldChampMensAllAroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class WelcomePageController {

    @Autowired
    private WorldChampMensAllAroundService service;

    // Get all gymnasts
    @GetMapping
    public String welcome() {
        return "welcome to the gymnast dashboard";
    }





}