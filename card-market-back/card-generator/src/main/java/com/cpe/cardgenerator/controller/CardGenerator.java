package com.cpe.cardgenerator.controller;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardGenerator {

    @Autowired
    private ProducerTemplate producerTemplate;

    @PostMapping("/generate")
    public String generate(@RequestBody String cardNumber) {
        producerTemplate.sendBody("direct:start", cardNumber);
        return "Card generated";
    }
}