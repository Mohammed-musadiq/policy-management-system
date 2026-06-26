package com.example.policymanagement.repository;

import com.example.policymanagement.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    boolean existsByPolicyNumber(String policyNumber);

    boolean existsByPolicyNumberAndIdNot(String policyNumber, Long id);
}
