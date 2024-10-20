package com.cpe.cardgenerator.controller;

import com.cpe.cardgenerator.message.MessageStatusRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;

@CrossOrigin
@RestController
public class SseController {

    @Autowired
    private MessageStatusRepository repository;

    @GetMapping("/sse")
    public SseEmitter streamSse(@RequestParam Long id) {
        SseEmitter emitter = new SseEmitter();
        Executors.newSingleThreadExecutor().execute(() -> {
            try {
                if (!repository.findById(id).orElseThrow().isMessageComplete()) {
                    // If the message is not complete, return an error
                    emitter.completeWithError(new Exception("Message is not complete"));
                    return;
                }
                // Get the imageURL and desc from the database
                String imageURL = repository.findById(id).orElseThrow().getImageURL();
                String desc = repository.findById(id).orElseThrow().getDesc();
                String props = repository.findById(id).orElseThrow().getProps();
                // Create a JSON-like structure with a Map
                String jsonString = getString(imageURL, desc, props);
                // Send the JSON string
                emitter.send(jsonString);
                // Complete the emitter
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        return emitter;
    }

    private static String getString(String imageURL, String desc, String props) throws JsonProcessingException {
        Map<String, String> messageMap = new HashMap<>();
        messageMap.put("imageURL", imageURL);
        messageMap.put("desc", desc);
        messageMap.put("props", props);

        // Convert the map to a JSON string using a simple utility like Jackson's ObjectMapper
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(messageMap);
    }
}
