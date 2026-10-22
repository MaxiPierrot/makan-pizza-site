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
  acomptePct: 30,
};
