package com.example.makqcrp.repository;

import com.example.makqcrp.model.RemedyCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RemedyRepository extends JpaRepository<RemedyCase, Long> {
}