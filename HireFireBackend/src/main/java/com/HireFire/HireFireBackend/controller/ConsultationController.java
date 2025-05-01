package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.dto.ConsultationRequestDTO;
import com.HireFire.HireFireBackend.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired private ConsultationService consultationService;

    @GetMapping("/consultant/{consultantId}/pending")
    public List<ConsultationRequestDTO> getPendingRequests(
            @PathVariable Integer consultantId) {
        return consultationService.getPendingRequests(consultantId);
    }

    @PostMapping("/{requestId}/accept")
    public void acceptRequest(@PathVariable Integer requestId) {
        consultationService.acceptRequest(requestId);
    }

    @PostMapping("/{requestId}/reject")
    public void rejectRequest(@PathVariable Integer requestId) {
        consultationService.rejectRequest(requestId);
    }
}