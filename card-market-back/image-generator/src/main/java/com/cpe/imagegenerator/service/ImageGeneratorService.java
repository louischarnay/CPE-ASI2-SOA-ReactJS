package com.cpe.imagegenerator.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageGeneratorService {

    private static final String BASE_URL = "http://localhost:8090";

    private final RestTemplate restTemplate;

    public ImageGeneratorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateImage(String promptTxt) {
        String url = BASE_URL + "/prompt/req";
        String jsonBody = String.format("{ \"promptTxt\": \"%s\", \"negativePromptTxt\": \"\" }", promptTxt);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);
        System.out.println("Generating image...");
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            System.out.println("Image generated successfully: " + response.getBody());
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to generate image: " + response.getStatusCode());
        }
    }
}
