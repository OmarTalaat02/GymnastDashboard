// Provides database operations such as save, delete, find, etc.

package com.oit.gymnastdashboard.repository;
import com.oit.gymnastdashboard.entity.WorldChampMensAllAround;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorldChampionMensAllAroundRepository extends JpaRepository<WorldChampMensAllAround, Long> {

    @Query("SELECT w FROM WorldChampMensAllAround w")
    Page<WorldChampMensAllAround> findSortedGymnasts(Pageable pageable);

    @Query("SELECT w FROM WorldChampMensAllAround w WHERE w.apparatus = :apparatus")
    Page<WorldChampMensAllAround> findByApparatus(@Param("apparatus") String apparatus, Pageable pageable);

    @Query("SELECT DISTINCT w.apparatus FROM WorldChampMensAllAround w")
    List<String> getUniqueApparatus();



    // Find by name (case-insensitive)
    List<WorldChampMensAllAround> findByNameIgnoreCase(String name);

    // Find by nationality (case-insensitive)
    List<WorldChampMensAllAround> findByNationalityIgnoreCase(String nationality);

    // Find by Overall Rank
    List<WorldChampMensAllAround> findByOverallRank(Integer overallRank);

    // Count gymnasts by nationality
    @Query("SELECT w.nationality, COUNT(DISTINCT w.name) FROM WorldChampMensAllAround w GROUP BY w.nationality")
    List<Object[]> countGymnastsByNationality();

    // Get apparatus performance data
    @Query("SELECT w.name, w.apparatus, w.total, w.exec, w.diff FROM WorldChampMensAllAround w")
    List<Object[]> getApparatusPerformanceData();

    // Get overall ranks
    @Query("SELECT w.name, w.overallRank FROM WorldChampMensAllAround w ORDER BY w.overallRank ASC")
    List<Object[]> getOverallRanks();


}
