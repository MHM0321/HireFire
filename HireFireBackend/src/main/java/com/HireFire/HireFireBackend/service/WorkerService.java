// src/main/java/com/HireFire/HireFireBackend/service/WorkerService.java
package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Worker;
import com.HireFire.HireFireBackend.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class WorkerService {

    private final WorkerRepository workerRepository;

    private static final Pattern GIBBERISH_PATTERN = Pattern.compile(
            "(.)\\1{3,}|([a-zA-Z])\\2{2,}|(qwerty|asdfgh|zxcvbn)"
    );

    @Autowired
    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public Worker updateWorkerLocation(Integer workerId, String newLocation) {
        validateLocation(newLocation);

        Optional<Worker> optionalWorker = workerRepository.findById(workerId);
        if (optionalWorker.isPresent()) {
            Worker worker = optionalWorker.get();
            worker.setLocation(newLocation);
            return workerRepository.save(worker);
        }
        throw new RuntimeException("Worker not found with id: " + workerId);
    }

    private void validateLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            throw new IllegalArgumentException("Location cannot be empty");
        }

        if (location.length() < 2 || location.length() > 100) {
            throw new IllegalArgumentException("Location must be between 2 and 100 characters");
        }

        if (!location.matches("^[a-zA-Z\\s,-]+$")) {
            throw new IllegalArgumentException("Location can only contain letters, spaces, hyphens, and commas");
        }

        if (GIBBERISH_PATTERN.matcher(location.toLowerCase()).find()) {
            throw new IllegalArgumentException("Location appears to be invalid");
        }
    }

    public String getWorkerLocation(Integer workerId) {
        Optional<Worker> optionalWorker = workerRepository.findById(workerId);
        if (optionalWorker.isPresent()) {
            return optionalWorker.get().getLocation();
        }
        throw new RuntimeException("Worker not found with id: " + workerId);
    }
}