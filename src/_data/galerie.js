// Galerie temporaire (11 nov. 2026) : vraies pizzas de Pierre, en attendant la séance photo et la réouverture de la carte.
// Fichiers dans src/assets/images/galerie/ (<nom>.webp, 1200 px, et <nom>-600.webp). Les 6 premières s'affichent aussi sur l'accueil.
module.exports = [
  { file: "margherita-bord-gonfle", alt: "Pizza margherita au bord gonflé et tacheté, avec sauce tomate, mozzarella fondue et feuilles de basilic" },
  { file: "mortadella-burrata-roquette", alt: "Pizza à la mortadelle, garnie d'une burrata, de roquette et de basilic, au bord gonflé" },
  { file: "jambon-cru-copeaux-table", alt: "Pizza au jambon cru, copeaux de parmesan, tomates cerises et basilic, servie sur une table en bois" },
  { file: "pepperoni-sur-pelle", alt: "Pizza au pepperoni et au basilic posée sur une pelle à pizza" },
  { file: "mortadella-pistache-gros-plan", alt: "Pizza à la mortadelle et aux éclats de pistache, avec tomates cerises et basilic" },
  { file: "roquette-burrata-planche-bois", alt: "Pizza garnie de roquette, de tomates et d'une burrata, sur une planche en bois" },
  { file: "jambon-basilic", alt: "Pizza au jambon et au basilic, au bord gonflé et tacheté" },
  { file: "deux-pizzas-plan-de-travail", alt: "Deux pizzas sur un plan de travail en bois, l'une au pepperoni, l'autre à la mozzarella et au basilic" },
  { file: "jambon-cru-roquette-terrasse", alt: "Pizza au jambon cru, au basilic et aux copeaux de parmesan, servie en terrasse" },
  { file: "margherita-planche", alt: "Pizza margherita au bord doré, posée sur une planche" },
  { file: "mortadella-pistache-table-soleil", alt: "Pizza à la mortadelle, à la stracciatella et à la pistache, au soleil sur une table" },
  { file: "deux-pizzas-blanche-champignons", alt: "Deux pizzas côte à côte, une pizza blanche aux pommes de terre et une pizza aux champignons" },
  { file: "jambon-gros-plan-bord", alt: "Gros plan sur le bord gonflé d'une pizza au jambon et au basilic" },
].map((p) => ({ ...p, src: `/assets/images/galerie/${p.file}.webp`, small: `/assets/images/galerie/${p.file}-600.webp` }));
