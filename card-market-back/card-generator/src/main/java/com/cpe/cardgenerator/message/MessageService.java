package com.cpe.cardgenerator.message;

import com.cpe.cardgenerator.controller.CardGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageStatusRepository repository;

    @Autowired
    private CardGenerator cardGenerator;

    public void processImageMessage(Long id, String message) {
        MessageStatus status = repository.findById(id).orElse(new MessageStatus());
        status.setImageURL(message);
        status.setImageReceived(true);
        repository.save(status);
        checkAndTriggerEvent(status);
    }

    public void processDescMessage(Long id, String message) {
        MessageStatus status = repository.findById(id).orElse(new MessageStatus());
        status.setDesc(message);
        status.setDescReceived(true);
        repository.save(status);
        checkAndTriggerEvent(status);
    }

    public void processPropsMessage(Long id, String message) {
        MessageStatus status = repository.findById(id).orElse(new MessageStatus());
        status.setProps(message);
        status.setPropsReceived(true);
        repository.save(status);
        System.out.println("Message is complete: " + id);
    }

    private void checkAndTriggerEvent(MessageStatus status) {
        if (status.isImageReceived() && status.isDescReceived()) {
            // Both messages are received, trigger an event
            System.out.println("Both image and description received. Triggering event...");
            // Get id, imageURL, and desc from the database
            Long id = status.getId();
            String imageURL = status.getImageURL();
            String desc = status.getDesc();

            // Generate props
            cardGenerator.generateProps(id, imageURL, desc);
        }
    }
}

