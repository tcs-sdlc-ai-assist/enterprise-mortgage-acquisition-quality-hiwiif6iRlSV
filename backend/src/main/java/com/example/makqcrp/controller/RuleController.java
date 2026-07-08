package com.example.makqcrp.controller;

import com.example.makqcrp.model.Rule;
import com.example.makqcrp.service.RuleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for Rule operations.
 */
@RestController
@RequestMapping("/api/risk-manager/rules")
public class RuleController {

    private final RuleService ruleService;

    public RuleController(RuleService ruleService) {
        this.ruleService = ruleService;
    }

    @GetMapping
    public ResponseEntity<List<Rule>> getAllRules() {
        return ResponseEntity.ok(ruleService.getAllRules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rule> getRuleById(@PathVariable Long id) {
        return ruleService.getRuleById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Rule> createRule(@Valid @RequestBody Rule rule) {
        Rule createdRule = ruleService.createRule(rule);
        return ResponseEntity.created(
                URI.create("/api/risk-manager/rules/" + createdRule.getId()))
                .body(createdRule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rule> updateRule(@PathVariable Long id, @Valid @RequestBody Rule ruleDetails) {
        return ruleService.getRuleById(id)
                .map(existingRule -> {
                    existingRule.setRuleName(ruleDetails.getRuleName());
                    existingRule.setDescription(ruleDetails.getDescription());
                    existingRule.setRuleExpression(ruleDetails.getRuleExpression());
                    existingRule.setStatus(ruleDetails.getStatus());
                    Rule updatedRule = ruleService.updateRule(existingRule);
                    return ResponseEntity.ok(updatedRule);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRule(@PathVariable Long id) {
        if (ruleService.getRuleById(id).isPresent()) {
            ruleService.deleteRule(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```