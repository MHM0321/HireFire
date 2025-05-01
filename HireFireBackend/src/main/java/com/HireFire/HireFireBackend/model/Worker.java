// src/main/java/com/HireFire/HireFireBackend/model/Worker.java
package com.HireFire.HireFireBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "workers")
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email should be valid")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Password cannot be empty")
    private String password;

    private String skills;
    private String experience;
    private Double hourlyRate;
    private String occupation;

    @Column(nullable = false)
    @NotBlank(message = "Location cannot be empty")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-Z\\s,-]+$", message = "Location can only contain letters, spaces, hyphens, and commas")
    private String location;

    public Worker() {
    }

    public Worker(String name, String email, String password, String skills,
                  String experience, Double hourlyRate, String location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skills = skills;
        this.experience = experience;
        this.hourlyRate = hourlyRate;
        this.location = location;
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

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOccupation() {
        return occupation;
    }
}