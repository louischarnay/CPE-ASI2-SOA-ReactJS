package com.cpe.imagegenerator.service;

import com.cpe.imagegenerator.model.ImageResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageGeneratorService {

    private static final String BASE_URL = "http://image-generator-lib:8080";

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

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ImageResponse data = new Gson().fromJson(response.getBody(), ImageResponse.class);
                String fullUrl = BASE_URL + data.getUrl();
                System.out.println("Image generated successfully: " + fullUrl);
                return fullUrl;
            } else {
                System.out.println("Failed to generate image: " + response.getStatusCode());
                return "https://i.sstatic.net/l60Hf.png"; // Default image
            }
        }
        catch (Exception e) {
            System.out.println("Failed to generate image");
            return "https://i.sstatic.net/l60Hf.png"; // Default image
        }
    }
}
