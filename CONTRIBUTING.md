# Contributing

Thank you for considering a contribution to the ADLC Manifesto.

This project welcomes improvements to the manifesto, lifecycle model,
shared skills, translations, documentation, accessibility, metadata, and
static website source.

## Ground Rules

- Keep the framework tool-agnostic and vendor-neutral.
- Prefer concise language that is useful to delivery teams and governance
  stakeholders.
- Keep examples practical and avoid confidential, customer-specific, or
  proprietary material.
- Preserve multilingual consistency when changing shared website structure
  or navigation.
- Follow the Code of Conduct in `CODE_OF_CONDUCT.md`.

## How to Contribute

1. Open an issue describing the problem, proposal, or change you want to
   make.
2. Fork the repository or create a branch.
3. Make focused changes with clear commit messages.
4. Update documentation, translations, or changelog entries when relevant.
5. Open a pull request with a short explanation of what changed and why.

## Local Checks

The website is static and has no build step. Before opening a pull request,
run the lightweight checks below when you have the required tools installed:

```sh
zsh -n scripts/publish.sh
node --check site/email.js
node --check site/practice-flow.js
```

Do not commit `.env`, credentials, generated system files, or local editor
artifacts.

## Release Tags

Every new public version of the manifesto must be marked with an annotated Git
tag after the version commit is merged.

Use the lowercase `vX.Y` format for tags, matching the manifesto version written
as `VX.Y` in `manifesto.md` and `CHANGELOG.md`.

Example:

```sh
git tag -a v1.1 -m "ADLC Manifesto v1.1"
git push origin v1.1
```

## License of Contributions

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in this project is licensed under the Apache License,
Version 2.0, as described in `LICENSE`.
