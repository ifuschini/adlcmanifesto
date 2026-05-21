# ADLC Shared Skills

Version: V1.2

Shared skills are reusable company-specific capabilities that agents and teams can apply consistently across the ADLC.

They may start from consolidated frameworks, industry practices, or internal standards, but they must be adapted to the enterprise context: architecture, policies, vocabulary, delivery culture, risk model, infrastructure model, and governance expectations.

Shared skills are not agents. Agents execute work. Skills encode how work should be performed in a way that is repeatable, governable, and aligned with the company.

## Core Principle

Shared skills should be selected and shaped for the organization.

They should:

- reflect the real operating model of the company
- encode reusable know-how into governed execution patterns
- be usable by multiple agents and teams
- remain aligned with architecture, security, infrastructure, documentation, and delivery policies
- govern knowledge and RAG changes as controlled changes, not as invisible content edits
- evolve as the enterprise learns from incidents, releases, reviews, and operations

## Documentation Skill

Purpose:
Defines how documentation is written, structured, linked, and published in the official knowledge base.

Typical scope:

- ADR format
- runbook structure
- Confluence or equivalent page templates
- onboarding pages
- architecture notes
- FAQ structure
- evidence links between documentation, tickets, PRs, releases, and operational records

Expected outcome:
Documentation remains consistent, findable, traceable, and connected to real delivery events.

## RAG Governance Skill

Purpose:
Defines how knowledge sources are selected, approved, chunked, versioned, retired, tested, and traced.

Typical scope:

- source ownership
- document freshness
- RAG source approval
- chunking and retrieval evaluation
- contradiction handling
- citation expectations
- prompt and knowledge change history
- regression testing after knowledge updates
- traceability from requirement to knowledge source, agent behavior, test evidence, and release

Expected outcome:
RAG content and shared knowledge improve agent behavior without introducing uncontrolled change.

## Release Notes Skill

Purpose:
Defines how release notes are generated, grouped, reviewed, and adapted for different audiences.

Typical scope:

- feature summaries
- fixes
- breaking changes
- migrations
- known issues
- rollback notes
- operational notes
- technical and business-friendly summaries

Expected outcome:
Every release communicates change clearly to engineering, operations, business stakeholders, and, where needed, external users.

## Architecture Skill

Purpose:
Captures the enterprise's architectural principles, decision criteria, reference patterns, and review expectations.

Typical scope:

- architectural guardrails
- reference architectures
- design review expectations
- reuse principles
- integration patterns
- orchestration principles
- decision records
- constraints specific to the company architecture

Expected outcome:
Agents reason with local architectural standards instead of generic architecture advice.

## Infrastructure Skill

Purpose:
Encodes platform conventions and infrastructure practices used by the company.

Typical scope:

- environment strategy
- deployment conventions
- observability
- rollback guidance
- naming conventions
- ownership model
- operational readiness
- runbook requirements
- production support expectations

Expected outcome:
Infrastructure-related work reflects the real platform model of the enterprise instead of an abstract cloud checklist.

## CISO Security Skill

Purpose:
Defines security-specific rules and guidance that agents must follow when supporting delivery activities.

This skill should be defined, reviewed, or validated by the CISO organization and aligned with enterprise security policies.

Typical scope:

- data handling
- identity and access control
- secrets management
- threat modeling
- secure prompt and tool usage
- audit evidence
- compliance requirements
- security review expectations
- incident and escalation patterns

Expected outcome:
Security is embedded into agentic delivery as an explicit, reusable, and governed capability rather than handled as an afterthought.

## Ownership And Evolution

Shared skills should have clear ownership.

Suggested owners:

- Documentation Skill: knowledge management, architecture, or engineering enablement
- RAG Governance Skill: knowledge management, product operations, compliance, or enterprise architecture
- Release Notes Skill: engineering, product operations, or release management
- Architecture Skill: architecture group or platform architecture
- Infrastructure Skill: platform engineering, SRE, or cloud infrastructure
- CISO Security Skill: CISO organization or security architecture

Each skill should be reviewed periodically and updated when enterprise standards, tooling, regulations, incidents, or delivery practices change.

## Relationship With Shared Agents

Shared agents use shared skills to perform work consistently.

Examples:

- a Documentation Agent can use the Documentation Skill
- a RAG Governance Agent can use the RAG Governance Skill
- a Release Notes Agent can use the Release Notes Skill
- a PR Governance Agent can use the Architecture Skill and CISO Security Skill
- an Operational Readiness Agent can use the Infrastructure Skill
- a Compliance and Traceability Agent can use multiple skills to produce audit-ready evidence

The ADLC becomes stronger when agents and skills are managed together: agents provide execution, skills provide enterprise-specific method.
