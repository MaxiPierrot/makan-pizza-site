// Règles de publication du blog.
// Un article n'apparaît que si sa date est passée ET validé: true.
// En mode aperçu (BLOG_PREVIEW=1, jamais sur Netlify), les brouillons sont
// construits aussi, marqués « brouillon », en noindex et hors sitemap.
const PREVIEW = process.env.BLOG_PREVIEW === "1";

const isValidated = (data) => data["validé"] === true;
const isDue = (data, now = new Date()) => new Date(data.date) <= now;
const isPublished = (data, now) => isValidated(data) && isDue(data, now);
const isVisible = (data) => PREVIEW || isPublished(data);

module.exports = { PREVIEW, isValidated, isDue, isPublished, isVisible };
