package com.cpe.descriptiongenerator.config;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        // Listen on the 'generate-image' topic
        from("jms:topic:generate-desc")
                .log("Received message from generate-desc topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    // Add any custom logic for processing the message
                    System.out.println("Processing message: " + message);
                });
    }
}