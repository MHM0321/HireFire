package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.dto.ConsultationRequestDTO;
import com.HireFire.HireFireBackend.model.*;
import com.HireFire.HireFireBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRequestRepository requestRepo;

    @Autowired
    private ConsultantClientRepository clientRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private ConsultantRepository consultantRepo;

    public List<ConsultationRequestDTO> getPendingRequests(Integer consultantId) {
        return requestRepo.findByConsultantIdAndStatus(consultantId, "PENDING").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void acceptRequest(Integer requestId) {
        ConsultationRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Consultation request not found with id: " + requestId));

        request.setStatus("ACCEPTED");
        requestRepo.save(request);

        if (!clientRepo.existsByCustomerIdAndConsultantId(
                request.getCustomer().getId(),
                request.getConsultant().getId()
        )) {
            ConsultantClient client = new ConsultantClient();
            client.setCustomer(request.getCustomer());
            client.setConsultant(request.getConsultant());
            clientRepo.save(client);
        }
    }

    @Transactional
    public void rejectRequest(Integer requestId) {
        ConsultationRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Consultation request not found with id: " + requestId));
        request.setStatus("REJECTED");
        requestRepo.save(request);
    }

    @Transactional
    public ConsultationRequestDTO createRequest(Integer customerId, Integer consultantId,
                                                String date, String time, String topic) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        Consultant consultant = consultantRepo.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found with id: " + consultantId));

        ConsultationRequest request = new ConsultationRequest();
        request.setCustomer(customer);
        request.setConsultant(consultant);
        request.setRequestedDate(date);
        request.setRequestedTime(time);
        request.setTopic(topic);
        request.setStatus("PENDING");

        ConsultationRequest savedRequest = requestRepo.save(request);
        return convertToDTO(savedRequest);
    }

    private ConsultationRequestDTO convertToDTO(ConsultationRequest request) {
        return new ConsultationRequestDTO(
                request.getId(),
                request.getCustomer().getName(),
                request.getConsultant().getSpecialization(),
                request.getRequestedDate(),
                request.getRequestedTime(),
                request.getTopic(),
                request.getStatus()
        );
    }
}