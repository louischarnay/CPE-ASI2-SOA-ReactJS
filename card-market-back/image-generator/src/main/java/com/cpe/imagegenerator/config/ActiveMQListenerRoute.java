package com.cpe.imagegenerator.config;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        // Listen on the 'generate-image' topic
        from("jms:topic:generate-image")
                .log("Received message from generate-image topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    // Add any custom logic for processing the message
                    System.out.println("Processing message: " + message);
                });
    }
}