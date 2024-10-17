package com.cpe.imagegenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private ImageGeneratorService imageGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    // Method to process the image message
    public void processImageMessage(Long id, String promptText) {
        // Here, you would add logic to handle the image-related message.
        // For example, you could store it in the database, log it, or trigger some other logic.
        System.out.println("Processing image for ID: " + id + " with details: " + promptText);

        String imageData = imageGeneratorService.generateImage(promptText);

        jmsTemplate.convertAndSend("jms:topic:image-generated", imageData);
        System.out.println("Image sent to 'image-generated' topic.");
    }
}