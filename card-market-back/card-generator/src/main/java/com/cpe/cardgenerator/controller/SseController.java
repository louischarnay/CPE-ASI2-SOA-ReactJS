package com.cpe.cardgenerator.controller;

import com.cpe.cardgenerator.message.MessageStatusRepository;
import com.cpe.cardgenerator.model.CardDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;

@CrossOrigin
@RestController
public class SseController {

    @Autowired
    private MessageStatusRepository repository;

    private final RestTemplate restTemplate = new RestTemplate();

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

                        String name = repository.findById(id).orElseThrow().getName();
                        int userId = repository.findById(id).orElseThrow().getUserId();
                        float price = (float) (Math.random() * 100);

                        // Parse the props string into a Map
                        Map<String, Float> props = parseProps(propsString);

                        CardDTO card = new CardDTO();
                        card.setName(name);
                        card.setUserId(userId);
                        card.setPrice(price);
                        card.setImgUrl(imageURL);
                        card.setDescription(desc);
                        card.setDefence(props.get("DEFENSE"));
                        card.setEnergy(props.get("ENERGY"));
                        card.setAttack(props.get("ATTACK"));
                        card.setHp(props.get("HP"));

                        ResponseEntity<String> response = restTemplate.postForEntity("http://backend-monolithic:8080/api/card", card, String.class);

                        System.out.println("Response: " + response.getBody());

                        // Send the JSON string
                        emitter.send(response.getBody());

                        // Complete the emitter
                        emitter.complete();

                        // Delete the message status from the database
                        repository.deleteById(id);
                    }
                }
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        return emitter;
    }

    private static String getString(String imageURL, String desc, Map<String, Float> props) throws JsonProcessingException {
        Map<String, Object> messageMap = new HashMap<>();
        messageMap.put("imageURL", imageURL);
        messageMap.put("desc", desc);
        messageMap.put("props", props);

        // Convert the map to a JSON string using Jackson's ObjectMapper
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(messageMap);
    }

    // Helper method to parse the props string into a Map<String, Double>
    private static Map<String, Float> parseProps(String propsString) {
        Map<String, Float> propsMap = new HashMap<>();
        // Remove the curly braces
        propsString = propsString.substring(1, propsString.length() - 1);
        // Split the string by commas to get each key-value pair
        String[] keyValuePairs = propsString.split(", ");
        for (String pair : keyValuePairs) {
            // Split each pair by '=' to separate the key and value
            String[] entry = pair.split("=");
            String key = entry[0];
            Float value = Float.parseFloat(entry[1]);
            propsMap.put(key, value);
        }
        return propsMap;
    }
}