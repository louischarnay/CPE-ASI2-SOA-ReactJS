package com.cpe.propertiesgenerator.service;

import org.springframework.stereotype.Service;

import tp.cpe.ImgToProperties;

import java.util.Map;

@Service
public class PropertiesGeneratorService {

    // Doesn't do anything special (Will always be 4 properties)
    private int _numberOfProperties = 4;

    public PropertiesGeneratorService() {}

    public Map<String, Float> generateProperties(String imageUrl) {
        Map<String, Float> result = ImgToProperties.getPropertiesFromImg(imageUrl, 100f, _numberOfProperties, 0.5f, false);
        return result;
    }
}
