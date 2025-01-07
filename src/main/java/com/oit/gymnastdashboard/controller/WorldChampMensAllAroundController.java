// Defines the REST API endpoints that clients can use to interact with the application.

package com.oit.gymnastdashboard.controller;

import com.oit.gymnastdashboard.entity.WorldChampionMensAllAround;
import com.oit.gymnastdashboard.service.WorldChampMensAllAroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gymnasts")
public class WorldChampMensAllAroundController {

    @Autowired
    private WorldChampMensAllAroundService service;

    // Get all gymnasts
    @GetMapping
    public List<WorldChampionMensAllAround> list() {
        return service.listAll();
    }

    // Get gymnast by ID
    @GetMapping("/{id}")
    public WorldChampionMensAllAround getById(@PathVariable Long id) {
        return service.get(id);
    }

    // Filter gymnasts by name
    @GetMapping("/filter")
    public List<WorldChampionMensAllAround> filter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String nationality,
            @RequestParam(required = false) Integer overallRank) {
        if (name != null) {
            return service.filterByName(name);
        } else if (nationality != null) {
            return service.filterByNationality(nationality);
        } else if (overallRank != null) {
            return service.filterByOverallRank(overallRank);
        } else {
            return service.listAll();
        }
    }


}