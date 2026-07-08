package com.example.makqcrp.model.dto.model.dto;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * Data transfer object for Loan entity.
 */
public class LoanDto {

    private Long id;
    private String loanNumber;
    private String borrowerName;
    private BigDecimal amount;
    private String status;
    private Instant applicationDate;
    private Instant decisionDate;
    private String analystName;
    private String purpose;
    private Integer termMonths;
    private BigDecimal interestRate;
    private BigDecimal monthlyPayment;
    private Instant createdAt;
    private Instant updatedAt;

    public LoanDto() {
    }

    public LoanDto(Long id, String loanNumber, String borrowerName, BigDecimal amount, String status,
                   Instant applicationDate, Instant decisionDate, String analystName, String purpose,
                   Integer termMonths, BigDecimal interestRate, BigDecimal monthlyPayment,
                   Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.loanNumber = loanNumber;
        this.borrowerName = borrowerName;
        this.amount = amount;
        this.status = status;
        this.applicationDate = applicationDate;
        this.decisionDate = decisionDate;
        this.analystName = analystName;
        this.purpose = purpose;
        this.termMonths = termMonths;
        this.interestRate = interestRate;
        this.monthlyPayment = monthlyPayment;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoanNumber() {
        return loanNumber;
    }

    public void setLoanNumber(String loanNumber) {
        this.loanNumber = loanNumber;
    }

    public String getBorrowerName() {
        return borrowerName;
    }

    public void setBorrowerName(String borrowerName) {
        this.borrowerName = borrowerName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Instant applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Instant getDecisionDate() {
        return decisionDate;
    }

    public void setDecisionDate(Instant decisionDate) {
        this.decisionDate = decisionDate;
    }

    public String getAnalystName() {
        return analystName;
    }

    public void setAnalystName(String analystName) {
        this.analystName = analystName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Integer getTermMonths() {
        return termMonths;
    }

    public void setTermMonths(Integer termMonths) {
        this.termMonths = termMonths;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public BigDecimal getMonthlyPayment() {
        return monthlyPayment;
    }

    public void setMonthlyPayment(BigDecimal monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
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
        return "LoanDto{" +
                "id=" + id +
                ", loanNumber='" + loanNumber + '\'' +
                ", borrowerName='" + borrowerName + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", applicationDate=" + applicationDate +
                ", decisionDate=" + decisionDate +
                ", analystName='" + analystName + '\'' +
                ", purpose='" + purpose + '\'' +
                ", termMonths=" + termMonths +
                ", interestRate=" + interestRate +
                ", monthlyPayment=" + monthlyPayment +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}