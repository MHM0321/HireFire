package com.HireFire.HireFireBackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String createdAt;

    // Relationships with Workers
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<WorkRequest> workRequests;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Client> workerClients;

    // Relationships with Consultants
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<ConsultationRequest> consultationRequests;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<ConsultantClient> consultantClients;

    // Constructors
    public Customer() {}

    public Customer(String name, String email, String password, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    // Worker-related relationships
    public List<WorkRequest> getWorkRequests() {
        return workRequests;
    }

    public void setWorkRequests(List<WorkRequest> workRequests) {
        this.workRequests = workRequests;
    }

    public List<Client> getWorkerClients() {
        return workerClients;
    }

    public void setWorkerClients(List<Client> workerClients) {
        this.workerClients = workerClients;
    }

    // Consultant-related relationships
    public List<ConsultationRequest> getConsultationRequests() {
        return consultationRequests;
    }

    public void setConsultationRequests(List<ConsultationRequest> consultationRequests) {
        this.consultationRequests = consultationRequests;
    }

    public List<ConsultantClient> getConsultantClients() {
        return consultantClients;
    }

    public void setConsultantClients(List<ConsultantClient> consultantClients) {
        this.consultantClients = consultantClients;
    }

    // Utility Methods
    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}