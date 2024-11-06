package com.cpe.descriptiongenerator.config;

import com.cpe.descriptiongenerator.service.MessageService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;

    @Override
    public void configure() throws Exception {
        // Listen on the 'generate-image' topic
        from("jms:topic:generate-desc")
                .log("Received message from generate-desc topic: ${body}")
                .process(exchange -> {
                    String promptText = exchange.getIn().getBody(String.class);
                    Long id = exchange.getIn().getHeader("id", Long.class);
                    messageService.processDescMessage(id, promptText);
                });
    }
}