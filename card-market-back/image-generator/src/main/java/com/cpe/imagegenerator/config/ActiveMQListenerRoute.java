package com.cpe.imagegenerator.config;

import com.cpe.imagegenerator.service.MessageService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;

    @Override
    public void configure() throws Exception {
        // Listen on the 'image-generated' topic
        from("jms:topic:generate-image")
                .log("Received message from image-generated topic: ${body}")
                .process(exchange -> {
                    String promptText = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);
                    messageService.processImageMessage(id, promptText);
                });
    }
}
