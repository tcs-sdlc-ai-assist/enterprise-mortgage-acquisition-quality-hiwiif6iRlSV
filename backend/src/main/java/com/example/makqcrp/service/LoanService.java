package com.example.makqcrp.service;

import com.example.makqcrp.model.Loan;
import com.example.makqcrp.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Loan business logic.
 */
@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    /**
     * Creates a new loan.
     *
     * @param loan the loan to create
     * @return the created loan
     */
    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    /**
     * Retrieves a loan by its ID.
     *
     * @param id the ID of the loan to retrieve
     * @return an Optional containing the loan if found, or empty if not found
     */
    public Optional<Loan> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    /**
     * Retrieves all loans.
     *
     * @return a list of all loans
     */
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    /**
     * Updates an existing loan.
     *
     * @param loan the loan to update (must contain the ID)
     * @return the updated loan
     */
    public Loan updateLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    /**
     * Deletes a loan by its ID.
     *
     * @param id the ID of the loan to delete
     */
    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
}