package com.example.makqcrp.controller;

import com.example.makqcrp.model.QcCase;
import com.example.makqcrp.service.QcService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for QC case operations.
 */
@RestController
@RequestMapping("/api/qc-reviewer/cases")
public class QcController {

    private final QcService qcService;

    public QcController(QcService qcService) {
        this.qcService = qcService;
    }

    @GetMapping
    public ResponseEntity<List<QcCase>> getAllQcCases() {
        return ResponseEntity.ok(qcService.getAllQcCases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QcCase> getQcCaseById(@PathVariable Long id) {
        return qcService.getQcCaseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<QcCase> createQcCase(@Valid @RequestBody QcCase qcCase) {
        QcCase createdQcCase = qcService.createQcCase(qcCase);
        return ResponseEntity.created(
                URI.create("/api/qc-reviewer/cases/" + createdQcCase.getId()))
                .body(createdQcCase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QcCase> updateQcCase(@PathVariable Long id, @Valid @RequestBody QcCase qcCaseDetails) {
        return qcService.getQcCaseById(id)
                .map(existingQcCase -> {
                    existingQcCase.setCaseNumber(qcCaseDetails.getCaseNumber());
                    existingQcCase.setTitle(qcCaseDetails.getTitle());
                    existingQcCase.setDescription(qcCaseDetails.getDescription());
                    existingQcCase.setStatus(qcCaseDetails.getStatus());
                    existingQcCase.setPriority(qcCaseDetails.getPriority());
                    existingQcCase.setSubmittedBy(qcCaseDetails.getSubmittedBy());
                    existingQcCase.setSubmittedAt(qcCaseDetails.getSubmittedAt());
                    existingQcCase.setReviewedBy(qcCaseDetails.getReviewedBy());
                    existingQcCase.setReviewedAt(qcCaseDetails.getReviewedAt());
                    existingQcCase.setNotes(qcCaseDetails.getNotes());
                    QcCase updatedQcCase = qcService.updateQcCase(existingQcCase);
                    return ResponseEntity.ok(updatedQcCase);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQcCase(@PathVariable Long id) {
        if (qcService.getQcCaseById(id).isPresent()) {
            qcService.deleteQcCase(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}