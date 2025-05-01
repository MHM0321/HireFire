package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.dto.WorkRequestDTO;
import com.HireFire.HireFireBackend.service.WorkRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-requests")
public class WorkRequestController {

    @Autowired private WorkRequestService workRequestService;

    @GetMapping("/worker/{workerId}/pending")
    public ResponseEntity<List<WorkRequestDTO>> getPendingRequests(
            @PathVariable Integer workerId) {
        return ResponseEntity.ok(workRequestService.getPendingRequests(workerId));
    }

    @PostMapping("/{requestId}/accept")
    public ResponseEntity<Void> acceptRequest(
            @PathVariable Integer requestId) {
        workRequestService.acceptRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{requestId}/reject")
    public ResponseEntity<Void> rejectRequest(
            @PathVariable Integer requestId) {
        workRequestService.rejectRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<WorkRequestDTO> createRequest(
            @RequestParam Integer customerId,
            @RequestParam Integer workerId,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam(required = false) String message) {
        return ResponseEntity.ok(workRequestService.createRequest(
                customerId, workerId, date, time, message));
    }
}