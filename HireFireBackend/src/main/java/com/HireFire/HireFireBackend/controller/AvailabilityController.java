// src/main/java/com/HireFire/HireFireBackend/controller/AvailabilityController.java
package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.dto.AvailabilityDTO;
import com.HireFire.HireFireBackend.service.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @PostMapping
    public ResponseEntity<?> setAvailability(@RequestBody AvailabilityDTO availabilityDTO) {
        availabilityService.setAvailability(availabilityDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{workerId}")
    public ResponseEntity<AvailabilityDTO> getAvailability(@PathVariable Integer workerId) {
        AvailabilityDTO availability = availabilityService.getAvailability(workerId);
        return ResponseEntity.ok(availability);
    }
}