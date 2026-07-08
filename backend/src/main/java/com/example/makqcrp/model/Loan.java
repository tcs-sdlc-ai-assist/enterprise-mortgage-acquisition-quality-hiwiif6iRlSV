package com.example.makqcrp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "loans", uniqueConstraints = @UniqueConstraint(columnNames = "loan_number"))
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_number", nullable = false, unique = true, length = 50)
    private String loanNumber;

    @Column(name = "borrower_name", nullable = false, length = 255)
    private String borrowerName;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "application_date")
    private Instant applicationDate;

    @Column(name = "decision_date")
    private Instant decisionDate;

    @Column(name = "analyst_name", length = 255)
    private String analystName;

    @Column(name = "purpose", length = 1000)
    private String purpose;

    @Column(name = "term_months")
    private Integer termMonths;

    @Column(name = "interest_rate")
    private BigDecimal interestRate;

    @Column(name = "monthly_payment")
    private BigDecimal monthlyPayment;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public Loan() {
    }

    public Loan(Long id, String loanNumber, String borrowerName, BigDecimal amount, String status,
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

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Loan loan = (Loan) o;
        return Objects.equals(loanNumber, loan.loanNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(loanNumber);
    }

    @Override
    public String toString() {
        return "Loan{" +
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