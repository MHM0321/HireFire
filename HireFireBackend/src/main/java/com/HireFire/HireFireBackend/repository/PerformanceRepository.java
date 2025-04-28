package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {

    // Get all performance records for a specific worker
    List<Performance> findByWorkerId(Long workerId);

    // Filter by completion status
    List<Performance> findByWorkerIdAndStatus(Long workerId, String status);

    // Get performance records within a date range
    List<Performance> findByWorkerIdAndWorkDateBetween(Long workerId, String startDate, String endDate);

    // Find specific worker-customer performance history
    List<Performance> findByWorkerIdAndCustomerId(Long workerId, Long customerId);
}