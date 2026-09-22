"""Render the canonical enterprise guide; --check detects stale output."""
import argparse
import html
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET

import markdown
from markdown.extensions import Extension
from markdown.treeprocessors import Treeprocessor


class SiteTree(Treeprocessor):
    def run(self, root):
        home = self.md.adlc_home
        destinations = {
            "../manifesto.md": home + "#manifesto",
            "../lifecycle.md": home + "#lifecycle",
            "../shared-skills.md": home + "#skills",
            "enterprise-adoption.md": "/enterprise-adoption/",
        }
        for link in root.iter("a"):
            href = link.get("href", "")
            if href in destinations:
                link.set("href", destinations[href])
            elif href.startswith("https://"):
                link.set("target", "_blank")
                link.set("rel", "noopener noreferrer")
        for table in list(root.iter("table")):
            table.set("class", "resource-table")
            headers = ["".join(th.itertext()) for th in table.findall("./thead/tr/th")]
            for th in table.findall("./thead/tr/th"):
                th.set("scope", "col")
            for row in table.findall("./tbody/tr"):
                for label, cell in zip(headers, row):
                    cell.set("data-label", label)
            for parent in root.iter():
                if table in list(parent):
                    index = list(parent).index(table)
                    parent.remove(table)
                    wrapper = ET.Element("div", {"class": "paper resource-table-wrap"})
                    wrapper.append(table)
                    parent.insert(index, wrapper)
                    break


class SiteExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(SiteTree(md), "site", 1)


LOCALES = {
    "en": {
        "tag": "Enterprise adoption", "contents": "Guide contents",
        "source": "Source and contributions", "languages": "Guide language",
        "manifesto": "ADLC Manifesto", "locale": "en_US",
        "description": "Put ADLC into practice with autonomy contracts, human oversight, behavioral evaluation, release evidence, and a worked refund-assistance example.",
    },
    "it": {
        "tag": "Adozione enterprise", "contents": "Indice della guida",
        "source": "Sorgente e contributi", "languages": "Lingua della guida",
        "manifesto": "Manifesto ADLC", "locale": "it_IT",
        "description": "Applicare l'ADLC con contratti di autonomia, supervisione umana, valutazione comportamentale, evidenze di rilascio e un esempio sui rimborsi.",
    },
    "es": {
        "tag": "Adopción empresarial", "contents": "Índice de la guía",
        "source": "Fuente y contribuciones", "languages": "Idioma de la guía",
        "manifesto": "Manifiesto ADLC", "locale": "es_ES",
        "description": "Aplicar ADLC con contratos de autonomía, supervisión humana, evaluación del comportamiento, evidencias de release y un ejemplo de reembolsos.",
    },
    "fr": {
        "tag": "Adoption en entreprise", "contents": "Sommaire du guide",
        "source": "Source et contributions", "languages": "Langue du guide",
        "manifesto": "Manifeste ADLC", "locale": "fr_FR",
        "description": "Appliquer l'ADLC avec contrats d'autonomie, supervision humaine, évaluation comportementale, preuves de release et un exemple de remboursement.",
    },
}


LANGUAGE_ORDER = ("en", "es", "fr", "it")


def guide_path(lang):
    return ("/" if lang == "en" else f"/{lang}/") + "enterprise-adoption/"


def render(lang, copy):
    home = "/" if lang == "en" else f"/{lang}/"
    filename = "enterprise-adoption" + ("" if lang == "en" else f".{lang}") + ".md"
    source_path = Path("docs", filename)
    source = source_path.read_text()
    title, body = source.split("\n", 1)
    title = title.removeprefix("# ")
    md = markdown.Markdown(extensions=["tables", "toc", SiteExtension()])
    md.adlc_home = home
    content = md.convert(body)
    assert len(md.toc_tokens) == 8, f"{source_path}: expected eight sections"
    template = Path("site/changelog/index.html").read_text()
    head = template.split("    <main>")[0]
    homepage = Path("site", home.strip("/"), "index.html").read_text()
    footer = homepage.split("    </main>", 1)[1]
    footer = re.sub(r'\s*<script type="module"[^>]*practice-flow[^>]*></script>', "", footer)
    footer = re.sub(r'(href|src)="\.\.?/', r'\1="/', footer)
    description = copy["description"]
    head = head.replace('<html lang="en">', f'<html lang="{lang}">')
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | ADLC Manifesto</title>", head)
    head = head.replace("https://adlcmanifesto.org/changelog/", "https://adlcmanifesto.org" + guide_path(lang))
    head = re.sub(r'(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*"', lambda m: m[1] + html.escape(description, quote=True) + '"', head)
    head = re.sub(r'(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*"', lambda m: m[1] + html.escape(title, quote=True) + '"', head)
    match = re.search(r'(<script type="application/ld\+json">)([\s\S]*?)(</script>)', head)
    data = json.loads(match[2])
    data.update(name=title, description=description, inLanguage=lang,
                datePublished="2026-09-22", dateModified="2026-09-22")
    head = head[:match.start(2)] + "\n" + json.dumps(data, indent=8, ensure_ascii=False) + "\n    " + head[match.end(2):]
    head = head.replace('class="changelog-page"', 'class="changelog-page guide-page"')
    head = head.replace('href="/changelog/" aria-current="page"', 'href="/changelog/"')
    head = head.replace("<summary>Versions</summary>", f'<summary>{copy["contents"]}</summary>')
    head = re.sub(r'(href|src)="\.\./', r'\1="/', head)
    alternates = "\n".join(
        f'<link rel="alternate" hreflang="{other}" href="https://adlcmanifesto.org{guide_path(other)}" />'
        for other in LANGUAGE_ORDER
    )
    alternates += '\n<link rel="alternate" hreflang="x-default" href="https://adlcmanifesto.org/enterprise-adoption/" />'
    head = head.replace("  </head>", f'{alternates}\n<meta property="og:locale" content="{copy["locale"]}" />\n  </head>')
    nav = '<ul class="inline nav-links">\n' + "\n".join(
        f'<li><a href="#{item["id"]}">{html.escape(item["name"])}</a></li>'
        for item in md.toc_tokens
    ) + "\n</ul>"
    head = re.sub(r'<ul class="inline nav-links">[\s\S]*?</ul>', lambda _: nav, head)
    switcher = f'<div class="language-switcher paper" aria-label="{copy["languages"]}">'
    for other in LANGUAGE_ORDER:
        active = ' active' if other == lang else ''
        current = ' aria-current="page"' if other == lang else ''
        switcher += f'<a href="{guide_path(other)}" class="paper-btn language-link{active}" lang="{other}" hreflang="{other}"{current}>{other.upper()}</a>'
    switcher += "</div>"
    head = head.replace("    </header>", switcher + "\n    </header>")
    output = f"<!-- Generated by scripts/build-guide.py; edit {source_path}. -->\n" + head
    output += f'''    <main>
      <section class="hero container">
        <article class="paper hero-card">
          <p class="section-tag">{copy["tag"]}</p>
          <h1>{html.escape(title)}</h1>
          <div class="hero-actions">
            <a href="{home}">{copy["manifesto"]}</a>
            <a href="https://github.com/ifuschini/adlcmanifesto/blob/main/docs/{filename}" target="_blank" rel="noopener noreferrer">{copy["source"]}</a>
          </div>
        </article>
      </section>
      <article class="container guide-content">
{content}
      </article>
    </main>'''
    return Path("site", guide_path(lang).strip("/"), "index.html"), output + footer


parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true")
args = parser.parse_args()
for lang, copy in LOCALES.items():
    target, output = render(lang, copy)
    if args.check:
        assert target.exists() and target.read_text() == output, f"{target} is stale: run make guide"
        print(f"{target} matches its Markdown source and shared template.")
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(output)
        print(f"Generated {target}")
