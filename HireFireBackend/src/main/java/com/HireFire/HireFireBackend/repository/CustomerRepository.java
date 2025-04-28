package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email); // For customer login
    List<Customer> findByNameContainingIgnoreCase(String name); // Search customers by name
}