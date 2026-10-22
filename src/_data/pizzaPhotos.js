// Bande de photos de l'accueil : seules les photos dont le fichier existe sont
// retenues (src/assets/images/photos/<nom>.webp ou .jpg).
// La bande ne s'affiche qu'à partir de 4 photos.
const fs = require("fs");

const pizzas = [
  { file: "pizza-margherita-lyon", alt: "Pizza Margherita : base tomate, mozzarella fior di latte et basilic" },
  { file: "pizza-savoyarde-lyon", alt: "Pizza Savoyarde : base blanche, oignons confits, pommes de terre, poitrine fumée et reblochon" },
  { file: "pizza-morta-bella-lyon", alt: "Pizza Morta-Bella : base ricotta au pesto de pistache, scamorza fumée, mortadelle, pistache, basilic et stracciatella" },
  { file: "pizza-diavola-lyon", alt: "Pizza Diavola : base tomate, mozzarella fior di latte, Parmigiano Reggiano et spianata" },
  { file: "pizza-chevre-miel-lyon", alt: "Pizza chèvre-miel : base blanche, mozzarella fior di latte, chèvre frais, miel et noix" },
  { file: "pizza-parma-lyon", alt: "Pizza Parma : base tomate, mozzarella fior di latte, jambon de Parme, roquette et tomates cerises" },
];

module.exports = pizzas
  .map((p) => {
    const ext = ["webp", "jpg"].find((e) => fs.existsSync(`src/assets/images/photos/${p.file}.${e}`));
    return ext ? { ...p, src: `/assets/images/photos/${p.file}.${ext}` } : null;
  })
  .filter(Boolean)
  .slice(0, 6);
