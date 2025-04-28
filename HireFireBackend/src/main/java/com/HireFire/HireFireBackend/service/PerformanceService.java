package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Performance;
import com.HireFire.HireFireBackend.repository.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceRepository performanceRepository;

    public List<Performance> getWorkerHistory(Long workerId) {
        return performanceRepository.findByWorkerId(workerId);
    }

    public List<Performance> getCompletedJobs(Long workerId) {
        return performanceRepository.findByWorkerIdAndStatus(workerId, "COMPLETED");
    }

    public Performance recordJobCompletion(Performance performance) {
        performance.setStatus("COMPLETED");
        return performanceRepository.save(performance);
    }
}