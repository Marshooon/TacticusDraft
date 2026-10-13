import { assetUrl, assets, byId } from "./assets.js";

export const exportConfig = {
  width: 1920,
  height: 1080,
  maxBytes: 20 * 1024 * 1024,
  preferredFormat: "image/png",
  fallbackFormat: "image/jpeg",
  qualitySteps: [0.92, 0.86, 0.8, 0.72],
  reducedScale: 0.86
};

export async function exportReleaseSheet(character) {
  const canvas = document.createElement("canvas");
  canvas.width = exportConfig.width;
  canvas.height = exportConfig.height;
  const ctx = canvas.getContext("2d");

  await drawSheet(ctx, character, exportConfig.width, exportConfig.height);

  let outputCanvas = canvas;
  let blob = await canvasToBlob(outputCanvas, exportConfig.preferredFormat);
  let extension = "png";
  if (blob.size > exportConfig.maxBytes) {
    ({ blob, extension } = await compressedBlob(outputCanvas));
  }

  if (blob.size > exportConfig.maxBytes) {
    outputCanvas = scaleCanvas(outputCanvas, exportConfig.reducedScale);
    ({ blob, extension } = await compressedBlob(outputCanvas));
  }

  downloadBlob(blob, `${safeFileName(character.identity.name)}_release_sheet.${extension}`);
}

async function compressedBlob(canvas) {
  let blob = null;
  for (const quality of exportConfig.qualitySteps) {
    blob = await canvasToBlob(canvas, exportConfig.fallbackFormat, quality);
    if (blob.size <= exportConfig.maxBytes) break;
  }
  return { blob, extension: exportConfig.fallbackFormat === "image/webp" ? "webp" : "jpg" };
}

function scaleCanvas(source, scale) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(source.width * scale);
  canvas.height = Math.round(source.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function drawSheet(ctx, character, width, height) {
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, width, height);
  const bgGrad = ctx.createRadialGradient(width * 0.72, 80, 0, width * 0.72, 80, 980);
  bgGrad.addColorStop(0, "rgba(87, 144, 208, .16)");
  bgGrad.addColorStop(0.45, "rgba(21, 32, 52, .28)");
  bgGrad.addColorStop(1, "rgba(3, 7, 12, 0)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  await drawTextBlock(ctx, character);
  await drawPhoneLikeCard(ctx, character, 1300, 28, 500, 1018);
}

async function drawTextBlock(ctx, character) {
  ctx.fillStyle = "#f4f8ff";
  ctx.font = "900 54px Trebuchet MS, Arial";
  ctx.fillText(character.identity.name.toUpperCase(), 64, 82);
  ctx.fillStyle = "#c8d4f2";
  ctx.font = "28px Trebuchet MS, Arial";
  ctx.fillText(character.identity.title, 64, 125);

  sectionTitle(ctx, "Description", 64, 184);
  wrapText(ctx, character.identity.description, 64, 224, 820, 31, "24px Trebuchet MS, Arial", "#eef4ff");

  sectionTitle(ctx, "Traits", 64, 342);
  let y = 382;
  for (const traitId of character.traits) {
    const trait = byId("traits", traitId);
    if (!trait) continue;
    await drawImageSafe(ctx, assetUrl(trait.src), 64, y - 25, 36, 36);
    ctx.fillStyle = "#f4f8ff";
    ctx.font = "700 21px Trebuchet MS, Arial";
    ctx.fillText(trait.label, 114, y);
    y += 48;
  }

  sectionTitle(ctx, "Abilities", 64, 565);
  y = 610;
  y = await abilityCard(ctx, character.abilities.active, y);
  await abilityCard(ctx, character.abilities.passive, y + 22);
}

function sectionTitle(ctx, text, x, y) {
  ctx.fillStyle = "#ffd56d";
  ctx.font = "900 30px Trebuchet MS, Arial";
  ctx.fillText(text, x, y);
}

async function abilityCard(ctx, ability, y) {
  roundRect(ctx, 64, y, 850, 130, 12, "rgba(3, 9, 18, .55)", "rgba(214, 163, 74, .78)");
  const icon = byId("abilities", ability.iconId);
  const iconSrc = ability.src || icon?.src;
  if (iconSrc) await circleImage(ctx, assetUrl(iconSrc), 80, y + 21, 72);
  ctx.fillStyle = "#f4f8ff";
  ctx.font = "800 25px Trebuchet MS, Arial";
  ctx.fillText(ability.name, 172, y + 43);
  wrapText(ctx, ability.description, 172, y + 72, 700, 26, "21px Trebuchet MS, Arial", "#eef4ff");
  return y + 130;
}

async function drawPhoneLikeCard(ctx, character, x, y, w, h) {
  roundRect(ctx, x, y, w, h, 22, "#05070c", "#000");
  const inset = 11;
  const ix = x + inset;
  const iy = y + inset;
  const iw = w - inset * 2;
  const ih = h - inset * 2;
  const hudH = 408;

  const bg = byId("backgrounds", character.scene.backgroundId);
  const portrait = byId("portraits", character.scene.portraitId);
  const active = byId("abilities", character.abilities.active.iconId);
  const passive = byId("abilities", character.abilities.passive.iconId);
  const backgroundSrc = character.scene.backgroundSrc || bg?.src;
  const portraitSrc = character.scene.portraitSrc || portrait?.src;
  const activeSrc = character.abilities.active.src || active?.src;
  const passiveSrc = character.abilities.passive.src || passive?.src;

  ctx.save();
  roundedClip(ctx, ix, iy, iw, ih, 14);
  await drawCover(ctx, assetUrl(backgroundSrc), ix, iy, iw, ih - hudH + 70);
  await drawContain(ctx, assetUrl(portraitSrc), ix + 6, iy + 18, iw - 12, ih - hudH + 30);
  ctx.fillStyle = "rgba(2, 8, 13, .84)";
  ctx.fillRect(ix, iy + ih - hudH, iw, hudH);
  await drawHudCanvas(ctx, character, ix, iy + ih - hudH, iw, hudH, activeSrc, passiveSrc);
  ctx.restore();
}

async function drawHudCanvas(ctx, character, x, y, w, h, activeSrc, passiveSrc) {
  const rarityGradient = createRarityGradient(ctx, character.identity.rarity, x, x + w);
  ctx.strokeStyle = rarityGradient;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x + 10, y + h - 4);
  ctx.lineTo(x + 10, y + 144);
  ctx.lineTo(x + 54, y + 144);
  ctx.quadraticCurveTo(x + 96, y + 144, x + 96, y + 102);
  ctx.lineTo(x + 96, y + 58);
  ctx.lineTo(x + w - 96, y + 58);
  ctx.lineTo(x + w - 96, y + 102);
  ctx.quadraticCurveTo(x + w - 96, y + 144, x + w - 54, y + 144);
  ctx.lineTo(x + w - 10, y + 144);
  ctx.lineTo(x + w - 10, y + h - 4);
  ctx.stroke();

  await circleImage(ctx, assetUrl(activeSrc), x + 8, y + 47, 88, 3, rarityGradient);
  await circleImage(ctx, assetUrl(passiveSrc), x + w - 96, y + 47, 88, 3, rarityGradient);

  ctx.fillStyle = "rgba(48, 95, 156, .86)";
  ctx.strokeStyle = rarityGradient;
  ctx.lineWidth = 4;
  ctx.fillRect(x + 96, y + 58, w - 192, 58);
  ctx.strokeRect(x + 96, y + 58, w - 192, 58);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x + 96, y + 58, w - 192, 58);
  ctx.clip();
  centerText(ctx, character.identity.name.toUpperCase(), x + w / 2, y + 86, "800 24px Trebuchet MS, Arial", "#fff");
  centerText(ctx, character.identity.title, x + w / 2, y + 106, "14px Trebuchet MS, Arial", "#d4d8f5");
  ctx.restore();

  const star = assets.rankIcons[character.identity.rarity];
  if (star) await drawImageSafe(ctx, assetUrl(star.src), x + w / 2 - 20, y + 4, 40, 40);

  pointedBar(ctx, x + 32, y + 154, w - 64, 24, character.progress.xpText);

  let sx = x + 34;
  for (const slot of character.equipment) {
    const item = byId("equipment", slot.id);
    await hexSlot(ctx, sx, y + 196, 64, item ? assetUrl(item.src) : "");
    sx += 78;
  }

  await statCell(ctx, x + 272, y + 196, assets.statIcons.health, character.stats.health);
  await statCell(ctx, x + 384, y + 196, assets.statIcons.armor, character.stats.armor);
  await statCell(ctx, x + 272, y + 244, assets.statIcons.damage, character.stats.damage);
  await statCell(ctx, x + 384, y + 244, assets.statIcons.move, character.stats.move);

  ctx.fillStyle = "rgba(28, 43, 74, .9)";
  ctx.fillRect(x + 34, y + 278, 222, 74);
  ctx.fillStyle = "#c8d5ff";
  ctx.font = "15px Trebuchet MS, Arial";
  ctx.fillText("UNLOCK", x + 48, y + 302);
  ctx.fillStyle = "#fff";
  ctx.font = "18px Trebuchet MS, Arial";
  ctx.fillText("Unlock requirements", x + 48, y + 330);

  await attackCell(ctx, x + 272, y + 292, "Power", character.attacks.melee.hits);
  await attackCell(ctx, x + 272, y + 338, "Melta", character.attacks.ranged.hits);
  await critCell(ctx, x + 272, y + 386, assets.statIcons.crit, character.crit.value, character.crit.chance);
  await critCell(ctx, x + 272, y + 432, assets.statIcons.block, character.block.value, character.block.chance);
}

function pointedBar(ctx, x, y, w, h, text) {
  ctx.beginPath();
  ctx.moveTo(x + 12, y + 2);
  ctx.lineTo(x + w - 12, y + 2);
  ctx.lineTo(x + w - 3, y + h / 2);
  ctx.lineTo(x + w - 12, y + h - 2);
  ctx.lineTo(x + 12, y + h - 2);
  ctx.lineTo(x + 3, y + h / 2);
  ctx.closePath();
  ctx.fillStyle = "#3dd7e8";
  ctx.strokeStyle = "#d6a263";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  centerText(ctx, text, x + w / 2, y + 16, "800 11px Trebuchet MS, Arial", "#071018");
}

async function hexSlot(ctx, x, y, size, src) {
  const r = size / 2;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + i * Math.PI / 3;
    const px = x + r + Math.cos(angle) * (r - 3);
    const py = y + r + Math.sin(angle) * (r - 3);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = "#06131f";
  ctx.strokeStyle = "#65efff";
  ctx.lineWidth = 5;
  ctx.fill();
  ctx.stroke();
  if (src) await drawImageSafe(ctx, src, x + 12, y + 12, size - 24, size - 24);
}

async function statCell(ctx, x, y, icon, value) {
  ctx.fillStyle = "rgba(22, 31, 52, .92)";
  ctx.strokeStyle = "rgba(139,171,225,.45)";
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, 100, 40);
  ctx.strokeRect(x, y, 100, 40);
  await drawImageSafe(ctx, assetUrl(icon), x + 8, y + 7, 25, 25);
  ctx.fillStyle = "#fff";
  ctx.font = "23px Trebuchet MS, Arial";
  ctx.fillText(String(value), x + 42, y + 27);
}

async function attackCell(ctx, x, y, type, hits) {
  ctx.fillStyle = "rgba(22, 31, 52, .92)";
  ctx.fillRect(x, y, 204, 38);
  await drawImageSafe(ctx, assetUrl(assets.damageIcons[type]), x + 36, y + 6, 26, 26);
  ctx.fillStyle = type === "Power" ? "#53efff" : "#ffd56d";
  ctx.font = "28px Trebuchet MS, Arial";
  ctx.fillText(type.toUpperCase(), x + 69, y + 28);
  await drawImageSafe(ctx, assetUrl(assets.statIcons.hits), x + 164, y + 8, 20, 20);
  ctx.fillStyle = "#fff";
  ctx.fillText(String(hits), x + 186, y + 28);
}

async function critCell(ctx, x, y, icon, value, chance) {
  ctx.fillStyle = "rgba(22, 31, 52, .92)";
  ctx.fillRect(x, y, 204, 38);
  await drawImageSafe(ctx, assetUrl(icon), x + 9, y + 6, 25, 25);
  ctx.fillStyle = "#fff";
  ctx.font = "24px Trebuchet MS, Arial";
  ctx.fillText(String(value), x + 42, y + 28);
  await drawImageSafe(ctx, assetUrl(assets.statIcons.chance), x + 144, y + 8, 23, 23);
  ctx.fillText(String(chance), x + 170, y + 28);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  const words = String(text).split(/\s+/);
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function centerText(ctx, text, x, y, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(String(text), x, y);
  ctx.textAlign = "left";
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  roundedPath(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function roundedClip(ctx, x, y, w, h, r) {
  roundedPath(ctx, x, y, w, h, r);
  ctx.clip();
}

function roundedPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

async function drawCover(ctx, src, x, y, w, h) {
  const img = await loadImage(src);
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

async function drawContain(ctx, src, x, y, w, h) {
  const img = await loadImage(src);
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + h - dh, dw, dh);
}

async function circleImage(ctx, src, x, y, size, ringWidth = 4, strokeStyle = "#f5fbff") {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  await drawImageSafe(ctx, src, x, y, size, size);
  ctx.restore();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = ringWidth;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2);
  ctx.stroke();
}

function createRarityGradient(ctx, rarity, x1, x2) {
  const stops = {
    common: ["#bfc2c7", "#8f949a", "#e3e5e8", "#a4a8ad", "#a4a8ad"],
    uncommon: ["#6a3f27", "#a66a44", "#7b4a2f", "#c28a5a", "#c28a5a"],
    rare: ["#f5f7fb", "#b9c1cb", "#ffffff", "#9ea7b2", "#9ea7b2"],
    epic: ["#ffe6c2", "#ffd5bc", "#ffd683", "#ffd1a6", "#ffd1a6"],
    legendary: ["#ffffff", "#5ffeff", "#ffd1f1", "#fff2b5", "#ffffff"]
  }[rarity] || ["#ffffff", "#5ffeff", "#ffd1f1", "#fff2b5", "#ffffff"];
  const gradient = ctx.createLinearGradient(x1, 0, x2, 0);
  gradient.addColorStop(0, stops[0]);
  gradient.addColorStop(0.3, stops[1]);
  gradient.addColorStop(0.6, stops[2]);
  gradient.addColorStop(0.85, stops[3]);
  gradient.addColorStop(1, stops[4]);
  return gradient;
}

async function drawImageSafe(ctx, src, x, y, w, h) {
  try {
    const img = await loadImage(src);
    ctx.drawImage(img, x, y, w, h);
  } catch {
    ctx.fillStyle = "#172033";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#ffcf70";
    ctx.strokeRect(x, y, w, h);
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function safeFileName(name) {
  return String(name || "character").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
