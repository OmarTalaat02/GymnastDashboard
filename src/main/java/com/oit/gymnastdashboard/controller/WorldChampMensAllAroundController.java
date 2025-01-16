// Defines the REST API endpoints that clients can use to interact with the application.
package com.oit.gymnastdashboard.controller;

import com.oit.gymnastdashboard.dto.PaginatedResponse;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import com.oit.gymnastdashboard.service.WorldChampMensAllAroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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

    // Get gymnast by nationality
    @GetMapping("/stats/gymnasts-by-nationality")
    public List<Map<String, Object>> getGymnastsByNationality() {
        System.out.println("Endpoint '/stats/gymnasts-by-nationality' was called.");
        return service.getGymnastsByNationality();
    }

    @GetMapping("/visualization/apparatus-performance")
    public List<Map<String, Object>> getApparatusPerformance() {
        System.out.println("Endpoint '/visualization/apparatus-performance' was called.");
        return service.getApparatusPerformance();
    }

    @GetMapping("/visualization/overall-ranks")
    public List<Map<String, Object>> getOverallRanks() {
        System.out.println("Endpoint '/visualization/overall-ranks' was called.");
        return service.getOverallRanks();
    }


    // Endpoint for getting a gymnast by ID
    @GetMapping("/{id:\\d+}")
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

    @GetMapping("/sorted")
    public Page<WorldChampMensAllAround> getSortedGymnasts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size,
            @RequestParam(defaultValue = "default") String sortBy,
            @RequestParam(defaultValue = "asc") String order,
            @RequestParam(required = false) String apparatus
    ) {
        Pageable pageable;
        if ("default".equals(sortBy)) {
            pageable = PageRequest.of(page, size); // Default order
        } else {
            Sort.Direction sortDirection = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
            pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        }

        return service.getFilteredAndSortedGymnasts(apparatus, pageable);
    }

    @GetMapping("/unique-apparatus")
    public List<String> getUniqueApparatus() {
        return service.getUniqueApparatus();
    }



    // Get all gymnasts
    @GetMapping
    public List<WorldChampMensAllAround> list() {
        return service.listAll();
    }
}
