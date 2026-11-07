// Page « Préparer mon atelier » : estimation en direct, adresse avec suggestions,
// distance par la route et frais de déplacement. Services publics de la Géoplateforme (IGN),
// sans clé ni cookie. Si le calcul échoue, le formulaire s'envoie quand même.
(() => {
  const form = document.getElementById('prep');
  if (!form) return;

  const cfg = form.dataset;
  const P = {
    bases: Number(cfg.bases),
    initiation: Number(cfg.initiation),
    partyMin: Number(cfg.partyMin),
    min: Number(cfg.min),
    max: Number(cfg.max),
    maxPossible: Number(cfg.maxPossible),
    rayon: Number(cfg.rayon),
    tarifKm: Number(cfg.tarifKm),
    acompte: Number(cfg.acompte) / 100,
  };
  const [oLon, oLat] = cfg.origine.split(',').map(Number);
  const API = 'https://data.geopf.fr';

  const $ = (id) => document.getElementById(id);
  const eur = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
  const nbInput = $('p-nb');
  const lieu = $('p-lieu');
  const suggest = $('p-suggest');
  const kmLine = $('p-km');

  // Déplacement : null = pas encore calculé ; sinon { km, frais, approx }
  let trajet = null;

  const formuleKey = () => {
    const r = form.querySelector('input[name="formule"]:checked');
    return r ? r.dataset.key : 'initiation';
  };
  const nb = () => Math.max(1, Math.round(Number(nbInput.value) || 0));

  function update() {
    const key = formuleKey();
    const n = nb();
    const isAtelier = key === 'bases' || key === 'initiation';

    $('p-structure-row').hidden = form.querySelector('input[name="vous_etes"]:checked')?.value === 'Particulier';
    $('p-adresse-devis-row').hidden = $('p-meme').checked;
    $('p-bases-row').hidden = key !== 'bases';

    const hint = $('p-nb-hint');
    if (isAtelier) {
      hint.hidden = false;
      hint.classList.toggle('prep__hint--warn', n > P.maxPossible);
      hint.textContent = n > P.maxPossible
        ? `Au-delà de ${P.maxPossible} personnes, une pizza party convient mieux qu'un atelier : on en parle.`
        : `Un atelier se fait à partir de ${P.min} personnes facturées : à 2 ou 3, c'est possible, au prix de ${P.min}. Idéal jusqu'à ${P.max}, possible jusqu'à ${P.maxPossible}.`;
    } else {
      hint.hidden = true;
    }

    const frais = trajet ? trajet.frais : 0;
    let base = null;
    let label = '';
    if (isAtelier) {
      const pu = key === 'bases' ? P.bases : P.initiation;
      const factures = Math.max(n, P.min);
      base = factures * pu;
      label = `${key === 'bases' ? 'Atelier Bases' : 'Initiation napolitaine'} · ${factures} × ${eur(pu)}`
        + (n < P.min ? ` (prix de ${P.min})` : '');
    } else if (key === 'pizza-party') {
      label = `Pizza party · ${n} personnes`;
    } else {
      label = 'Atelier sur mesure';
    }

    $('p-l-formule').textContent = label;
    $('p-v-formule').textContent = base !== null ? eur(base)
      : key === 'pizza-party' ? `à partir de ${eur(P.partyMin)}` : 'sur devis';

    $('p-v-km').textContent = !trajet ? `inclus jusqu'à ${P.rayon} km`
      : trajet.frais === 0 ? 'inclus' : eur(trajet.frais);

    let total = '';
    if (base !== null) total = eur(base + frais);
    else if (key === 'pizza-party') total = `à partir de ${eur(P.partyMin + frais)}`;
    else total = 'sur devis';
    $('p-v-total').textContent = total;

    const acompteBase = base !== null ? base + frais : key === 'pizza-party' ? P.partyMin + frais : null;
    $('p-v-acompte').textContent = acompteBase === null ? 'sur devis'
      : (base === null ? 'à partir de ' : '') + eur(Math.round(acompteBase * P.acompte * 100) / 100);

    $('p-h-km').value = trajet ? `${trajet.km.toFixed(1)}${trajet.approx ? ' (à vol d\'oiseau x1,3)' : ''}` : '';
    $('p-h-frais').value = trajet ? String(trajet.frais) : '';
    $('p-h-total').value = total;
  }

  // Préremplissage avec ?atelier=bases|initiation|pizza-party|autre (mêmes valeurs que /contact)
  const wanted = new URLSearchParams(window.location.search).get('atelier');
  if (wanted) {
    const r = form.querySelector(`input[name="formule"][data-key="${CSS.escape(wanted)}"]`)
      || form.querySelector('input[name="formule"][data-key="autre"]');
    r.checked = true;
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.querySelectorAll('[data-step]').forEach((b) => {
    b.addEventListener('click', () => {
      nbInput.value = Math.max(1, nb() + Number(b.dataset.step));
      update();
    });
  });

  // ---------- Adresse et distance ----------
  const fraisPour = (km) => (km <= P.rayon ? 0 : Math.ceil((km - P.rayon) * 2 * P.tarifKm));
  const vol = (lon, lat) => {
    const R = 6371;
    const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(lat - oLat);
    const dLon = rad(lon - oLon);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(oLat)) * Math.cos(rad(lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  let calcId = 0;
  async function calculer(lon, lat, label) {
    const id = ++calcId;
    kmLine.classList.remove('prep__hint--warn');
    kmLine.textContent = 'Calcul de la distance…';
    let km;
    let approx = false;
    try {
      const url = `${API}/navigation/itineraire?resource=bdtopo-osrm&profile=car&optimization=fastest`
        + `&start=${oLon},${oLat}&end=${lon},${lat}&distanceUnit=kilometer&getSteps=false&geometryFormat=geojson`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      km = Number(data.distance);
      if (!Number.isFinite(km)) throw new Error('distance');
    } catch (e) {
      km = vol(lon, lat) * 1.3;
      approx = true;
    }
    if (id !== calcId) return;
    trajet = { km, frais: fraisPour(km), approx };
    const kmTxt = `${approx ? 'environ ' : ''}${Math.round(km)} km par la route depuis Lyon 9e`;
    kmLine.textContent = trajet.frais === 0
      ? `${label} : ${kmTxt}. Déplacement inclus.`
      : `${label} : ${kmTxt}. Au-delà des ${P.rayon} km inclus, ${Math.round(km - P.rayon)} km × 2 (aller et retour) à ${eur(P.tarifKm)} le km, soit ${eur(trajet.frais)}, plus péages éventuels.`;
    update();
  }

  function fermer() {
    suggest.hidden = true;
    suggest.textContent = '';
    lieu.setAttribute('aria-expanded', 'false');
  }

  let timer;
  let ctrl;
  lieu.setAttribute('aria-expanded', 'false');
  lieu.addEventListener('input', () => {
    trajet = null;
    update();
    kmLine.textContent = `Le déplacement est inclus jusqu'à ${P.rayon} km de Lyon 9e. Au-delà, je l'ajoute au devis.`;
    clearTimeout(timer);
    const q = lieu.value.trim();
    if (q.length < 4) { fermer(); return; }
    timer = setTimeout(async () => {
      try {
        ctrl?.abort();
        ctrl = new AbortController();
        const res = await fetch(`${API}/geocodage/search?q=${encodeURIComponent(q)}&autocomplete=1&limit=5&index=address`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        const feats = (data.features || []).filter((f) => f.geometry && f.properties);
        suggest.textContent = '';
        if (!feats.length) { fermer(); return; }
        feats.forEach((f) => {
          const li = document.createElement('li');
          const b = document.createElement('button');
          b.type = 'button';
          b.textContent = f.properties.label;
          b.addEventListener('click', () => {
            lieu.value = f.properties.label;
            fermer();
            const [lon, lat] = f.geometry.coordinates;
            calculer(lon, lat, f.properties.city || f.properties.label);
            lieu.focus();
          });
          li.appendChild(b);
          suggest.appendChild(li);
        });
        suggest.hidden = false;
        lieu.setAttribute('aria-expanded', 'true');
      } catch (e) {
        if (e.name !== 'AbortError') fermer();
      }
    }, 250);
  });

  // Adresse tapée sans choisir de suggestion : on prend la meilleure correspondance
  lieu.addEventListener('change', () => {
    setTimeout(async () => {
      if (trajet || !suggest.hidden) return;
      const q = lieu.value.trim();
      if (q.length < 4) return;
      try {
        const res = await fetch(`${API}/geocodage/search?q=${encodeURIComponent(q)}&limit=1&index=address`);
        const data = await res.json();
        const f = (data.features || [])[0];
        if (!f) throw new Error('aucune');
        const [lon, lat] = f.geometry.coordinates;
        calculer(lon, lat, f.properties.label);
      } catch (e) {
        kmLine.classList.add('prep__hint--warn');
        kmLine.textContent = "Je n'ai pas reconnu cette adresse. Pas grave : je calcule le déplacement pour le devis.";
      }
    }, 300);
  });

  lieu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermer();
    if (e.key === 'ArrowDown' && !suggest.hidden) {
      e.preventDefault();
      suggest.querySelector('button')?.focus();
    }
  });
  suggest.addEventListener('keydown', (e) => {
    const items = [...suggest.querySelectorAll('button')];
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(i + 1, items.length - 1)]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (i <= 0 ? lieu : items[i - 1]).focus(); }
    if (e.key === 'Escape') { fermer(); lieu.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.prep__address')) fermer();
  });

  // ---- Réponses jamais perdues : copie locale, envoi avec nouvel essai, export, bandeau d'erreur ----
  const KEY = 'makan-preparer-atelier-v1';
  const errBox = $('p-error');
  const skip = new Set(['form-name', 'bot-field']);

  const lire = () => {
    const out = {};
    for (const [k, v] of new FormData(form)) if (!skip.has(k) && String(v) !== '') out[k] = String(v);
    return out;
  };
  const sauver = () => { try { localStorage.setItem(KEY, JSON.stringify(lire())); } catch (e) { /* stockage refusé : l'export reste possible */ } };

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    for (const [k, v] of Object.entries(saved)) {
      for (const el of form.elements[k] instanceof RadioNodeList ? form.elements[k] : [form.elements[k]]) {
        if (!el || el.type === 'hidden') continue;
        if (el.type === 'radio' || el.type === 'checkbox') el.checked = el.value === v;
        else el.value = v;
      }
    }
  } catch (e) { /* copie illisible : on repart d'un formulaire vide */ }
  const wa = $('p-wa');
  const majWhatsApp = () => {
    const r = lire();
    const lignes = ["Bonjour, voici mon estimation depuis makanpizza.com :"];
    if (r.formule) lignes.push(`Formule : ${r.formule}`);
    if (r.nombre_de_personnes) lignes.push(`Personnes : ${r.nombre_de_personnes}`);
    if (r.adresse_atelier) lignes.push(`Lieu : ${r.adresse_atelier}`);
    if (r.estimation_totale) lignes.push(`Estimation : ${r.estimation_totale}`);
    wa.href = `${wa.href.split('?')[0]}?text=${encodeURIComponent(lignes.join('\n'))}`;
  };
  const apresSaisie = () => { sauver(); majWhatsApp(); };
  form.addEventListener('input', apresSaisie);
  form.addEventListener('change', apresSaisie);
  update();
  majWhatsApp();

  const afficherErreur = (msg) => { errBox.textContent = msg; errBox.hidden = false; };
  const masquerErreur = () => { errBox.hidden = true; };

  $('p-export').addEventListener('click', () => {
    const lignes = Object.entries(lire()).map(([k, v]) => `${k} : ${v}`).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lignes], { type: 'text/plain;charset=utf-8' }));
    a.download = 'preparer-mon-atelier-makan-pizza.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  let envoi = false;
  async function envoyer() {
    if (envoi) return;
    envoi = true;
    masquerErreur();
    const body = new URLSearchParams(new FormData(form)).toString();
    for (const attente of [0, 1500, 4000]) {
      if (attente) await new Promise((r) => setTimeout(r, attente));
      try {
        const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (res.ok) {
          try { localStorage.removeItem(KEY); } catch (e) { /* sans importance */ }
          window.location.href = '/merci';
          return;
        }
      } catch (e) { /* réseau coupé : on réessaie */ }
    }
    envoi = false;
    afficherErreur("Votre demande n'est PAS partie : le serveur ne répond pas. Vos réponses sont gardées sur cet appareil. Le bouton « Envoyer » réessaie, ou cliquez sur « Exporter mes réponses » et envoyez le fichier par WhatsApp ou e-mail à contact@makanpizza.com.");
    window.addEventListener('online', envoyer, { once: true }); // nouvel essai automatique au retour du réseau
  }

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) return; // le navigateur affiche ses messages
    e.preventDefault();
    envoyer();
  });
  window.addEventListener('offline', () => afficherErreur("Vous n'êtes plus connecté : rien ne peut partir pour l'instant. Vos réponses restent gardées sur cet appareil."));
  window.addEventListener('online', () => { if (errBox.textContent.startsWith('Vous')) masquerErreur(); });
})();
