(() => {
  const preferenceKey = 'firstflat-theme';
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const lightColor = themeColor?.content;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeColor) themeColor.content = theme === 'dark' ? '#19231e' : lightColor;
  }

  let savedTheme;
  try {
    savedTheme = localStorage.getItem(preferenceKey);
  } catch {
    // Theme switching still works for this page if storage is unavailable.
  }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    toggle.hidden = false;

    toggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      try {
        localStorage.setItem(preferenceKey, theme);
      } catch {
        // Keep the selection for the current page.
      }
    });
  });
})();
