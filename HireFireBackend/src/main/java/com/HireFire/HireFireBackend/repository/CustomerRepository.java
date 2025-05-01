package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // Custom methods if needed
}