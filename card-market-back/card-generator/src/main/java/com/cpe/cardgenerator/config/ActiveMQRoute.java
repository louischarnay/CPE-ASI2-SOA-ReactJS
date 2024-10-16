package com.cpe.cardgenerator.config;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        from("direct:sendToGenerateImage")
                .to("jms:topic:generate-image");
    }
}
