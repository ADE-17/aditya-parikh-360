/* ── Helpers ── */

async function loadJson(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`Failed to load ${path}`);
  return r.json();
}

const ICONS = {
  email: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  github: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>',
  scholar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>',
  linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  paper: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  code: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
};

const TAG_LABELS = {
  'oral': 'Oral',
  'under-review': 'Under Review',
  'first-author': '1st Author',
  'equal-contribution': 'Equal Contrib.',
  'workshop': 'Workshop',
  'journal': 'Journal',
  'thesis': 'Thesis',
};

function highlightAuthor(authors, name) {
  if (!authors || !name) return authors || '';
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return authors.replace(new RegExp(`(${escaped})`, 'g'), '<span class="me">$1</span>');
}

function renderPubTags(tags) {
  if (!Array.isArray(tags)) return '';
  return tags
    .map(t => `<span class="pub-tag pub-tag--${t}">${TAG_LABELS[t] || t}</span>`)
    .join('');
}

function renderPubLinks(links) {
  if (!links) return '';
  const parts = [];
  if (links.paper) parts.push(`<a class="pub-link" href="${links.paper}" target="_blank">${ICONS.paper} Paper</a>`);
  if (links.arxiv) parts.push(`<a class="pub-link" href="${links.arxiv}" target="_blank">${ICONS.external} arXiv</a>`);
  if (links.code) parts.push(`<a class="pub-link" href="${links.code}" target="_blank">${ICONS.code} Code</a>`);
  if (links.project) parts.push(`<a class="pub-link" href="${links.project}" target="_blank">${ICONS.external} Project</a>`);
  return parts.length ? `<span class="pub-links">${parts.join('')}</span>` : '';
}

function renderPubItem(pub, authorName) {
  return `
    <li class="pub-item" data-year="${pub.year}" data-tags="${(pub.tags || []).join(' ')}">
      <div class="pub-title">${pub.title || 'Untitled'}</div>
      <div class="pub-authors">${highlightAuthor(pub.authors, authorName)}</div>
      <div class="pub-venue">${pub.venue || ''}${pub.year ? ` (${pub.year})` : ''}</div>
      <div class="pub-meta">
        ${renderPubTags(pub.tags)}
        ${renderPubLinks(pub.links)}
      </div>
    </li>`;
}

/* ── Home page ── */

async function initHomePage() {
  if (!document.getElementById('heroName')) return;

  const [profileRes, updatesRes, publicationsRes] = await Promise.allSettled([
    loadJson('data/profile.json'),
    loadJson('data/updates.json'),
    loadJson('data/publications.json'),
  ]);

  const profile = profileRes.status === 'fulfilled' ? profileRes.value : {};
  const updates = updatesRes.status === 'fulfilled' ? updatesRes.value : [];
  const publications = publicationsRes.status === 'fulfilled' ? publicationsRes.value : [];

  const $ = id => document.getElementById(id);

  $('heroName').textContent = profile.name || '';
  $('heroHeadline').textContent = profile.headline || '';
  $('heroAffiliation').textContent = profile.affiliation || '';
  $('heroBio').textContent = profile.bio || '';
  $('lastUpdated').textContent = profile.lastUpdated || '—';

  if (profile.profilePhoto) {
    $('profilePhoto').src = profile.profilePhoto;
  }

  // Links
  const heroLinks = $('heroLinks');
  if (Array.isArray(profile.links)) {
    heroLinks.innerHTML = profile.links
      .filter(l => l.label && l.url)
      .map(l => `<a class="hero-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${ICONS[l.icon] || ''}${l.label}</a>`)
      .join('');
  }

  // Open-to badges
  const openTo = $('heroOpenTo');
  if (Array.isArray(profile.openTo) && profile.openTo.length) {
    openTo.innerHTML = profile.openTo
      .map(item => `<span class="open-badge">${item}</span>`)
      .join('');
  }

  // Research focus pills
  const pills = $('researchPills');
  if (Array.isArray(profile.researchFocusAreas)) {
    pills.innerHTML = profile.researchFocusAreas
      .map(a => `<span class="pill">${a}</span>`)
      .join('');
  }

  // Selected publications (first-author + oral, up to 5)
  const selected = publications
    .filter(p => (p.tags || []).some(t => t === 'first-author' || t === 'oral'))
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 5);
  $('selectedPubs').innerHTML = selected.length
    ? selected.map(p => renderPubItem(p, profile.name)).join('')
    : '<li class="pub-item" style="color:var(--text-muted)">No publications yet.</li>';

  // Highlighted works
  const hlGrid = $('highlightedWorks');
  const works = Array.isArray(profile.highlightedWorks) ? profile.highlightedWorks : [];
  hlGrid.innerHTML = works.length
    ? works.map(w => `
        <article class="highlight-card">
          ${w.image ? `<img src="${w.image}" alt="${w.title || ''}" loading="lazy" data-lightbox>` : ''}
          <div class="hl-body">
            ${w.concept ? `<span class="concept-tag">${w.concept}</span>` : ''}
            <div class="hl-title">${w.title || ''}</div>
            <div class="hl-desc">${w.description || ''}</div>
          </div>
        </article>`).join('')
    : '<p style="color:var(--text-muted)">No highlighted works yet.</p>';

  // Timeline
  $('timelineList').innerHTML = Array.isArray(updates) && updates.length
    ? updates.map(u => `
        <li>
          <span class="timeline-date">${u.date || ''}</span>
          <span class="timeline-title">${u.title || ''}</span>
          <div class="timeline-detail">${u.details || ''}</div>
        </li>`).join('')
    : '<li style="color:var(--text-muted)">No updates yet.</li>';

  // Experience
  $('experienceList').innerHTML = Array.isArray(profile.workExperience)
    ? profile.workExperience.map(e => `
        <li class="exp-item">
          <div class="exp-role">${e.role || ''}</div>
          <div class="exp-org">${e.org || ''}</div>
          <div class="exp-period">${e.period || ''}</div>
          <div class="exp-summary">${e.summary || ''}</div>
        </li>`).join('')
    : '<li style="color:var(--text-muted)">No experience listed.</li>';

  // Education
  const eduEl = $('educationList');
  if (Array.isArray(profile.education)) {
    eduEl.innerHTML = profile.education.map(e => `
      <div class="edu-item">
        <div class="edu-degree">${e.degree || ''}</div>
        <div class="edu-institution">${e.institution || ''}${e.location ? `, ${e.location}` : ''}</div>
        <div class="edu-period">${e.period || ''}</div>
        ${e.focus ? `<div class="edu-focus">${e.focus}</div>` : ''}
      </div>`).join('');
  }

  // Skills
  const skillsGrid = $('skillsGrid');
  if (profile.skills) {
    const map = { languages: 'Languages', frameworks: 'Frameworks & Libraries', tools: 'Tools & Infra', cloud: 'Cloud' };
    skillsGrid.innerHTML = Object.entries(map)
      .filter(([k]) => Array.isArray(profile.skills[k]))
      .map(([k, label]) => `
        <div>
          <div class="skill-group-label">${label}</div>
          <div class="skill-tags">${profile.skills[k].map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>`).join('');
  }

  // Achievements
  const achEl = $('achievementsList');
  if (Array.isArray(profile.achievements)) {
    achEl.innerHTML = profile.achievements
      .map(a => `<li>${a}</li>`)
      .join('');
  }

  // Gallery
  const gallery = $('gallery');
  const photos = Array.isArray(profile.galleryPhotos) ? profile.galleryPhotos : [];
  gallery.innerHTML = photos.length
    ? photos.map(p => `<img src="${p.src}" alt="${p.alt || 'Gallery photo'}" loading="lazy" data-lightbox>`).join('')
    : '<p style="color:var(--text-muted)">No photos yet. Add images to assets/photos/ and update data/profile.json.</p>';

  // CTA email
  const emailLink = (profile.links || []).find(l => l.icon === 'email');
  if (emailLink) {
    $('ctaEmail').href = emailLink.url;
  }

  // Footer links
  $('footerLinks').innerHTML = (profile.links || [])
    .filter(l => l.label && l.url)
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join('');
}

/* ── Publications page ── */

async function initPublicationsPage() {
  const container = document.getElementById('pubContainer');
  if (!container) return;

  const [publications, profile] = await Promise.all([
    loadJson('data/publications.json'),
    loadJson('data/profile.json'),
  ]);

  const authorName = profile.name || 'Aditya Parikh';

  // Stats
  const statsEl = document.getElementById('pubStats');
  const totalPubs = publications.length;
  const firstAuthor = publications.filter(p => (p.tags || []).includes('first-author')).length;
  const orals = publications.filter(p => (p.tags || []).includes('oral')).length;
  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);

  statsEl.innerHTML = `
    <div class="pub-stat"><div class="pub-stat-num">${totalPubs}</div><div class="pub-stat-label">Publications</div></div>
    <div class="pub-stat"><div class="pub-stat-num">${firstAuthor}</div><div class="pub-stat-label">First Author</div></div>
    <div class="pub-stat"><div class="pub-stat-num">${orals}</div><div class="pub-stat-label">Oral Presentations</div></div>
    <div class="pub-stat"><div class="pub-stat-num">${years.length}</div><div class="pub-stat-label">Active Years</div></div>
  `;

  // Filters
  const filtersEl = document.getElementById('pubFilters');
  filtersEl.innerHTML = `<button class="pub-filter active" data-filter="all">All</button>`
    + years.map(y => `<button class="pub-filter" data-filter="${y}">${y}</button>`).join('');

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.pub-filter');
    if (!btn) return;
    filtersEl.querySelectorAll('.pub-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    container.querySelectorAll('.pub-year-group').forEach(group => {
      group.style.display = (filter === 'all' || group.dataset.year === filter) ? '' : 'none';
    });
  });

  // Render grouped by year
  container.innerHTML = years.map(year => {
    const yearPubs = publications.filter(p => p.year === year || String(p.year) === String(year));
    return `
      <div class="pub-year-group" data-year="${year}">
        <div class="pub-year-label">${year}</div>
        <ul class="pub-list">${yearPubs.map(p => renderPubItem(p, authorName)).join('')}</ul>
      </div>`;
  }).join('');
}

/* ── Photography page ── */

async function initPhotographyPage() {
  const stories = document.getElementById('photoStories');
  if (!stories) return;

  const profile = await loadJson('data/profile.json');
  const photos = Array.isArray(profile.photography) ? profile.photography : [];

  stories.innerHTML = photos.length
    ? photos.map(p => `
        <figure class="photo-story">
          <img src="${p.src}" alt="${p.alt || ''}" loading="lazy" data-lightbox>
          <figcaption>
            <div class="ps-title">${p.title || ''}</div>
            <div class="ps-caption">${p.caption || ''}</div>
          </figcaption>
        </figure>`).join('')
    : '<p style="color:var(--text-muted)">No photography entries yet. Add them in data/profile.json under "photography".</p>';
}

/* ── Lightbox ── */

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('.lightbox-close');

  document.addEventListener('click', e => {
    const img = e.target.closest('[data-lightbox]');
    if (img && img.tagName === 'IMG') {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Mobile nav ── */

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ── Scroll reveal ── */

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
}

/* ── Bootstrap ── */

async function bootstrap() {
  initMobileNav();
  initLightbox();

  const results = await Promise.allSettled([
    initHomePage(),
    initPublicationsPage(),
    initPhotographyPage(),
  ]);

  initScrollReveal();

  const err = results.find(r => r.status === 'rejected');
  if (err) {
    console.error('Load error:', err.reason);
    const note = document.createElement('p');
    note.style.cssText = 'text-align:center;color:var(--text-muted);padding:2rem;font-size:0.9rem;';
    note.textContent = 'Could not load some content. If you opened the HTML directly, run: python -m http.server 8000';
    document.querySelector('main')?.appendChild(note);
  }
}

bootstrap();
