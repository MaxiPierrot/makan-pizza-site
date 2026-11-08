# Makan Pizza : blog, règles, calendrier et programmation

À lire en entier avant de créer quoi que ce soit dans le blog. Ce fichier complète 01 (architecture) et 02 (contenu des pages).

## 1. Objectif

Un blog qui montre le sérieux de Pierre et amène des clients à Lyon. Peu d'articles, bons, vérifiés. Aucune publication sans validation de Pierre.

## 2. Principe de fonctionnement

- Rythme : 4 articles publiés au lancement du site, puis 2 articles par mois, programmés sur 12 mois (24 articles).
- Chaque article est un fichier texte (Markdown) dans `blog/articles/`, avec un en-tête (front matter) :
  - `titre`, `description` (meta), `date` (date de publication prévue), `validé` (true ou false), `sujet`, `offre` (atelier, pizza-party, four, evjf...), `photos` (voir section 5).
- **Un article ne se publie que si sa date est passée ET `validé: true`.** Si Pierre n'a pas validé un article, il reste invisible même quand sa date arrive. C'est le garde-fou.
- Les articles sont générés en avance, mais Pierre les relit et les valide par lots (par exemple 6 par trimestre). Il ne relit pas 24 articles d'un coup, sauf s'il le veut.
- Publication automatique : le site se reconstruit chaque jour (build programmé sur Netlify, déclenché par une tâche quotidienne). Les articles dont la date est arrivée et qui sont validés apparaissent, le sitemap se met à jour tout seul.

## 3. Règles d'écriture (pour chaque article)

Faits : n'écrire que des faits vérifiables. Chaque date, nom ou affirmation historique a une source fiable (ouvrage, site institutionnel, presse reconnue), citée dans une section "Sources" avec liens. Quand une histoire est contestée (origine de la margherita, par exemple), le dire. En cas de doute, ne pas écrire.

Contenu qui vieillit : écrire uniquement du contenu durable. Ne jamais écrire un prix, une marque de four ou un chiffre de marché en dur : les prix viennent d'une variable centrale du site (un seul endroit à modifier). Pour les articles sur les fours, comparer des types de fours et des critères, pas des modèles précis. Toute donnée chiffrée porte sa source et sa date.

Valeur : chaque article apporte quelque chose qu'un simple résumé n'apporte pas : l'expérience de Pierre (ses essais, ses réglages), une explication claire, un cas concret. Prévoir dans le brouillon des passages marqués `[À COMPLÉTER PAR PIERRE : vécu, anecdote, photo]` aux endroits où son témoignage améliore l'article. Ces passages ne sont pas publiables : l'article reste `validé: false` tant qu'il en reste.

Structure : titre qui dit ce que le lecteur va apprendre ; introduction de 3 à 4 lignes avec la réponse principale ; intertitres clairs, en questions quand c'est naturel ; paragraphes courts ; FAQ de 3 à 5 questions pour les articles pratiques ; conclusion qui renvoie vers l'offre concernée, sans insistance. Longueur : 800 à 1 500 mots.

Style : celui de Pierre. Simple, direct, "je" pour lui, "vous" pour le lecteur, sans superlatifs. Aucun tiret long (—) ni demi-cadratin (–). Pas de phrases creuses ("dans cet article, nous allons découvrir"), pas de séries de trois adjectifs, pas de conclusion qui répète l'introduction. Garder les guillemets droits.

Technique : une page par article (`/blog/titre-de-l-article`), un seul H1, title et meta description uniques, balisage `Article` (auteur Pierre, date de publication, date de mise à jour), balisage `FAQPage` quand il y a une FAQ, `BreadcrumbList`, 2 ou 3 liens internes vers des pages du site (offres, carte, FAQ) et des liens vers les sources externes, ajout au sitemap, page `/blog` qui liste les articles du plus récent au plus ancien.

Interdit : copier un texte existant, inventer une citation, une statistique, un témoignage ou un avis, publier des articles quasi identiques, répéter des mots-clés artificiellement, mentionner d'autres marques en les recommandant, promettre "sans gluten" ou "sans allergène".

## 4. Les 4 articles du lancement (les plus proches de l'activité)

1. **Combien coûte une pizza party à domicile ?** Transparence sur ce qui fait varier le prix (nombre d'invités, durée, distance), "à partir de" tiré de la variable centrale. Renvoie vers `/pizza-party-domicile-lyon`.
2. **Atelier pizza ou pizza party : lequel choisir ?** Selon l'occasion, le nombre de personnes, ce qu'on veut vivre. Renvoie vers les trois offres.
3. **Quel four à pizza pour la maison ?** Types de fours (électrique, gaz, bois, four ménager avec pierre), critères de choix, budget minimum d'environ 300 € pour un four qui convient (information de Pierre), conseils pour tester avant d'acheter. Sans modèles ni marques recommandés. Renvoie vers l'initiation (qui aide à choisir un four).
4. **Organiser un EVJF ou un EVG à domicile à Lyon.** Déroulé, nombre de personnes (4 à 6 pour les ateliers, plus de 6 : écrire à Pierre), ce qu'il faut prévoir. Renvoie vers l'atelier Bases, l'initiation et `/contact`. Attention : la page EVJF/EVG du site est en phase 2 ; l'article sert de contenu en attendant.

## 5. Calendrier des 24 articles programmés (2 par mois, après les 4 du lancement)

**Sprint de Noël (décidé le 9 nov. 2026) : un article par vendredi jusqu'au 1er janvier.** 20 nov. erreurs de débutant (à valider) · 27 nov. offrir un atelier à Noël (brouillon) · 4 déc. tomate et mozzarella · 11 déc. ingrédients de saison (brouillon, écrit le 10 nov.) · 18 déc. histoire de la napolitaine · 25 déc. les farines (avancé du 8 janv.) · 1er janv. 500 °C et 90 secondes (avancé du 22 janv.). Ensuite, retour à 2 articles par mois. La pizza party des fêtes est repoussée au 19 nov. 2027 : Pierre n'est pas disponible pour les fêtes 2026.

Mois 1 : Anniversaire entre amis à Lyon, idées d'activités à la maison · L'histoire de ma pizza signature, la Morta-Bella (article très personnel, à compléter par Pierre)
Mois 2 : Les erreurs de débutant : pâte qui colle, qui ne lève pas, qui se déchire · Tomate et mozzarella : pourquoi du fior di latte sur une napolitaine
Mois 3 : De la rue de Naples à l'UNESCO : l'histoire de la pizza napolitaine (vérifier la date et le libellé exact de l'inscription) · Les farines : T00, T65, W, ce que ça veut dire
Mois 4 : Pourquoi 500 °C et 90 secondes : ce qui se passe dans la pâte · Four électrique, à gaz ou à bois : ce qui change dans l'assiette
Mois 5 : Pourquoi les fours à pizza pour la maison cartonnent (chiffres à sourcer et dater, sinon article sans chiffres) · Pourquoi on ne fait pas une pizza de pizzeria dans un four ménager, et comment s'en rapprocher
Mois 6 : L'hydratation de la pâte, expliquée simplement · Pourquoi je farine le plan de travail avec de la semoule
Mois 7 : La margherita de 1889 : ce qu'on sait vraiment de la légende · Pourquoi le bord de la napolitaine gonfle (le cornicione)
Mois 8 : La pâte à longue fermentation : mode passagère ou vrai progrès ? · La marinara, la plus ancienne des pizzas ?
Mois 9 : Comment la pizza est arrivée en France · Combien de pizzas prévoir par personne pour une soirée
Mois 10 : Cuisiner la pizza avec des enfants · Que prévoir chez soi pour un atelier à domicile
Mois 11 : Pizza party avec des invités allergiques : bien s'organiser (sans rien promettre de "sans allergène") · Les erreurs à éviter pour organiser une pizza party à la maison
Mois 12 : Planifier la fermentation : organiser sa pâte sur 24 heures · Atelier de cuisine entre amis : pourquoi on garde le groupe petit

## 6. Photos des articles

Chaque article a une image de couverture et, selon la longueur, 1 à 2 images dans le texte.

Sources autorisées : Unsplash, Pexels, Pixabay (usage commercial libre) ; Wikimedia Commons (vérifier la licence au cas par cas, éviter les licences "pas d'usage commercial" ; si une attribution est exigée, la mettre sous la photo). Utiliser les API officielles de ces sites (clé gratuite à demander par Pierre) ou le téléchargement direct d'une page de photo précise.

Cohérence : l'image doit montrer ce que l'article dit. Une pizza napolitaine pour un article sur la napolitaine (bord gonflé, cuisson courte, taches de cuisson), pas une pizza américaine épaisse. Un four à pizza pour l'article four. Pas de photo de personnes reconnaissables sauf si le site de la photo précise que les personnes ont donné leur accord. Pas de logo de marque visible. Pas d'images générées par IA présentées comme de vraies photos.

Traçabilité : pour chaque image téléchargée, enregistrer dans `blog/images-credits.json` : l'URL de la page de la photo, le nom de l'auteur, le nom de la licence, la date de vérification. Écrire un texte alternatif qui décrit ce qu'on voit.

Format : WebP, 1600 px de large maximum, nom de fichier descriptif (par exemple `pizza-napolitaine-bord-gonfle.webp`), largeur et hauteur déclarées, chargement différé sous la ligne de flottaison.

Les photos libres de droit sont provisoires : dès que Pierre a une photo à lui qui convient, elle remplace la photo libre (champ `photo_pierre: true` dans l'en-tête). Une photo libre de droit reste vérifiée à la source ; un doute sur la licence, on ne l'utilise pas.

## 7. Étapes de mise en place (pour Claude Code)

1. Créer la structure du blog dans Eleventy : page liste `/blog`, gabarit d'article, balisage, sitemap, filtre de publication (date passée ET `validé: true`).
2. Créer la variable centrale des prix, utilisée par le site et par les articles.
3. Rédiger les 4 articles du lancement et récupérer leurs photos, avec les sources. Les passages `[À COMPLÉTER PAR PIERRE]` restent visibles dans le fichier, jamais publiés.
4. S'arrêter pour que Pierre relise et valide les 4 articles.
5. Générer les 24 articles suivants par lots de 6, chaque lot après validation du précédent ou à la demande de Pierre. Les dates sont réparties sur 12 mois, 2 par mois.
6. Mettre en place la reconstruction quotidienne du site (build hook Netlify déclenché chaque jour par une tâche programmée).
7. Contrôles automatiques avant chaque lot : présence des sources, longueur, aucun tiret long, aucun passage entre crochets, liens internes présents, photo avec crédit enregistré.
