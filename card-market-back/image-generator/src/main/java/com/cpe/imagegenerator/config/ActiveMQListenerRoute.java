package com.cpe.imagegenerator.config;

import com.cpe.imagegenerator.service.ImageGeneratorService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListenerRoute extends RouteBuilder {

    @Autowired
    private ImageGeneratorService imageGeneratorService;

    @Autowired
    private JmsTemplate jmsTemplate;

    @Override
    public void configure() throws Exception {
        // Listen on the 'image-generated' topic
        from("jms:topic:generate-image")
                .log("Received message from image-generated topic: ${body}")
                .process(exchange -> {
                    String promptText = exchange.getIn().getBody(String.class);
                    System.out.println("Prompt text: " + promptText);

                    String imageData = imageGeneratorService.generateImage(promptText);

                    jmsTemplate.convertAndSend("jms:topic:image-generated", imageData);
                    System.out.println("Image sent to 'image-generated' topic.");
                });
    }
}
