// Refait le PDF des CGV à partir de la page /cgv : npm run cgv-pdf
// Construit le site dans un dossier temporaire, le sert en local, puis l'imprime avec Chrome sans fenêtre.
// À lancer après chaque modification de src/cgv.njk (ou des dates de l'offre dans prix.js).
const { execFile, execFileSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");

const racine = path.join(__dirname, "..");
const sortie = fs.mkdtempSync(path.join(os.tmpdir(), "makan-cgv-"));
const pdf = path.join(racine, "src/assets/docs/cgv-makan-pizza.pdf");
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };

execFileSync(path.join(racine, "node_modules/.bin/eleventy"), [`--output=${sortie}`, "--quiet"], { cwd: racine, stdio: "inherit" });

const serveur = http.createServer((req, res) => {
  let f = path.join(sortie, decodeURIComponent(req.url.split("?")[0]));
  if (!path.extname(f)) f += ".html";
  if (!f.startsWith(sortie) || !fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
  res.setHeader("Content-Type", types[path.extname(f)] || "application/octet-stream");
  fs.createReadStream(f).pipe(res);
});

// execFile asynchrone : le serveur doit pouvoir répondre pendant que Chrome imprime.
serveur.listen(0, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${serveur.address().port}/cgv`;
  execFile(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${path.join(sortie, ".chrome")}`,
    "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, url], { timeout: 60000 }, (err) => {
    serveur.close();
    fs.rmSync(sortie, { recursive: true, force: true });
    if (err) { console.error("Échec de l'impression du PDF :", err.message); process.exit(1); }
    fs.chmodSync(pdf, 0o644);
    console.log(`PDF des CGV refait : ${path.relative(racine, pdf)} (${Math.round(fs.statSync(pdf).size / 1024)} Ko)`);
  });
});
