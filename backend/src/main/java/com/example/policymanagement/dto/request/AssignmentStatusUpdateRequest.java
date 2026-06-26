package com.example.policymanagement.dto.request;

import com.example.policymanagement.enums.AssignmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private AssignmentStatus status;
}
