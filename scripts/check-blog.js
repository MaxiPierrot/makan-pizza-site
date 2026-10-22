// Contrôles automatiques des articles du blog (avant chaque lot).
// Usage : npm run check:blog
// Erreurs (bloquantes) : sources absentes, longueur, tirets longs, prix écrits en dur,
// liens internes manquants, photo sans crédit, titre ou meta dupliqués.
// Un article validé: true ne peut contenir aucun passage entre crochets.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const dir = path.join(__dirname, "..", "src", "blog", "articles");
const credits = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "blog", "images-credits.json"), "utf8"));
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
let errors = 0;
const titles = new Set();
const descs = new Set();

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const { data, content } = matter(raw);
  const problems = [];
  const warnings = [];
  const body = content.replace(/\[À [^\]]*\]/g, "");
  const words = body
    .replace(/\{%.*?%\}|\{\{.*?\}\}/g, " ")
    .replace(/[|#*`\[\]()>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  for (const k of ["titre", "description", "date", "validé", "sujet", "offre", "photos"]) {
    if (data[k] === undefined) problems.push(`en-tête : « ${k} » manquant`);
  }
  if (words < 800 || words > 1500) problems.push(`longueur ${words} mots (attendu : 800 à 1 500)`);
  if ((!data.sources || !data.sources.length) && !data.sansSourceExterne) problems.push("aucune source citée (ou sansSourceExterne: true si l'article ne repose que sur vos offres)");
  if (/[—–]/.test(raw)) problems.push("tiret long ou demi-cadratin trouvé");
  if (/\d\s?€/.test(content.replace(/\{\{[^}]*\}\}\s?€/g, ""))) problems.push("prix écrit en dur dans le texte (utiliser {{ prix.xxx }})");
  if (/\d\s?€/.test(JSON.stringify({ d: data.description, f: data.faq, t: data.titre }).replace(/\{prix\.\w+\}\s?€/g, ""))) problems.push("prix écrit en dur dans l'en-tête");
  const internal = (content.match(/\]\(\/[^)]*\)/g) || []).length + (data.related || []).length;
  if (internal < 2) problems.push("moins de 2 liens internes");
  if ((data.description || "").length > 175) warnings.push(`meta description longue (${data.description.length} caractères)`);
  if (titles.has(data.titre)) problems.push("titre dupliqué");
  if (descs.has(data.description)) problems.push("meta description dupliquée");
  titles.add(data.titre);
  descs.add(data.description);
  for (const p of data.photos || []) {
    if (!credits[p.fichier]) problems.push(`photo « ${p.fichier} » sans crédit dans images-credits.json`);
    if (!fs.existsSync(path.join(__dirname, "..", "src", "assets", "images", "blog", `${p.fichier}.webp`))) problems.push(`photo « ${p.fichier} » : fichier absent`);
    if (!p.alt) problems.push(`photo « ${p.fichier} » sans texte alternatif`);
  }
  const placeholders = (raw.match(/\[À (COMPLÉTER|CONFIRMER|DÉFINIR|DÉCIDER|FAIRE RELIRE|VÉRIFIER)[^\]]*\]/g) || []).length;
  if (data["validé"] === true && placeholders) problems.push(`validé: true mais ${placeholders} passage(s) entre crochets`);

  const status = problems.length ? "ERREUR" : "ok";
  console.log(`${status.padEnd(7)} ${f} : ${words} mots, ${(data.sources || []).length} source(s), ${placeholders} passage(s) à compléter, validé: ${data["validé"]}`);
  problems.forEach((p) => console.log(`          - ${p}`));
  warnings.forEach((p) => console.log(`          ! ${p}`));
  errors += problems.length;
}
process.exit(errors ? 1 : 0);
