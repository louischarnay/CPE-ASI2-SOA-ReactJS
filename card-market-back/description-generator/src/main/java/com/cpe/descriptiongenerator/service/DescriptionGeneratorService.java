package com.cpe.descriptiongenerator.service;

import com.cpe.descriptiongenerator.model.DescriptionResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

@Service
public class DescriptionGeneratorService {

    private static final String BASE_URL = "http://localhost:11434";

    private final RestTemplate restTemplate;

    public DescriptionGeneratorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        loadModel();
    }

    public void loadModel() {
        String url = BASE_URL + "/api/pull";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>("{ \"name\": \"qwen2:0.5b\" }", headers);
        System.out.println("Loading model...");
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Model loaded successfully.");
        } else {
            System.out.println("Failed to load model: " + response.getStatusCode());
        }
    }

    public String generateDescription(String promptTxt) {
        String url = BASE_URL + "/api/generate";

        String jsonBody = String.format("{ \"model\": \"qwen2:0.5b\", \"prompt\": \"%s\", \"stream\": false }", promptTxt);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            DescriptionResponse data = new Gson().fromJson(response.getBody(), DescriptionResponse.class);
            return data.getResponse();
        } else {
            throw new RuntimeException("Failed to generate description: " + response.getStatusCode());
        }
    }
}