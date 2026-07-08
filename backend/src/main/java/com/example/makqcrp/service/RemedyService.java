package com.example.makqcrp.service;

import com.example.makqcrp.model.RemedyCase;
import com.example.makqcrp.repository.RemedyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for RemedyCase business logic.
 */
@Service
public class RemedyService {

    private final RemedyRepository remedyRepository;

    public RemedyService(RemedyRepository remedyRepository) {
        this.remedyRepository = remedyRepository;
    }

    /**
     * Creates a new remedy case.
     *
     * @param remedyCase the remedy case to create
     * @return the created remedy case
     */
    public RemedyCase createRemedyCase(RemedyCase remedyCase) {
        return remedyRepository.save(remedyCase);
    }

    /**
     * Retrieves a remedy case by its ID.
     *
     * @param id the ID of the remedy case to retrieve
     * @return an Optional containing the remedy case if found, or empty if not found
     */
    public Optional<RemedyCase> getRemedyCaseById(Long id) {
        return remedyRepository.findById(id);
    }

    /**
     * Retrieves all remedy cases.
     *
     * @return a list of all remedy cases
     */
    public List<RemedyCase> getAllRemedyCases() {
        return remedyRepository.findAll();
    }

    /**
     * Updates an existing remedy case.
     *
     * @param remedyCase the remedy case to update (must contain the ID)
     * @return the updated remedy case
     */
    public RemedyCase updateRemedyCase(RemedyCase remedyCase) {
        return remedyRepository.save(remedyCase);
    }

    /**
     * Deletes a remedy case by its ID.
     *
     * @param id the ID of the remedy case to delete
     */
    public void deleteRemedyCase(Long id) {
        remedyRepository.deleteById(id);
    }
}