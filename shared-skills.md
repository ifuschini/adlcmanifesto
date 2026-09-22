# ADLC Shared Skills

Version: V1.5

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
Defines how human documentation and agent context are produced as connected but separate artifacts, with shared provenance and approval.

Typical scope:

- ADR format
- runbook structure
- Confluence or equivalent page templates
- onboarding pages
- architecture notes
- FAQ structure
- evidence links between documentation, tickets, PRs, releases, and operational records
- human-facing knowledge bases, such as Confluence or Backstage TechDocs
- agent-facing context endpoints, such as governed MCP servers, retrieval indexes, or versioned context packs
- stable cross-project URLs, access controls, source versions, ownership, and approval status
- concise, task-relevant context that reduces token usage without losing constraints, permissions, or source evidence

Expected outcome:
People receive readable documentation; agents retrieve approved, relevant context through a dedicated interface. Both remain traceable to the same authoritative sources. A URL or llms.txt file alone does not provide access control or governance.

## Knowledge Governance Skill

Purpose:
Defines how knowledge sources, RAG content, context endpoints, and runtime memory are selected, owned, approved, structured, versioned, tested, traced, and retired.

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
- memory provenance, permitted writers, retention, tenant and user isolation, deletion, and contradiction handling
- treatment of retrieved content as data, not authority to override system policy
- context compression that preserves permissions, constraints, and decision-critical evidence

Expected outcome:
Knowledge and runtime context improve agent behavior without introducing uncontrolled change or unauthorized memory persistence.

## Behavioral Evaluation Skill

Purpose:
Defines how teams measure agent outcomes, policy compliance, reliability, and regression risk before release and during operation.

Typical scope:

- representative, versioned datasets linked to requirements and risk scenarios
- repeated trials with isolated state and recorded model, prompt, tool, and knowledge versions
- risk-based acceptance thresholds, sample size, variability, and known coverage gaps
- actual task outcomes and external effects, not only plausible answers or exact execution paths
- human calibration of model-based graders and review of disagreements
- adversarial cases, permission boundaries, retrieval failures, escalation, and stopping behavior
- regression checks after any behavior-changing input changes
- cost per successful task, latency, human intervention, and business value against a baseline

Expected outcome:
Release and improvement decisions use reviewable behavioral evidence. Passing a finite test set is not a guarantee of safety in production.

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
- Knowledge Governance Skill: knowledge management, product operations, compliance, or enterprise architecture
- Behavioral Evaluation Skill: quality engineering, product owners, domain experts, and risk owners
- Release Notes Skill: engineering, product operations, or release management
- Architecture Skill: architecture group or platform architecture
- Infrastructure Skill: platform engineering, SRE, or cloud infrastructure
- CISO Security Skill: CISO organization or security architecture

Each skill should be reviewed periodically and updated when enterprise standards, tooling, regulations, incidents, or delivery practices change.

## Relationship With Shared Agents

Shared agents use shared skills to perform work consistently.

Examples:

- a Documentation Agent can use the Documentation Skill
- a Knowledge Governance Agent can use the Knowledge Governance Skill
- implementation, review, and operational agents can use the Behavioral Evaluation Skill, with accountable human approval of thresholds and release decisions
- a Release Notes Agent can use the Release Notes Skill
- a PR Governance Agent can use the Architecture Skill and CISO Security Skill
- an Operational Readiness Agent can use the Infrastructure Skill
- a Compliance and Traceability Agent can use multiple skills to produce audit-ready evidence

The ADLC becomes stronger when agents and skills are managed together: agents provide execution, skills provide enterprise-specific method.
