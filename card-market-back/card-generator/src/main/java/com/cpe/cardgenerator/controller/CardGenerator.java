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

        public void sendMessageToTopic(@RequestBody String message) {
                producerTemplate.sendBody("direct:sendToGenerateImage", message);
        }

        public void sendMessageToTopic2(@RequestBody String message) {
                producerTemplate.sendBody("direct:sendToGenerateDesc", message);
        }

        public void sendMessageToTopic3(@RequestBody String message) {
                producerTemplate.sendBody("direct:sendToGenerateProp", message);
        }

        @PostMapping("/generateCard")
        public String generateCard(@RequestBody String message) {
                sendMessageToTopic(message);
                sendMessageToTopic2(message);
                return "Card generated";
        }
}