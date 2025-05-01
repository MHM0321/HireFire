package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class ReviewRepository {
    List<Review> findByWorkerId(Long workerId) // Get all reviews for a worker
    {
        return null;
    }

    List<Review> findByCustomerId(Long customerId) // Get all reviews by a customer
    {
        return null;
    }

    List<Review> findByWorkerIdAndIsFromCustomer(Long workerId, boolean isFromCustomer) {
        return null;
    }
}