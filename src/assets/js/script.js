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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Formulaire de contact : préremplit « Type de demande » avec ?atelier=...
const requestType = document.getElementById('atelier');

if (requestType) document.addEventListener('DOMContentLoaded', () => {
  const wanted = new URLSearchParams(window.location.search).get('atelier');
  const known = [...requestType.options].map((o) => o.value);
  if (wanted) {
    requestType.value = known.includes(wanted) ? wanted : 'autre';
  }
  // Champs « Pour qui » et « De la part de », seulement pour un bon cadeau
  const bon = document.querySelector('[data-bon-champs]');
  const majBon = () => { if (bon) bon.hidden = requestType.value !== 'bon-cadeau'; };
  requestType.addEventListener('change', majBon);
  majBon();
  setTimeout(majBon, 300); // après la restauration des réponses enregistrées
  // Origine de la visite (lien en bio marqué ?utm_source=…), pour savoir d'où viennent les demandes
  const source = document.getElementById('source');
  if (source) { try { source.value = sessionStorage.getItem('mp-source') || ''; } catch (e) { /* sans importance */ } }
});

// Mémorise la source d'arrivée sur le site (?utm_source=instagram, etc.) pour la joindre au formulaire
try {
  const src = new URLSearchParams(window.location.search).get('utm_source');
  if (src) sessionStorage.setItem('mp-source', src.slice(0, 40));
} catch (e) { /* stockage indisponible : sans importance */ }

// Bandeau d'articles : boutons précédent/suivant, barre de progression, glisser à la souris.
// Sans JavaScript, le bandeau défile quand même (tactile, molette, clavier).
document.querySelectorAll('[data-strip]').forEach((strip) => {
  const rail = strip.querySelector('[data-rail]');
  const bar = strip.querySelector('[data-bar]');
  const thumb = strip.querySelector('[data-thumb]');
  const prev = strip.querySelector('[data-prev]');
  const next = strip.querySelector('[data-next]');
  if (!rail || !bar) return;

  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const scrollable = max > 2;
    bar.hidden = !scrollable;
    rail.classList.toggle('is-end', !scrollable || rail.scrollLeft >= max - 2);
    if (!scrollable) return;
    const ratio = rail.clientWidth / rail.scrollWidth;
    thumb.style.width = `${Math.max(ratio, 0.12) * 100}%`;
    const track = thumb.parentElement.clientWidth;
    const travel = track - thumb.offsetWidth;
    thumb.style.setProperty('--x', `${(rail.scrollLeft / max) * travel}px`);
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max - 2;
  };

  const step = () => {
    const card = rail.querySelector('li');
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(card.parentElement).columnGap || 0) : rail.clientWidth * 0.8;
  };
  const go = (dir) => rail.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  rail.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  rail.addEventListener('keydown', (e) => {
    if (e.target !== rail) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  // Glisser à la souris (le tactile défile déjà seul)
  let startX = 0;
  let startLeft = 0;
  let dragging = false;
  let moved = false;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) {
      moved = true;
      rail.classList.add('is-dragging');
    }
    if (moved) rail.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    rail.classList.remove('is-dragging');
  });
  rail.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  update();
  window.addEventListener('load', update);
});

// FAQ : un lien vers une question (#ancre) ouvre la réponse correspondante.
(function () {
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.matches('details.faq__item')) {
      el.open = true;
      requestAnimationFrame(() => el.scrollIntoView());
    }
  };
  window.addEventListener('hashchange', openFromHash);
  window.addEventListener('DOMContentLoaded', openFromHash);
  window.addEventListener('load', openFromHash);
})();

// Tableaux des articles : sur téléphone, chaque ligne devient une fiche ; chaque cellule reçoit le titre de sa colonne.
document.querySelectorAll('.article__body table').forEach((table) => {
  const heads = [...table.querySelectorAll('thead th')].map((th) => th.textContent.trim());
  if (!heads.length) return;
  table.classList.add('table--fiches');
  table.querySelectorAll('tbody tr').forEach((tr) => {
    [...tr.children].forEach((cell, i) => { if (heads[i]) cell.dataset.label = heads[i]; });
  });
});
