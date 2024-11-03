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

                while (true) {
                    //Get the message status from the database
                    boolean isComplete = repository.findById(id).orElseThrow().isMessageComplete();

                    if (isComplete) {
                        // Get the imageURL and desc from the database
                        String imageURL = repository.findById(id).orElseThrow().getImageURL();
                        String desc = repository.findById(id).orElseThrow().getDesc();
                        String propsString = repository.findById(id).orElseThrow().getProps();

                        // Parse the props string into a Map
                        Map<String, Double> props = parseProps(propsString);

                        // Create a JSON-like structure with a Map
                        String jsonString = getString(imageURL, desc, props);

                        // Send the JSON string
                        // TODO: RETURN COMPLETE CARD (get to monolithic)
                        emitter.send(jsonString);

                        // Complete the emitter
                        emitter.complete();
                    }
                }
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        return emitter;
    }

    private static String getString(String imageURL, String desc, Map<String, Double> props) throws JsonProcessingException {
        Map<String, Object> messageMap = new HashMap<>();
        messageMap.put("imageURL", imageURL);
        messageMap.put("desc", desc);
        messageMap.put("props", props);

        // Convert the map to a JSON string using Jackson's ObjectMapper
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(messageMap);
    }

    // Helper method to parse the props string into a Map<String, Double>
    private static Map<String, Double> parseProps(String propsString) {
        Map<String, Double> propsMap = new HashMap<>();
        // Remove the curly braces
        propsString = propsString.substring(1, propsString.length() - 1);
        // Split the string by commas to get each key-value pair
        String[] keyValuePairs = propsString.split(", ");
        for (String pair : keyValuePairs) {
            // Split each pair by '=' to separate the key and value
            String[] entry = pair.split("=");
            String key = entry[0];
            Double value = Double.parseDouble(entry[1]);
            propsMap.put(key, value);
        }
        return propsMap;
    }
}