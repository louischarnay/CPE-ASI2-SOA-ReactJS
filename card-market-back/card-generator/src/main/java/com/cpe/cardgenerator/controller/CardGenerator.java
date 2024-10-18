package com.cpe.cardgenerator.controller;

import com.cpe.cardgenerator.message.MessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
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

        @Autowired
        private ObjectMapper objectMapper;

        // Request class to hold both prompts
        @Getter
        public static class CardGenerationRequest {
            // Getters and Setters
            private String imagePrompt;
            private String descPrompt;
        }

        @PostMapping("/generateCard")
        public String generateCard(@RequestBody CardGenerationRequest request) throws JsonProcessingException {
                Long id = messageService.createNewMessageEntry();
                String imagePromptJson = objectMapper.writeValueAsString(request.getImagePrompt()).replace("\"", "");
                String descPromptJson = objectMapper.writeValueAsString(request.getDescPrompt()).replace("\"", "");
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateImage", imagePromptJson, "id", id);
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateDesc", descPromptJson, "id", id);
                return "Card generation initiated with ID: " + id;
        }
}