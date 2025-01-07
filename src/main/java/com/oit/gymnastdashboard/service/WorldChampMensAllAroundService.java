// Contains business logic and acts as a bridge between the controller and repository layers.

package com.oit.gymnastdashboard.service;

import com.oit.gymnastdashboard.ResourceNotFoundException;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import com.oit.gymnastdashboard.repository.WorldChampionMensAllAroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}

