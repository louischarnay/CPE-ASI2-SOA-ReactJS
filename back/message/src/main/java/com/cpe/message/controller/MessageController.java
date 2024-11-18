package com.cpe.message.controller;

import com.cpe.message.message.MessageService;
import com.cpe.message.message.MessageStatus;
import com.cpe.message.message.MessageStatusRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin
@RestController
public class MessageController {

    @Autowired
    private MessageStatusRepository repository;

    @GetMapping("/messages")
    public String getMessages(@RequestParam int userId) {
        Optional<List<MessageStatus>> userMessages = repository.findAllByUserId(userId);
        Optional<List<MessageStatus>> targetMessages = repository.findAllByTargetId(userId);
        Optional<List<MessageStatus>> generalMessages = repository.findAllByTargetId(-1);

        // Combine messages into a set to avoid duplicates
        Set<MessageStatus> messages = new HashSet<>();
        userMessages.ifPresent(messages::addAll);
        targetMessages.ifPresent(messages::addAll);
        generalMessages.ifPresent(messages::addAll);

        if (!messages.isEmpty()) {
            JSONArray response = new JSONArray();
            for (MessageStatus message : messages) {
                JSONObject messageJson = new JSONObject();
                messageJson.put("userId", message.getUserId());
                messageJson.put("targetId", message.getTargetId());
                messageJson.put("timestamp", message.getTimestamp());
                messageJson.put("message", message.getMessage());
                response.put(messageJson);
            }
            return response.toString();
        } else {
            return "No messages found for user with id " + userId;
        }
    }
}
