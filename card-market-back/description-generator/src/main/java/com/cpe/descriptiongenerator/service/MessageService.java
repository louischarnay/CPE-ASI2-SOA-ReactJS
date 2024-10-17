package com.cpe.descriptiongenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private DescriptionGeneratorService descriptionGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    // Method to process the image message
    public void processDescMessage(Long id, String promptText) {
        // Here, you would add logic to handle the image-related message.
        // For example, you could store it in the database, log it, or trigger some other logic.
        System.out.println("Processing image for ID: " + id + " with details: " + promptText);

        String imageData = descriptionGeneratorService.generateDescription(promptText);

        jmsTemplate.convertAndSend("jms:topic:image-generated", imageData);
        System.out.println("Image sent to 'image-generated' topic.");
    }
}