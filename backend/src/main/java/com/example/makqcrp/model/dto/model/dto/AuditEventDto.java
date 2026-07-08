package com.example.makqcrp.model.dto.model.dto;

import java.time.Instant;

/**
 * Data transfer object for AuditEvent entity.
 */
public class AuditEventDto {

    private Long id;
    private String eventType;
    private String entityName;
    private String entityId;
    private String user;
    private Instant eventTimestamp;
    private String details;
    private Instant createdAt;
    private Instant updatedAt;

    public AuditEventDto() {
    }

    public AuditEventDto(Long id, String eventType, String entityName, String entityId, String user,
                         Instant eventTimestamp, String details, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.eventType = eventType;
        this.entityName = entityName;
        this.entityId = entityId;
        this.user = user;
        this.eventTimestamp = eventTimestamp;
        this.details = details;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Instant getEventTimestamp() {
        return eventTimestamp;
    }

    public void setEventTimestamp(Instant eventTimestamp) {
        this.eventTimestamp = eventTimestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "AuditEventDto{" +
                "id=" + id +
                ", eventType='" + eventType + '\'' +
                ", entityName='" + entityName + '\'' +
                ", entityId='" + entityId + '\'' +
                ", user='" + user + '\'' +
                ", eventTimestamp=" + eventTimestamp +
                ", details='" + details + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}