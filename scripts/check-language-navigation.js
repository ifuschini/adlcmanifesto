const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('site/navigation.js', 'utf8');

function scenario(translated = false, hash = '') {
  const sections = ['first', 'second', 'third'].map((id, index) => ({
    id,
    top: 200 + index * 400,
    getBoundingClientRect() { return { top: this.top }; },
  }));
  const link = {
    href: 'https://example.org/fr/',
    dataset: translated ? { sectionAnchors: JSON.stringify(['un', 'deux', 'trois']) } : {},
  };
  const events = {};
  const location = { hash };
  vm.runInNewContext(source, {
    URL: class extends URL {
      constructor(url) { super(url, 'https://example.org'); }
    },
    document: {
      documentElement: {},
      querySelector: () => null,
      querySelectorAll: selector => selector === '.language-switcher a' ? [link] : sections,
    },
    window: { location, addEventListener: (event, callback) => { events[event] = callback; } },
    getComputedStyle: () => ({ scrollPaddingTop: '80px' }),
    requestAnimationFrame: callback => callback(),
  });
  if (hash) {
    const expected = translated ? '/fr/#deux' : '/fr/#second';
    assert.equal(link.href, expected, 'Incoming anchor wins before layout settles');
    events.scroll();
    events.resize();
    events.pageshow();
    assert.equal(link.href, expected, 'Automatic scroll and layout changes must preserve the anchor');
    events.wheel();
  } else {
    assert.equal(link.href, '/fr/', 'Page introduction should not invent an anchor');
  }
  sections.forEach(section => { section.top -= 550; });
  events.scroll();
  assert.equal(link.href, translated ? '/fr/#deux' : '/fr/#second');
  sections.forEach(section => { section.top -= 400; });
  events.resize();
  assert.equal(link.href, translated ? '/fr/#trois' : '/fr/#third');
  sections.forEach((section, index) => { section.top = 200 + index * 400; });
  events.pageshow();
  assert.equal(link.href, '/fr/', 'Returning to the top must clear stale anchors');
  location.hash = '#third';
  events.hashchange();
  assert.equal(link.href, translated ? '/fr/#trois' : '/fr/#third');
  events.touchmove();
  events.resize();
  assert.equal(link.href, '/fr/', 'Touch scrolling releases the selected anchor');
}

scenario();
scenario(true);
scenario(false, '#second');
scenario(true, '#second');

const locales = ['en', 'es', 'fr', 'it'];
const guide = lang => fs.readFileSync(`site/${lang === 'en' ? '' : lang + '/'}enterprise-adoption/index.html`, 'utf8');
for (const lang of locales) {
  const html = guide(lang);
  const links = [...html.matchAll(/data-section-anchors="([^"]+)"[^>]+hreflang="([^"]+)"/g)];
  assert.equal(links.length, 4);
  for (const [, encoded, target] of links) {
    const anchors = JSON.parse(encoded.replaceAll('&quot;', '"'));
    const headings = [...guide(target).matchAll(/<h[23] id="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(anchors, headings, `${lang} -> ${target}: translated sections must exist in order`);
    assert.equal(anchors.length, [...html.matchAll(/<h[23] id="/g)].length);
  }
}
console.log('Language navigation passed: scroll, top, resize, restoration and all guide mappings.');
