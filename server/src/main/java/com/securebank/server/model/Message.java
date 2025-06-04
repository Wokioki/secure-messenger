package com.securebank.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderEmail;

    private String recipientEmail;

    @Column(columnDefinition = "TEXT")
    private String encryptedContent;

    private LocalDateTime timestamp;
}