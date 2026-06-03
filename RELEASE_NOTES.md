# ADLC Manifesto Release Notes

These release notes summarize every public ADLC Manifesto version in a
reader-friendly format. For the concise change log, see
[CHANGELOG.md](CHANGELOG.md).

## V1.3 - June 2026

Tag: [v1.3](https://github.com/ifuschini/adlcmanifesto/tree/v1.3)

V1.3 clarifies how ADLC separates documentation for humans from context for AI
agents. The release makes the documentation layer more explicit as an
enterprise governance concern and improves the website experience on smaller
screens.

Human-facing documentation is now positioned as a channel for reading, review,
onboarding, governance, and auditability. Tools such as Confluence,
SharePoint, Notion, GitBook, Backstage TechDocs, Read the Docs, or equivalent
systems belong to this human documentation layer.

Agent-facing context is now described as a separate governed artifact exposed
through Agent Context Endpoints. These endpoints may use MCP servers,
llms.txt files, retrieval indexes, or versioned context packs, with examples
including Context7, GitMCP, MCPDoc, mcp-documentation-server, and custom MCP
servers built with open MCP SDKs.

The website also received responsive improvements: the header is fixed and
more compact, and the operating model table becomes mobile-readable through
labeled cards.

## V1.2 - May 2026

Tag: [v1.2](https://github.com/ifuschini/adlcmanifesto/tree/v1.2)

V1.2 introduces Knowledge Governance and RAG Governance as explicit ADLC
concepts. The release reinforces the principle that, in agentic systems,
knowledge is behavior: changing prompts, RAG sources, shared skills, policies,
examples, or tool instructions can change how an agent behaves even when
application code does not change.

The lifecycle was extended so Test, Deploy, and Operate cover knowledge-layer
changes, prompt changes, model configuration changes, tool changes, and
orchestration changes. The evidence model now highlights versioned knowledge
sources, prompt history, behavioral regression evidence, and traceability from
requirement to knowledge source, agent behavior, test evidence, and release.

This version also adds the RAG Governance Agent and RAG Governance Skill, plus
repository quality improvements such as CI checks, local link validation,
Makefile targets, repository attributes, README badges, and localized README
files.

## V1.1 - May 2026

Tag: [v1.1](https://github.com/ifuschini/adlcmanifesto/tree/v1.1)

V1.1 prepares the project for open source use and makes the ADLC model more
concrete. The repository was moved to the Apache License, Version 2.0 and
received contribution, code of conduct, security, notice, issue, and pull
request guidance.

The manifesto website was expanded with the ADLC in Practice section, a React
Flow lifecycle diagram, clickable lifecycle nodes, clearer Requirements
Quality Gate language, and a stronger explanation of ADLC as an extension of
SDLC.

This release also introduced a clearer operating model, human-in-the-loop
checkpoint guidance, shared agents for documentation, PR governance, release
notes, traceability, and operational readiness, plus shared skills for
documentation, release notes, architecture, infrastructure, and CISO-led
security.

SEO, sharing, and website governance were strengthened with canonical and
hreflang metadata, robots and sitemap support, Open Graph and Twitter
metadata, a public domain configuration, a stable social preview image, and
the first public changelog page.

## V1.0 - April 2026

Tag: not available in this repository history.

V1.0 is the initial public version of the ADLC Manifesto. It defines ADLC as
the Agentic Delivery Lifecycle: a governed, tool-agnostic lifecycle for
building agentic systems.

The first release establishes the core message that agent development must be
governed, tool-agnostic, and lifecycle-driven. It frames ADLC as an extension
of SDLC rather than a replacement, and introduces the first version of the
manifesto, lifecycle framing, multilingual static website, and PaperCSS visual
direction.

