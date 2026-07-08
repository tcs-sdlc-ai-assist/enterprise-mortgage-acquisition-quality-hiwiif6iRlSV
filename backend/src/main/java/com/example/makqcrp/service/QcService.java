package com.example.makqcrp.service;

import com.example.makqcrp.model.QcCase;
import com.example.makqcrp.repository.QcRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for QcCase business logic.
 */
@Service
public class QcService {

    private final QcRepository qcRepository;

    public QcService(QcRepository qcRepository) {
        this.qcRepository = qcRepository;
    }

    /**
     * Creates a new QC case.
     *
     * @param qcCase the QC case to create
     * @return the created QC case
     */
    public QcCase createQcCase(QcCase qcCase) {
        return qcRepository.save(qcCase);
    }

    /**
     * Retrieves a QC case by its ID.
     *
     * @param id the ID of the QC case to retrieve
     * @return an Optional containing the QC case if found, or empty if not found
     */
    public Optional<QcCase> getQcCaseById(Long id) {
        return qcRepository.findById(id);
    }

    /**
     * Retrieves all QC cases.
     *
     * @return a list of all QC cases
     */
    public List<QcCase> getAllQcCases() {
        return qcRepository.findAll();
    }

    /**
     * Updates an existing QC case.
     *
     * @param qcCase the QC case to update (must contain the ID)
     * @return the updated QC case
     */
    public QcCase updateQcCase(QcCase qcCase) {
        return qcRepository.save(qcCase);
    }

    /**
     * Deletes a QC case by its ID.
     *
     * @param id the ID of the QC case to delete
     */
    public void deleteQcCase(Long id) {
        qcRepository.deleteById(id);
    }
}