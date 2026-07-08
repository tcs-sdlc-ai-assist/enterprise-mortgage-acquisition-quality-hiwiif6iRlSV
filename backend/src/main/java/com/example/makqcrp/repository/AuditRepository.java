package com.example.makqcrp.repository;

import com.example.makqcrp.model.AuditEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditRepository extends JpaRepository<AuditEvent, Long> {
}