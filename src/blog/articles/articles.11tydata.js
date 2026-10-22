const { isVisible, isPublished } = require("../../../lib/blog");

module.exports = {
  layout: "article.njk",
  eleventyComputed: {
    permalink: (d) => (isVisible(d) ? `/blog/${d.page.fileSlug}.html` : false),
    eleventyExcludeFromCollections: (d) => !isVisible(d),
    path: (d) => `/blog/${d.page.fileSlug}`,
    title: (d) => `${d.titre} | Makan Pizza`,
    h1: (d) => d.titre,
    crumb: (d) => d.titre,
    crumbParent: () => ({ label: "Blog", href: "/blog" }),
    ogType: () => "article",
    brouillon: (d) => !isPublished(d),
    noindex: (d) => !isPublished(d),
  },
};
