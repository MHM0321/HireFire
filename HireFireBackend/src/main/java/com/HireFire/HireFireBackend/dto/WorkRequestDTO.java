package com.HireFire.HireFireBackend.dto;

public class WorkRequestDTO {
    private Integer id;
    private String customerName;
    private String workerOccupation;
    private String requestedDate;
    private String requestedTime;
    private String message;
    private String status;

    // Constructors
    public WorkRequestDTO() {}

    public WorkRequestDTO(Integer id, String customerName, String workerOccupation,
                          String requestedDate, String requestedTime,
                          String message, String status) {
        this.id = id;
        this.customerName = customerName;
        this.workerOccupation = workerOccupation;
        this.requestedDate = requestedDate;
        this.requestedTime = requestedTime;
        this.message = message;
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

    public String getWorkerOccupation() {
        return workerOccupation;
    }

    public void setWorkerOccupation(String workerOccupation) {
        this.workerOccupation = workerOccupation;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "WorkRequestDTO{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", workerOccupation='" + workerOccupation + '\'' +
                ", requestedDate='" + requestedDate + '\'' +
                ", requestedTime='" + requestedTime + '\'' +
                ", message='" + message + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}