package com.HireFire.HireFireBackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "consultants")
public class Consultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String password;
    private String specialization;
    private String qualifications;
    private Double hourlyRate;
    private Double rating;
    private String createdAt;

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL)
    private List<ConsultationRequest> consultationRequests;

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL)
    private List<ConsultantClient> clients;

    // Constructors
    public Consultant() {}

    public Consultant(String name, String email, String password, String specialization) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialization = specialization;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public List<ConsultationRequest> getConsultationRequests() {
        return consultationRequests;
    }

    public void setConsultationRequests(List<ConsultationRequest> consultationRequests) {
        this.consultationRequests = consultationRequests;
    }

    public List<ConsultantClient> getClients() {
        return clients;
    }

    public void setClients(List<ConsultantClient> clients) {
        this.clients = clients;
    }
}