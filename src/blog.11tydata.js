// La page /blog n'existe que s'il y a au moins un article visible
// (publié, ou brouillon en mode aperçu). Lecture directe des en-têtes des articles.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { isVisible } = require("../lib/blog");

const dir = path.join(__dirname, "blog", "articles");
const hasArticles = () =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .some((f) => isVisible(matter(fs.readFileSync(path.join(dir, f), "utf8")).data));

module.exports = {
  permalink: () => (hasArticles() ? "/blog.html" : false),
};
