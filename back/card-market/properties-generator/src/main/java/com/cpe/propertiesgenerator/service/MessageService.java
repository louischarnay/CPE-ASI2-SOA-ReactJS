package com.cpe.propertiesgenerator.service;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MessageService {

    @Autowired
    private PropertiesGeneratorService propertiesGeneratorService;

    @Autowired
    private ProducerTemplate producerTemplate;

    // Method to process the image message
    public void processPropMessage(Long id, String imageUrl) {
        System.out.println("Processiong properties for image: " + id + " with image : " + imageUrl);

        // Generate properties from the image
        Map<String, Float> properties = propertiesGeneratorService.generateProperties(imageUrl);

        // Send the properties to the orchestrator
        producerTemplate.sendBodyAndHeader("direct:sendToOrchestrator", properties, "id", id);
        System.out.println("Properties sent to 'prop-generated' topic.");
    }
}