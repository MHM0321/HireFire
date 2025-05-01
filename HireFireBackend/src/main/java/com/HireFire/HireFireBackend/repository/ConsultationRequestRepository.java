package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.ConsultationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Integer> {
    List<ConsultationRequest> findByConsultantIdAndStatus(Integer consultantId, String status);
    List<ConsultationRequest> findByCustomerId(Integer customerId);
}