package com.HireFire.HireFireBackend.model;

import javax.persistence.*;


public class Review {


    private Long id;


    private Worker worker;


    private Customer customer;

    private int rating;  // 1-5
    private String comment;
    private boolean isFromCustomer;  // True if customer→worker, false if worker→customer

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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean isFromCustomer() {
        return isFromCustomer;
    }

    public void setFromCustomer(boolean fromCustomer) {
        isFromCustomer = fromCustomer;
    }
}