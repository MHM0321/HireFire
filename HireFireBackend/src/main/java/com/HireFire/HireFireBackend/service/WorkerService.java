package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Worker;
import com.HireFire.HireFireBackend.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    public Worker getWorkerById(Long id) {
        return workerRepository.findById(id).orElse(null);
    }

    public Worker updateWorkerLocation(Long id, String location) {
        Worker worker = workerRepository.findById(id).orElse(null);
        if (worker != null) {
            worker.setLocation(location);
            workerRepository.save(worker);
        }
        return worker;
    }
}