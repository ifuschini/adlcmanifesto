(() => {
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
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 24;
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
