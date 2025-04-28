package com.HireFire.HireFireBackend.model;

import javax.persistence.*;

@Entity
@Table(name = "earnings")
public class Earnings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    private double amount;
    private String dateEarned;  // "2025-05-01"
    private boolean isWithdrawn;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDateEarned() {
        return dateEarned;
    }

    public void setDateEarned(String dateEarned) {
        this.dateEarned = dateEarned;
    }

    public boolean isWithdrawn() {
        return isWithdrawn;
    }

    public void setWithdrawn(boolean withdrawn) {
        isWithdrawn = withdrawn;
    }
}