package com.HireFire.HireFireBackend.dto;

public class ConsultantClientDTO {
    private Integer id;
    private String customerName;
    private String customerPhone;
    private String sinceDate;

    // Constructors
    public ConsultantClientDTO() {}

    public ConsultantClientDTO(Integer id, String customerName, String customerPhone, String sinceDate) {
        this.id = id;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.sinceDate = sinceDate;
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

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getSinceDate() {
        return sinceDate;
    }

    public void setSinceDate(String sinceDate) {
        this.sinceDate = sinceDate;
    }

    // toString() for debugging
    @Override
    public String toString() {
        return "ConsultantClientDTO{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", sinceDate='" + sinceDate + '\'' +
                '}';
    }
}