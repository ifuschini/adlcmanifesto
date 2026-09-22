# ADLC Manifesto

Version: V1.4

ADLC, the Agentic Delivery Lifecycle, is a lifecycle model for building governed, tool-agnostic agentic systems.

It is designed as an extension of SDLC, not as a replacement for it. ADLC preserves software delivery discipline and adds the practices required by agentic systems: requirements quality gates, human-in-the-loop checkpoints, orchestration, knowledge governance, shared agents, shared skills, traceability, and continuous operational improvement.

## Core Statement

Agent development must be governed, tool-agnostic, and lifecycle-driven.

No implementation starts without a passed requirements quality gate.

The gate approves the next increment: business outcome, acceptance criteria, constraints, and declared uncertainties. Bounded experiments require an approved hypothesis, sandbox, permitted data, budget, and exit criteria.

In agentic systems, knowledge is behavior.

Changing the knowledge layer can change how the agent acts, decides, explains, and escalates.

Human-in-the-loop control is mandatory where requirements are approved, quality is reviewed, releases are authorized, and production operations are governed.

Competent oversight, not rubber-stamp approval. Reviewers must be trained in the domain, agent limitations, and decision risks. They need accessible evidence, sufficient time, a manageable workload, and authority to challenge, reject, pause, request revision, and escalate. Formal approval without substantive verification is not a governance control.

## Knowledge and RAG Governance

The ADLC treats the knowledge layer as a governed part of the system. Documents, prompts, RAG sources, shared skills, policies, examples, and tool instructions can influence agent behavior and may introduce silent regressions even when no application code changes.

Knowledge changes must therefore be reviewed, versioned, traceable, and validated against expected behavior before they are used in production.

Runtime context and agent-written memory also require provenance, write permissions, retention, user isolation, deletion, and contradiction handling. Context compression must preserve constraints, permissions, and evidence needed for correctness.

## Principles

1. Start from validated requirements.
2. Ensure reuse and orchestration.
3. Remain independent from tools.
4. Use the least autonomy and complexity needed to achieve the validated outcome.
5. Grant autonomy on demonstrated evidence and enforce its limits.

## Autonomy and Accountability

Each agent needs an explicit autonomy contract: a named owner, allowed actions, accessible data, delegated authority, cost and execution limits, stop conditions, and escalation paths. Runtime controls must enforce these boundaries independently of prompts. Authority must be observable and revocable.

Humans continue to design, implement, review, approve, and operate systems. Agent assistance does not transfer accountability.

## Evidence, Recovery, and Value

Release decisions require representative evaluations, risk-based thresholds, repeated trials, actual outcome verification, and policy checks. Model-based evaluators must be calibrated against human judgment.

Recovery must address configuration rollback, state restoration, and compensation for external effects. Irreversible actions require preventive controls and risk-appropriate approval; reverting a model cannot undo a completed external action.

Operational success includes quality, safety, cost per successfully completed task, latency, human intervention, rework, and escalation. Evidence can justify reducing autonomy or retiring a system.

See the [enterprise adoption guide](docs/enterprise-adoption.md) for controls, evidence, and a worked example.

## Positioning

We affirm that agentic delivery must be governed end-to-end.

Security, runtime monitoring, and operational control are necessary, but they are not enough on their own.

ADLC starts from requirements quality and extends through orchestration, human checkpoints, traceability, governed knowledge, shared enterprise skills, and continuous operational improvement.

## Links

- Website: https://adlcmanifesto.org/
- GitHub repository: https://github.com/ifuschini/adlcmanifesto
