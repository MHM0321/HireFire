package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.dto.ClientDTO;
import com.HireFire.HireFireBackend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired private ClientService clientService;

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<ClientDTO>> getClientsByWorker(
            @PathVariable Integer workerId) {
        return ResponseEntity.ok(clientService.getClientsByWorker(workerId));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeClient(
            @RequestParam Integer workerId,
            @RequestParam Integer customerId) {
        clientService.removeClient(workerId, customerId);
        return ResponseEntity.ok().build();
    }
}