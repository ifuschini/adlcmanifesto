const fs = require('node:fs');
const assert = require('node:assert/strict');

const pages = ['site/index.html', 'site/it/index.html', 'site/es/index.html', 'site/fr/index.html'];
let reference;

function checkLanguageOrder(html) {
  const match = html.match(/<div\s+class="language-switcher[^>]*>([\s\S]*?)<\/div>/);
  assert(match, 'Missing language switcher');
  const switcher = match[1];
  assert.deepEqual([...switcher.matchAll(/hreflang="([^"]+)"/g)].map(match => match[1]),
    ['en', 'es', 'fr', 'it'], 'Language switchers must use the same order');
}

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  checkLanguageOrder(html);
  const evidence = html.match(/<table class="operating-table">([\s\S]*?)<\/table>/)[1];
  const columns = [...evidence.matchAll(/<th scope="col">([^<]+)<\/th>/g)].map(match => match[1]);
  assert.equal(columns.length, 4, `${file}: evidence checklist requires four columns`);
  const cells = [...evidence.matchAll(/<td data-label="([^"]+)">/g)].map(match => match[1]);
  assert.equal(cells.length, 32, `${file}: evidence checklist requires eight complete rows`);
  cells.forEach((label, index) => assert.equal(label, columns[index % 4], `${file}: mobile label differs from column`));
  const main = html.match(/<main>([\s\S]*?)<\/main>/)[1];
  const sections = [...main.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
  const nav = html.match(/<ul class="inline nav-links">([\s\S]*?)<\/ul>/)[1];
  const targets = [...nav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(targets, sections, `${file}: navigation must follow section order`);
  assert.equal(new Set(sections).size, sections.length, `${file}: duplicate sections`);
  if (reference) assert.deepEqual(sections, reference, `${file}: locale order differs`);
  else reference = sections;

  for (const [id, marker] of [
    ['requirements-quality-gate', 'class="paper gate-banner"'],
    ['practice', 'class="practice-grid"'],
    ['tool-families', 'class="resource-table tool-families-table"'],
    ['enterprise-tools', 'class="resource-table tooling-table"'],
    ['llm-gateways', 'class="resource-table gateway-table"'],
    ['glossary', 'class="resource-table glossary-table"'],
  ]) {
    const section = main.match(new RegExp(`<section id="${id}"[^>]*>[\\s\\S]*?<\\/section>`));
    assert(section && section[0].includes(marker), `${file}: wrong content for #${id}`);
  }
}

const changelog = fs.readFileSync('site/changelog/index.html', 'utf8');
const changelogNav = changelog.match(/<ul class="inline nav-links">([\s\S]*?)<\/ul>/)[1];
const releaseSections = [...changelog.matchAll(/<section id="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual([...changelogNav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), releaseSections);
for (const locale of ['', 'it/', 'es/', 'fr/']) {
const guide = fs.readFileSync(`site/${locale}enterprise-adoption/index.html`, 'utf8');
checkLanguageOrder(guide);
const guideNav = guide.match(/<ul class="inline nav-links">([\s\S]*?)<\/ul>/)[1];
const guideHeadings = [...guide.matchAll(/<h2 id="([^"]+)"/g)].map(match => match[1]);
assert.equal(guideHeadings.length, 8, 'Guide must contain all eight source sections');
assert.deepEqual([...guideNav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), guideHeadings);
assert.equal((guide.match(/<table /g) || []).length, 2, 'Guide must preserve both tables');
assert.equal((guide.match(/<td data-label=/g) || []).length, 36, 'Guide must preserve every evidence row');
for (const value of ['200', '95%', '20%', 'RF-01']) assert(guide.includes(value), `Missing example value ${value}`);
}
console.log('Navigation order and section targets match across all languages and the changelog.');
