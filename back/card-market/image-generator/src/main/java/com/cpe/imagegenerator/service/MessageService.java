package com.cpe.imagegenerator.service;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private ImageGeneratorService imageGeneratorService;

    @Autowired
    private ProducerTemplate producerTemplate;

    // Method to process the image message
    public void processImageMessage(Long id, String promptText) {
        // Here, you would add logic to handle the image-related message.
        // For example, you could store it in the database, log it, or trigger some other logic.
        System.out.println("Processing image for ID: " + id + " with details: " + promptText);

        String imageData = imageGeneratorService.generateImage(promptText);

        producerTemplate.sendBodyAndHeader("direct:sendToOrchestrator", imageData, "id", id);
        System.out.println("Image sent to 'image-generated' topic.");
    }
}