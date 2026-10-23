// La carte : textes d'ingrédients repris de 02-contenu-pages.md.
// Photos libres provisoires pour Margherita, Reine, Morta-Bella et Parma (photoAlt décrit la photo, pas la recette).
// Une photo s'affiche si src/assets/images/photos/<photo>.webp (ou .jpg) existe.
const classiques = [
  { name: "Margherita", photo: "pizza-margherita-lyon", photoAlt: "Pizza margherita napolitaine vue du dessus, au bord gonflé et tacheté, avec mozzarella, basilic et parmesan", desc: "Base tomate, Parmigiano Reggiano, mozzarella fior di latte, basilic" },
  { name: "Reine", photo: "pizza-reine-lyon", photoAlt: "Pizza napolitaine au bord gonflé et tacheté, garnie de jambon, de champignons et d'oignons nouveaux, sur un plat gris", desc: "Base tomate, jambon, champignons de Paris sautés, mozzarella fior di latte" },
  { name: "3 Fromages (à la française)", photo: "pizza-3-fromages-lyon", desc: "Base tomate, reblochon, chèvre frais, mozzarella fior di latte" },
  { name: "4 Fromages (à l'italienne)", photo: "pizza-4-fromages-lyon", desc: "Base blanche, ricotta, Parmigiano Reggiano, mozzarella fior di latte, gorgonzola" },
  { name: "Savoyarde", photo: "pizza-savoyarde-lyon", desc: "Base blanche, oignons confits, pommes de terre, poitrine fumée, reblochon" },
  { name: "Diavola", photo: "pizza-diavola-lyon", desc: "Base tomate, Parmigiano Reggiano, mozzarella fior di latte, spianata" },
  { name: "Chèvre-miel", photo: "pizza-chevre-miel-lyon", desc: "Base blanche, mozzarella fior di latte, chèvre frais", after: "Après cuisson : miel et noix" },
];

const speciales = [
  { name: "Morta-Bella", photo: "pizza-morta-bella-lyon", photoAlt: "Vue du dessus d'une pizza napolitaine blanche garnie de roses de mortadelle, de burrata et de petits éclats verts, à côté d'autres pizzas", signature: true, desc: "Base ricotta au pesto de pistache, scamorza fumée", after: "Après cuisson : mortadelle, pistache, basilic, stracciatella" },
  { name: "Parma", photo: "pizza-parma-lyon", photoAlt: "Vue du dessus d'une pizza napolitaine au bord gonflé, garnie de roquette, de burrata et de tomates", desc: "Base tomate, mozzarella fior di latte", after: "Après cuisson : copeaux de Parmigiano Reggiano, basilic, roquette, tomates cerises, jambon de Parme, crème de balsamique, burrata en option" },
  { name: "Carbonara", photo: "pizza-carbonara-lyon", desc: "Pizza blanche, pecorino, guanciale", after: "Après cuisson : poivre, jaune d'œuf" },
  { name: "Picante", photo: "pizza-picante-lyon", desc: "Base tomate, mozzarella fior di latte, piment jalapeño, spianata" },
];

module.exports = { classiques, speciales };
