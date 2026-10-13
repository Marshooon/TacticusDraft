import { assetUrl, assets, byId } from "./assets.js";

export function renderCharacterScreen(root, character) {
  const bg = byId("backgrounds", character.scene.backgroundId);
  const portrait = byId("portraits", character.scene.portraitId);
  const active = byId("abilities", character.abilities.active.iconId);
  const passive = byId("abilities", character.abilities.passive.iconId);
  const backgroundSrc = character.scene.backgroundSrc || bg?.src;
  const portraitSrc = character.scene.portraitSrc || portrait?.src;
  const activeSrc = character.abilities.active.src || active?.src;
  const passiveSrc = character.abilities.passive.src || passive?.src;
  const selectedTraits = character.traits.map((id) => byId("traits", id)).filter(Boolean);
  const rarity = assets.rankIcons[character.identity.rarity] || assets.rankIcons.legendary;
  const allegiance = byId("allegiances", character.identity.allegianceId);
  const rarityKey = character.identity.rarity || "legendary";

  root.classList.remove("rarity-common", "rarity-uncommon", "rarity-rare", "rarity-epic", "rarity-legendary");
  root.classList.add(`rarity-${rarityKey}`);

  root.innerHTML = `
    <section class="scene-layer">
      <img class="scene-bg" src="${assetUrl(backgroundSrc)}" alt="" />
      <img class="portrait" src="${assetUrl(portraitSrc)}" alt="${escapeHtml(character.identity.name)}" />
      <div class="portrait-tint"></div>
      <div class="portrait-light"></div>
      <div class="portrait-shadow"></div>
      <div class="scene-vignette"></div>
    </section>
    <div class="portrait-rail left">
      ${allegiance ? `<span class="allegiance-dot"><img src="${assetUrl(allegiance.src)}" alt="${escapeHtml(allegiance.label)}" /></span>` : ""}
    </div>
    <div class="portrait-rail right">
      ${selectedTraits.map((trait) => `<span class="trait-dot"><img src="${assetUrl(trait.src)}" alt="${escapeHtml(trait.label)}" /></span>`).join("")}
    </div>
    <section class="hud">
      <div class="hud-inner rarity-${rarityKey}">
        ${renderHudFrame()}
        <div class="rank-row">${renderStars(rarity)}</div>
        <div class="ability-button active" tabindex="0">
          ${activeSrc ? `<img class="ability-icon" src="${assetUrl(activeSrc)}" alt="${escapeHtml(character.abilities.active.name)}" />` : ""}
          ${renderTooltip(character.abilities.active.name, character.abilities.active.description)}
        </div>
        <div class="ability-button passive" tabindex="0">
          ${passiveSrc ? `<img class="ability-icon" src="${assetUrl(passiveSrc)}" alt="${escapeHtml(character.abilities.passive.name)}" />` : ""}
          ${renderTooltip(character.abilities.passive.name, character.abilities.passive.description)}
        </div>
        <div class="hud-sparks" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="identity-band" tabindex="0">
          <div class="char-name">${escapeHtml(character.identity.name)}</div>
          <div class="char-title">${escapeHtml(character.identity.title)}</div>
        </div>
        ${renderTooltip(character.identity.name, character.identity.description, "character-detail")}
        <div class="xp-bar">
          ${renderXpBar()}
          <div class="xp-text">${escapeHtml(character.progress.xpText)}</div>
        </div>
        <div class="hud-content">
          <div>
            <div class="equip-row">${character.equipment.map((slot) => renderEquipment(slot.id)).join("")}</div>
            <div class="unlock-card"><strong>Unlock</strong>${escapeHtml(character.identity.unlock)}</div>
          </div>
          <div>
            <div class="stat-grid">
              ${renderStat("health", character.stats.health)}
              ${renderStat("armor", character.stats.armor)}
              ${renderStat("damage", character.stats.damage)}
              ${renderStat("move", character.stats.move)}
            </div>
            <div class="attack-stack">
              ${renderAttack("melee", character.attacks.melee)}
              ${renderAttack("ranged", character.attacks.ranged)}
            </div>
            <div class="crit-stack">
              ${renderCrit("crit", character.crit)}
              ${renderCrit("block", character.block)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  root.style.setProperty("--portrait-zoom", character.scene.portrait.zoom / 100);
  root.style.setProperty("--portrait-x", `${character.scene.portrait.focalX}%`);
  root.style.setProperty("--portrait-y", `${character.scene.portrait.focalY}%`);
  const lighting = character.scene.lighting || {};
  root.style.setProperty("--tint-color", lighting.tintEnabled === false ? "transparent" : lighting.tintColor || "transparent");
  root.style.setProperty("--tint-strength", `${Number(lighting.tintStrength || 0) / 100}`);
  root.style.setProperty("--light-color", lighting.lightEnabled === false ? "transparent" : lighting.lightColor || "transparent");
  root.style.setProperty("--light-strength", `${Number(lighting.lightStrength || 0) / 100}`);
  root.style.setProperty("--light-angle", `${lighting.lightAngle || 0}deg`);
  root.style.setProperty("--shadow-color", lighting.shadowEnabled === false ? "transparent" : lighting.shadowColor || "transparent");
  root.style.setProperty("--shadow-strength", `${Number(lighting.shadowStrength || 0) / 100}`);
  root.style.setProperty("--shadow-angle", `${lighting.shadowAngle || 0}deg`);
  const activePosition = character.abilities.active.position || { x: 0, y: 0, zoom: 100 };
  const passivePosition = character.abilities.passive.position || { x: 0, y: 0, zoom: 100 };
  root.style.setProperty("--active-icon-transform", `translate(${activePosition.x}px, ${activePosition.y}px) scale(${activePosition.zoom / 100})`);
  root.style.setProperty("--passive-icon-transform", `translate(${passivePosition.x}px, ${passivePosition.y}px) scale(${passivePosition.zoom / 100})`);
}

function renderTooltip(title, body, extraClass = "") {
  if (!title && !body) return "";
  return `<div class="detail-tooltip ${extraClass}" role="tooltip"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div>`;
}

function renderHudFrame() {
  return `
    <svg class="hud-frame" viewBox="0 0 474 430" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="hudStroke" x1="0" x2="1">
          <stop offset="0" stop-color="var(--rarity-stop-1)" />
          <stop offset="0.3" stop-color="var(--rarity-stop-2)" />
          <stop offset="0.6" stop-color="var(--rarity-stop-3)" />
          <stop offset="0.85" stop-color="var(--rarity-stop-4)" />
          <stop offset="1" stop-color="var(--rarity-stop-5)" />
        </linearGradient>
        <pattern id="hudLines" width="474" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 12.5 H474" stroke="#54efff" stroke-opacity=".23" stroke-width="1" />
        </pattern>
      </defs>
      <path class="hud-bg" d="M10 430 V144 H54 A42 42 0 0 0 96 102 V58 H378 V102 A42 42 0 0 0 420 144 H464 V430 Z" />
      <path class="hud-texture" d="M10 430 V144 H54 A42 42 0 0 0 96 102 V58 H378 V102 A42 42 0 0 0 420 144 H464 V430 Z" fill="url(#hudLines)" />
      <path class="hud-stroke" d="M10 430 V144 H54 A42 42 0 0 0 96 102 V58 H378 V102 A42 42 0 0 0 420 144 H464 V430" />
    </svg>
  `;
}

function renderXpBar() {
  return `
    <svg class="xp-svg" viewBox="0 0 402 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M14 3 H388 L399 12 L388 21 H14 L3 12 Z" fill="#35241b" stroke="#d4a163" stroke-width="3" />
      <path d="M18 6 H384 L393 12 L384 18 H18 L9 12 Z" fill="#43ddec" />
    </svg>
  `;
}

function renderStars(rarity) {
  const offsets = starOffsets(rarity.count);
  return offsets.map((offset, index) => `
    <img class="rank-star" src="${assetUrl(rarity.src)}" alt="" style="transform: translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)); z-index:${10 + index};" />
  `).join("");
}

function starOffsets(count) {
  if (count === 1) return [{ x: 0, y: 0 }];
  if (count === 2) return [{ x: -9, y: 0 }, { x: 9, y: 0 }];
  if (count === 3) return [{ x: -18, y: 0 }, { x: 0, y: 0 }, { x: 18, y: 0 }];
  return [{ x: -27, y: 0 }, { x: -9, y: 0 }, { x: 9, y: 0 }, { x: 27, y: 0 }];
}

function renderEquipment(id) {
  const item = byId("equipment", id);
  return `
    <div class="equip-slot">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 L58 18 V46 L32 61 L6 46 V18 Z" fill="#07131f" stroke="#65efff" stroke-width="4" />
        <path d="M32 6 L55 20 V44 L32 58 L9 44 V20 Z" fill="none" stroke="#ffe9c3" stroke-width="2" />
      </svg>
      ${item?.src ? `<img class="equip-icon" src="${assetUrl(item.src)}" alt="${escapeHtml(item.label)}" />` : ""}
    </div>
  `;
}

function renderStat(key, value) {
  return `<div class="stat-cell"><img src="${assetUrl(assets.statIcons[key])}" alt="" /><span>${escapeHtml(value)}</span></div>`;
}

function renderAttack(kind, attack) {
  const pattern = kind === "melee" ? assets.statIcons.melee : assets.statIcons.ranged2;
  const damageIcon = assets.damageIcons[attack.type];
  return `
    <div class="attack-row">
      <span class="attack-icons"><img src="${assetUrl(pattern)}" alt="" /><img src="${assetUrl(damageIcon)}" alt="" /></span>
      <span class="attack-label">${escapeHtml(attack.type)}</span>
      <span class="attack-hits"><img src="${assetUrl(assets.statIcons.hits)}" alt="" />${escapeHtml(attack.hits)}</span>
    </div>
  `;
}

function renderCrit(kind, value) {
  const icon = kind === "crit" ? assets.statIcons.crit : assets.statIcons.block;
  return `
    <div class="crit-row">
      <span class="crit-side"><img src="${assetUrl(icon)}" alt="" />${escapeHtml(value.value)}</span>
      <span class="crit-side"><img src="${assetUrl(assets.statIcons.chance)}" alt="" />${escapeHtml(value.chance)}</span>
    </div>
  `;
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
