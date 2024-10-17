package com.cpe.propertiesgenerator.config;

import com.cpe.propertiesgenerator.service.MessageService;
import org.apache.camel.Message;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;

    @Override
    public void configure() throws Exception {
        // Listen on the 'generate-image' topic
        from("jms:topic:generate-prop")
            .log("Received message from generate-prop topic: ${body}")
            .process(exchange -> {
                String message = exchange.getIn().getBody(String.class);
                Long id = exchange.getIn().getHeader("id", Long.class);
                messageService.processPropMessage(id, message);
            });
    }
}