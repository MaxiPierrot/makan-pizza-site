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
      service.offers = { "@type": "Offer", price: String(Number(price)), priceCurrency: "EUR", description: "à partir de 4 personnes" };
    } else if (minPrice) {
      service.offers = {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: Number(minPrice), priceCurrency: "EUR" },
      };
    }
    return ld(service);
  });

  // ---------- Blog ----------
  const prix = require("./src/_data/prix.js");
  const { isVisible, PREVIEW } = require("./lib/blog");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/blog": "assets/images/blog" });

  // Articles visibles : (date passée ET validé: true), ou tous en mode aperçu. Du plus récent au plus ancien.
  eleventyConfig.addCollection("articles", (api) =>
    api
      .getFilteredByGlob("src/blog/articles/*.md")
      .filter((item) => isVisible(item.data))
      .sort((a, b) => b.date - a.date)
  );

  // Jetons de prix dans les en-têtes de page et d'article : {prix.bases} devient 59.
  const prixTokens = (value) => {
    if (typeof value === "string") {
      return value.replace(/\{prix\.(\w+)\}/g, (m, key) => (key in prix ? String(prix[key]) : m));
    }
    if (Array.isArray(value)) return value.map(prixTokens);
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, prixTokens(v)]));
    }
    return value;
  };
  eleventyConfig.addFilter("prixTokens", prixTokens);
  // Articles sauf celui de la page courante (bandeau « À lire aussi »)
  eleventyConfig.addFilter("sansPage", (list, path) => (list || []).filter((a) => a.data.path !== path));

  const dateFr = (date) =>
    new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
  eleventyConfig.addFilter("dateFr", dateFr);
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  // Photos du blog : crédits tenus dans src/blog/images-credits.json
  const credits = () => JSON.parse(fs.readFileSync("src/blog/images-credits.json", "utf8"));
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  // {% blogphoto "nom-du-fichier" %} ; {% blogphoto "nom-du-fichier", "cover" %}
  // Le texte alternatif vient de la liste `photos` de l'en-tête de l'article.
  eleventyConfig.addShortcode("blogphoto", function (name, mode) {
    const ctx = this.ctx || this.context?.environments || {};
    const entry = (ctx.photos || []).find((p) => p.fichier === name);
    if (!entry || !fs.existsSync(`src/assets/images/blog/${name}.webp`)) return "";
    const c = credits()[name] || {};
    const cover = mode === "cover";
    let caption;
    if (ctx.photo_pierre === true && cover) caption = "Photo : Makan Pizza";
    else if (c.urlPage) {
      caption = `Photo : <a href="${esc(c.urlPage)}" target="_blank" rel="noopener">${esc(c.auteur)}</a>, ${esc(c.source)}`;
      if (c.licence && c.licenceAffichee !== false) caption += `, ${esc(c.licence)}`;
    } else caption = "";
    return `<figure class="article__figure${cover ? " article__figure--cover" : ""}"><img src="/assets/images/blog/${name}.webp"${fs.existsSync(`src/assets/images/blog/${name}-1000.webp`) ? ` srcset="/assets/images/blog/${name}-1000.webp 1000w, /assets/images/blog/${name}.webp 1600w" sizes="(min-width: 1200px) 1120px, 100vw"` : ""} alt="${esc(entry.alt)}" width="${c.largeur || 1600}" height="${c.hauteur || 1067}" loading="${cover ? "eager" : "lazy"}" decoding="async"${cover ? ' fetchpriority="high"' : ""}>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  });

  eleventyConfig.addShortcode("articleLd", function (titre, description, path, date, miseAJour, coverPath) {
    const url = `https://makanpizza.com${path}`;
    return ld({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: prixTokens(titre),
      description: prixTokens(description),
      mainEntityOfPage: url,
      url,
      datePublished: new Date(date).toISOString().slice(0, 10),
      dateModified: new Date(miseAJour || date).toISOString().slice(0, 10),
      inLanguage: "fr-FR",
      author: { "@type": "Person", name: "Pierre", url: "https://makanpizza.com/a-propos" },
      publisher: { "@type": "Organization", name: "Makan Pizza", url: "https://makanpizza.com" },
      image: `https://makanpizza.com${coverPath || "/assets/images/og-makan-pizza.jpg"}`,
    });
  });

  // Les passages [À COMPLÉTER PAR PIERRE ...] des brouillons sont mis en évidence dans l'aperçu.
  // Garde-fou : aucun passage entre crochets de ce type ne peut sortir dans une page publiée.
  eleventyConfig.addTransform("a-completer", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const marker = /\[À (COMPLÉTER|CONFIRMER|DÉFINIR|DÉCIDER|FAIRE RELIRE|VÉRIFIER)/;
    if (!marker.test(content)) return content;
    if (!content.includes('class="draft-banner"')) {
      throw new Error(`Passage entre crochets non publiable dans ${this.page.inputPath}`);
    }
    return content.replace(/<p>(\[À (?:COMPLÉTER|CONFIRMER|DÉFINIR|DÉCIDER|FAIRE RELIRE|VÉRIFIER))/g, '<p class="a-completer">$1');
  });
  if (PREVIEW) console.log("[blog] Mode aperçu : les brouillons sont construits (noindex, hors sitemap).");

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
