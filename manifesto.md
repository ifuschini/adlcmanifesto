# ADLC Manifesto

Version: V1.3

ADLC, the Agentic Delivery Lifecycle, is a lifecycle model for building governed, tool-agnostic agentic systems.

It is designed as an extension of SDLC, not as a replacement for it. ADLC preserves software delivery discipline and adds the practices required by agentic systems: requirements quality gates, human-in-the-loop checkpoints, orchestration, knowledge governance, shared agents, shared skills, traceability, and continuous operational improvement.

## Core Statement

Agent development must be governed, tool-agnostic, and lifecycle-driven.

No implementation should begin before a requirements quality gate has been passed.

In agentic systems, knowledge is behavior.

Changing the knowledge layer can change how the agent acts, decides, explains, and escalates.

Human-in-the-loop control is mandatory where requirements are approved, quality is reviewed, releases are authorized, and production operations are governed.

## Knowledge and RAG Governance

The ADLC treats the knowledge layer as a governed part of the system. Documents, prompts, RAG sources, shared skills, policies, examples, and tool instructions can influence agent behavior and may introduce silent regressions even when no application code changes.

Knowledge changes must therefore be reviewed, versioned, traceable, and validated against expected behavior before they are used in production.

## Principles

1. Start from validated requirements.
2. Ensure reuse and orchestration.
3. Remain independent from tools.

## Positioning

We affirm that agentic delivery must be governed end-to-end.

Security, runtime monitoring, and operational control are necessary, but they are not enough on their own.

ADLC starts from requirements quality and extends through orchestration, human checkpoints, traceability, governed knowledge, shared enterprise skills, and continuous operational improvement.

## Links

- Website: https://adlcmanifesto.org/
- GitHub repository: https://github.com/ifuschini/adlcmanifesto
