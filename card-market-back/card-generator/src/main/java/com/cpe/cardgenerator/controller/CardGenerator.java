package com.cpe.cardgenerator.controller;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardGenerator {

        @Autowired
        private ProducerTemplate producerTemplate;

        @PostMapping("/generateImage")
        public String sendMessageToTopic(@RequestBody String message) {
                producerTemplate.sendBody("direct:sendToGenerateImage", message);
                return "Message sent to topic generate-image";
        }
}