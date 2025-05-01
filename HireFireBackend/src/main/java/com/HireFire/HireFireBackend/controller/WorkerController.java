package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.model.Appointment;
import com.HireFire.HireFireBackend.model.Worker;
import com.HireFire.HireFireBackend.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorker(@PathVariable Long id) {
        Worker worker = workerService.getWorkerById(id);
        return ResponseEntity.ok(worker);
    }

    @PutMapping("/{id}/location")
    public ResponseEntity<Worker> updateLocation(
            @PathVariable Long id,
            @RequestParam String location) {
        Worker worker = workerService.updateLocation(id, location);
        return ResponseEntity.ok(worker);
    }

    @GetMapping("/{id}/appointments/pending")
    public ResponseEntity<List<Appointment>> getPendingAppointments(@PathVariable Long id) {
        List<Appointment> appointments = workerService.getPendingAppointments(id);
        return ResponseEntity.ok(appointments);
    }
}