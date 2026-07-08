package com.example.makqcrp.model.dto.model.dto;

import java.time.Instant;

/**
 * Data transfer object for Notification entity.
 */
public class NotificationDto {

    private Long id;
    private String recipient;
    private String sender;
    private String message;
    private String type;
    private String status;
    private Instant createdAt;
    private Instant readAt;
    private String relatedEntityType;
    private String relatedEntityId;
    private Instant updatedAt;

    public NotificationDto() {
    }

    public NotificationDto(Long id, String recipient, String sender, String message, String type, String status,
                           Instant createdAt, Instant readAt, String relatedEntityType, String relatedEntityId,
                           Instant updatedAt) {
        this.id = id;
        this.recipient = recipient;
        this.sender = sender;
        this.message = message;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
        this.readAt = readAt;
        this.relatedEntityType = relatedEntityType;
        this.relatedEntityId = relatedEntityId;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getReadAt() {
        return readAt;
    }

    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }

    public String getRelatedEntityType() {
        return relatedEntityType;
    }

    public void setRelatedEntityType(String relatedEntityType) {
        this.relatedEntityType = relatedEntityType;
    }

    public String getRelatedEntityId() {
        return relatedEntityId;
    }

    public void setRelatedEntityId(String relatedEntityId) {
        this.relatedEntityId = relatedEntityId;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "NotificationDto{" +
                "id=" + id +
                ", recipient='" + recipient + '\'' +
                ", sender='" + sender + '\'' +
                ", message='" + message + '\'' +
                ", type='" + type + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", readAt=" + readAt +
                ", relatedEntityType='" + relatedEntityType + '\'' +
                ", relatedEntityId='" + relatedEntityId + '\'' +
                ", updatedAt=" + updatedAt +
                '}';
    }
}