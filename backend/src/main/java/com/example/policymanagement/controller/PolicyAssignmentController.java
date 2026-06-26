package com.example.policymanagement.controller;

import com.example.policymanagement.dto.request.AssignmentStatusUpdateRequest;
import com.example.policymanagement.dto.request.PolicyAssignmentRequest;
import com.example.policymanagement.dto.response.PolicyAssignmentResponse;
import com.example.policymanagement.service.PolicyAssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/assignments")
public class PolicyAssignmentController {

    private final PolicyAssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<PolicyAssignmentResponse> assignPolicy(@Valid @RequestBody PolicyAssignmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(assignmentService.assignPolicy(request));
    }

    @GetMapping
    public ResponseEntity<List<PolicyAssignmentResponse>> getAllAssignments(
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long policyId
    ) {
        if (customerId != null) {
            return ResponseEntity.ok(assignmentService.getAssignmentsByCustomer(customerId));
        }
        if (policyId != null) {
            return ResponseEntity.ok(assignmentService.getAssignmentsByPolicy(policyId));
        }
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolicyAssignmentResponse> getAssignmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PolicyAssignmentResponse> updateAssignmentStatus(
            @PathVariable Long id,
            @Valid @RequestBody AssignmentStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(assignmentService.updateAssignmentStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.noContent().build();
    }
}
