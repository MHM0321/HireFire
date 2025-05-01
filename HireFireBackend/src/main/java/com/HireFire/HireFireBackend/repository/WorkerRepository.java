package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public class WorkerRepository{
    // Custom query: Find worker by email (for login)
    Worker findByEmail(String email) {
        return null;
    }
}