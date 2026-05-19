# ADLC Manifesto

The Agentic Delivery Lifecycle Manifesto.

Website: https://adlcmanifesto.org/

ADLC extends SDLC for agentic systems by adding requirements quality gates, human-in-the-loop checkpoints, orchestration, shared agents, shared skills, and continuous operational improvement.

## Repository Structure

- `manifesto.md`: the core manifesto.
- `lifecycle.md`: the ADLC lifecycle stages.
- `shared-skills.md`: reusable enterprise-specific skills for agents and teams.
- `CHANGELOG.md`: version history.
- `site/`: the static multilingual website published to `adlcmanifesto.org`.
- `scripts/publish.sh`: FTPS publish script for the static website.

## Publish

Create a local `.env` file outside version control with the FTPS parameters, then run:

```sh
make publish
```

The publish command uploads the content of `site/` to the remote `/public_html/` directory.

## Version

Current version: `V1.1`

Published: April 2026  
Last modified: May 2026
