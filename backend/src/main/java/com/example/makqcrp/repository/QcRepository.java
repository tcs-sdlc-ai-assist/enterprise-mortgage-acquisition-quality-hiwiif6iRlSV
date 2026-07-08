package com.example.makqcrp.repository;

import com.example.makqcrp.model.QcCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QcRepository extends JpaRepository<QcCase, Long> {
}