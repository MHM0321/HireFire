package com.HireFire.HireFireBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "workers")
public class Worker {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String mobileNumber;

    private String specialization;

    private LocalDateTime createdAt;

    private String deviceToken; // For sending push notifications

}

