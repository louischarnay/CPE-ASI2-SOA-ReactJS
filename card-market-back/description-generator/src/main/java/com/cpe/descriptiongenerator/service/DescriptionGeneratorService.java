package com.cpe.descriptiongenerator.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DescriptionGeneratorService {

    private final RestTemplate restTemplate;

    public DescriptionGeneratorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateDescription(String promptTxt) {
        String url = "http://localhost:11434/api/generate";

        String jsonBody = String.format("{ \"model\": \"qwen2:0.5b\", \"prompt\": \"%s\", \"stream\": false }", promptTxt);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to generate description: " + response.getStatusCode());
        }
    }
}