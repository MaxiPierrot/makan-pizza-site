// Génère les vignettes de 600 px (liste du blog) et les versions de 1000 px (mobile) à partir des photos WebP de src/assets/images/blog.
// Usage : node scripts/blog-vignettes.js
const sharp = require("sharp");
const fs = require("fs");
const dir = "src/assets/images/blog";

(async () => {
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".webp") && !/-(600|1000)\.webp$/.test(n))) {
    const out = f.replace(".webp", "-600.webp");
    await sharp(`${dir}/${f}`).resize({ width: 600 }).webp({ quality: 72 }).toFile(`${dir}/${out}`);
    await sharp(`${dir}/${f}`).resize({ width: 1000 }).webp({ quality: 74 }).toFile(`${dir}/${f.replace(".webp", "-1000.webp")}`);
    console.log(out);
  }
})();
