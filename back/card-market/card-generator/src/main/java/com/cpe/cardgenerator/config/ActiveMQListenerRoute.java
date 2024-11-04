package com.cpe.cardgenerator.config;

import com.cpe.cardgenerator.message.MessageService;
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
        from("jms:topic:image-generated")
                .log("Received message from image-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);  // Retrieve the message ID
                    System.out.println("Processing image message for ID: " + id);
                    messageService.processImageMessage(id, message);  // Process the image message
                });

        // Listen on the 'desc-generated' topic
        from("jms:topic:desc-generated")
                .log("Received message from desc-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);  // Retrieve the message ID
                    System.out.println("Processing description message for ID: " + id);
                    messageService.processDescMessage(id, message);  // Process the description message
                });

        // Listen on the 'prop-generated' topic (optional if needed)
        from("jms:topic:prop-generated")
                .log("Received message from prop-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);  // Retrieve the message ID
                    System.out.println("Processing property message for ID: " + id);
                    messageService.processPropsMessage(id, message);  // Process the property message
                });
    }
}
