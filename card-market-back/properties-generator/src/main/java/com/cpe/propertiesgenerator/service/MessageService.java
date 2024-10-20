package com.cpe.propertiesgenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MessageService {

    @Autowired
    private PropertiesGeneratorService propertiesGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    // Method to process the image message
    public void processPropMessage(Long id, String imageUrl) {
        System.out.println("Processiong properties for image: " + id + " with image : " + imageUrl);

        // Generate properties from the image
        Map<String, Float> properties = propertiesGeneratorService.generateProperties(imageUrl);

        // Send the properties to the 'prop-generated' topic
        jmsTemplate.convertAndSend("prop-generated", properties, message -> {
            message.setLongProperty("id", id);
            return message;
        });
    }
}