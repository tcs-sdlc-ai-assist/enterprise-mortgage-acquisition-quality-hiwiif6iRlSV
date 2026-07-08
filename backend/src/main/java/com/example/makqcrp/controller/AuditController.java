package com.example.makqcrp.controller;

import com.example.makqcrp.model.AuditEvent;
import com.example.makqcrp.service.AuditService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for AuditEvent operations.
 */
@RestController
@RequestMapping("/api/audit")
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    @GetMapping
    public ResponseEntity<List<AuditEvent>> getAllAuditEvents() {
        return ResponseEntity.ok(auditService.getAllAuditEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditEvent> getAuditEventById(@PathVariable Long id) {
        return auditService.getAuditEventById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AuditEvent> createAuditEvent(@Valid @RequestBody AuditEvent auditEvent) {
        AuditEvent createdAuditEvent = auditService.createAuditEvent(auditEvent);
        return ResponseEntity.created(
                URI.create("/api/audit/" + createdAuditEvent.getId()))
                .body(createdAuditEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuditEvent> updateAuditEvent(@PathVariable Long id, @Valid @RequestBody AuditEvent auditEventDetails) {
        return auditService.getAuditEventById(id)
                .map(existingAuditEvent -> {
                    existingAuditEvent.setEventType(auditEventDetails.getEventType());
                    existingAuditEvent.setEntityName(auditEventDetails.getEntityName());
                    existingAuditEvent.setEntityId(auditEventDetails.getEntityId());
                    existingAuditEvent.setUser(auditEventDetails.getUser());
                    existingAuditEvent.setEventTimestamp(auditEventDetails.getEventTimestamp());
                    existingAuditEvent.setDetails(auditEventDetails.getDetails());
                    AuditEvent updatedAuditEvent = auditService.updateAuditEvent(existingAuditEvent);
                    return ResponseEntity.ok(updatedAuditEvent);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuditEvent(@PathVariable Long id) {
        if (auditService.getAuditEventById(id).isPresent()) {
            auditService.deleteAuditEvent(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}