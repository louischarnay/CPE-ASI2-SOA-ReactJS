package com.cpe.cardgenerator.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageStatusRepository repository;

    public Long createNewMessageEntry() {
        MessageStatus status = new MessageStatus();
        status.setImageReceived(false);
        status.setDescReceived(false);
        repository.save(status);
        return status.getId();
    }

    public void processImageMessage(Long id, String message) {
        MessageStatus status = repository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        status.setImageReceived(true);
        repository.save(status);
        checkAndTriggerEvent(status);
    }

    public void processDescMessage(Long id, String message) {
        MessageStatus status = repository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        status.setDescReceived(true);
        repository.save(status);
        checkAndTriggerEvent(status);
    }

    private void checkAndTriggerEvent(MessageStatus status) {
        if (status.isImageReceived() && status.isDescReceived()) {
            // Both messages are received, trigger an event
            System.out.println("Both image and description received. Triggering event...");
            // Trigger your desired event here
        }
    }
}

