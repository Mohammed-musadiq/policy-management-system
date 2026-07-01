package com.example.policymanagement.entity;

import com.example.policymanagement.enums.PolicyType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "policies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true,length = 50)
    private String policyNumber;

    @Column(nullable = false,length = 120)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PolicyType type;

    @Column(nullable = false,precision = 12,scale = 2)
    private BigDecimal premiumAmount;

    @Column(nullable = false,precision = 12,scale = 2)
    private BigDecimal coverageAmount;

    @Column(nullable = false)
    private Integer durationInMonths;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "policy")
    private List<PolicyAssignment> assignments = new ArrayList<>();

    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}