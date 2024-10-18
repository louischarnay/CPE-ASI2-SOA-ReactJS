package com.cpe.descriptiongenerator.service;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private DescriptionGeneratorService descriptionGeneratorService;

    @Autowired
    private ProducerTemplate producerTemplate;

    // Method to process the image message
    public void processDescMessage(Long id, String promptText) {
        // Here, you would add logic to handle the image-related message.
        // For example, you could store it in the database, log it, or trigger some other logic.
        System.out.println("Processing image for ID: " + id + " with details: " + promptText);

        String description = descriptionGeneratorService.generateDescription(promptText);

        producerTemplate.sendBodyAndHeader("direct:sendToOrchestrator", description, "id", id);
        System.out.println("Description sent to 'desc-generated' topic.");
    }
}