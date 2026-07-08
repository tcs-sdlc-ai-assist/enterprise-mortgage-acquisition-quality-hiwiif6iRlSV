package com.example.makqcrp.service;

import com.example.makqcrp.model.Rule;
import com.example.makqcrp.repository.RuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Rule business logic.
 */
@Service
public class RuleService {

    private final RuleRepository ruleRepository;

    public RuleService(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    /**
     * Creates a new rule.
     *
     * @param rule the rule to create
     * @return the created rule
     */
    public Rule createRule(Rule rule) {
        return ruleRepository.save(rule);
    }

    /**
     * Retrieves a rule by its ID.
     *
     * @param id the ID of the rule to retrieve
     * @return an Optional containing the rule if found, or empty if not found
     */
    public Optional<Rule> getRuleById(Long id) {
        return ruleRepository.findById(id);
    }

    /**
     * Retrieves all rules.
     *
     * @return a list of all rules
     */
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }

    /**
     * Updates an existing rule.
     *
     * @param rule the rule to update (must contain the ID)
     * @return the updated rule
     */
    public Rule updateRule(Rule rule) {
        return ruleRepository.save(rule);
    }

    /**
     * Deletes a rule by its ID.
     *
     * @param id the ID of the rule to delete
     */
    public void deleteRule(Long id) {
        ruleRepository.deleteById(id);
    }
}