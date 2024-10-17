package com.cpe.cardgenerator.controller;

import com.cpe.cardgenerator.message.MessageService;
import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardGenerator {

        @Autowired
        private ProducerTemplate producerTemplate;

        @Autowired
        private MessageService messageService;

        @PostMapping("/generateCard")
        public String generateCard(@RequestBody String imagePrompt, @RequestBody String descPrompt) {
                Long id = messageService.createNewMessageEntry();
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateImage", imagePrompt, "id", id);
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateDesc", descPrompt, "id", id);
                return "Card generation initiated with ID: " + id;
        }
}
