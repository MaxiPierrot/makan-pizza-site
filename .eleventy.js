const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/og-makan-pizza.jpg": "assets/images/og-makan-pizza.jpg" });
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/logo-trim.webp": "assets/images/logo-trim.webp" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/emblem-filigrane.webp": "assets/images/emblem-filigrane.webp" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon.png": "assets/images/favicon.png" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/photos": "assets/images/photos" });

  // Chemin d'une photo si le fichier existe (webp ou jpg), sinon chaîne vide.
  const photoSrc = (name) => {
    const ext = ["webp", "jpg"].find((e) => fs.existsSync(`src/assets/images/photos/${name}.${e}`));
    return ext ? `/assets/images/photos/${name}.${ext}` : "";
  };
  eleventyConfig.addFilter("photoSrc", photoSrc);

  // {% photo "nom-du-fichier", "texte alternatif", largeur, hauteur, "lazy" %}
  // N'affiche l'image que si le fichier existe. Sinon : rien, et le bloc de
  // couleur du conteneur tient la place.
  eleventyConfig.addShortcode("photo", function (name, alt, width, height, loading) {
    const src = photoSrc(name);
    if (!src) return "";
    const priority = loading === "eager" ? ' fetchpriority="high"' : "";
    return `<img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${loading || "lazy"}" decoding="async"${priority}>`;
  });

  // Données structurées (JSON-LD) des pages
  const ld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, "\\u003c")}\n</script>`;
  eleventyConfig.addShortcode("faqLd", (items) =>
    ld({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    })
  );
  eleventyConfig.addShortcode("serviceLd", (name, description, path, price, minPrice) => {
    const service = {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      url: `https://makanpizza.com${path}`,
      provider: { "@type": "LocalBusiness", name: "Makan Pizza", url: "https://makanpizza.com" },
      areaServed: { "@type": "City", name: "Lyon" },
    };
    if (price) {
      service.offers = { "@type": "Offer", price: String(price), priceCurrency: "EUR", description: "à partir de 4 personnes" };
    } else if (minPrice) {
      service.offers = {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: minPrice, priceCurrency: "EUR" },
      };
    }
    return ld(service);
  });

  // Polices hébergées sur le site (aucune requête vers Google Fonts)
  const fonts = {
    "playfair-display": ["700", "900"],
    "caveat": ["600"],
    "jost": ["400", "500", "600"],
  };
  for (const [family, weights] of Object.entries(fonts)) {
    for (const w of weights) {
      const file = `${family}-latin-${w}-normal.woff2`;
      eleventyConfig.addPassthroughCopy({
        [`node_modules/@fontsource/${family}/files/${file}`]: `assets/fonts/${file}`,
      });
    }
  }

  // Typographie française : espaces insécables avant « : ; ? ! % € » pour éviter qu'un
  // signe se retrouve seul en début de ligne. Appliqué au texte visible du <body> seulement
  // (jamais aux balises, aux scripts ni au <head>).
  eleventyConfig.addTransform("typo-fr", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const i = content.indexOf("<body");
    if (i === -1) return content;
    const parts = content.slice(i).split(/(<script[\s\S]*?<\/script>|<[^>]+>)/);
    const fixed = parts
      .map((part, n) =>
        n % 2 === 1
          ? part
          : part.replace(/ (?=[:;?!%€])/g, "\u00a0").replace(/(\d) (?=€)/g, "$1\u00a0")
      )
      .join("");
    return content.slice(0, i) + fixed;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
