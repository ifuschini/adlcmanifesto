# ADLC Lifecycle

Version: V1.1

The ADLC lifecycle is a governed loop for agentic delivery. It extends SDLC by adding explicit checkpoints for requirements quality, human control, orchestration, and continuous operational improvement.

## Step 0: Requirements Quality Gate

The Requirements Quality Gate is the mandatory entry point into ADLC.

Before implementation starts, the system must demonstrate that requirements are complete, coherent, understandable, and ready for execution. A dedicated quality gate agent should help the client write requirements that are as clear as possible, reduce ambiguity, and prepare evidence for human approval.

Human-in-the-loop is required here.

## Step 1: Implement

Implementation converts approved requirements into agentic components, tools, workflows, prompts, integrations, policies, and supporting code.

Implementation should remain tool-agnostic: tools can help, but they should not dictate architecture or governance.

## Step 2: Review

Review validates quality, alignment, risk, maintainability, and compliance before release movement continues.

Human-in-the-loop is required here.

## Step 3: Test

Testing evaluates deterministic behavior, non-deterministic behavior, safety, edge cases, regressions, and expected agent outcomes.

For agentic systems, testing must consider behavior, not only code.

## Step 4: Deploy

Deployment moves validated changes into controlled environments with release evidence, rollback guidance, ownership, and traceability.

Human-in-the-loop is required here.

## Step 5: Operate

Operation governs production behavior, monitoring, incidents, runbooks, escalation, and runtime evidence.

Human-in-the-loop is required here.

## Step 6: Improve

Improvement turns operational evidence, incidents, feedback, reviews, and lessons learned into better requirements, better skills, better agents, and better governance.

## Step 7: Orchestrate

Orchestration is a cross-cutting layer, not a simple sequential step.

It coordinates agents, skills, tools, policies, documentation, release governance, traceability, and feedback across the lifecycle.

## Double Loop

ADLC is not a one-way pipeline.

It has a delivery loop from requirements to operation, and a learning loop from operation back to requirements, skills, and orchestration.
