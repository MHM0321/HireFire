package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Custom query: Find pending appointments for a worker
    List<Appointment> findByWorkerIdAndStatus(Long workerId, String status);
}