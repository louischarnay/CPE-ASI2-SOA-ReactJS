package com.cpe.message.message;

import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public void processMessage(Long id, String message) {
        System.out.println("Processing message for ID: " + id + " with message: " + message);
    }
}

