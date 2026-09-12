const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topnav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.topnav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('.system-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.system-tab').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.system-detail').forEach(detail => detail.classList.add('hidden'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelector(`[data-detail="${tab.dataset.system}"]`).classList.remove('hidden');
  });
});

const stepNotes = {
  Research: 'Start with a question worth researching. Capture source, date, and relevance.',
  Qualify: 'Separate useful context from assumptions. Keep the record legible for the next person.',
  Compose: 'Use the context to draft. The goal is relevance, not volume or spam.',
  Route: 'A human owner checks fit, consent, brand, and next action before anything moves.'
};
document.querySelectorAll('.workflow-step').forEach(step => {
  step.addEventListener('click', () => {
    step.parentElement.querySelectorAll('.workflow-step').forEach(item => item.classList.remove('active'));
    step.classList.add('active');
    step.closest('.system-detail').querySelector('.step-note').textContent = stepNotes[step.querySelector('span').textContent];
  });
});

document.querySelectorAll('.phase').forEach(phase => {
  phase.addEventListener('click', () => {
    document.querySelectorAll('.phase').forEach(item => item.classList.remove('active'));
    phase.classList.add('active');
  });
});

const metrics = {
  draft: ['Hours to first draft', 'From brief received to a credible first creative direction.'],
  research: ['Lead research time', 'Time from account list to useful, source-backed context.'],
  handoff: ['On-time handoffs', 'Whether the next owner receives the right context at the right time.'],
  retrieval: ['Knowledge retrieval time', 'Time for a team member to find the context needed to act.']
};
document.querySelectorAll('.metric').forEach(metric => {
  metric.addEventListener('click', () => {
    document.querySelectorAll('.metric').forEach(item => item.classList.remove('active'));
    metric.classList.add('active');
    document.querySelector('#metric-name').textContent = metrics[metric.dataset.metric][0];
    document.querySelector('#metric-copy').textContent = metrics[metric.dataset.metric][1];
    document.querySelector('#metric-status').textContent = 'Not yet baselined';
  });
});

document.querySelector('#save-baseline').addEventListener('click', event => {
  const baseline = document.querySelector('#baseline').value.trim();
  const target = document.querySelector('#target').value.trim();
  document.querySelector('#metric-status').textContent = baseline || target ? 'Ready for discovery review' : 'Add a baseline or target first';
  event.currentTarget.textContent = baseline || target ? 'Discussion point saved' : 'Mark as a discussion point';
});
