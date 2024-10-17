package com.cpe.propertiesgenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private PropertiesGeneratorService propertiesGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    // Method to process the image message
    public void processPropMessage(Long id, String promptText) {
        // Here, you would add logic to handle the image-related message.
        // For example, you could store it in the database, log it, or trigger some other logic.
        System.out.println("Processing properties for ID: " + id + " with details: " + promptText);
    }
}