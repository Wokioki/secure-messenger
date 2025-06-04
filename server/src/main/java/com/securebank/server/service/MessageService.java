package com.securebank.server.service;

import com.securebank.server.model.Message;
import com.securebank.server.repository.MessageRepository;
import com.securebank.server.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void sendMessage(String sender, String receiver, String content) {
        String encrypted = EncryptionUtil.encrypt(content);
        Message message = new Message();
        message.setSenderEmail(sender);
        message.setRecipientEmail(receiver);
        message.setEncryptedContent(encrypted);
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
    }

    public List<Map<String, String>> getMessages(String user1, String user2) {
        List<Message> messages = messageRepository
                .findBySenderEmailAndRecipientEmailOrSenderEmailAndRecipientEmail(
                        user1, user2, user2, user1
                );

        return messages.stream()
                .map(m -> {
                    Map<String, String> map = new HashMap<>();
                    String decrypted = EncryptionUtil.decrypt(m.getEncryptedContent());
                    String time = m.getTimestamp() != null
                            ? m.getTimestamp().toLocalTime().toString().substring(0, 5)
                            : "unknown";
                    String sender = m.getSenderEmail().equals(user1) ? "You" : m.getSenderEmail();

                    map.put("sender", sender);
                    map.put("content", decrypted);
                    map.put("timestamp", time);
                    return map;
                })
                .collect(Collectors.toList());
    }
}