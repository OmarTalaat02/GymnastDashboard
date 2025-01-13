// Provides database operations such as save, delete, find, etc.

package com.oit.gymnastdashboard.repository;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorldChampionMensAllAroundRepository extends JpaRepository<WorldChampMensAllAround, Long> {

    // Find by name (case-insensitive)
    List<WorldChampMensAllAround> findByNameIgnoreCase(String name);

    // Find by nationality (case-insensitive)
    List<WorldChampMensAllAround> findByNationalityIgnoreCase(String nationality);

    // Find by Overall Rank
    List<WorldChampMensAllAround> findByOverallRank(Integer overallRank);

    // Count gymnasts by nationality
    @Query("SELECT w.nationality, COUNT(w) FROM WorldChampMensAllAround w GROUP BY w.nationality")
    List<Object[]> countGymnastsByNationality();

    //
}
