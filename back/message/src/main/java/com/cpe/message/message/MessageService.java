package com.cpe.message.message;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Service
public class MessageService {

    @Autowired
    private MessageStatusRepository repository;

    public void processMessage(String message) throws ParseException {
        MessageStatus status = new MessageStatus();
        JSONObject json = new JSONObject(message);

        int userFrom = json.getInt("userId");

        String dateString = json.getString("date");
        Instant instant = Instant.parse(dateString);
        Date timestamp = Date.from(instant);

        String messageContent = json.getString("content");

        // Optional fields
        int targetId = json.has("targetId") ? json.optInt("targetId", -1) : -1;

        status.setUserId(userFrom);
        status.setTargetId(targetId);
        status.setTimestamp(timestamp);
        status.setMessage(messageContent);

        repository.save(status);
    }
}

