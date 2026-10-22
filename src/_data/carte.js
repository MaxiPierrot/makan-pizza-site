// La carte : textes d'ingrédients repris de 02-contenu-pages.md.
// Une photo s'affiche si src/assets/images/photos/<photo>.webp (ou .jpg) existe.
const classiques = [
  { name: "Margherita", photo: "pizza-margherita-lyon", desc: "Base tomate, Parmigiano Reggiano, mozzarella fior di latte, basilic" },
  { name: "Reine", photo: "pizza-reine-lyon", desc: "Base tomate, jambon, champignons de Paris sautés, mozzarella fior di latte" },
  { name: "3 Fromages (à la française)", photo: "pizza-3-fromages-lyon", desc: "Base tomate, reblochon, chèvre frais, mozzarella fior di latte" },
  { name: "4 Fromages (à l'italienne)", photo: "pizza-4-fromages-lyon", desc: "Base blanche, ricotta, Parmigiano Reggiano, mozzarella fior di latte, gorgonzola" },
  { name: "Savoyarde", photo: "pizza-savoyarde-lyon", desc: "Base blanche, oignons confits, pommes de terre, poitrine fumée, reblochon" },
  { name: "Diavola", photo: "pizza-diavola-lyon", desc: "Base tomate, Parmigiano Reggiano, mozzarella fior di latte, spianata" },
  { name: "Chèvre-miel", photo: "pizza-chevre-miel-lyon", desc: "Base blanche, mozzarella fior di latte, chèvre frais", after: "Après cuisson : miel et noix" },
];

const speciales = [
  { name: "Morta-Bella", photo: "pizza-morta-bella-lyon", signature: true, desc: "Base ricotta au pesto de pistache, scamorza fumée", after: "Après cuisson : mortadelle, pistache, basilic, stracciatella" },
  { name: "Parma", photo: "pizza-parma-lyon", desc: "Base tomate, mozzarella fior di latte", after: "Après cuisson : copeaux de Parmigiano Reggiano, basilic, roquette, tomates cerises, jambon de Parme, crème de balsamique, burrata en option" },
  { name: "Carbonara", photo: "pizza-carbonara-lyon", desc: "Pizza blanche, pecorino, guanciale", after: "Après cuisson : poivre, jaune d'œuf" },
  { name: "Picante", photo: "pizza-picante-lyon", desc: "Base tomate, mozzarella fior di latte, piment jalapeño, spianata" },
];

module.exports = { classiques, speciales };
