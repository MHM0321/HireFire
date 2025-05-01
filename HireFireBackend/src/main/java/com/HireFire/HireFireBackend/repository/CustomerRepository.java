package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class CustomerRepository{
    Customer findByEmail(String email) // For customer login
    {
        return null;
    }

    List<Customer> findByNameContainingIgnoreCase(String name) // Search customers by name
    {
        return null;
    }
}