// Règle des formulaires de Pierre : réponses jamais perdues.
// Sur <form data-sauvegarde="nom">, avec dans le formulaire un bandeau [data-erreur] et un bouton [data-export] :
// copie dans le navigateur à chaque saisie (relue au chargement), envoi à Netlify avec nouveaux essais,
// bandeau rouge si rien ne part, export des réponses en fichier texte.
// À charger avant le script propre à la page (les valeurs sont restaurées avant ses calculs).
document.querySelectorAll('form[data-sauvegarde]').forEach((form) => {
  const KEY = `makan-${form.dataset.sauvegarde}`;
  const errBox = form.querySelector('[data-erreur]');
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
  form.addEventListener('input', sauver);
  form.addEventListener('change', sauver);

  const afficherErreur = (msg) => { errBox.textContent = msg; errBox.hidden = false; };
  const masquerErreur = () => { errBox.hidden = true; };

  form.querySelector('[data-export]').addEventListener('click', () => {
    const lignes = Object.entries(lire()).map(([k, v]) => `${k} : ${v}`).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lignes], { type: 'text/plain;charset=utf-8' }));
    a.download = `${form.dataset.sauvegarde}-makan-pizza.txt`;
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
});
