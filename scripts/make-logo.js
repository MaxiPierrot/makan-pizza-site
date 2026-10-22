// Dérive de logo.png (non modifié) des copies rognées et légères pour le site.
// À relancer si le logo change : node scripts/make-logo.js
const sharp = require('sharp');
const dir = 'src/assets/images';

(async () => {
  const trimmed = await sharp(`${dir}/logo.png`).trim({ threshold: 10 }).toBuffer();
  await sharp(trimmed)
    .resize({ width: 260 })
    .webp({ quality: 90 })
    .toFile(`${dir}/logo-trim.webp`);
  // Emblème seul (sans le texte), en traits clairs, pour le filigrane du hero.
  // Le texte "MAKAN PIZZA" commence après la première ligne vide sous l'emblème.
  const { data, info } = await sharp(trimmed).raw().toBuffer({ resolveWithObject: true });
  const rowHasInk = (y) => {
    for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * info.channels + 3] > 40) return true;
    return false;
  };
  let y = 1;
  while (rowHasInk(y)) y++;
  let minX = info.width, maxX = 0;
  for (let r = 1; r < y; r++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(r * info.width + x) * info.channels + 3] > 40) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
    }
  }
  // Traits crème sur fond transparent : l'opacité vient de l'obscurité du trait d'origine.
  const emblem = await sharp(trimmed)
    .extract({ left: minX, top: 1, width: maxX - minX + 1, height: y - 1 })
    .resize({ width: 380 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(emblem.info.width * emblem.info.height * 4);
  for (let i = 0, j = 0; i < emblem.data.length; i += emblem.info.channels, j += 4) {
    const a = emblem.data[i + 3];
    const dark = 255 - (emblem.data[i] + emblem.data[i + 1] + emblem.data[i + 2]) / 3;
    px[j] = 243; px[j + 1] = 233; px[j + 2] = 216;
    px[j + 3] = Math.round((a / 255) * Math.min(255, Math.pow(dark / 255, 1.6) * 357));
  }
  await sharp(px, { raw: { width: emblem.info.width, height: emblem.info.height, channels: 4 } })
    .webp({ quality: 50, alphaQuality: 60 })
    .toFile(`${dir}/emblem-filigrane.webp`);

  // Image de partage 1200x630 : logo sur fond crème (palette du site)
  const ogLogo = await sharp(trimmed).resize({ height: 500 }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f3e9d8' } })
    .composite([{ input: ogLogo, gravity: 'center' }])
    .jpeg({ quality: 88 })
    .toFile(`${dir}/og-makan-pizza.jpg`);

  await sharp(trimmed)
    .resize({ width: 224, height: 224, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${dir}/favicon.png`);
})();
