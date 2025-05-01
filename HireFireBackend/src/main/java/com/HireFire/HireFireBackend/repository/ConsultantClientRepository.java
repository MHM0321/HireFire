package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.ConsultantClient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultantClientRepository extends JpaRepository<ConsultantClient, Integer> {
    List<ConsultantClient> findByConsultantId(Integer consultantId);
    boolean existsByCustomerIdAndConsultantId(Integer customerId, Integer consultantId);
}