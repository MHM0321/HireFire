package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Earnings;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EarningsRepository extends JpaRepository<Earnings, Long> {
    List<Earnings> findByWorkerId(Long workerId);
    List<Earnings> findByWorkerIdAndIsWithdrawn(Long workerId, boolean isWithdrawn);
    List<Earnings> findByWorkerIdAndDateEarnedBetween(Long workerId, String startDate, String endDate);
}