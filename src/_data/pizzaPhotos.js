// Bande de photos de l'accueil : seules les photos dont le fichier existe sont
// retenues (src/assets/images/photos/<nom>.webp ou .jpg).
// La bande ne s'affiche qu'à partir de 4 photos.
const fs = require("fs");

const pizzas = [
  // Photos libres provisoires (voir src/blog/images-credits.json, "provisoire": true) : le texte alternatif décrit ce qu'on voit.
  // Remplacer le fichier par une photo de la vraie pizza, puis remettre le texte de la recette.
  { file: "pizza-margherita-lyon", alt: "Pizza margherita napolitaine vue du dessus, au bord gonflé et tacheté, avec mozzarella, basilic et parmesan" },
  { file: "pizza-savoyarde-lyon", alt: "Pizza Savoyarde : base blanche, oignons confits, pommes de terre, poitrine fumée et reblochon" },
  { file: "pizza-morta-bella-lyon", alt: "Vue du dessus d'une pizza napolitaine blanche garnie de roses de mortadelle, de burrata et de petits éclats verts, à côté d'autres pizzas" },
  { file: "pizza-chevre-miel-lyon", alt: "Pizza chèvre-miel : base blanche, mozzarella fior di latte, chèvre frais, miel et noix" },
  { file: "pizza-parma-lyon", alt: "Vue du dessus d'une pizza napolitaine au bord gonflé, garnie de roquette, de burrata et de tomates" },
  { file: "pizza-reine-lyon", alt: "Pizza napolitaine au bord gonflé et tacheté, garnie de jambon, de champignons et d'oignons nouveaux, sur un plat gris" },
  { file: "pizza-napolitaine-aubergines-lyon", alt: "Vue du dessus d'une pizza napolitaine au bord gonflé, garnie d'aubergines et de touches de fromage frais, dans une assiette" },
  { file: "pizza-napolitaine-tomates-lyon", alt: "Pizza napolitaine au bord gonflé, garnie de tomates fraîches, de mozzarella et de basilic, avec un filet de crème balsamique" },
];

module.exports = pizzas
  .map((p) => {
    const ext = ["webp", "jpg"].find((e) => fs.existsSync(`src/assets/images/photos/${p.file}.${e}`));
    return ext ? { ...p, src: `/assets/images/photos/${p.file}.${ext}` } : null;
  })
  .filter(Boolean)
  .slice(0, 6);
