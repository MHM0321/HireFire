package com.HireFire.HireFireBackend.dto;

public class ConsultationRequestDTO {
    private Integer id;
    private String customerName;
    private String consultantSpecialization;
    private String requestedDate;
    private String requestedTime;
    private String topic;
    private String status;

    // Constructors
    public ConsultationRequestDTO() {}

    public ConsultationRequestDTO(Integer id, String customerName, String consultantSpecialization,
                                  String requestedDate, String requestedTime, String topic, String status) {
        this.id = id;
        this.customerName = customerName;
        this.consultantSpecialization = consultantSpecialization;
        this.requestedDate = requestedDate;
        this.requestedTime = requestedTime;
        this.topic = topic;
        this.status = status;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getConsultantSpecialization() {
        return consultantSpecialization;
    }

    public void setConsultantSpecialization(String consultantSpecialization) {
        this.consultantSpecialization = consultantSpecialization;
    }

    public String getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(String requestedDate) {
        this.requestedDate = requestedDate;
    }

    public String getRequestedTime() {
        return requestedTime;
    }

    public void setRequestedTime(String requestedTime) {
        this.requestedTime = requestedTime;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString() for debugging
    @Override
    public String toString() {
        return "ConsultationRequestDTO{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", consultantSpecialization='" + consultantSpecialization + '\'' +
                ", requestedDate='" + requestedDate + '\'' +
                ", requestedTime='" + requestedTime + '\'' +
                ", topic='" + topic + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}