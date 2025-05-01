package com.HireFire.HireFireBackend.dto;

import java.util.Map;
import java.util.List;

public class AvailabilityDTO {
    private Integer workerId;
    private Map<String, List<Integer>> availability; // Key: date "YYYY-MM-DD", Value: List of hours (0-23)

    // Constructors
    public AvailabilityDTO() {
    }

    public AvailabilityDTO(Integer workerId, Map<String, List<Integer>> availability) {
        this.workerId = workerId;
        this.availability = availability;
    }

    // Getters and Setters
    public Integer getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Integer workerId) {
        this.workerId = workerId;
    }

    public Map<String, List<Integer>> getAvailability() {
        return availability;
    }

    public void setAvailability(Map<String, List<Integer>> availability) {
        this.availability = availability;
    }

    // toString() method for debugging
    @Override
    public String toString() {
        return "AvailabilityDTO{" +
                "workerId=" + workerId +
                ", availability=" + availability +
                '}';
    }

    // equals() and hashCode() if needed for comparisons
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AvailabilityDTO that = (AvailabilityDTO) o;

        if (workerId != null ? !workerId.equals(that.workerId) : that.workerId != null) return false;
        return availability != null ? availability.equals(that.availability) : that.availability == null;
    }

    @Override
    public int hashCode() {
        int result = workerId != null ? workerId.hashCode() : 0;
        result = 31 * result + (availability != null ? availability.hashCode() : 0);
        return result;
    }
}