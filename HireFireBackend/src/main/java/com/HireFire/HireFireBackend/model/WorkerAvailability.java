// src/main/java/com/HireFire/HireFireBackend/model/WorkerAvailability.java
package com.HireFire.HireFireBackend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "worker_availability")
public class WorkerAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "worker_id", nullable = false)
    private Worker worker;

    @Column(name = "date", nullable = false)
    private String date; // Format: "YYYY-MM-DD"

    @Column(name = "hour", nullable = false)
    private Integer hour; // 0-23 representing the hour

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    // Constructors
    public WorkerAvailability() {}

    public WorkerAvailability(Worker worker, String date, Integer hour) {
        this.worker = worker;
        this.date = date;
        this.hour = hour;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    // toString() method for debugging
    @Override
    public String toString() {
        return "WorkerAvailability{" +
                "id=" + id +
                ", worker=" + worker +
                ", date='" + date + '\'' +
                ", hour=" + hour +
                ", isAvailable=" + isAvailable +
                '}';
    }
}