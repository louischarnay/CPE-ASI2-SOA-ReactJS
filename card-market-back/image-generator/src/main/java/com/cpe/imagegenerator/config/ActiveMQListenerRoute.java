package com.cpe.imagegenerator.config;

import com.cpe.imagegenerator.message.MessageService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;  // Add the message service to process messages

    @Override
    public void configure() throws Exception {
        // Listen on the 'image-generated' topic
        from("jms:topic:generate-image")
                .log("Received message from image-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);  // Retrieve the message ID
                    messageService.processImageMessage(id, message);  // Process the image message
                    System.out.println("Processing image message for ID: " + id);
                    // Display the ID received
                    System.out.println("Received ID: " + id);
                });
    }
}
