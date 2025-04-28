package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Chat;
import com.HireFire.HireFireBackend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<Chat> getConversation(Long workerId, Long customerId) {
        return chatRepository.findByWorkerIdAndCustomerIdOrderByTimestampAsc(workerId, customerId);
    }

    public Chat sendMessage(Chat chat) {
        return chatRepository.save(chat);
    }
}