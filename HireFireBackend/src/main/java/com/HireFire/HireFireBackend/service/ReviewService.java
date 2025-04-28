package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Review;
import com.HireFire.HireFireBackend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getWorkerReviews(Long workerId) {
        return reviewRepository.findByWorkerId(workerId);
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public double calculateAverageRating(Long workerId) {
        return reviewRepository.findByWorkerId(workerId).stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}