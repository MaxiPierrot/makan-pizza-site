// Makan Pizza : script minimal, aucune dépendance externe.

// Menu hamburger : ouverture/fermeture, fermeture au clic sur un lien ou avec Échap.
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  const setOpen = (isOpen) => {
    navMenu.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('nav-open', isOpen);
  };

  navToggle.addEventListener('click', () => {
    setOpen(!navMenu.classList.contains('is-open'));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      setOpen(false);
      navToggle.focus();
    }
  });
}

// En-tête : se réduit légèrement dès qu'on a défilé (la hauteur de la barre ne change pas).
const nav = document.getElementById('site-nav');

if (nav) {
  let ticking = false;
  const update = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

// Animations au défilement. Tout le contenu est déjà dans le HTML : on ne masque
// que les éléments situés sous la ligne de flottaison, juste avant qu'ils
// apparaissent. Sans JavaScript, ou si l'utilisateur préfère moins d'animations,
// rien n'est masqué ni animé.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealSelector = [
    'main section:not(.hero) .container > :not(ul):not(ol)',
    '.offers__grid > li',
    '.steps > li',
    '.photo-strip > li',
    '.menu-grid > li',
  ].join(', ');
  const vh = window.innerHeight;

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      reveal.unobserve(el);
      el.classList.remove('is-pending');
      el.classList.add('is-revealing');
      const done = () => {
        el.classList.remove('is-revealing');
        el.style.removeProperty('--d');
      };
      el.addEventListener('transitionend', (e) => { if (e.target === el) done(); }, { once: true });
      setTimeout(done, 1600);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  document.querySelectorAll(revealSelector).forEach((el) => {
    if (el.getBoundingClientRect().top < vh) return;
    const siblings = el.parentElement.matches('ul, ol') ? [...el.parentElement.children] : [];
    if (siblings.length) el.style.setProperty('--d', `${(siblings.indexOf(el) % 3) * 0.1}s`);
    el.classList.add('is-pending');
    reveal.observe(el);
  });

  // Photos : léger zoom lent à la révélation
  const photos = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      photos.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.photo-slot').forEach((slot) => {
    if (!slot.querySelector('img') || slot.getBoundingClientRect().top < vh) return;
    slot.classList.add('photo-zoom');
    photos.observe(slot);
  });
}

// Formulaire de contact : préremplit « Type de demande » avec ?atelier=...
const requestType = document.getElementById('atelier');

if (requestType) {
  const wanted = new URLSearchParams(window.location.search).get('atelier');
  const known = [...requestType.options].map((o) => o.value);
  if (wanted) {
    requestType.value = known.includes(wanted) ? wanted : 'autre';
  }
}
