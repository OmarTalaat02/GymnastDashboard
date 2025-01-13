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

    public List<WorldChampMensAllAround> listAll() {
        return repository.findAll();
    }

    public WorldChampMensAllAround get(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gymnast not found with ID " + id));
    }

    public List<WorldChampMensAllAround> filterByName(String name) {
        return repository.findByNameIgnoreCase(name);
    }

    public List<WorldChampMensAllAround> filterByNationality(String nationality) {
        return repository.findByNationalityIgnoreCase(nationality);
    }

    public List<WorldChampMensAllAround> filterByOverallRank(Integer overallRank) {
        return repository.findByOverallRank(overallRank);
    }

    public Page<WorldChampMensAllAround> getPagedGymnasts(Pageable pageable) {
        return repository.findAll(pageable);
    }

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
}

