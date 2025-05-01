package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.WorkRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface WorkRequestRepository extends JpaRepository<WorkRequest, Integer> {

    List<WorkRequest> findByWorkerIdAndStatus(Integer workerId, String status);

    List<WorkRequest> findByCustomerId(Integer customerId);

    @Transactional
    @Modifying
    @Query("UPDATE WorkRequest wr SET wr.status = :status WHERE wr.id = :requestId")
    void updateStatus(Integer requestId, String status);

    boolean existsByCustomerIdAndWorkerIdAndStatus(Integer customerId, Integer workerId, String status);
}