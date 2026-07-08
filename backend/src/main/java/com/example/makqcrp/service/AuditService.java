package com.example.makqcrp.service;

import com.example.makqcrp.model.AuditEvent;
import com.example.makqcrp.repository.AuditRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for AuditEvent business logic.
 */
@Service
public class AuditService {

    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    /**
     * Creates a new audit event.
     *
     * @param auditEvent the audit event to create
     * @return the created audit event
     */
    public AuditEvent createAuditEvent(AuditEvent auditEvent) {
        return auditRepository.save(auditEvent);
    }

    /**
     * Retrieves an audit event by its ID.
     *
     * @param id the ID of the audit event to retrieve
     * @return an Optional containing the audit event if found, or empty if not found
     */
    public Optional<AuditEvent> getAuditEventById(Long id) {
        return auditRepository.findById(id);
    }

    /**
     * Retrieves all audit events.
     *
     * @return a list of all audit events
     */
    public List<AuditEvent> getAllAuditEvents() {
        return auditRepository.findAll();
    }

    /**
     * Updates an existing audit event.
     *
     * @param auditEvent the audit event to update (must contain the ID)
     * @return the updated audit event
     */
    public AuditEvent updateAuditEvent(AuditEvent auditEvent) {
        return auditRepository.save(auditEvent);
    }

    /**
     * Deletes an audit event by its ID.
     *
     * @param id the ID of the audit event to delete
     */
    public void deleteAuditEvent(Long id) {
        auditRepository.deleteById(id);
    }
}