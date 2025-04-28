package com.HireFire.HireFireBackend.repository;

import com.HireFire.HireFireBackend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByWorkerIdAndCustomerIdOrderByTimestampAsc(Long workerId, Long customerId);
    List<Chat> findByWorkerId(Long workerId); // Get all chats for a worker
}