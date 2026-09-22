(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'adlc-theme';
  let preference;
  try { preference = localStorage.getItem(key); } catch { /* Storage is optional. */ }
  const apply = () => {
    root.dataset.theme = preference === 'dark' || preference === 'light'
      ? preference : system.matches ? 'dark' : 'light';
  };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    const labels = {
      en: ['Switch to dark theme', 'Switch to light theme'],
      it: ['Attiva il tema scuro', 'Attiva il tema chiaro'],
      es: ['Activar tema oscuro', 'Activar tema claro'],
      fr: ['Activer le theme sombre', 'Activer le theme clair'],
    };
    const text = labels[root.lang] || labels.en;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    const update = () => {
      const dark = root.dataset.theme === 'dark';
      button.textContent = dark ? '\u2600' : '\u263e';
      button.title = text[dark ? 1 : 0];
      button.setAttribute('aria-label', button.title);
    };
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* Keep the session choice. */ }
      apply();
      update();
    });
    system.addEventListener('change', () => { apply(); update(); });
    window.addEventListener('storage', event => {
      if (event.key === key || event.key === null) {
        preference = event.newValue;
        apply();
        update();
      }
    });
    update();
    const header = document.querySelector('.site-header');
    let controls = header.querySelector('.language-switcher');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'language-switcher';
      header.append(controls);
    }
    controls.append(button);
  });
})();
