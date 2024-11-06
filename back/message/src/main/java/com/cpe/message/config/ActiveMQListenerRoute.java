package com.cpe.message.config;

import com.cpe.message.message.MessageService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;  // Add the message service to process messages

    @Override
    public void configure() throws Exception {
        // Listen on the 'message' topic
        from("jms:topic:message")
                .log("Received message from message topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);  // Retrieve the message ID
                    System.out.println("Processing image message for ID: " + id);
                    messageService.processMessage(id, message);  // Process the image message
                });
    }
}