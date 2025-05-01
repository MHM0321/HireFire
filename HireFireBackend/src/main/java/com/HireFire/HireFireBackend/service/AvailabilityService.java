package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.dto.AvailabilityDTO;
import com.HireFire.HireFireBackend.model.Worker;
import com.HireFire.HireFireBackend.model.WorkerAvailability;
import com.HireFire.HireFireBackend.repository.WorkerAvailabilityRepository;
import com.HireFire.HireFireBackend.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AvailabilityService {

    @Autowired
    private WorkerAvailabilityRepository workerAvailabilityRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Transactional
    public void setAvailability(AvailabilityDTO availabilityDTO) {
        Integer workerId = availabilityDTO.getWorkerId();
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found with id: " + workerId));

        // First remove existing availability for these dates
        availabilityDTO.getAvailability().keySet().forEach(date -> {
            workerAvailabilityRepository.deleteByWorkerIdAndDate(workerId, date);
        });

        // Then add new availability slots
        availabilityDTO.getAvailability().forEach((date, hours) -> {
            hours.forEach(hour -> {
                WorkerAvailability wa = new WorkerAvailability(worker, date, hour);
                workerAvailabilityRepository.save(wa);
            });
        });
    }

    public AvailabilityDTO getAvailability(Integer workerId) {
        List<WorkerAvailability> availabilityList = workerAvailabilityRepository.findByWorkerId(workerId);

        Map<String, List<Integer>> availabilityMap = availabilityList.stream()
                .collect(Collectors.groupingBy(
                        WorkerAvailability::getDate,
                        Collectors.mapping(WorkerAvailability::getHour, Collectors.toList())
                ));

        return new AvailabilityDTO(workerId, availabilityMap);
    }
}