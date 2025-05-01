package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.WorkerAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface WorkerAvailabilityRepository extends JpaRepository<WorkerAvailability, Integer> {

    List<WorkerAvailability> findByWorkerId(Integer workerId);

    List<WorkerAvailability> findByWorkerIdAndDate(Integer workerId, String date);

    @Transactional
    @Modifying
    @Query("DELETE FROM WorkerAvailability wa WHERE wa.worker.id = :workerId AND wa.date = :date")
    void deleteByWorkerIdAndDate(Integer workerId, String date);

    @Transactional
    @Modifying
    @Query("DELETE FROM WorkerAvailability wa WHERE wa.worker.id = :workerId AND wa.date = :date AND wa.hour = :hour")
    void deleteByWorkerIdAndDateAndHour(Integer workerId, String date, Integer hour);
}