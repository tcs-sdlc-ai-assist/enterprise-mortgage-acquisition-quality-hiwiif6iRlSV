package com.example.makqcrp.controller;

import com.example.makqcrp.model.Loan;
import com.example.makqcrp.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for Loan operations.
 */
@RestController
@RequestMapping("/api/loan-analyst/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        return loanService.getLoanById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Loan> createLoan(@Valid @RequestBody Loan loan) {
        Loan createdLoan = loanService.createLoan(loan);
        return ResponseEntity.created(
                URI.create("/api/loan-analyst/loans/" + createdLoan.getId()))
                .body(createdLoan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id, @Valid @RequestBody Loan loanDetails) {
        return loanService.getLoanById(id)
                .map(existingLoan -> {
                    existingLoan.setLoanNumber(loanDetails.getLoanNumber());
                    existingLoan.setBorrowerName(loanDetails.getBorrowerName());
                    existingLoan.setAmount(loanDetails.getAmount());
                    existingLoan.setStatus(loanDetails.getStatus());
                    existingLoan.setApplicationDate(loanDetails.getApplicationDate());
                    existingLoan.setDecisionDate(loanDetails.getDecisionDate());
                    existingLoan.setAnalystName(loanDetails.getAnalystName());
                    existingLoan.setPurpose(loanDetails.getPurpose());
                    existingLoan.setTermMonths(loanDetails.getTermMonths());
                    existingLoan.setInterestRate(loanDetails.getInterestRate());
                    existingLoan.setMonthlyPayment(loanDetails.getMonthlyPayment());
                    Loan updatedLoan = loanService.updateLoan(existingLoan);
                    return ResponseEntity.ok(updatedLoan);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        if (loanService.getLoanById(id).isPresent()) {
            loanService.deleteLoan(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}