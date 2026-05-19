# ADLC Manifesto

[![Check](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml/badge.svg)](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/ifuschini/adlcmanifesto?label=version)](https://github.com/ifuschini/adlcmanifesto/tags)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fadlcmanifesto.org&label=website)](https://adlcmanifesto.org/)

The Agentic Delivery Lifecycle Manifesto.

[English](README.md) | [Italian](README.it.md) | [Spanish](README.es.md) | [French](README.fr.md)

## Overview

ADLC extends SDLC for agentic systems by adding requirements quality gates, human-in-the-loop checkpoints, orchestration, shared agents, shared skills, and continuous operational improvement.

## Website

Public website: https://adlcmanifesto.org/

The website source lives in `site/`. See `site/README.md` for editing and
publishing notes.

## Open Source

This repository is open source under the Apache License, Version 2.0.

Apache-2.0 was selected because ADLC is intended to be reused in enterprise
delivery contexts and benefits from a clear patent grant, contribution terms,
and redistribution rules.

See `LICENSE` for the full license text and `NOTICE` for attribution and
trademark notes.

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` and
`CODE_OF_CONDUCT.md` before opening issues or pull requests.

For security-sensitive reports, follow `SECURITY.md` instead of opening a
public issue.

## Repository Structure

- `manifesto.md`: the core manifesto.
- `lifecycle.md`: the ADLC lifecycle stages.
- `shared-skills.md`: reusable enterprise-specific skills for agents and teams.
- `README.it.md`, `README.es.md`, `README.fr.md`: localized repository
  overviews.
- `CHANGELOG.md`: version history.
- `docs/release-process.md`: release and tag checklist.
- `CONTRIBUTING.md`: contribution workflow and local checks.
- `CODE_OF_CONDUCT.md`: participation expectations.
- `SECURITY.md`: responsible disclosure policy.
- `site/`: the static multilingual website published to `adlcmanifesto.org`.
- `scripts/publish.sh`: FTPS publish script for the static website.

## Local Checks

Run the lightweight validation suite with:

```sh
make check
```

Other maintenance targets:

```sh
make link-check
make serve
make release-check
```

`make serve` starts a local static preview at `http://localhost:8000/`.
Use `make serve PORT=8001` if that port is already in use.

`make release-check` is intended for release commits after the version tag has
been created.

## Publish

Create a local `.env` file outside version control with the FTPS parameters, then run:

```sh
make publish
```

The publish command uploads the content of `site/` to the remote `/public_html/` directory.

## Version

Current version: `V1.1`

- Published: April 2026
- Last modified: May 2026

## Release Tags

Every public manifesto version must be marked with an annotated Git tag.

Use the lowercase `vX.Y` format for repository tags, matching the manifesto
version declared as `VX.Y` in `manifesto.md` and `CHANGELOG.md`.

For example, `V1.1` in the manifesto is tagged as `v1.1` in Git.

See `docs/release-process.md` for the release checklist.
