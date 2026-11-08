// Prix et chiffres de l'offre : un seul endroit à modifier.
// Utilisé par les pages du site (gabarits Nunjucks : {{ prix.bases }}),
// par les textes en en-tête de page et d'article (jeton {prix.bases}),
// et par les articles du blog ({{ prix.bases }} dans le texte).
const bases = 59; // atelier Bases, euros par personne
const initiation = 69; // initiation napolitaine, euros par personne
const minPersonnes = 4;
const maxPersonnes = 6;

module.exports = {
  bases,
  initiation,
  partyMin: 220, // pizza party, « à partir de », euros
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
  // Bandeau de Noël sur l'accueil et date limite de commande : mettre noel à false après Noël.
  noel: true,
  noelDateLimite: "22 décembre",
};
