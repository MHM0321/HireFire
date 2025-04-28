package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Earnings;
import com.HireFire.HireFireBackend.repository.EarningsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EarningsService {

    @Autowired
    private EarningsRepository earningsRepository;

    public List<Earnings> getWorkerEarnings(Long workerId) {
        return earningsRepository.findByWorkerId(workerId);
    }

    public Earnings recordEarning(Earnings earning) {
        return earningsRepository.save(earning);
    }

    public List<Earnings> withdrawEarnings(Long workerId) {
        List<Earnings> earnings = earningsRepository.findByWorkerIdAndIsWithdrawn(workerId, false);
        earnings.forEach(e -> e.setWithdrawn(true));
        return earningsRepository.saveAll(earnings);
    }
}