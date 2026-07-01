package com.example.policymanagement.service;

import com.example.policymanagement.entity.Policy;
import com.example.policymanagement.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIService {

    private final ChatClient chatClient;
    private final PolicyRepository policyRepository;

    public String chat(String userMessage) {

        List<Policy> policies = policyRepository.findAll();

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are an insurance expert.

Recommend ONLY from these policies.

""");

        for (Policy p : policies) {

            prompt.append("""
Policy Number: %s
Name: %s
Type: %s
Premium: ₹%s
Coverage: ₹%s
Duration: %s months
Description: %s

"""
                    .formatted(
                            p.getPolicyNumber(),
                            p.getName(),
                            p.getType(),
                            p.getPremiumAmount(),
                            p.getCoverageAmount(),
                            p.getDurationInMonths(),
                            p.getDescription()
                    ));
        }

        prompt.append("""
Answer the following customer question.

Question:
""");

        prompt.append(userMessage);

        return chatClient
                .prompt(prompt.toString())
                .call()
                .content();
    }
}