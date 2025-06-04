package com.securebank.server.controller;

import com.securebank.server.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public void sendMessage(@RequestParam String sender,
                            @RequestParam String receiver,
                            @RequestParam String content) {
        messageService.sendMessage(sender, receiver, content);
    }

    @GetMapping("/chat")
    public List<Map<String, String>> getMessages(@RequestParam String user1,
                                                 @RequestParam String user2) {
        return messageService.getMessages(user1, user2);
    }
}