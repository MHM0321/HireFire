package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.dto.WorkRequestDTO;
import com.HireFire.HireFireBackend.model.*;
import com.HireFire.HireFireBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkRequestService {

    @Autowired private WorkRequestRepository workRequestRepo;
    @Autowired private ClientRepository clientRepo;
    @Autowired private WorkerRepository workerRepo;
    @Autowired private CustomerRepository customerRepo;

    public List<WorkRequestDTO> getPendingRequests(Integer workerId) {
        return workRequestRepo.findByWorkerIdAndStatus(workerId, "PENDING").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void acceptRequest(Integer requestId) {
        WorkRequest request = workRequestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + requestId));

        workRequestRepo.updateStatus(requestId, "ACCEPTED");

        if (!clientRepo.existsByCustomerIdAndWorkerId(
                request.getCustomer().getId(),
                request.getWorker().getId()
        )) {
            Client client = new Client();
            client.setCustomer(request.getCustomer());
            client.setWorker(request.getWorker());
            clientRepo.save(client);
        }
    }

    @Transactional
    public void rejectRequest(Integer requestId) {
        if (!workRequestRepo.existsById(requestId)) {
            throw new RuntimeException("Request not found with id: " + requestId);
        }
        workRequestRepo.updateStatus(requestId, "REJECTED");
    }

    public WorkRequestDTO createRequest(Integer customerId, Integer workerId,
                                        String date, String time, String message) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Worker worker = workerRepo.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        WorkRequest request = new WorkRequest();
        request.setCustomer(customer);
        request.setWorker(worker);
        request.setRequestedDate(date);
        request.setRequestedTime(time);
        request.setStatus("PENDING");
        request.setMessage(message);

        WorkRequest savedRequest = workRequestRepo.save(request);
        return convertToDTO(savedRequest);
    }

    private WorkRequestDTO convertToDTO(WorkRequest request) {
        return new WorkRequestDTO(
                request.getId(),
                request.getCustomer().getName(),
                request.getWorker().getOccupation(),
                request.getRequestedDate(),
                request.getRequestedTime(),
                request.getMessage(),
                request.getStatus()
        );
    }
}