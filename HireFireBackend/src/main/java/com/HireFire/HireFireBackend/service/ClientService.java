package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.dto.ClientDTO;
import com.HireFire.HireFireBackend.model.Client;
import com.HireFire.HireFireBackend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired private ClientRepository clientRepo;

    public List<ClientDTO> getClientsByWorker(Integer workerId) {
        return clientRepo.findByWorkerId(workerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void removeClient(Integer workerId, Integer customerId) {
        Client client = clientRepo.findByWorkerIdAndCustomerId(workerId, customerId);
        if (client != null) {
            clientRepo.delete(client);
        }
    }

    private ClientDTO convertToDTO(Client client) {
        return new ClientDTO(
                client.getId(),
                client.getCustomer().getName(),
                client.getCustomer().getPhone(),
                client.getSinceDate()
        );
    }
}