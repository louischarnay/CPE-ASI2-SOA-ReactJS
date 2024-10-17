package com.cpe.descriptiongenerator.config;

import com.cpe.descriptiongenerator.service.DescriptionGeneratorService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private DescriptionGeneratorService descriptionGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    @Override
    public void configure() throws Exception {
        // Listen on the 'generate-image' topic
        from("jms:topic:generate-desc")
                .log("Received message from generate-desc topic: ${body}")
                .process(exchange -> {
                    String promptText = exchange.getIn().getBody(String.class);
                    System.out.println("Prompt text: " + promptText);

                    String descriptionData = descriptionGeneratorService.generateDescription(promptText);

                    jmsTemplate.convertAndSend("jms:topic:desc-generated", descriptionData);
                    System.out.println("Description sent to 'desc-generated' topic.");
                });
    }
}