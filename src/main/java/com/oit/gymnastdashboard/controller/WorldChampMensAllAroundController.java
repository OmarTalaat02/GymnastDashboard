// Defines the REST API endpoints that clients can use to interact with the application.
package com.oit.gymnastdashboard.controller;

import com.oit.gymnastdashboard.dto.PaginatedResponse;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import com.oit.gymnastdashboard.service.WorldChampMensAllAroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gymnasts")
public class WorldChampMensAllAroundController {

    @Autowired
    private WorldChampMensAllAroundService service;

    // Endpoint for paged gymnasts
    @GetMapping("/paged")
    public PaginatedResponse<WorldChampMensAllAround> getPagedGymnasts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<WorldChampMensAllAround> pagedGymnasts = service.getPagedGymnasts(PageRequest.of(page, size));

        return new PaginatedResponse<>(
                pagedGymnasts.getContent(),
                pagedGymnasts.getNumber(),
                pagedGymnasts.getTotalPages(),
                pagedGymnasts.getTotalElements()
        );
    }

    // Endpoint for getting a gymnast by ID
    @GetMapping("/{id}")
    public WorldChampMensAllAround getById(@PathVariable Long id) {
        return service.get(id);
    }

    // Filter gymnasts by name
    @GetMapping("/filter")
    public List<WorldChampMensAllAround> filter(
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

    // Get all gymnasts
    @GetMapping
    public List<WorldChampMensAllAround> list() {
        return service.listAll();
    }
}
