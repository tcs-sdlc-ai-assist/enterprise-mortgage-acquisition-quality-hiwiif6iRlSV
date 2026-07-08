package com.example.makqcrp.controller;

import com.example.makqcrp.model.RemedyCase;
import com.example.makqcrp.service.RemedyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for Remedy case operations.
 */
@RestController
@RequestMapping("/api/remedy-specialist/cases")
public class RemedyController {

    private final RemedyService remedyService;

    public RemedyController(RemedyService remedyService) {
        this.remedyService = remedyService;
    }

    @GetMapping
    public ResponseEntity<List<RemedyCase>> getAllRemedyCases() {
        return ResponseEntity.ok(remedyService.getAllRemedyCases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RemedyCase> getRemedyCaseById(@PathVariable Long id) {
        return remedyService.getRemedyCaseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RemedyCase> createRemedyCase(@Valid @RequestBody RemedyCase remedyCase) {
        RemedyCase createdRemedyCase = remedyService.createRemedyCase(remedyCase);
        return ResponseEntity.created(
                URI.create("/api/remedy-specialist/cases/" + createdRemedyCase.getId()))
                .body(createdRemedyCase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RemedyCase> updateRemedyCase(@PathVariable Long id, @Valid @RequestBody RemedyCase remedyCaseDetails) {
        return remedyService.getRemedyCaseById(id)
                .map(existingRemedyCase -> {
                    existingRemedyCase.setCaseNumber(remedyCaseDetails.getCaseNumber());
                    existingRemedyCase.setTitle(remedyCaseDetails.getTitle());
                    existingRemedyCase.setDescription(remedyCaseDetails.getDescription());
                    existingRemedyCase.setStatus(remedyCaseDetails.getStatus());
                    existingRemedyCase.setPriority(remedyCaseDetails.getPriority());
                    existingRemedyCase.setSubmittedBy(remedyCaseDetails.getSubmittedBy());
                    existingRemedyCase.setSubmittedAt(remedyCaseDetails.getSubmittedAt());
                    existingRemedyCase.setReviewedBy(remedyCaseDetails.getReviewedBy());
                    existingRemedyCase.setReviewedAt(remedyCaseDetails.getReviewedAt());
                    existingRemedyCase.setNotes(remedyCaseDetails.getNotes());
                    RemedyCase updatedRemedyCase = remedyService.updateRemedyCase(existingRemedyCase);
                    return ResponseEntity.ok(updatedRemedyCase);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRemedyCase(@PathVariable Long id) {
        if (remedyService.getRemedyCaseById(id).isPresent()) {
            remedyService.deleteRemedyCase(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}