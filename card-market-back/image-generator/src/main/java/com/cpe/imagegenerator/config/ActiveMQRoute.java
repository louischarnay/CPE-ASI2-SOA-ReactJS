package com.cpe.imagegenerator.config;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        from("direct:sendToOrchestrator")
                .to("jms:topic:image-generated");
    }
}
