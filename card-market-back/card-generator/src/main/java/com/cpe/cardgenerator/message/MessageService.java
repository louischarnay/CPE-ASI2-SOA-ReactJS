package com.cpe.cardgenerator.message;

import com.cpe.cardgenerator.controller.CardGenerator;
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

    private void checkAndTriggerEvent(MessageStatus status) {
        if (status.isImageReceived() && status.isDescReceived()) {
            // Both messages are received, trigger an event
            System.out.println("Both image and description received. Triggering event...");
            // Get id, imageURL, and desc from the database
            Long id = status.getId();
            String imageURL = status.getImageURL();
            String desc = status.getDesc();

            System.out.println("ID: " + id);
            System.out.println("Image URL: " + imageURL);
            System.out.println("Description: " + desc);

            // Call the generateProps method in CardGenerator
            CardGenerator cardGenerator = new CardGenerator();
            cardGenerator.generateProps(id, imageURL, desc);
        }
    }
}

