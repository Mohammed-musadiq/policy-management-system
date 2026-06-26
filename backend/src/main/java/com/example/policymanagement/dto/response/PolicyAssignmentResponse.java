package com.example.policymanagement.dto.response;

import com.example.policymanagement.enums.AssignmentStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class PolicyAssignmentResponse {

    private Long id;
    private Long customerId;
    private String customerName;
    private Long policyId;
    private String policyNumber;
    private String policyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private AssignmentStatus status;
    private LocalDateTime assignedAt;
}
