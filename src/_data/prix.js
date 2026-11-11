// Prix et chiffres de l'offre : un seul endroit à modifier.
// Utilisé par les pages du site (gabarits Nunjucks : {{ prix.bases }}),
// par les textes en en-tête de page et d'article (jeton {prix.bases}),
// et par les articles du blog ({{ prix.bases }} dans le texte).
const bases = 59; // atelier Bases, euros par personne
const initiation = 69; // initiation napolitaine, euros par personne
const minPersonnes = 4;
const maxPersonnes = 6;
// Offre de Noël : seules dates à changer si la sortie du site glisse (format "AAAA-MM-JJ", entre guillemets :
// la tâche quotidienne GitHub reconstruit le site ces jours-là). Tout le reste en découle, CGV comprises.
const noelDebut = "2026-11-16"; // premier jour de l'offre, 2 jours après la sortie du site (décision de Pierre, 10 nov. 2026)
const noelFin = "2026-12-25"; // premier jour sans l'offre
const minuitParis = (jour) => new Date(`${jour}T00:00:00+01:00`); // novembre et décembre : heure d'hiver
const jourFr = (date) => date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" });
const maintenant = new Date();

module.exports = {
  bases,
  initiation,
  minPersonnes,
  maxPersonnes,
  basesGroupeMin: bases * minPersonnes,
  basesGroupeMax: bases * maxPersonnes,
  initiationGroupeMin: initiation * minPersonnes,
  initiationGroupeMax: initiation * maxPersonnes,
  accessoiresBases: 50, // pierre à pizza et petits accessoires, à acheter avant l'atelier
  fourMin: 300, // budget minimum d'un four qui convient (information de Pierre)
  rayonKm: 10,
  maxPossible: 8, // atelier : idéal jusqu'à maxPersonnes, réalisable jusqu'à 8
  // Déplacement au-delà de rayonKm : (distance route - rayonKm) x 2 (aller et retour) x tarifKm.
  // tarifKm = barème kilométrique 2026 (identique à 2025), voiture 4 CV, jusqu'à 5 000 km : 0,606 €/km.
  // Citroën C3 diesel 2006 de Pierre : 4 CV à confirmer sur la carte grise (case P.6).
  tarifKm: 0.606,
  // Point de départ du calcul : mairie du 9e (place du Marché), pas l'adresse personnelle.
  origine: { lat: 45.7745, lon: 4.8059 },
  acomptePct: 30,
  // Bons cadeaux (page /bon-cadeau, CGV, FAQ, bandeau de l'accueil). Valeurs à confirmer par Pierre (9 nov. 2026).
  bonValiditeMois: 12,
  // Offre de Noël : bandeau de l'accueil et de /bon-cadeau jusqu'au 24 décembre inclus.
  // Calculé à la construction du site : le bandeau disparaît à la reconstruction du 25 décembre (jour d'article).
  // NOEL=1 force l'affichage pour un aperçu local, jamais sur Netlify.
  noel: process.env.NOEL === "1" || (maintenant >= minuitParis(noelDebut) && maintenant < minuitParis(noelFin)),
  noelDateDebut: jourFr(minuitParis(noelDebut)), // « 16 novembre »
  noelDateLimite: jourFr(new Date(minuitParis(noelFin) - 12 * 3600e3)), // dernier jour : « 24 décembre »
  noelAnnee: noelFin.slice(0, 4),
  // Offres validées par Pierre le 9 nov. 2026 (atelier réservé ou offert jusqu'au 24 décembre inclus). Pizza party : pas d'offre.
  noelRemiseInitiation: 10, // en %
};
