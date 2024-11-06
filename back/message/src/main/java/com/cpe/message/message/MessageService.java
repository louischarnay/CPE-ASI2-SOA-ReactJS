package com.cpe.message.message;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageStatusRepository repository;

    public void processMessage(String message) {
        MessageStatus status = new MessageStatus();
        JSONObject json = new JSONObject(message);

        int userFrom = json.getInt("userId");
        int userTo = json.has("userTo") ? json.optInt("targetId", -1) : -1;
        String messageContent = json.getString("content");

        status.setUserId(userFrom);
        status.setTargetId(userTo);
        status.setMessage(messageContent);

        repository.save(status);
    }
}

