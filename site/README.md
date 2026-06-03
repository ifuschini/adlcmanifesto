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
- `styles.css`: shared visual system and responsive layout.
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

Publishing is handled from the repository root:

```sh
make publish
```

The command uploads the contents of this directory to the configured FTPS
destination. Keep credentials in `.env`, which is ignored by Git.
