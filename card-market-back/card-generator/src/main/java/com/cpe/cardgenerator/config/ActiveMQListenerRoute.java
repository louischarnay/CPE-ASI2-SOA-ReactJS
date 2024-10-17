package com.cpe.cardgenerator.config;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        // Listen on the 'imageGenerated' topic
        from("jms:topic:image-generated")
                .log("Received message from image-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    // Add any custom logic for processing the message
                    System.out.println("Processing message: " + message);
                });
        from("jms:topic:desc-generated")
                .log("Received message from desc-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    // Add any custom logic for processing the message
                    System.out.println("Processing message: " + message);
                });
        from("jms:topic:prop-generated")
                .log("Received message from prop-generated topic: ${body}")
                .process(exchange -> {
                    String message = exchange.getIn().getBody(String.class);
                    // Add any custom logic for processing the message
                    System.out.println("Processing message: " + message);
                });
    }
}