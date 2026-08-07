// Makan Pizza — script minimal, aucune dépendance externe.

// Menu hamburger : ouverture/fermeture + fermeture au clic sur un lien.
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

// Bandeau "Idées recette" (accueil) : défilement pas à pas, une pizza à la
// fois, avec une pause entre chaque carte. La liste est dupliquée dans le
// HTML pour permettre une boucle infinie sans à-coup visible.
const teaserMarquee = document.querySelector('.idees-recette-teaser__marquee');
const teaserTrack = document.querySelector('.idees-recette-teaser__track');

if (teaserMarquee && teaserTrack) {
  const originalCount = teaserTrack.querySelectorAll(
    '.idees-recette-teaser__item:not([aria-hidden])'
  ).length;
  const PAUSE_MS = 2600;
  const TRANSITION_MS = 700;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let index = 0;
  let timer = null;

  const getStep = () => {
    const item = teaserTrack.querySelector('.idees-recette-teaser__item');
    const gap = parseFloat(getComputedStyle(teaserTrack).gap) || 0;
    return item.offsetWidth + gap;
  };

  const goTo = (i, animate) => {
    teaserTrack.style.transition = animate
      ? `transform ${TRANSITION_MS}ms ease`
      : 'none';
    teaserTrack.style.transform = `translateX(-${i * getStep()}px)`;
  };

  const next = () => {
    index += 1;
    goTo(index, true);
    if (index === originalCount) {
      setTimeout(() => {
        index = 0;
        goTo(0, false);
      }, TRANSITION_MS);
    }
  };

  const start = () => {
    if (!timer) {
      timer = setInterval(next, PAUSE_MS);
    }
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  if (prefersReducedMotion) {
    teaserMarquee.style.overflowX = 'auto';
  } else {
    start();
    teaserMarquee.addEventListener('mouseenter', stop);
    teaserMarquee.addEventListener('mouseleave', start);
    teaserMarquee.addEventListener('focusin', stop);
    teaserMarquee.addEventListener('focusout', start);
  }
}

// Petit message de confirmation visuelle après l'ouverture du client mail
// (le formulaire n'a pas de back-end pour l'instant, voir index.html).
const form = document.querySelector('.contact__form');

if (form) {
  form.addEventListener('submit', () => {
    // PLACEHOLDER : à remplacer par un vrai envoi (fetch vers Google Form
    // ou API) une fois le back-end de réservation choisi.
    setTimeout(() => {
      alert('Merci ! Votre client mail va s\'ouvrir pour finaliser l\'envoi.');
    }, 100);
  });
}
