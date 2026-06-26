package com.example.policymanagement.service;

import com.example.policymanagement.dto.request.AssignmentStatusUpdateRequest;
import com.example.policymanagement.dto.request.PolicyAssignmentRequest;
import com.example.policymanagement.dto.response.PolicyAssignmentResponse;
import com.example.policymanagement.entity.Customer;
import com.example.policymanagement.entity.Policy;
import com.example.policymanagement.entity.PolicyAssignment;
import com.example.policymanagement.enums.AssignmentStatus;
import com.example.policymanagement.exception.BadRequestException;
import com.example.policymanagement.exception.ResourceNotFoundException;
import com.example.policymanagement.repository.PolicyAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PolicyAssignmentService {

    private final PolicyAssignmentRepository assignmentRepository;
    private final CustomerService customerService;
    private final PolicyService policyService;

    public PolicyAssignmentResponse assignPolicy(PolicyAssignmentRequest request) {
        Customer customer = customerService.findCustomerById(request.getCustomerId());
        Policy policy = policyService.findPolicyById(request.getPolicyId());

        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate() == null
                ? startDate.plusMonths(policy.getDurationInMonths())
                : request.getEndDate();

        if (!endDate.isAfter(startDate)) {
            throw new BadRequestException("End date must be after start date");
        }

        PolicyAssignment assignment = PolicyAssignment.builder()
                .customer(customer)
                .policy(policy)
                .startDate(startDate)
                .endDate(endDate)
                .status(request.getStatus() == null ? AssignmentStatus.ACTIVE : request.getStatus())
                .build();

        return toResponse(assignmentRepository.save(assignment));
    }

    @Transactional(readOnly = true)
    public List<PolicyAssignmentResponse> getAllAssignments() {
        return assignmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PolicyAssignmentResponse getAssignmentById(Long id) {
        return toResponse(findAssignmentById(id));
    }

    @Transactional(readOnly = true)
    public List<PolicyAssignmentResponse> getAssignmentsByCustomer(Long customerId) {
        customerService.findCustomerById(customerId);
        return assignmentRepository.findByCustomerId(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PolicyAssignmentResponse> getAssignmentsByPolicy(Long policyId) {
        policyService.findPolicyById(policyId);
        return assignmentRepository.findByPolicyId(policyId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public PolicyAssignmentResponse updateAssignmentStatus(Long id, AssignmentStatusUpdateRequest request) {
        PolicyAssignment assignment = findAssignmentById(id);
        assignment.setStatus(request.getStatus());
        return toResponse(assignmentRepository.save(assignment));
    }

    public void deleteAssignment(Long id) {
        PolicyAssignment assignment = findAssignmentById(id);
        assignmentRepository.delete(assignment);
    }

    private PolicyAssignment findAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy assignment not found with id: " + id));
    }

    private PolicyAssignmentResponse toResponse(PolicyAssignment assignment) {
        return PolicyAssignmentResponse.builder()
                .id(assignment.getId())
                .customerId(assignment.getCustomer().getId())
                .customerName(assignment.getCustomer().getName())
                .policyId(assignment.getPolicy().getId())
                .policyNumber(assignment.getPolicy().getPolicyNumber())
                .policyName(assignment.getPolicy().getName())
                .startDate(assignment.getStartDate())
                .endDate(assignment.getEndDate())
                .status(assignment.getStatus())
                .assignedAt(assignment.getAssignedAt())
                .build();
    }
}
