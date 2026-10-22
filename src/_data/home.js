// Vrai si la photo du hero existe (alors le filigrane n'est pas affiché ni préchargé).
const fs = require("fs");

module.exports = {
  heroPhoto: ["webp", "jpg"].some((e) => fs.existsSync(`src/assets/images/photos/accueil-hero.${e}`)),
};
