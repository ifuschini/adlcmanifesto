# Enterprise ADLC Adoption Guide

This guide makes the [manifesto](../manifesto.md), [lifecycle](../lifecycle.md),
and [shared skills](../shared-skills.md) operational. It is an illustrative
adoption pattern, not a certification, compliance guarantee, or universal set
of thresholds. Adapt controls to business impact and the organization's risk
model. English is the source of truth for this guide.

Knowledge Governance covers documents, prompts, shared skills, policies, memory,
and runtime context, regardless of how they are supplied. Retrieval-augmented
generation (RAG) is one optional technique, not a prerequisite for ADLC. Where
used, govern retrieval quality, source freshness, access permissions, and
citations, alongside behavioral regression tests. Context engineering composes
the agent's operational context; it does not replace these governance controls.

## 1. Approve the Next Increment

**No implementation starts without a passed requirements quality gate.**

Approve the scope of the next increment, rather than trying to freeze every
future requirement. Record the accountable business, engineering, and risk
owners; expected outcome; measurable acceptance criteria; authorized data;
known uncertainties; and conditions that require a new approval.

Compare deterministic automation, an LLM workflow, a single agent, and
multi-agent orchestration. Use the least autonomy and complexity needed to
achieve the validated outcome. More agents are not evidence of greater maturity.

For an experiment, the approved increment must specify the hypothesis, sandbox,
permitted data, budget, and exit criteria. Experimental approval does not grant
production access. A quality gate agent can prepare evidence but cannot replace
the accountable human decision.

## 2. Define an Autonomy Contract

Version this contract alongside the implementation and release evidence:

| Control | Required decision |
| --- | --- |
| Accountability | Named business owner, technical operator, risk reviewer, and escalation route |
| Authority | Allowed and forbidden actions, delegated roles, and human approval boundaries |
| Data | Permitted sources, classification, tenant and user scope, and output destinations |
| Limits | Cost, time, tool-call and retry budgets; maximum transaction or business impact |
| Enforcement | Least-privilege credentials and policy checks at the tool or service boundary, not only in prompts |
| Approval | Authorized approver, exact action and input version approved, expiry, and reapproval on material changes |
| Stop and recovery | Stop conditions, revocation, degraded operation, reconciliation and compensation owners |
| Delegation | Downstream agents inherit or narrow authority; they cannot silently increase it |

Test denied actions as well as allowed actions. Retrieved documents, tool
responses, and other untrusted content cannot override the contract. Record
decisions and tool outcomes without logging unnecessary secrets or personal data.

### Make Human Oversight Effective

Competent oversight, not rubber-stamp approval. Assign reviewers trained in the
domain, agent limitations, and decision risks. Before assigning approval duties,
use risk-proportionate exercises with incorrect recommendations, missing evidence,
and incidents to verify that reviewers can recognize uncertainty and intervene.
Refresh training after material system changes or relevant incidents.

- Provide sources, evidence, known limitations, uncertainty, and the consequences of the proposed action, not only the agent's recommendation.
- Give reviewers enough time and a manageable workload. If meaningful review is unavailable, pause the action or route it to an authorized alternative; do not silently approve it.
- Grant effective authority to challenge, reject, pause, request revision, and escalate, without relying on the agent's cooperation.
- Record the reviewer, evidence reviewed, decision, and risk-proportionate rationale. Periodically sample decision quality and investigate signs of habitual approval; approval counts alone do not demonstrate oversight.

Formal approval without substantive verification is not a governance control.

## 3. Govern Knowledge, Context, and Memory

**Distributed enterprise context, governed access.** Agents must be able to discover and use relevant information through interoperable interfaces, such as APIs, MCP, or equivalent mechanisms. Sources retain ownership, versions, provenance, and access permissions. Context must be selected for the task, and its contribution to output quality must be evaluated.

[FAIR](https://www.gofair.foundation/fair-principles), [W3C DCAT 3](https://www.w3.org/TR/vocab-dcat-3/), [W3C PROV-DM](https://www.w3.org/TR/prov-dm/). These references support discoverability, interoperability, and provenance; they do not by themselves guarantee better agent outputs.

Keep human documentation and agent context connected but separate. Human
documentation supports reading, review, and audit. Agent-facing endpoints expose
approved, task-relevant context with stable URLs, authenticated access where
needed, source ownership, versions, approval state, and retrieval rules.

Versioned source snapshots and retrieval configuration belong in release
evidence. Mutable memory instead requires a governed event history: origin,
permitted writer, scope, timestamps, retention, correction, and deletion. Isolate
users and tenants; define how contradictory or stale facts are resolved. Do not
automatically promote an agent's inference into authoritative knowledge.

Context compression should save tokens without removing permissions, constraints,
source provenance, or evidence needed for a correct decision. Evaluate compressed
context against the same behavioral requirements. A URL, MCP connection, or
llms.txt file alone does not establish trust or authorization.

## 4. Evaluate Behavior Before Promotion

### Verify Software Produced by Agents

Validation of agent-produced software requires competent human oversight. Accountable people approve acceptance criteria, review test adequacy, and assess evidence and residual risk to authorize release. Agents may generate and execute tests, but cannot approve their own work or unilaterally weaken its acceptance conditions. A second agent does not replace human accountability; review depth is proportionate to risk, not a requirement to execute every test manually.

- Derive expected outcomes from approved requirements, not from the generated implementation; have competent people review those outcomes independently of the implementation.
- Protect acceptance tests and CI rules. Removing tests, weakening assertions, or changing acceptance thresholds requires explicit human review.
- For a bug fix, demonstrate failure before the fix and success afterward. Use controlled faults or mutation testing where appropriate to check that assertions detect relevant defects.
- Check observable effects, persisted data, and authorization boundaries, not only success messages or mocks. Include integration checks against representative services.
- Cover existing behavior, boundary cases, denied actions, and unavailable dependencies. Preserve traditional unit, integration, end-to-end, security, and non-functional tests.
- Run checks in a defined CI environment and retain actual results linked to requirements and the reviewed change. Agent reports alone are not execution evidence.

Example: if a refund requires approval, verify that no payment is executed without it, not merely that the interface displays an approval request.

Build a representative, versioned dataset linked to requirements and risk cases.
Include normal outcomes, ambiguous requests, unauthorized actions, injection,
poisoned or stale knowledge, retrieval failures, cross-tenant access, tool
timeouts, duplicate requests, escalation, and stop behavior.

Repeat trials with isolated state. Record dataset, model configuration, prompts,
tools, knowledge versions, evaluator versions, sample size, variability, and
coverage gaps. Inspect actual state changes and policy compliance, not only a
plausible final answer or an exact sequence of tool calls. Calibrate model-based
graders against domain-expert judgments and review disagreements.

Agree risk-based acceptance thresholds before testing. Any mandatory control
failure blocks promotion. A finite test set cannot prove the absence of future
failures. Repeat relevant regression tests whenever a behavior-changing input
changes, even when application code does not.

## 5. Release, Operate, and Recover

Release evidence must link requirement, knowledge source, agent behavior, test
result, approval, and release identity. Include all behavior-changing inputs,
the autonomy contract, known limitations, rollout plan, and recovery exercises.

Distinguish three operations:

- **Configuration rollback:** restore a prior code, prompt, knowledge, tool, or model configuration where available.
- **State restoration:** restore or reconcile internal state without replaying external side effects.
- **Compensation:** apply a separately authorized business action to address an external effect that cannot simply be undone.

Use staged rollout and preventive controls for irreversible actions. Define what
happens if an approver is unavailable, a tool returns an uncertain outcome, or a
budget expires. Bounded retries must not duplicate payments or other side effects.

Monitor success, policy violations, drift, retrieval quality, cost per successful
task, latency, human intervention, rework, escalation, and business value against
the baseline. Count failed attempts and human handling in the cost measure.
Evidence may justify a simpler workflow, lower autonomy, or retirement. Retirement
includes revoking credentials, disabling endpoints and scheduled work, and
retaining or deleting memory and evidence according to approved policy.

## Worked Example: Refund Assistance

The following numbers are illustrative pilot thresholds, not ADLC requirements.

| Stage | Control and evidence |
| --- | --- |
| Requirements | Approve an increment that drafts refund recommendations from an order record and an approved policy. Compare with a rules-only baseline. Target 20% less median handling time without reducing independently reviewed decision quality. |
| Suitability | Use a bounded LLM workflow for interpreting requests and explaining recommendations. Eligibility and monetary limits remain deterministic. No multi-agent system is needed for this increment. |
| Authority | Read only the authenticated customer's order and approved policy. The workflow cannot change policy, payment destination, or customer identity. A human approves every refund against an immutable proposal ID and exact amount. |
| Implementation | The payment service verifies authorization, proposal version, approval expiry, and an idempotency key before executing. Changed inputs invalidate approval. Missing or expired approval routes to a human queue without execution. |
| Knowledge | Pin the approved refund policy and retrieval configuration. Give temporary case context a defined retention period; prohibit cross-customer memory and agent-written policy updates. |
| Evaluation | Use 200 reviewed cases, each run five times with isolated state, including injection, expired approval, cross-customer access, duplicate requests and payment timeouts. Require zero observed unauthorized or duplicate payments, at least 95% agreement with adjudicated eligibility outcomes, and escalation for every defined uncertain case. Report sample limits and disagreements. |
| Approval and release | Business and risk owners approve thresholds, exceptions and residual risk. Refund reviewers complete exercises on wrong amounts, stale policies and uncertain payment outcomes. They inspect the order, policy source, amount and consequences, with time and authority to reject or pause. Record reviewed evidence and decision rationale. Link requirement RF-01 to policy version, proposal behavior, evaluation report, service controls and release ID. Start with a small supervised cohort. |
| Operation | Track handling time, quality, escalation, rework and total cost per resolved case, including retries and human effort. Stop automated execution on an unauthorized action, broken approval control or duplicate-payment signal. |
| Incident and recovery | After a payment timeout, query the payment service using the idempotency key before retrying. Pause execution and revoke access if needed. Roll back the faulty policy or configuration; reconcile case state against the payment ledger. A completed refund cannot be undone by configuration rollback: an authorized business owner decides any permitted compensation or customer remediation. |
| Improvement or retirement | Add the incident to regression cases and reapprove the changed increment. If the quality or value target is not met, return to recommendation-only operation or retire the workflow and dispose of access and memory under policy. |

## Reusable Evidence Record

Keep one linked record per approved increment and release:

- Requirement ID, owner, outcome, suitability decision, baseline, risks, and approval.
- Versioned autonomy contract, permissions, knowledge sources, memory policy, and runtime controls.
- Change inventory for code, prompts, skills, knowledge, tools, model configuration, and orchestration.
- Evaluation dataset and evaluator versions, trial results, thresholds, coverage gaps, and human review.
- Release authorization, rollout scope, stop criteria, and recovery exercise results.
- Operational outcomes, incidents, corrective decisions, and the next approved increment or retirement record.

## Specialist References

These sources informed the practices above; the guide is an ADLC adaptation,
not a claim of endorsement or certification.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) explains the simplicity and workflow-versus-agent tradeoff.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) discusses repeated evaluations, outcomes, and grader calibration.
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) covers context management and memory.
- [OWASP: Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) provides a threat-oriented view of agentic controls.
- [Microsoft: AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) describes orchestration tradeoffs and reliability concerns.
- [NIST: AI Risk Management Framework core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) frames governance and risk management across the lifecycle.
