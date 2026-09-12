(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  let saved = null;
  try { saved = localStorage.getItem('agency-theme'); } catch (error) { saved = null; }
  const initial = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.dataset.theme = initial;
  const updateTheme = (theme) => {
    const light = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(light));
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.lastElementChild.textContent = light ? 'Dark' : 'Light';
  };
  updateTheme(initial);
  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('agency-theme', next); } catch (error) { /* no persistence available */ }
    updateTheme(next);
  });
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = 'Menu';
  }));
  const content = {
    research: { label: 'RESEARCH / REPEATABLE ACROSS BRANDS', title: 'Build a point of view<br>from live signal.', copy: 'A repeatable research practice brings competitor moves, creative patterns, regional advertising, and audience tensions into one source-backed record.', list: ['Competitor and creative intelligence', 'Live advertising across regions', 'Audience needs, language, and point of need'] },
    strategy: { label: 'STRATEGY / REPEATABLE ACROSS BRANDS', title: 'Turn evidence<br>into a choice.', copy: 'Strategy gives the evidence a job: define the opportunity, choose the audience and message, then set the channel direction and creative guardrails.', list: ['Positioning and opportunity', 'Audience and message choices', 'Channel direction and creative brief'] },
    creative: { label: 'CREATIVE EXECUTION / CLIENT-SPECIFIC ADAPTATION', title: 'Make the system<br>sound like the client.', copy: 'Client brand language and visual codes guide exploration, storyboarding, assembly, review, and iteration. Human direction decides what is right.', list: ['Brand language and visual system', 'Concepts, imagery, graphics, storyboards', 'Assembly, review, and human approval'] },
    learnings: { label: 'LEARNINGS / RETURN TO THE SYSTEM', title: 'Let each cycle<br>teach the next.', copy: 'Capture what changed, what worked, and what the team learned. Return those decisions and observations to the Vault for the next brief.', list: ['Outputs and decisions', 'Review notes and observations', 'Reusable learning for future work'] }
  };
  const panel = document.querySelector('#stage-panel');
  document.querySelectorAll('.stage').forEach((button) => button.addEventListener('click', () => {
    const item = content[button.dataset.stage];
    document.querySelectorAll('.stage').forEach((stage) => { const active = stage === button; stage.classList.toggle('active', active); stage.setAttribute('aria-selected', String(active)); });
    panel.classList.remove('flash'); void panel.offsetWidth; panel.classList.add('flash');
    document.querySelector('#stage-label').textContent = item.label;
    document.querySelector('#stage-title').innerHTML = item.title;
    document.querySelector('#stage-copy').textContent = item.copy;
    document.querySelector('#stage-list').innerHTML = item.list.map((entry) => `<li>${entry}</li>`).join('');
  }));
})();
