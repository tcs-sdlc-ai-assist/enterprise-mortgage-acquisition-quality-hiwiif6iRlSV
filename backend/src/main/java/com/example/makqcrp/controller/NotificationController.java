package com.example.makqcrp.controller;

import com.example.makqcrp.model.Notification;
import com.example.makqcrp.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for Notification operations.
 */
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Notification> createNotification(@Valid @RequestBody Notification notification) {
        Notification createdNotification = notificationService.createNotification(notification);
        return ResponseEntity.created(
                URI.create("/api/notifications/" + createdNotification.getId()))
                .body(createdNotification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable Long id, @Valid @RequestBody Notification notificationDetails) {
        return notificationService.getNotificationById(id)
                .map(existingNotification -> {
                    existingNotification.setRecipient(notificationDetails.getRecipient());
                    existingNotification.setSender(notificationDetails.getSender());
                    existingNotification.setMessage(notificationDetails.getMessage());
                    existingNotification.setType(notificationDetails.getType());
                    existingNotification.setStatus(notificationDetails.getStatus());
                    existingNotification.setRelatedEntityType(notificationDetails.getRelatedEntityType());
                    existingNotification.setRelatedEntityId(notificationDetails.getRelatedEntityId());
                    Notification updatedNotification = notificationService.updateNotification(existingNotification);
                    return ResponseEntity.ok(updatedNotification);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        if (notificationService.getNotificationById(id).isPresent()) {
            notificationService.deleteNotification(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```