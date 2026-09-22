# Hosting SEO Checklist

## Observed on 22 September 2026

- HTTP homepage: 200, no redirect to HTTPS.
- HTTPS www homepage: 200, no redirect to the canonical host.
- HTTPS /index.html: 200, no redirect to /.
- /it: 301 to /it/.
- A nonexistent test URL: 404 (correct).
- Public response identifies nginx. Static site uploads alone cannot configure
  nginx redirects; apply these through the hosting control panel or administrator.

## Canonical Redirects

Ask the hosting administrator to configure permanent redirects to
`https://adlcmanifesto.org`, preserving paths and query strings:

1. HTTP requests to HTTPS on the canonical host.
2. HTTPS www requests to the non-www host (with a valid www TLS certificate).
3. Explicit /index.html requests to the corresponding directory URL, including
   /it/index.html, /es/index.html, /fr/index.html, and nested pages.

Only redirect an index.html URL when it appears in the original client request,
not when nginx internally resolves a directory index. This avoids redirect loops.
Keep missing URLs as real 404 responses, not redirects to the homepage.
Do not add an Apache .htaccess file without confirmation that this host uses it.

After applying the rules, check status and Location for each variant and verify
query preservation, language paths, absence of loops, and the final 200 response.

## Performance

A single compressed-capable HTTP request to the production homepage transferred
76,183 bytes without Content-Encoding. This is a point-in-time observation,
not a performance benchmark; verify again after hosting changes.

Measure real-user Core Web Vitals in Search Console and use PageSpeed Insights
for diagnostics before making performance claims. Server timing and transfer
sizes alone are not a Core Web Vitals assessment.

- Enable gzip or Brotli for HTML, CSS, JavaScript, XML and text where supported.
- Revalidate HTML so content updates become visible promptly.
- Cache versioned static assets; change their URL when their contents change.
- Consider self-hosting fonts and bundling diagram dependencies after measuring
  their contribution to loading time and layout shifts.
- Preserve readable HTML content and native links if JavaScript fails.

## Search Console

After publishing, submit or recheck [the sitemap](https://adlcmanifesto.org/sitemap.xml)
and inspect the canonical homepages and enterprise guide. Crawl eligibility does
not guarantee indexing. Do not treat duplicate alternate URLs as missing content
when Google has indexed the intended canonical page.
