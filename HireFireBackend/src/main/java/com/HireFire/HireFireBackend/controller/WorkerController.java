// src/main/java/com/HireFire/HireFireBackend/controller/WorkerController.java
package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.model.Worker;
import com.HireFire.HireFireBackend.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService workerService;

    @Autowired
    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @PutMapping("/{workerId}/location")
    public ResponseEntity<?> updateLocation(
            @PathVariable Integer workerId,
            @RequestBody String newLocation) {
        try {
            Worker updatedWorker = workerService.updateWorkerLocation(workerId, newLocation);
            return ResponseEntity.ok(updatedWorker);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse("VALIDATION_ERROR", e.getMessage())
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ErrorResponse("NOT_FOUND", e.getMessage())
            );
        }
    }

    @GetMapping("/{workerId}/location")
    public ResponseEntity<?> getLocation(@PathVariable Integer workerId) {
        try {
            String location = workerService.getWorkerLocation(workerId);
            return ResponseEntity.ok(location);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ErrorResponse("NOT_FOUND", e.getMessage())
            );
        }
    }

    // Error response class
    private static class ErrorResponse {
        private final String error;
        private final String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }

        public String getError() {
            return error;
        }

        public String getMessage() {
            return message;
        }
    }
}