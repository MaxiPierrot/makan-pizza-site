# Site makanpizza.com

Eleventy 3, sources dans `src/`, sortie dans `_site/`. Hébergement Netlify, dépôt GitHub MaxiPierrot/makan-pizza-site, branche de travail `refonte-site-eleventy`.

## Commandes

- `npm start` : aperçu local (port 8080). `npm run start:brouillons` : avec les articles de blog en brouillon.
- `npm run build` : construction. `npm run check:blog` : contrôle des articles.

## Documents de référence (lire avant de modifier)

- `01-architecture-et-consignes.md` : stack, URL, navigation, gabarits.
- `02-contenu-pages.md` : textes définitifs (ne pas reformuler, les passages entre crochets ne se publient pas).
- `03-blog-regles-et-calendrier.md` : règles et calendrier du blog.
- `04-legendes-reseaux.md` : légendes Facebook et Instagram des articles validés.
- `_brouillons/` : contenus non publiés (FAQ, allergènes, etc.).

## Contexte et règles

Lire `../contexte/fiche-projet.md` et les règles de `../CLAUDE.md` (slogan unique, téléphone 06 99 17 18 38, aucune mention du projet de départ en Indonésie (citer l'Indonésie reste permis), adresse personnelle uniquement là où elle est obligatoire, mozzarella fior di latte uniquement). Prix actuels : Bases 59 €, Initiation 69 €, pizza party sur devis, sans prix affiché (décision du 11 nov. 2026). Zone annoncée : « Lyon et région lyonnaise » (sans kilomètres) ; règle précise de 10 km autour de Lyon 9e seulement dans les CGV et le calcul de « Préparer mon atelier ». Hébergeur à confirmer dans la fiche, mais le site est sur Netlify.

## Points d'attention

- Aucun cookie, aucun script de suivi, pas de police externe.
- Deux comptes Netlify (production sur contact@makanpizza.com, aperçu sur le compte perso) : voir la mémoire du projet.
- Netlify a un quota de crédits : la reconstruction quotidienne (`.github/workflows/rebuild-quotidien.yml`) ne doit tourner que les jours où un article validé sort.
- Dossier renommé de `makan-pizza-site/` en `site/` le 6 nov. 2026 ; l'ancien nom peut rester dans d'anciens fichiers.

## À trancher

- Page « Préparer mon atelier » (7 nov. 2026) : 4 choix de Pierre et vérifications avant publication dans `_brouillons/a-trancher-preparer-mon-atelier.md`. Rien n'est commité.
