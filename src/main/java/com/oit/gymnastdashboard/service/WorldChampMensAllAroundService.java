// Contains business logic and acts as a bridge between the controller and repository layers.

package com.oit.gymnastdashboard.service;

import com.oit.gymnastdashboard.ResourceNotFoundException;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import com.oit.gymnastdashboard.repository.WorldChampionMensAllAroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorldChampMensAllAroundService {

    @Autowired
    private WorldChampionMensAllAroundRepository repository;

    // Retrieve all gymnasts
    public List<WorldChampMensAllAround> listAll() {
        return repository.findAll();
    }

    // Retrieve a gymnast by ID
    public WorldChampMensAllAround get(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gymnast not found with ID " + id));
    }

    // Filter gymnasts by name
    public List<WorldChampMensAllAround> filterByName(String name) {
        return repository.findByNameIgnoreCase(name);
    }

    // Filter gymnasts by nationality
    public List<WorldChampMensAllAround> filterByNationality(String nationality) {
        return repository.findByNationalityIgnoreCase(nationality);
    }

    // Filter gymnasts by overall rank
    public List<WorldChampMensAllAround> filterByOverallRank(Integer overallRank) {
        return repository.findByOverallRank(overallRank);
    }

    // Get paged gymnasts
    public Page<WorldChampMensAllAround> getPagedGymnasts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // Get sorted gymnasts with custom sorting
    public Page<WorldChampMensAllAround> getSortedGymnasts(Pageable pageable) {
        return repository.findSortedGymnasts(pageable); // Using the custom query from the repository
    }

    // Get gymnasts count by nationality
    public List<Map<String, Object>> getGymnastsByNationality() {
        List<Object[]> results = repository.countGymnastsByNationality();
        List<Map<String, Object>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            System.out.println("Nationality: " + result[0] + ", Count: " + result[1]); // Debugging log

            Map<String, Object> map = new HashMap<>();
            map.put("nationality", result[0]); // Nationality
            map.put("count", result[1]);      // Count
            formattedResults.add(map);
        }

        return formattedResults;
    }

    // Get apparatus performance data
    public List<Map<String, Object>> getApparatusPerformance() {
        List<Object[]> results = repository.getApparatusPerformanceData();
        List<Map<String, Object>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> map = new LinkedHashMap<>(); // Use LinkedHashMap
            map.put("gymnast", result[0]);
            map.put("apparatus", result[1]);
            map.put("score", result[2]);
            map.put("executionScore", result[3]);
            map.put("difficultyScore", result[4]);
            formattedResults.add(map);
        }

        return formattedResults;
    }

    // Get overall ranks
    public List<Map<String, Object>> getOverallRanks() {
        List<Object[]> results = repository.getOverallRanks();
        List<Map<String, Object>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("gymnast", result[0]);
            map.put("overallRank", result[1]);
            formattedResults.add(map);
        }

        return formattedResults;
    }

    public Page<WorldChampMensAllAround> getFilteredAndSortedGymnasts(String apparatus, Pageable pageable) {
        if (apparatus != null && !apparatus.isEmpty()) {
            // Filter by apparatus if provided
            return repository.findByApparatus(apparatus, pageable);
        } else {
            // Return all gymnasts if no apparatus is specified
            return repository.findAll(pageable);
        }
    }

    public List<String> getUniqueApparatus() {
        List<String> apparatus = repository.getUniqueApparatus();

        // Define the custom order
        List<String> customOrder = Arrays.asList("Floor", "Pommel Horse", "Rings", "Vault", "PBars", "High Bar");

        // Sort apparatus list based on the custom order
        apparatus.sort(Comparator.comparingInt(customOrder::indexOf));

        return apparatus;
    }




}
