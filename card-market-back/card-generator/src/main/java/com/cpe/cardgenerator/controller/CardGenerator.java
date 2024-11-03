package com.cpe.cardgenerator.controller;

import com.cpe.cardgenerator.message.MessageService;
import com.cpe.cardgenerator.message.MessageStatus;
import com.cpe.cardgenerator.message.MessageStatusRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CardGenerator {

        @Autowired
        private ProducerTemplate producerTemplate;

        @Autowired
        private MessageStatusRepository repository;

        @Autowired
        private ObjectMapper objectMapper;

        // Request class to hold both prompts
        @Getter
        public static class CardGenerationRequest {
                private String name;
                private String imagePrompt;
                private String descPrompt;
                private Long userId;
        }

        public Long createNewMessageEntry(int cardId) {
                MessageStatus status = new MessageStatus();
                status.setCardId(cardId);
                status.setImageReceived(false);
                status.setDescReceived(false);
                repository.save(status);
                return status.getId();
        }

        @PostMapping("/generateCard")
        public String generateCard(@RequestBody CardGenerationRequest request) throws JsonProcessingException {
                // TODO: SEND REQUEST TO CREATE A CARD (and get cardId)

                Long id = createNewMessageEntry(cardId);
                String imagePromptJson = objectMapper.writeValueAsString(request.getImagePrompt()).replace("\"", "");
                String descPromptJson = objectMapper.writeValueAsString(request.getDescPrompt()).replace("\"", "");
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateImage", imagePromptJson, "id", id);
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateDesc", descPromptJson, "id", id);

                return id.toString();
        }

        public void generateProps(Long id, String imageURL, String desc) {
                producerTemplate.sendBodyAndHeader("direct:sendToGenerateProp", imageURL, "id", id);
        }
}