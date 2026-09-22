"""Validate static SEO metadata without third-party dependencies."""
import json
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.meta = {}
        self.lang = None
        self.blocks = []
        self.buffer = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        elif tag == "link":
            self.links.append(attrs)
        elif tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content", "")
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.buffer = ""

    def handle_data(self, data):
        if self.buffer is not None:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == "script" and self.buffer is not None:
            self.blocks.append(json.loads(self.buffer))
            self.buffer = None


base = "https://adlcmanifesto.org/"
locales = {"en": "", "it": "it/", "es": "es/", "fr": "fr/"}
alternates = {lang: base + path for lang, path in locales.items()}
alternates["x-default"] = base
guides = {lang: path + "enterprise-adoption/" for lang, path in locales.items()}
expected = {base + path for path in [*locales.values(), "changelog/", *guides.values()]}
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "x": "http://www.w3.org/1999/xhtml"}
urls = ET.parse("site/sitemap.xml").getroot().findall("s:url", ns)
assert len(urls) == len(expected)
assert {item.findtext("s:loc", namespaces=ns) for item in urls} == expected

for item in urls:
    url = item.findtext("s:loc", namespaces=ns)
    path = url.removeprefix(base)
    page = Page(Path("site", path, "index.html").read_text())
    canonical = [link["href"] for link in page.links if link.get("rel") == "canonical"]
    assert canonical == [url], (url, "canonical")
    assert "noindex" not in page.meta.get("robots", "").lower(), url
    assert page.meta.get("description"), url
    assert page.meta.get("og:url") == url, url
    assert len(page.blocks) == 1, url
    data = page.blocks[0]
    assert data["inLanguage"] == page.lang, url
    modified = date.fromisoformat(data["dateModified"])
    assert date.fromisoformat(data["datePublished"]) <= modified <= date.today(), url
    assert item.findtext("s:lastmod", namespaces=ns) == modified.isoformat(), url
    group = guides if path in guides.values() else locales
    if path in group.values():
        assert page.lang == next(lang for lang, value in group.items() if value == path)
        expected_alternates = {lang: base + value for lang, value in group.items()}
        expected_alternates["x-default"] = base + group["en"]
        html_alternates = {link["hreflang"]: link["href"] for link in page.links
                           if link.get("rel") == "alternate" and "hreflang" in link}
        sitemap_alternates = {link.attrib["hreflang"]: link.attrib["href"]
                              for link in item.findall("x:link", ns)}
        assert html_alternates == sitemap_alternates == expected_alternates, url

assert f"Sitemap: {base}sitemap.xml" in Path("site/robots.txt").read_text()
print("SEO checks passed: canonical URLs, locales, metadata and sitemap dates.")
