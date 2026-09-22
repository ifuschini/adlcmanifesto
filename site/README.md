# Website

This directory contains the static multilingual website for the ADLC Manifesto.

The site has no build step. Files in this directory are published directly to
`adlcmanifesto.org`.

## Structure

- `index.html`: English homepage.
- `it/index.html`: Italian homepage.
- `es/index.html`: Spanish homepage.
- `fr/index.html`: French homepage.
- `changelog/index.html`: public changelog page.
- `styles.css`: base layout, lifecycle diagram, and responsive tables.
- `technical.css`: editorial theme, reading widths, and desktop/mobile navigation layout; loaded after the base styles.
- `navigation.js`: collapsible mobile index and active-section tracking.
- `practice-flow.js`: lifecycle diagram and interaction logic.
- `email.js`: contact email de-obfuscation.
- `robots.txt` and `sitemap.xml`: crawler metadata.
- `og-image.png` and `og-image.svg`: social preview assets.

## Editing Guidelines

- Keep navigation, footer links, version badges, and language selectors aligned
  across all localized pages.
- When adding a new section to the English page, update the Italian, Spanish,
  and French pages in the same change or explain why a translation is deferred.
- Keep canonical, alternate `hreflang`, Open Graph, Twitter, and JSON-LD
  metadata in sync with page URLs and language.
- Use relative links for shared local assets such as `styles.css`,
  `practice-flow.js`, and `email.js`.
- External links that open a new page should include
  `target="_blank"` and `rel="noopener noreferrer"`.

## Local Checks

From the repository root, run:

```sh
make check
```

This validates the publish script and JavaScript files.

For layout changes, verify all four languages and the changelog at desktop,
tablet, and narrow mobile widths. Check the index toggle, anchor destinations,
keyboard focus, table readability, and absence of horizontal page overflow.
Navigation remains available through native HTML details when JavaScript is disabled.

To run only the local website link and anchor checker:

```sh
make link-check
```

## Local Preview

From the repository root, run:

```sh
make serve
```

Then open the URL printed by the command. The default starting point is
`http://localhost:8000/`.

If the requested port is already in use, `make serve` automatically tries the
next free port. Use another starting port when needed:

```sh
make serve PORT=8001
```

## Publishing

### Enterprise Guide

[The enterprise guide](../docs/enterprise-adoption.md) is the English source of
truth for the [generated English page](enterprise-adoption/index.html).
The [Italian](../docs/enterprise-adoption.it.md),
[Spanish](../docs/enterprise-adoption.es.md), and
[French](../docs/enterprise-adoption.fr.md) sources preserve the same controls,
examples, and thresholds. Run
`make guide` after editing the source or the shared changelog template.
`make guide-check` detects stale output in CI. Both commands use the pinned
Docker runtime in [Dockerfile.docs](../scripts/Dockerfile.docs); no host Python
packages are required. Each homepage links to its localized guide; the guide
language switcher preserves the document, and reciprocal hreflang links appear
in both page metadata and the sitemap. Update all four Markdown sources when
the English guide changes, then regenerate and verify every edition.

Before publishing, run `make check` and `make guide-check`. Hosting-only
redirect and performance recommendations are in the
[hosting SEO checklist](../docs/hosting-seo.md).

Keep the footer month and year aligned with the latest release tag. Separately,
update each changed page's JSON-LD `dateModified` and matching sitemap `lastmod`
to the date of its last significant content update (YYYY-MM-DD). Do not change
these dates for every upload or for a theme-only adjustment. Do not use a future
date. Run `python3 scripts/check-seo.py` to verify metadata consistency.

Publishing is handled from the repository root:

```sh
make publish
```

The command uploads the contents of this directory to the configured FTPS
destination. Keep credentials in `.env`, which is ignored by Git.
