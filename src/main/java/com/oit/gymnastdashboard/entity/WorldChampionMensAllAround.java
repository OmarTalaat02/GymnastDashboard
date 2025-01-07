// Represents the database table in Java, Maps the database columns to fields in class using JPA

package com.oit.gymnastdashboard.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "world_champ_mens_all_around")
public class WorldChampionMensAllAround {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer overallRank;
    private String nationality;
    private String apparatus;
    private Double diff;
    private Double exec;
    private Double total;
    private Integer rank;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOverallRank() {
        return overallRank;
    }

    public void setOverallRank(Integer overallRank) {
        this.overallRank = overallRank;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getApparatus() {
        return apparatus;
    }

    public void setApparatus(String apparatus) {
        this.apparatus = apparatus;
    }

    public Double getDiff() {
        return diff;
    }

    public void setDiff(Double diff) {
        this.diff = diff;
    }

    public Double getExec() {
        return exec;
    }

    public void setExec(Double exec) {
        this.exec = exec;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}
