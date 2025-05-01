package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByWorkerId(Integer workerId);

    boolean existsByCustomerIdAndWorkerId(Integer customerId, Integer workerId);

    @Query("SELECT c FROM Client c WHERE c.worker.id = :workerId AND c.customer.id = :customerId")
    Client findByWorkerIdAndCustomerId(Integer workerId, Integer customerId);
}