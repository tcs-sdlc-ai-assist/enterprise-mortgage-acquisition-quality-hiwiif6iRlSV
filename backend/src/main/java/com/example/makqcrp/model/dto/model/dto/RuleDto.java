package com.example.makqcrp.model.dto.model.dto;

import java.time.Instant;

/**
 * Data transfer object for Rule entity.
 */
public class RuleDto {

    private Long id;
    private String ruleName;
    private String description;
    private String ruleExpression;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;

    public RuleDto() {
    }

    public RuleDto(Long id, String ruleName, String description, String ruleExpression, String status,
                   Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.ruleName = ruleName;
        this.description = description;
        this.ruleExpression = ruleExpression;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRuleExpression() {
        return ruleExpression;
    }

    public void setRuleExpression(String ruleExpression) {
        this.ruleExpression = ruleExpression;
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

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "RuleDto{" +
                "id=" + id +
                ", ruleName='" + ruleName + '\'' +
                ", description='" + description + '\'' +
                ", ruleExpression='" + ruleExpression + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}