package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByWorkerId(Long workerId); // Get all reviews for a worker
    List<Review> findByCustomerId(Long customerId); // Get all reviews by a customer
    List<Review> findByWorkerIdAndIsFromCustomer(Long workerId, boolean isFromCustomer);
}