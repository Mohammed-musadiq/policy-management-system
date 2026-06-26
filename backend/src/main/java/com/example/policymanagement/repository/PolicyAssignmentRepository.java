package com.example.policymanagement.repository;

import com.example.policymanagement.entity.PolicyAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyAssignmentRepository extends JpaRepository<PolicyAssignment, Long> {

    List<PolicyAssignment> findByCustomerId(Long customerId);

    List<PolicyAssignment> findByPolicyId(Long policyId);
}
