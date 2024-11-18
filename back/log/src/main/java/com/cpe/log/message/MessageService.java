package com.cpe.log.message;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
public class MessageService {

    private static final String FILE_PATH = "log/messages.log"; // Define the file path

    public void processMessage(String message) {
        try {
            // Append the message to the file
            Files.write(
                    Paths.get(FILE_PATH),
                    (message + System.lineSeparator()).getBytes(),
                    StandardOpenOption.CREATE, // Create the file if it doesn't exist
                    StandardOpenOption.APPEND  // Append to the file
            );
        } catch (IOException e) {
            // Log and handle any exceptions
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }
}
