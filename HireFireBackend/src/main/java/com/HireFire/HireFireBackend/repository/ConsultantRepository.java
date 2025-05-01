package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
    // Custom query methods can be added here if needed
}