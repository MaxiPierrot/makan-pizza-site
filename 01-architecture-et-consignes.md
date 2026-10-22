# Makan Pizza : refonte du site, architecture et consignes pour Claude Code

## Contexte

makanpizza.com est un site statique (HTML/CSS/JS) hébergé sur Netlify, relié à un domaine Namecheap. Aujourd'hui : une seule page d'accueil avec navigation par ancres (#concept, #histoire, #prestations, #pizza-party, #galerie, #contact, #contact-devis) et une page /recettes.

But de la refonte : que chaque offre ait sa page, pour que le site soit trouvé sur les recherches locales (Lyon) et cité par les IA, et que le visiteur comprenne vite ce qu'il peut réserver et à quel prix.

Les textes sont dans `02-contenu-pages.md`. Ils sont définitifs, sauf les passages entre crochets.

## Prompt à coller dans Claude Code au début de la session

> Lis `01-architecture-et-consignes.md` et `02-contenu-pages.md`. Commence par lire le code actuel du site (HTML, CSS, JS, dossier assets) pour reprendre son identité visuelle, sans la changer. Propose-moi d'abord le plan de fichiers et le choix de méthode de build (section "Stack"), puis attends mon accord avant de créer quoi que ce soit. Ensuite construis les pages dans l'ordre de la section "Ordre de travail". Les textes sont à reprendre tels quels, sans les reformuler. Les passages entre crochets ne se publient pas.

## Stack (à valider avec Pierre)

Contrainte : peu de maintenance, déploiement simple, aucun cookie.

- **Recommandé** : générateur statique léger (Eleventy ou Astro, sans framework JS côté client) avec un gabarit commun (en-tête, pied de page, balisage). Dépôt Git relié à Netlify : chaque modification poussée met le site à jour. Avantage : 13 pages qui partagent la même navigation sans copier-coller.
- **Plan B** : HTML pur avec un petit script de build qui insère l'en-tête et le pied de page, puis dépôt manuel du dossier sur Netlify, comme aujourd'hui.

Quel que soit le choix : pas de dépendance lourde, pas de banque de polices externe si on peut l'éviter, pas de script de suivi.

## Identité visuelle à conserver

Lire les fichiers actuels pour les valeurs exactes. Repères connus : couleur de thème #f3e9d8, logo `/assets/images/logo.png`, palette jaune moutarde, vert-noir foncé et blanc, logo plat minimaliste (pizza ronde avec une part détachée). Ne pas redessiner le logo. Garder la police et les couleurs déjà en place.

## Arborescence et URL

| URL | Page | Phase |
| --- | --- | --- |
| `/` | Accueil | 1 |
| `/atelier-pizza-lyon` | Atelier Bases (59 €) | 1 |
| `/atelier-pizza-napolitaine-lyon` | Initiation napolitaine (69 €) | 1 |
| `/pizza-party-domicile-lyon` | Pizza party | 1 |
| `/carte` | La carte (ancienne /recettes) | 1 |
| `/a-propos` | Histoire et façon de travailler | 1 |
| `/faq` | Questions fréquentes | 1 |
| `/contact` | Devis et demande de date (formulaire) | 1 |
| `/mentions-legales`, `/cgv`, `/confidentialite` | Pages légales | 1 (avant tout trafic) |
| `/atelier-pizza-entreprise-lyon` | Atelier en entreprise | 2, après validation |
| `/evjf-evg-atelier-pizza-lyon` | EVJF et EVG | 2 |
| `/anniversaire-pizza-domicile-lyon` | Anniversaire | 2 |
| `/bon-cadeau` | Bon cadeau | 2, si offre validée |
| `/merci` | Page de remerciement après le formulaire (noindex) | 1 |

Redirections dans `_redirects` : `/recettes` vers `/carte` en 301. Les anciennes ancres de l'accueil ne se redirigent pas ; garder sur l'accueil les ids `#ateliers` et `#contact` pour que les liens déjà partagés (Instagram, Linktree) continuent de marcher.

## Navigation

- En-tête : Ateliers (menu : Bases / Initiation) · Pizza party · La carte · À propos · Contact. Bouton fixe `Demander un devis`. Sur mobile : menu replié, bouton d'appel direct (06 99 17 18 38) visible.
- Pied de page : slogan, zone, téléphone, email, réseaux, liens légaux, SIRET (voir contenu).
- Fil d'Ariane sur toutes les pages hors accueil (balisé en BreadcrumbList).
- Liens internes : chaque page d'offre renvoie vers les deux autres offres, la FAQ et le formulaire (avec `?atelier=` prérempli).

## Gabarit d'une page d'offre

1. H1 unique, avec le service et « Lyon ».
2. Encadré de faits : durée, participants, prix, lieu, matériel.
3. Introduction courte, puis les sections du fichier de contenu.
4. Photos réelles seulement, avec texte alternatif descriptif. Pas de bloc « Photo à venir » : si le fichier n'existe pas, la section image n'apparaît pas et la mise en page tient sans.
5. Bouton unique vers `/contact` avec `?atelier=`.
6. Bloc FAQ propre à la page (3 à 5 questions reprises de `/faq`, mêmes réponses).

## Référencement : à implémenter sur chaque page

- `<title>` et meta description exactement ceux du fichier de contenu.
- Un seul H1. Hiérarchie H2/H3 sans saut.
- Balise canonique avec l'URL complète en https.
- Open Graph et Twitter Card : titre, description, image de partage 1200×630 (logo sur fond de la palette, à créer ; à défaut, ne pas en mettre).
- `lang="fr"`, balise viewport, `theme-color` #f3e9d8.
- `sitemap.xml` à la racine (toutes les pages indexables, sans `/merci`), `robots.txt` qui autorise tout et déclare le sitemap. Ne pas bloquer les robots des IA.
- Pages légales et `/merci` : `noindex` pour `/merci`, indexables pour les autres.

### Balisage JSON-LD

Sur toutes les pages (dans le gabarit) : un `LocalBusiness`.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Makan Pizza",
  "url": "https://makanpizza.com",
  "telephone": "+33699171838",
  "email": "contact@makanpizza.com",
  "description": "Ateliers de pizza napolitaine et pizza party à domicile à Lyon et dans un rayon de 10 km.",
  "areaServed": { "@type": "City", "name": "Lyon" },
  "sameAs": [
    "https://instagram.com/makanpizza_officiel",
    "https://facebook.com/makanpizzaofficiel"
  ]
}
```

Ne pas mettre d'adresse (pas d'adresse publique). Ne jamais ajouter `aggregateRating` ni `review` tant qu'il n'y a pas de vrais avis visibles sur la page.

Par page :
- Bases et Initiation : un `Service` avec une `Offer` (prix par personne, devise EUR, description « à partir de 4 personnes »).
- Pizza party : un `Service` sans prix si « à partir de 220 € » n'est pas confirmé.
- `/faq` et les blocs FAQ des pages d'offre : `FAQPage` reprenant exactement les questions et réponses visibles. Ne pas publier les questions entre crochets.
- Toutes les pages hors accueil : `BreadcrumbList`.

## Formulaire de contact

Examiner d'abord comment le formulaire actuel envoie les données. Recommandation : Netlify Forms (attribut `data-netlify`, champ pot de miel anti-spam), notification vers contact@makanpizza.com, redirection vers `/merci`.

Champs : Nom, Email, Téléphone, Type de demande, Date souhaitée, Nombre de personnes, Quartier ou commune, Message. Libellés visibles, champs obligatoires signalés, messages d'erreur clairs, accessible au clavier. Le type de demande se préremplit avec `?atelier=bases|initiation|pizza-party|sur-mesure|entreprise|autre`.

La section « Réserver un atelier » avec le bouton `Voir les créneaux disponibles` (lien vide `#`) disparaît tant que SimplyBook n'est pas branché. Prévoir un emplacement masqué pour le widget.

## Images

- Aucune image n'est inventée. Les emplacements restent vides tant que les photos n'existent pas.
- Format WebP (avec repli JPEG si besoin), largeur et hauteur déclarées, chargement différé sous la ligne de flottaison, 1600 px maximum de large.
- Noms de fichiers descriptifs : `atelier-pizza-domicile-lyon-pate.webp`, pas `IMG_2034`.
- Texte alternatif qui décrit ce qu'on voit, sans bourrage de mots-clés.

Photos à prévoir par Pierre (par ordre d'utilité) : pâte et mains au travail, four allumé en plein service, pizza sortie du four, groupe en atelier (avec accord des personnes), mise en place chez un client, la carte en photo (une image par pizza, au moins Margherita, Savoyarde, Morta-Bella).

## Performance, accessibilité, vie privée

- Visée : bon score mobile sur PageSpeed Insights (au moins 90 en performance, accessibilité et bonnes pratiques).
- Contrastes suffisants, focus visible, `alt` partout, boutons et liens explicites, cibles tactiles assez grandes.
- Aucun cookie, aucun outil de mesure avec cookies. La Search Console (vérifiée par enregistrement DNS) suffit au départ.
- HTTPS uniquement.

## Ordre de travail

1. Lire le site actuel, proposer le plan de fichiers et la méthode de build. Attendre l'accord.
2. Gabarit commun (en-tête, pied de page, balisage, styles) à l'identique du site actuel.
3. Pages de la phase 1, dans l'ordre : accueil, Bases, Initiation, Pizza party, carte, à propos, FAQ, contact + `/merci`.
4. Pages légales (avec les crochets non publiés, voir plus bas).
5. `sitemap.xml`, `robots.txt`, `_redirects`, JSON-LD.
6. Vérifications (liste ci-dessous), puis aperçu Netlify pour relecture par Pierre avant la mise en ligne.
7. Pages de la phase 2, une par une, quand Pierre les valide.

## Vérifications avant livraison

- [ ] Aucune occurrence de « Photo à venir », de « SIRET : à ajouter » ou du lien `#` vide.
- [ ] Aucun texte entre crochets publié.
- [ ] Les conditions d'annulation de la FAQ et des CGV sont identiques.
- [ ] Aucun tiret long (—) ni demi-cadratin (–) dans les textes. Recherche dans tout le dossier.
- [ ] Aucune mention d'origine italienne de Pierre. Les mots « origines » et « italiennes » ne doivent pas apparaître ensemble.
- [ ] La phrase interdite « La pizza napolitaine apprise par passion, transmise par envie » n'apparaît nulle part.
- [ ] Un seul slogan : `Pizza napolitaine à domicile ou ailleurs...` (avec trois points).
- [ ] Le seul numéro de téléphone est le 06 99 17 18 38.
- [ ] Les prix sont cohérents partout : 59 € (Bases), 69 € (Initiation), minimum 4 personnes, 10 km.
- [ ] Mozzarella : uniquement fior di latte. Pas d'emmental nulle part.
- [ ] Chaque page a un title, une meta, un H1, une canonique, des Open Graph.
- [ ] Sitemap, robots, redirection /recettes vers /carte testés.
- [ ] Validation du JSON-LD (outil de test des données structurées de Google).
- [ ] Formulaire testé de bout en bout : envoi, email reçu, page de remerciement, pot de miel.
- [ ] Navigation au clavier et sur téléphone testée.
- [ ] Aucun lien mort (interne ou externe).

## Ce qu'il ne faut pas faire

- Ne pas ajouter d'avis, de notes, de chiffres, de logos de partenaires ou de photos qui n'existent pas.
- Ne pas réécrire les textes pour les "faire plus vendeurs". Le style de Pierre est simple, direct, sans emphase.
- Ne pas promettre « sans gluten » ni « sans allergène ». Le texte actuel dit seulement que Pierre tient compte des allergies dans le devis.
- Ne pas afficher d'adresse postale sur le site, hors mentions légales si elle est exigée.
- Ne pas modifier le logo.

## Après la mise en ligne (pour Pierre)

1. Ajouter le site dans la Search Console et Bing Webmaster Tools, envoyer le sitemap.
2. Mettre à jour la fiche Google : lien vers la bonne page pour chaque service, mêmes prix, même numéro.
3. Mettre le lien de `/contact` dans Linktree et la bio Instagram.
4. Refaire le test de citation dans les IA un mois plus tard (voir l'étude).
