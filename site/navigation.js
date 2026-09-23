(() => {
  const languageLinks = [...document.querySelectorAll('.language-switcher a')];
  const readingSections = [...document.querySelectorAll(
    '.guide-content h2[id], .guide-content h3[id], main section[id], main article[id]'
  )];
  const readingOffset = () => (parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop
  ) || 0) + 24;
  const hashSection = () => {
    try {
      const id = decodeURIComponent(window.location.hash.slice(1));
      return readingSections.find(section => section.id === id) || null;
    } catch {
      return null;
    }
  };
  // Anchor navigation is authoritative until the reader scrolls deliberately.
  // Loading fonts and native anchor scrolling must not select a preceding section.
  let anchoredSection = hashSection();
  const updateLanguageLinks = () => {
    const offset = readingOffset();
    const current = anchoredSection || readingSections.filter(section =>
      section.getBoundingClientRect().top <= offset
    ).at(-1);
    languageLinks.forEach(link => {
      const url = new URL(link.href);
      const translated = link.dataset.sectionAnchors
        ? JSON.parse(link.dataset.sectionAnchors)[readingSections.indexOf(current)]
        : current?.id;
      url.hash = translated || '';
      link.href = url.pathname + url.search + url.hash;
    });
  };
  const releaseAnchor = () => { anchoredSection = null; };
  window.addEventListener('wheel', releaseAnchor, { passive: true });
  window.addEventListener('touchmove', releaseAnchor, { passive: true });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)
      && !event.target.closest('input, textarea, select, button, [contenteditable="true"]')) {
      releaseAnchor();
    }
  });
  window.addEventListener('pointerdown', event => {
    if (event.clientX >= document.documentElement.clientWidth) releaseAnchor();
  });
  window.addEventListener('hashchange', () => {
    anchoredSection = hashSection();
    updateLanguageLinks();
  });
  let languageUpdateScheduled = false;
  window.addEventListener('scroll', () => {
    if (languageUpdateScheduled) return;
    languageUpdateScheduled = true;
    requestAnimationFrame(() => {
      updateLanguageLinks();
      languageUpdateScheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateLanguageLinks);
  window.addEventListener('pageshow', updateLanguageLinks);
  updateLanguageLinks();

  const navigation = document.querySelector('.section-navigation');
  if (!navigation) return;

  const desktop = window.matchMedia('(min-width: 1024px)');
  const syncNavigation = () => { navigation.open = desktop.matches; };
  syncNavigation();
  desktop.addEventListener('change', syncNavigation);

  const links = [...navigation.querySelectorAll('a')];
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && !desktop.matches) navigation.open = false;
  });
  navigation.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches) {
      navigation.open = false;
      navigation.querySelector('summary').focus();
    }
  });

  const sections = links.map(link => {
    const target = link.getAttribute('href');
    return target.startsWith('#') ? document.getElementById(target.slice(1)) : null;
  }).filter(Boolean);
  if (!sections.length) return;

  let scheduled = false;
  const updateActiveSection = () => {
    const offset = readingOffset();
    const ordered = [...sections].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const current = ordered.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
    links.forEach(link => {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveSection);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveSection);
  updateActiveSection();
})();
