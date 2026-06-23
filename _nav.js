/* Shared navigation – included in every page */
(function () {
  const pages = [
    { href: 'index.html',       icon: '🏠', label: 'Dashboard' },
    { href: 'roadmap.html',     icon: '🗺️', label: 'Roadmap' },
    { href: 'architektur.html', icon: '🏗️', label: 'Architektur' },
    { href: 'uebergabe.html',   icon: '📋', label: 'Übergabe' },
    { href: 'links.html',       icon: '🔗', label: 'Links & Zugänge' },
  ];

  const current = (window.location.pathname.split('/').pop() || 'index.html');

  const html = `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="topbar-logo">💜</div>
        <div>
          <div class="topbar-title">Klartext Liebe – Interne Verwaltung</div>
          <div class="topbar-sub">Monika Oechtering · Stand: Juni 2026</div>
        </div>
        <span class="topbar-badge">🔒 Nur intern</span>
      </div>
    </header>
    <nav class="sitenav">
      <div class="sitenav-inner">
        ${pages.map(p => `
          <a class="nav-link${current === p.href ? ' active' : ''}" href="${p.href}">
            ${p.icon} ${p.label}
          </a>`).join('')}
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
})();
