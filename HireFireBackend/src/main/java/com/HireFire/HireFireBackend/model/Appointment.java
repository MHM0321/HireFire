package com.HireFire.HireFireBackend.model;

import javax.persistence.*;



public class Appointment {


    private Long id;


    private Worker worker;


    private Customer customer;

    private String dateTime;  // ISO format: "2025-05-01T14:30"
    private String status;   // "PENDING", "ACCEPTED", "REJECTED"

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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}