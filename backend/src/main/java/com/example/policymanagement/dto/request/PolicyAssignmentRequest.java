package com.example.policymanagement.dto.request;

import com.example.policymanagement.enums.AssignmentStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PolicyAssignmentRequest {

    @NotNull(message = "Customer id is required")
    private Long customerId;

    @NotNull(message = "Policy id is required")
    private Long policyId;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be today or a future date")
    private LocalDate startDate;

    private LocalDate endDate;

    private AssignmentStatus status;
}
