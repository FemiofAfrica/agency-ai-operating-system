(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('agency-theme'); } catch (error) { savedTheme = null; }
  const initialTheme = savedTheme || (prefersLight.matches ? 'light' : 'dark');
  root.dataset.theme = initialTheme;

  function updateThemeButton(theme) {
    const light = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(light));
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.lastElementChild.textContent = light ? 'Dark' : 'Light';
  }

  updateThemeButton(initialTheme);
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    try { window.localStorage.setItem('agency-theme', nextTheme); } catch (error) { /* Storage is optional. */ }
    updateThemeButton(nextTheme);
  });

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu';
  }));

  const panels = document.querySelectorAll('.installed-panel');
  document.querySelectorAll('.surface-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.surface-tab').forEach((item) => {
        item.classList.toggle('active', item === tab);
        item.setAttribute('aria-selected', String(item === tab));
      });
      panels.forEach((panel) => panel.classList.toggle('hidden', panel.id !== `panel-${tab.dataset.panel}`));
    });
  });

  const metrics = {
    draft: ['Hours to first draft', 'From brief received to a credible first creative direction.'],
    research: ['Lead research time', 'Time from account list to useful, source-backed context.'],
    handoff: ['On-time handoffs', 'Whether the next owner receives the right context at the right time.'],
    retrieval: ['Knowledge retrieval time', 'Time for a team member to find the context needed to act.']
  };
  document.querySelectorAll('.metric').forEach((metric) => {
    metric.addEventListener('click', () => {
      document.querySelectorAll('.metric').forEach((item) => {
        item.classList.toggle('active', item === metric);
        item.setAttribute('aria-selected', String(item === metric));
      });
      document.querySelector('#metric-name').textContent = metrics[metric.dataset.metric][0];
      document.querySelector('#metric-copy').textContent = metrics[metric.dataset.metric][1];
      document.querySelector('#metric-status').textContent = 'Not yet baselined';
      document.querySelector('#save-baseline').textContent = 'Mark as discussion point';
    });
  });

  document.querySelector('#save-baseline').addEventListener('click', (event) => {
    const baseline = document.querySelector('#baseline').value.trim();
    const target = document.querySelector('#target').value.trim();
    document.querySelector('#metric-status').textContent = baseline || target ? 'Ready for discovery review' : 'Add a baseline or target first';
    event.currentTarget.textContent = baseline || target ? 'Discussion point saved' : 'Mark as discussion point';
  });
})();
