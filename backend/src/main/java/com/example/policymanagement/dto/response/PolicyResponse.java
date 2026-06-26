package com.example.policymanagement.dto.response;

import com.example.policymanagement.enums.PolicyType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class PolicyResponse {

    private Long id;
    private String policyNumber;
    private String name;
    private PolicyType type;
    private BigDecimal premiumAmount;
    private BigDecimal coverageAmount;
    private Integer durationInMonths;
    private String description;
    private LocalDateTime createdAt;
}
