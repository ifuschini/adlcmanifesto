# ADLC Lifecycle

Version: V1.4

The ADLC lifecycle is a governed loop for agentic delivery. It extends SDLC by adding explicit checkpoints for requirements quality, human control, orchestration, and continuous operational improvement.

At every human checkpoint, assign reviewers trained in the domain, agent limitations, and decision risks. Provide evidence, sources, uncertainties, and action consequences, with enough time and a manageable workload for substantive review. Reviewers must be authorized to challenge, reject, pause, request revision, and escalate. Risk-proportionate training and incident exercises keep this capability effective; a click alone is not approval evidence.

## Step 0: Requirements Quality Gate

The Requirements Quality Gate is the mandatory entry point into ADLC.

No implementation starts without a passed requirements quality gate. Requirements must be complete enough for the next increment, coherent, traceable, and accompanied by measurable acceptance criteria and declared uncertainties. A quality gate agent may support clarification; accountable humans approve the scope.

Compare deterministic automation, an LLM workflow, a single agent, and a multi-agent system against a measurable business outcome. Choose the least autonomy and complexity that meets the need. Experiments also require an approved hypothesis, sandbox, permitted data, budget, and exit criteria.

Human-in-the-loop is required here.

## Step 1: Implement

Implementation converts approved requirements into agentic components, tools, workflows, prompts, integrations, policies, and supporting code.

Implementation should remain tool-agnostic: tools can help, but they should not dictate architecture or governance.

Implement an autonomy contract with ownership, permitted actions and data, delegated authority, budgets, stop conditions, and escalation. Enforce least privilege, user isolation, tool authorization, and revocation outside the prompt. Humans remain designers and implementers.

## Step 2: Review

Review validates quality, alignment, risk, maintainability, and compliance before release movement continues.

Review the autonomy contract, trust boundaries, memory writes, irreversible actions, evaluator independence, and recovery procedures. Agent-generated recommendations do not replace accountable approval.

Human-in-the-loop is required here.

## Step 3: Test

Testing evaluates deterministic behavior, non-deterministic behavior, safety, edge cases, regressions, and expected agent outcomes.

For agentic systems, testing must consider behavior, not only code.

Testing also covers behavioral regression caused by changes to prompts, RAG content, shared skills, model configuration, tools, and orchestration rules.

Use representative versioned datasets, risk-based acceptance thresholds, repeated trials, and isolated test state. Check actual task outcomes and prohibited actions, not just convincing responses. Calibrate model-based evaluators with domain experts and preserve uncertainty in reported results. Test escalation, stop controls, prompt injection, memory poisoning, and permission boundaries.

## Step 4: Deploy

Deployment moves validated changes into controlled environments with release evidence, rollback guidance, ownership, and traceability.

Release evidence must identify code changes, prompt changes, RAG or documentation changes, tool changes, model configuration changes, and orchestration changes.

Include the approved autonomy contract, evaluation results and thresholds, and recovery evidence. Distinguish configuration rollback, state restoration, and compensation for external effects. Irreversible actions need preventive limits and risk-appropriate approval. Use staged rollout with defined stop criteria.

Human-in-the-loop is required here.

## Step 5: Operate

Operation governs production behavior, monitoring, incidents, runbooks, escalation, and runtime evidence.

Operations must monitor not only technical health, but also behavioral drift, unexpected answers, outdated knowledge usage, retrieval failures, and regressions introduced by knowledge updates.

Measure cost per successfully completed task, latency, intervention, rework, escalation, and business outcomes alongside safety and quality. Enforce time, cost, and tool-call budgets; handle timeouts, bounded retries, duplicate actions, and degraded operation. Maintain a tested stop and revocation mechanism.

Human-in-the-loop is required here.

## Step 6: Improve

Improvement turns operational evidence, incidents, feedback, reviews, and lessons learned into better requirements, better skills, better agents, and better governance.

Reassess value against simpler alternatives. Evidence may justify less autonomy or retirement. Retirement revokes credentials, disables endpoints and scheduled work, and disposes of memory and data according to approved retention rules.

## Step 7: Orchestrate

Orchestration is a cross-cutting layer, not a simple sequential step.

It coordinates agents, skills, tools, policies, documentation, release governance, traceability, and feedback across the lifecycle.

It must preserve traceability from requirement to knowledge source, agent behavior, test evidence, and release.

Propagate identity, permissions, budgets, and approval scope across delegation. Persist only necessary recovery state and prevent retries from duplicating external effects. Govern context and memory provenance, write permissions, retention, isolation, deletion, and contradictions.

## Double Loop

ADLC is not a one-way pipeline.

It has a delivery loop from requirements to operation, and a learning loop from operation back to requirements, skills, and orchestration.

See the [enterprise adoption guide](docs/enterprise-adoption.md) for a worked lifecycle example.
