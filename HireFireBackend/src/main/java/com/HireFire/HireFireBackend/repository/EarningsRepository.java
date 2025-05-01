package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Earnings;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class EarningsRepository{
    List<Earnings> findByWorkerId(Long workerId) {
        return null;
    }

    List<Earnings> findByWorkerIdAndIsWithdrawn(Long workerId, boolean isWithdrawn) {
        return null;
    }

    List<Earnings> findByWorkerIdAndDateEarnedBetween(Long workerId, String startDate, String endDate) {
        return null;
    }
}