import { assetUrl, assets, byId } from "./assets.js";

export const exportConfig = {
  width: 1920,
  height: 1080,
  renderScale: 2,
  maxBytes: 20 * 1024 * 1024,
  preferredFormat: "image/png",
  fallbackFormat: "image/png",
  qualitySteps: [0.92, 0.86, 0.8, 0.72],
  reducedScale: 0.86
};

export async function exportReleaseSheet(character) {
  const canvas = document.createElement("canvas");
  canvas.width = exportConfig.width * exportConfig.renderScale;
  canvas.height = exportConfig.height * exportConfig.renderScale;
  const ctx = canvas.getContext("2d");
  ctx.scale(exportConfig.renderScale, exportConfig.renderScale);

  await drawSheet(ctx, character, exportConfig.width, exportConfig.height);

  let outputCanvas = scaleCanvas(canvas, 1 / exportConfig.renderScale);
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
  const extension = exportConfig.fallbackFormat === "image/webp"
    ? "webp"
    : exportConfig.fallbackFormat === "image/png"
      ? "png"
      : "jpg";
  return { blob, extension };
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
  ctx.fillStyle = "#101722";
  ctx.fillRect(0, 0, width, height);
  await drawTextBlock(ctx, character);
  const cardCanvas = await renderCanonicalPhone(character);
  const cardHeight = 1016;
  const cardWidth = Math.round(cardHeight * (cardCanvas.width / cardCanvas.height));
  const cardX = width - cardWidth - 54;
  const cardY = Math.round((height - cardHeight) / 2);
  roundRect(ctx, cardX - 8, cardY - 8, cardWidth + 16, cardHeight + 16, 18, "#05070c", "rgba(255,255,255,.14)");
  ctx.drawImage(cardCanvas, cardX, cardY, cardWidth, cardHeight);
}

async function drawTextBlock(ctx, character) {
  const x = 76;
  const maxWidth = 1080;
  ctx.fillStyle = "#f4f8ff";
  ctx.font = "900 54px Roboto, Arial";
  ctx.fillText(character.identity.name.toUpperCase(), x, 82);
  ctx.fillStyle = "#c8d4f2";
  ctx.font = "28px Roboto, Arial";
  ctx.fillText(character.identity.title, x, 125);

  let y = 184;
  sectionTitle(ctx, "Description", x, y);
  y = wrapText(ctx, character.identity.description, x, y + 40, maxWidth, 31, "24px Roboto, Arial", "#eef4ff") + 34;

  const traits = character.traits.map((id) => byId("traits", id)).filter(Boolean);
  if (character.customTrait?.enabled) {
    const icon = byId("traits", character.customTrait.iconId);
    traits.unshift({ label: character.customTrait.name || "Custom Trait", src: character.customTrait.src || icon?.src || "" });
  }
  if (traits.length) {
    sectionTitle(ctx, "Traits", x, y);
    y += 40;
    for (const trait of traits.slice(0, 6)) {
      if (trait.src) await drawImageSafe(ctx, assetUrl(trait.src), x, y - 25, 36, 36, true);
      ctx.fillStyle = "#f4f8ff";
      ctx.font = "700 21px Roboto, Arial";
      ctx.fillText(trait.label, x + 50, y);
      y += 45;
    }
    y += 20;
  }

  const abilities = [character.abilities.active, character.abilities.passive]
    .filter((ability) => ability?.name || ability?.description || ability?.src || ability?.iconId);
  if (abilities.length) {
    sectionTitle(ctx, "Abilities", x, y);
    y += 42;
    for (const ability of abilities) y = await abilityCard(ctx, ability, y, x, maxWidth) + 18;
  }
}

function sectionTitle(ctx, text, x, y) {
  ctx.fillStyle = "#ffd56d";
  ctx.font = "900 30px Roboto, Arial";
  ctx.fillText(text, x, y);
}

async function abilityCard(ctx, ability, y, x = 64, width = 850) {
  const descriptionLines = wrappedLines(ctx, ability.description, width - 154, "21px Roboto, Arial");
  const cardHeight = Math.max(112, 74 + descriptionLines.length * 26);
  roundRect(ctx, x, y, width, cardHeight, 12, "rgba(3, 9, 18, .38)", "rgba(214, 163, 74, .78)");
  const icon = byId("abilities", ability.iconId);
  const iconSrc = ability.src || icon?.src;
  if (iconSrc) await circleImage(ctx, assetUrl(iconSrc), x + 16, y + 20, 72);
  ctx.fillStyle = "#f4f8ff";
  ctx.font = "800 25px Roboto, Arial";
  ctx.fillText(ability.name || "Ability", x + 108, y + 41);
  drawWrappedLines(ctx, descriptionLines, x + 108, y + 70, 26, "21px Roboto, Arial", "#eef4ff");
  return y + cardHeight;
}

async function drawPhoneLikeCard(ctx, character, x, y, w, h) {
  const ix = x;
  const iy = y;
  const iw = w;
  const ih = h;
  const hudH = 430;
  const overlap = 82;
  const sceneH = ih - hudH + overlap;

  const bg = byId("backgrounds", character.scene.backgroundId);
  const portrait = byId("portraits", character.scene.portraitId);
  const active = byId("abilities", character.abilities.active.iconId);
  const passive = byId("abilities", character.abilities.passive.iconId);
  const backgroundSrc = character.scene.backgroundSrc || bg?.src;
  const portraitSrc = character.scene.portraitSrc || portrait?.src;
  const activeSrc = character.abilities.active.src || active?.src;
  const passiveSrc = character.abilities.passive.src || passive?.src;
  const allegiance = byId("allegiances", character.identity.allegianceId);
  const selectedTraits = character.traits.map((id) => byId("traits", id)).filter(Boolean);
  const customTraitIcon = byId("traits", character.customTrait?.iconId);
  const customTrait = character.customTrait?.enabled
    ? { src: character.customTrait.src || customTraitIcon?.src || "" }
    : null;
  const displayedTraits = customTrait
    ? [customTrait, ...selectedTraits.slice(0, 5)]
    : selectedTraits.slice(0, 6);

  ctx.save();
  ctx.beginPath();
  ctx.rect(ix, iy, iw, ih);
  ctx.clip();
  await drawCover(ctx, assetUrl(backgroundSrc), ix, iy, iw, sceneH);
  drawGroundShadow(ctx, character.scene.lighting, ix, iy, iw, sceneH);
  const portraitLayer = await renderLitPortrait(
    assetUrl(portraitSrc),
    character.scene.portrait,
    character.scene.lighting,
    iw,
    sceneH
  );
  ctx.drawImage(portraitLayer, ix, iy);
  if (allegiance?.src) await portraitRailBadge(ctx, assetUrl(allegiance.src), ix + 10, iy + 12, 43);
  for (let index = 0; index < displayedTraits.length; index += 1) {
    const trait = displayedTraits[index];
    if (!trait?.src) continue;
    await portraitRailBadge(ctx, assetUrl(trait.src), ix + iw - 53, iy + 12 + index * 50, 43);
  }
  await drawHudCanvas(ctx, character, ix, iy + ih - hudH, iw, hudH, activeSrc, passiveSrc);
  ctx.restore();
}

async function renderCanonicalPhone(character) {
  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = 474 * scale;
  canvas.height = 948 * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  await drawPhoneLikeCard(ctx, character, 0, 0, 474, 948);
  return canvas;
}

async function drawHudCanvas(ctx, character, x, y, w, h, activeSrc, passiveSrc) {
  const rarityGradient = createRarityGradient(ctx, character.identity.rarity, x, x + w);
  hudFramePath(ctx, x, y, w, h, true);
  ctx.fillStyle = "rgba(3, 14, 26, .98)";
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = "rgba(84, 239, 255, .14)";
  ctx.lineWidth = 1;
  for (let lineY = y + 12.5; lineY < y + h; lineY += 14) {
    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + w, lineY);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(78, 167, 200, .11)";
  for (let gx = x - 100; gx < x + w + 100; gx += 86) {
    ctx.beginPath();
    ctx.moveTo(gx, y + 144);
    ctx.lineTo(gx + 210, y + h);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = rarityGradient;
  ctx.lineWidth = 2.6;
  hudFramePath(ctx, x, y, w, h, false);
  ctx.stroke();

  await abilityCircle(ctx, assetUrl(activeSrc), x + 8, y + 56, 78, character.abilities.active.position, rarityGradient);
  await abilityCircle(ctx, assetUrl(passiveSrc), x + w - 86, y + 56, 78, character.abilities.passive.position, rarityGradient);

  ctx.fillStyle = "rgba(48, 95, 156, .86)";
  ctx.strokeStyle = rarityGradient;
  ctx.lineWidth = 2.6;
  ctx.fillRect(x + 96, y + 58, w - 192, 58);
  ctx.strokeRect(x + 96, y + 58, w - 192, 58);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x + 96, y + 58, w - 192, 58);
  ctx.clip();
  centerText(ctx, character.identity.name.toUpperCase(), x + w / 2, y + 86, "800 21px Roboto, Arial", "#fff");
  centerText(ctx, character.identity.title, x + w / 2, y + 106, "11px Roboto, Arial", "#d4d8f5");
  ctx.restore();

  const star = assets.rankIcons[character.identity.rarity];
  if (star) {
    const offsets = star.count === 1 ? [0] : star.count === 2 ? [-14, 14] : star.count === 3 ? [-28, 0, 28] : [-42, -14, 14, 42];
    for (const offset of offsets) await drawImageSafe(ctx, assetUrl(star.src), x + w / 2 - 24 + offset, y + 18, 48, 48, true);
  }

  pointedBar(ctx, x + 32, y + 154, w - 64, 24, character.progress.xpText);

  let sx = x + 34;
  for (const slot of character.equipment) {
    const item = byId("equipment", slot.id);
    await hexSlot(ctx, sx, y + 192, 62, item ? assetUrl(item.src) : "");
    sx += 68;
  }

  await statCell(ctx, x + 242, y + 192, assets.statIcons.health, character.stats.health, 97);
  await statCell(ctx, x + 343, y + 192, assets.statIcons.armor, character.stats.armor, 97);
  await statCell(ctx, x + 242, y + 231, assets.statIcons.damage, character.stats.damage, 97);
  await statCell(ctx, x + 343, y + 231, assets.statIcons.move, character.stats.move, 97);

  const unlockLines = wrappedLines(ctx, character.identity.unlock, 176, "13px Roboto, Arial");
  const unlockHeight = Math.max(72, 62 + Math.max(0, unlockLines.length - 1) * 15);
  ctx.fillStyle = "rgba(20, 31, 55, .82)";
  ctx.fillRect(x + 34, y + 259, 198, unlockHeight);
  ctx.strokeStyle = "rgba(139, 171, 225, .42)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 34.5, y + 259.5, 197, unlockHeight - 1);
  ctx.fillStyle = "#c8d5ff";
  ctx.font = "15px Trebuchet MS, Arial";
  ctx.fillText("UNLOCK", x + 45, y + 281);
  ctx.fillStyle = "#fff";
  ctx.font = "18px Trebuchet MS, Arial";
  drawWrappedLines(ctx, unlockLines, x + 45, y + 305, 15, "13px Roboto, Arial", "#fff");

  if (character.attacks.melee.type) await attackCell(ctx, x + 242, y + 272, "melee", character.attacks.melee.type, character.attacks.melee.hits, 198);
  if (character.attacks.ranged.type) await attackCell(ctx, x + 242, y + 311, "ranged", character.attacks.ranged.type, character.attacks.ranged.hits, 198);
  await critCell(ctx, x + 242, y + 352, assets.statIcons.crit, character.crit.value, character.crit.chance, 198);
  await critCell(ctx, x + 242, y + 391, assets.statIcons.block, character.block.value, character.block.chance, 198);
}

function hudFramePath(ctx, x, y, w, h, close) {
  ctx.beginPath();
  ctx.moveTo(x + 10, y + h);
  ctx.lineTo(x + 10, y + 144);
  ctx.lineTo(x + 54, y + 144);
  ctx.arcTo(x + 96, y + 144, x + 96, y + 102, 42);
  ctx.lineTo(x + 96, y + 58);
  ctx.lineTo(x + w - 96, y + 58);
  ctx.lineTo(x + w - 96, y + 102);
  ctx.arcTo(x + w - 96, y + 144, x + w - 54, y + 144, 42);
  ctx.lineTo(x + w - 10, y + 144);
  ctx.lineTo(x + w - 10, y + h);
  if (close) ctx.closePath();
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
  ctx.lineWidth = 2.5;
  ctx.fill();
  ctx.stroke();
  if (src) {
    const artSize = 36;
    await drawImageSafe(ctx, src, x + (size - artSize) / 2, y + (size - artSize) / 2, artSize, artSize, true);
  }
}

async function statCell(ctx, x, y, icon, value, width = 100) {
  ctx.fillStyle = "rgba(22, 31, 52, .92)";
  ctx.strokeStyle = "rgba(139,171,225,.45)";
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, width, 35);
  ctx.strokeRect(x, y, width, 35);
  await drawImageSafe(ctx, assetUrl(icon), x + 8, y + 7, 25, 25);
  ctx.fillStyle = "#fff";
  ctx.font = "17px Roboto, Arial";
  ctx.fillText(String(value), x + 38, y + 24);
}

async function attackCell(ctx, x, y, kind, type, hits, width = 204) {
  const fill = ctx.createLinearGradient(x, y, x + width, y);
  fill.addColorStop(0, "rgba(15, 25, 42, .94)");
  fill.addColorStop(1, "rgba(38, 55, 88, .78)");
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, 35);
  ctx.strokeStyle = "rgba(139, 171, 225, .4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + .5, y + .5, width - 1, 34);
  const categoryIcon = kind === "melee" ? assets.statIcons.melee : assets.statIcons.ranged2;
  await drawImageSafe(ctx, assetUrl(categoryIcon), x + 7, y + 6, 23, 23);
  await drawImageSafe(ctx, assetUrl(assets.damageIcons[type]), x + 34, y + 6, 23, 23);
  ctx.fillStyle = type === "Power" ? "#53efff" : "#ffd56d";
  ctx.font = "19px Roboto, Arial";
  ctx.fillText(type.toUpperCase(), x + 62, y + 25);
  await drawImageSafe(ctx, assetUrl(assets.statIcons.hits), x + width - 38, y + 7, 20, 20);
  ctx.fillStyle = "#fff";
  ctx.fillText(String(hits), x + width - 17, y + 25);
}

async function critCell(ctx, x, y, icon, value, chance, width = 204) {
  ctx.fillStyle = "rgba(22, 31, 52, .92)";
  ctx.fillRect(x, y, width, 35);
  await drawImageSafe(ctx, assetUrl(icon), x + 9, y + 6, 25, 25);
  ctx.fillStyle = "#fff";
  ctx.font = "17px Roboto, Arial";
  ctx.fillText(String(value), x + 40, y + 24);
  await drawImageSafe(ctx, assetUrl(assets.statIcons.chance), x + width - 58, y + 7, 21, 21);
  ctx.fillText(String(chance), x + width - 34, y + 24);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
  const lines = wrappedLines(ctx, text, maxWidth, font);
  drawWrappedLines(ctx, lines, x, y, lineHeight, font, color);
  return y + lines.length * lineHeight;
}

function wrappedLines(ctx, text, maxWidth, font) {
  ctx.font = font;
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrappedLines(ctx, lines, x, y, lineHeight, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
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

async function drawPortrait(ctx, src, position = {}, x, y, w, h) {
  const img = await loadImage(src);
  const zoom = Number(position.zoom || 100) / 100;
  const boxW = w * zoom;
  const boxH = h * zoom;
  const boxX = x + (w - boxW) / 2;
  const shiftY = ((Number(position.focalY ?? 50) - 50) / 200) * h;
  const boxY = y + (h - boxH) / 2 + shiftY;
  const scale = Math.min(boxW / img.width, boxH / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const freeX = boxW - dw;
  const focalX = Number(position.focalX ?? 50) / 100;
  ctx.drawImage(img, boxX + freeX * focalX, boxY + (boxH - dh) / 2, dw, dh);
}

async function renderLitPortrait(src, position, lighting = {}, width, height) {
  const portrait = document.createElement("canvas");
  portrait.width = width;
  portrait.height = height;
  const portraitCtx = portrait.getContext("2d");
  await drawPortrait(portraitCtx, src, position, 0, 0, width, height);

  if (lighting.tintEnabled !== false && Number(lighting.tintStrength) > 0) {
    const tint = solidMaskedLayer(portrait, lighting.tintColor || "#000000", Number(lighting.tintStrength) / 100);
    compositeLayer(portraitCtx, tint, "color");
  }

  if (lighting.lightEnabled !== false && Number(lighting.lightStrength) > 0) {
    const light = gradientMaskedLayer(
      portrait,
      lighting.lightColor || "#ffffff",
      Number(lighting.lightStrength) / 100,
      Number(lighting.lightAngle || 0),
      true
    );
    compositeLayer(portraitCtx, light, "screen");
  }

  if (lighting.shadowEnabled !== false && Number(lighting.shadowStrength) > 0) {
    const shadow = gradientMaskedLayer(
      portrait,
      lighting.shadowColor || "#000000",
      Number(lighting.shadowStrength) / 100,
      Number(lighting.shadowAngle || 0),
      false
    );
    compositeLayer(portraitCtx, shadow, "multiply");
  }

  return portrait;
}

function solidMaskedLayer(mask, color, opacity) {
  const layer = document.createElement("canvas");
  layer.width = mask.width;
  layer.height = mask.height;
  const ctx = layer.getContext("2d");
  ctx.globalAlpha = clamp01(opacity);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, layer.width, layer.height);
  applyAlphaMask(ctx, mask);
  return layer;
}

function gradientMaskedLayer(mask, color, opacity, angle, light) {
  const layer = document.createElement("canvas");
  layer.width = mask.width;
  layer.height = mask.height;
  const ctx = layer.getContext("2d");
  const radians = (angle - 90) * Math.PI / 180;
  const distance = Math.abs(layer.width * Math.cos(radians)) + Math.abs(layer.height * Math.sin(radians));
  const cx = layer.width / 2;
  const cy = layer.height / 2;
  const dx = Math.cos(radians) * distance / 2;
  const dy = Math.sin(radians) * distance / 2;
  const gradient = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(light ? 0.25 : 0.3, "rgba(0,0,0,0)");
  gradient.addColorStop(1, color);
  ctx.globalAlpha = clamp01(opacity);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, layer.width, layer.height);
  applyAlphaMask(ctx, mask);
  return layer;
}

function applyAlphaMask(ctx, mask) {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(mask, 0, 0);
  ctx.globalCompositeOperation = "source-over";
}

function compositeLayer(ctx, layer, mode) {
  ctx.save();
  ctx.globalCompositeOperation = mode;
  ctx.drawImage(layer, 0, 0);
  ctx.restore();
}

function drawGroundShadow(ctx, lighting = {}, x, y, width, height) {
  if (lighting.groundEnabled === false || Number(lighting.groundStrength) <= 0) return;
  const size = Math.max(0, Number(lighting.groundSize || 100)) / 100;
  const ellipseWidth = width * 0.46 * size;
  const ellipseHeight = Math.max(12, ellipseWidth * 0.16);
  const centerX = x + width / 2 + Number(lighting.groundOffsetX || 0);
  const centerY = y + height * 0.91 + Number(lighting.groundOffsetY || 0);
  ctx.save();
  ctx.globalAlpha = clamp01(Number(lighting.groundStrength || 0) / 100);
  ctx.filter = `blur(${Math.max(0, Number(lighting.groundBlur || 0))}px)`;
  ctx.fillStyle = lighting.groundColor || "#000000";
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, ellipseWidth / 2, ellipseHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
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

async function abilityCircle(ctx, src, x, y, size, position = {}, strokeStyle = "#f5fbff") {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 3, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#07101a";
  ctx.fillRect(x, y, size, size);
  if (src) {
    const img = await loadImage(src);
    const zoom = Number(position?.zoom || 100) / 100;
    const base = size - 8;
    const dw = base * zoom;
    const dh = base * zoom;
    const dx = x + size / 2 - dw / 2 + Number(position?.x || 0);
    const dy = y + size / 2 - dh / 2 + Number(position?.y || 0);
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  ctx.restore();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 1.5, 0, Math.PI * 2);
  ctx.stroke();
}

async function portraitRailBadge(ctx, src, x, y, size) {
  const ring = ctx.createLinearGradient(x, y, x, y + size);
  ring.addColorStop(0, "#fff8c9");
  ring.addColorStop(.18, "#d6a33f");
  ring.addColorStop(.42, "#6f4720");
  ring.addColorStop(.65, "#ffdfa0");
  ring.addColorStop(1, "#3b2416");
  ctx.save();
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#061018";
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 3, 0, Math.PI * 2);
  ctx.clip();
  await drawImageSafe(ctx, src, x + 4, y + 4, size - 8, size - 8, true);
  ctx.restore();
  ctx.strokeStyle = "#1c120b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - .5, 0, Math.PI * 2);
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

async function drawImageSafe(ctx, src, x, y, w, h, preserveAspect = false) {
  try {
    const img = await loadImage(src);
    if (preserveAspect) {
      const scale = Math.min(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    } else {
      ctx.drawImage(img, x, y, w, h);
    }
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
