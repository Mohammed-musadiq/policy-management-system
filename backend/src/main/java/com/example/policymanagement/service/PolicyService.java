package com.example.policymanagement.service;

import com.example.policymanagement.dto.request.PolicyRequest;
import com.example.policymanagement.dto.response.PolicyResponse;
import com.example.policymanagement.entity.Policy;
import com.example.policymanagement.exception.DuplicateResourceException;
import com.example.policymanagement.exception.ResourceNotFoundException;
import com.example.policymanagement.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.policymanagement.exception.BadRequestException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyResponse createPolicy(PolicyRequest request) {
        if (policyRepository.existsByPolicyNumber(request.getPolicyNumber())) {
            throw new DuplicateResourceException("Policy number already exists");
        }

        Policy policy = Policy.builder()
                .policyNumber(request.getPolicyNumber())
                .name(request.getName())
                .type(request.getType())
                .premiumAmount(request.getPremiumAmount())
                .coverageAmount(request.getCoverageAmount())
                .durationInMonths(request.getDurationInMonths())
                .description(request.getDescription())
                .build();

        return toResponse(policyRepository.save(policy));
    }

    @Transactional(readOnly = true)
    public List<PolicyResponse> getAllPolicies() {
        return policyRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PolicyResponse getPolicyById(Long id) {
        return toResponse(findPolicyById(id));
    }

    public PolicyResponse updatePolicy(Long id, PolicyRequest request) {
        Policy policy = findPolicyById(id);
        if (policyRepository.existsByPolicyNumberAndIdNot(request.getPolicyNumber(), id)) {
            throw new DuplicateResourceException("Policy number already exists");
        }

        policy.setPolicyNumber(request.getPolicyNumber());
        policy.setName(request.getName());
        policy.setType(request.getType());
        policy.setPremiumAmount(request.getPremiumAmount());
        policy.setCoverageAmount(request.getCoverageAmount());
        policy.setDurationInMonths(request.getDurationInMonths());
        policy.setDescription(request.getDescription());

        return toResponse(policyRepository.save(policy));
    }

    public void deletePolicy(Long id) {

    Policy policy = findPolicyById(id);

    if (!policy.getAssignments().isEmpty()) {
        throw new BadRequestException(
                "Cannot delete policy because it is assigned to one or more customers."
        );
    }

    policyRepository.delete(policy);
}

    @Transactional(readOnly = true)
    public Policy findPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with id: " + id));
    }

    private PolicyResponse toResponse(Policy policy) {
        return PolicyResponse.builder()
                .id(policy.getId())
                .policyNumber(policy.getPolicyNumber())
                .name(policy.getName())
                .type(policy.getType())
                .premiumAmount(policy.getPremiumAmount())
                .coverageAmount(policy.getCoverageAmount())
                .durationInMonths(policy.getDurationInMonths())
                .description(policy.getDescription())
                .createdAt(policy.getCreatedAt())
                .build();
    }
}
