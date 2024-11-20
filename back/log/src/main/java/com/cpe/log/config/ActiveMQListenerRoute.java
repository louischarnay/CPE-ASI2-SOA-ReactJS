package com.cpe.log.config;

import com.cpe.log.message.MessageService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private MessageService messageService;  // Add the message service to process messages

    @Override
    public void configure() throws Exception {
        // Define mappings (could be loaded from a properties file or database)
        String[] topics = {"message", "generate-image", "image-generated", "generate-desc", "desc-generated", "generate-prop", "prop-generated"};

        for (String topic : topics) {
            from("jms:topic:" + topic)
                .process().body(String.class, (body, exchange) -> {
                    // Process the message
                    messageService.processMessage(body);
            });
        }
    }
}
