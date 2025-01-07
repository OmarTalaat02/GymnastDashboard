// Provides database operations such as save, delete, find, etc.

package com.oit.gymnastdashboard.repository;
import com.oit.gymnastdashboard.entity.WorldChampionMensAllAround;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorldChampionMensAllAroundRepository extends JpaRepository<WorldChampionMensAllAround, Long> {

    // Find by name (case-insensitive)
    List<WorldChampionMensAllAround> findByNameIgnoreCase(String name);

    // Find by nationality (case-insensitive)
    List<WorldChampionMensAllAround> findByNationalityIgnoreCase(String nationality);

    // Find by Overall Rank
    List<WorldChampionMensAllAround> findByOverallRank(Integer overallRank);


}
