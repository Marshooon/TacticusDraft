const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const phoneRoot = document.getElementById("phoneRoot");
const rarityButtons = document.querySelectorAll("#rarityChoices .pill-btn");
const wizardTabs = document.querySelectorAll(".wizard-tab");
const wizardPanels = document.querySelectorAll(".wizard-panel");
const toggleReference = document.getElementById("toggleReference");
const openPhoneWindow = document.getElementById("openPhoneWindow");
const screenEl = document.querySelector(".screen");
const topPanel = document.querySelector(".top-panel");
const phoneLock = document.getElementById("phoneLock");
const healthInput = document.getElementById("healthInput");
const armorInput = document.getElementById("armorInput");
const damageInput = document.getElementById("damageInput");
const moveInput = document.getElementById("moveInput");
const statHealth = document.getElementById("statHealth");
const statArmor = document.getElementById("statArmor");
const statDamage = document.getElementById("statDamage");
const statMove = document.getElementById("statMove");
const meleeEnabled = document.getElementById("meleeEnabled");
const rangeEnabled = document.getElementById("rangeEnabled");
const meleeTypeSelect = document.getElementById("meleeTypeSelect");
const rangeTypeSelect = document.getElementById("rangeTypeSelect");
const rangePatternSelect = document.getElementById("rangePatternSelect");
const meleeHitsInput = document.getElementById("meleeHitsInput");
const rangeHitsInput = document.getElementById("rangeHitsInput");
const meleeAttackRow = document.getElementById("meleeAttackRow");
const rangeAttackRow = document.getElementById("rangeAttackRow");
const meleeTypeIcon = document.getElementById("meleeTypeIcon");
const rangeTypeIcon = document.getElementById("rangeTypeIcon");
const rangeKindIcon = document.getElementById("rangeKindIcon");
const meleeTypeLabel = document.getElementById("meleeTypeLabel");
const rangeTypeLabel = document.getElementById("rangeTypeLabel");
const meleeHits = document.getElementById("meleeHits");
const rangeHits = document.getElementById("rangeHits");
const critEnabled = document.getElementById("critEnabled");
const blockEnabled = document.getElementById("blockEnabled");
const critValueInput = document.getElementById("critValueInput");
const critChanceInput = document.getElementById("critChanceInput");
const blockValueInput = document.getElementById("blockValueInput");
const blockChanceInput = document.getElementById("blockChanceInput");
const critValue = document.getElementById("critValue");
const critChance = document.getElementById("critChance");
const blockValue = document.getElementById("blockValue");
const blockChance = document.getElementById("blockChance");
const critRow = document.getElementById("critRow");
const blockRow = document.getElementById("blockRow");
const DAMAGE_META = {
  Bio: { color: "#7ad383" },
  Blast: { color: "#ffb347" },
  Chain: { color: "#e0d87a" },
  Direct: { color: "#ffffff" },
  Energy: { color: "#5ad2ff" },
  Eviscerating: { color: "#ff8080" },
  Flame: { color: "#ff944d" },
  "Heavy Round": { color: "#d6c18f" },
  Las: { color: "#ffef7a" },
  Melta: { color: "#ffda7a" },
  Molecular: { color: "#c487ff" },
  Particle: { color: "#7afff4" },
  Physical: { color: "#f0f0f0" },
  Piercing: { color: "#ffb6c1" },
  Plasma: { color: "#5cf8ff" },
  Power: { color: "#8ef7ff" },
  Projectile: { color: "#d2d2d2" },
  Psychic: { color: "#c76dff" },
  Pulse: { color: "#79f0ff" },
  Toxic: { color: "#8ddf5a" }
};
const portraitUploadButton = document.getElementById("portraitUploadButton");
const portraitInput = document.getElementById("portraitInput");
const portraitImage = document.getElementById("portraitImage");
const portraitPlaceholder = document.getElementById("portraitPlaceholder");
const portraitOffsetX = document.getElementById("portraitOffsetX");
const portraitOffsetY = document.getElementById("portraitOffsetY");
const portraitZoom = document.getElementById("portraitZoom");
const bgPresetRow = document.getElementById("bgPresetRow");
const activeAbilityUploadButton = document.getElementById("activeAbilityUploadButton");
const passiveAbilityUploadButton = document.getElementById("passiveAbilityUploadButton");
const activeAbilityInput = document.getElementById("activeAbilityInput");
const passiveAbilityInput = document.getElementById("passiveAbilityInput");
const activeAbilityIcon = document.getElementById("activeAbilityIcon");
const passiveAbilityIcon = document.getElementById("passiveAbilityIcon");
const abilityOffsetX = document.getElementById("abilityOffsetX");
const abilityOffsetY = document.getElementById("abilityOffsetY");
const abilityZoom = document.getElementById("abilityZoom");
const activeTooltipInput = document.getElementById("activeTooltipInput");
const passiveTooltipInput = document.getElementById("passiveTooltipInput");
const activeTooltipTitleInput = document.getElementById("activeTooltipTitleInput");
const passiveTooltipTitleInput = document.getElementById("passiveTooltipTitleInput");
const exportButton = document.getElementById("exportButton");
const assetsFolderButton = document.getElementById("assetsFolderButton");
const assetsFolderInput = document.getElementById("assetsFolderInput");
const shapeGlowStrength = document.getElementById("shapeGlowStrength");
const previewWrap = document.querySelector(".preview");
const traitList = document.getElementById("traitList");
const traitIcons = [
  document.getElementById("previewTrait1"),
  document.getElementById("previewTrait2"),
  document.getElementById("previewTrait3"),
  document.getElementById("previewTrait4"),
  document.getElementById("previewTrait5"),
  document.getElementById("previewTrait6")
];
const traitCircles = traitIcons.map(icon => icon.parentElement);

function bindInput(input, output) {
  if (!input || !output) return;
  const update = () => {
    output.textContent = input.value || "";
  };
  input.addEventListener("input", update);
  update();
}

bindInput(nameInput, previewName);
bindInput(titleInput, previewTitle);
bindInput(healthInput, statHealth);
bindInput(armorInput, statArmor);
bindInput(damageInput, statDamage);
bindInput(moveInput, statMove);
bindInput(critValueInput, critValue);
bindInput(critChanceInput, critChance);
bindInput(blockValueInput, blockValue);
bindInput(blockChanceInput, blockChance);

const TRAITS = [
  { label: "Act of Faith", icon: "Act_of_Faith_Icon.png" },
  { label: "2 Man Team", icon: "2-Man_Team_Icon.png" },
  { label: "Ambush", icon: "Ambush_Icon.png" },
  { label: "Battle Fatigue", icon: "Battle_Fatigue_Icon.png" },
  { label: "Beast Slayer", icon: "Beast_Slayer_Icon.png" },
  { label: "Big Target", icon: "Big_Target_Icon.png" },
  { label: "Blessings of Khorne", icon: "Blessings_of_Khorne_Icon.png" },
  { label: "Camouflage", icon: "Camouflage_Icon.png" },
  { label: "Close Combat Weakness", icon: "Close_Combat_Weakness_Icon.png" },
  { label: "Contagions of Nurgle", icon: "Contagions_of_Nurgle_Icon.png" },
  { label: "Crushing Strike", icon: "Crushing_Strike_Icon.png" },
  { label: "Daemon", icon: "Daemon_Icon.png" },
  { label: "Dakka", icon: "Dakka_Icon.png" },
  { label: "Deep Strike", icon: "Deep_Strike_Icon.png" },
  { label: "Diminutive", icon: "Diminutive_Icon.png" },
  { label: "Emplacement", icon: "Emplacement_Icon.png" },
  { label: "Explodes", icon: "Explodes_Icon.png" },
  { label: "Final Vengeance", icon: "Final_Vengeance_Icon.png" },
  { label: "Flying", icon: "Flying_Icon.png" },
  { label: "Get Stuck In", icon: "Get_Stuck_In_Icon.png" },
  { label: "Healer", icon: "Healer_Icon.png" },
  { label: "Heavy Weapon", icon: "Heavy_Weapon_Icon.png" },
  { label: "Immune", icon: "Immune_Icon.png" },
  { label: "Indirect Fire", icon: "Indirect_Fire_Icon.png" },
  { label: "Infiltrate", icon: "Infiltrate_Icon.png" },
  { label: "Instinctive Behaviour", icon: "Instinctive_Behaviour_Icon.png" },
  { label: "Let the Galaxy Burn", icon: "Let_the_Galaxy_Burn_Icon.png" },
  { label: "Living Metal", icon: "Living_Metal_Icon.png" },
  { label: "Martial Ka'tah", icon: "Martial_Ka%27tah_Icon.png" },
  { label: "Mechanic", icon: "Mechanic_Icon.png" },
  { label: "Mechanical", icon: "Mechanical_Icon.png" },
  { label: "Mk X Gravis", icon: "Mk_X_Gravis_Icon.png" },
  { label: "Object", icon: "Objact_Icon.png" },
  { label: "Overwatch", icon: "Overwatch_Icon.png" },
  { label: "Parry", icon: "Parry_Icon.png" },
  { label: "Psyker", icon: "Psyker_Icon.png" },
  { label: "Rapid Assault", icon: "Rapid_Assault_Icon.png" },
  { label: "Resilient", icon: "Resilient_Icon.png" },
  { label: "Shadow in the Warp", icon: "Shadow_in_the_Warp_Icon.png" },
  { label: "Steppable", icon: "Steppable_Icon.png" },
  { label: "Summon", icon: "Summon_Icon.png" },
  { label: "Suppressive Fire", icon: "Suppressive_Fire_Icon.png" },
  { label: "Swarm", icon: "Swarm_Icon.png" },
  { label: "Synapse", icon: "Synapse_Icon.png" },
  { label: "Terminator Armour", icon: "Terminator_Armour_Icon.png" },
  { label: "Terrifying", icon: "Terrifying_Icon.png" },
  { label: "Unstoppable", icon: "Unstoppable_Icon.png" },
  { label: "Vehicle", icon: "Vehicle_Icon.png" },
  { label: "Weaver of Fates", icon: "Weaver_of_Fates_Icon.png" }
];

function renderTraits() {
  if (!traitList) return;
  const frag = document.createDocumentFragment();
  TRAITS.forEach((trait, index) => {
    const label = document.createElement("label");
    label.className = "trait-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "trait-checkbox";
    checkbox.dataset.icon = trait.icon;
    checkbox.dataset.label = trait.label;
    checkbox.id = `trait-${index}`;

    const text = document.createElement("span");
    text.textContent = trait.label;

    label.appendChild(checkbox);
    label.appendChild(text);
    frag.appendChild(label);
  });
  traitList.textContent = "";
  traitList.appendChild(frag);
}

function refreshTraitPreview() {
  const checkboxes = document.querySelectorAll(".trait-checkbox");
  const selected = Array.from(checkboxes).filter(cb => cb.checked);

  traitIcons.forEach((icon, i) => {
    const circle = traitCircles[i];
    const selectedTrait = selected[i];
    if (!selectedTrait) {
      circle.style.display = "none";
      icon.removeAttribute("src");
      icon.style.display = "none";
      return;
    }

    const iconFile = selectedTrait.dataset.icon;
    circle.style.display = "flex";
    icon.src = `assets/traitIcons/${iconFile}`;
    icon.style.display = "block";
  });

  const limit = 6;
  const lock = selected.length >= limit;
  checkboxes.forEach(cb => {
    if (!cb.checked) {
      cb.disabled = lock;
      cb.closest(".trait-option")?.classList.toggle("disabled", cb.disabled);
    } else {
      cb.disabled = false;
      cb.closest(".trait-option")?.classList.remove("disabled");
    }
  });
}

renderTraits();
traitList?.addEventListener("change", refreshTraitPreview);
refreshTraitPreview();

rarityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    rarityButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const r = btn.dataset.rarity;
    phoneRoot.classList.remove("rarity-common", "rarity-uncommon", "rarity-rare", "rarity-epic", "rarity-legendary");
    phoneRoot.classList.add("rarity-" + r);
  });
});

wizardTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.tab;
    wizardTabs.forEach(t => t.classList.toggle("active", t === tab));
    wizardPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.tab === key));
  });
});

if (toggleReference && screenEl) {
  toggleReference.addEventListener("click", () => {
    const isOn = screenEl.classList.toggle("reference-on");
    toggleReference.textContent = isOn ? "Hide reference" : "Show reference";
  });
}

function updatePortraitTransform() {
  if (!portraitImage) return;
  const x = Number(portraitOffsetX?.value || 0);
  const y = Number(portraitOffsetY?.value || 0);
  const z = Number(portraitZoom?.value || 100) / 100;
  portraitImage.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
}

if (portraitUploadButton && portraitInput) {
  portraitUploadButton.addEventListener("click", () => portraitInput.click());
  portraitInput.addEventListener("change", () => {
    const file = portraitInput.files && portraitInput.files[0];
    if (!file || !portraitImage) return;
    const reader = new FileReader();
    reader.onload = e => {
      portraitImage.src = e.target.result;
      portraitImage.style.display = "block";
      if (portraitPlaceholder) portraitPlaceholder.style.display = "none";
      updatePortraitTransform();
    };
    reader.readAsDataURL(file);
  });
}

portraitOffsetX?.addEventListener("input", updatePortraitTransform);
portraitOffsetY?.addEventListener("input", updatePortraitTransform);
portraitZoom?.addEventListener("input", updatePortraitTransform);
updatePortraitTransform();

const bgPresets = {
  spacewolves: "assets/backgrounds/Background_SpaceWolves.jpg",
  tau: "assets/backgrounds/Background_Tau.jpg",
  mechanicus: "assets/backgrounds/Background_Mechanicus.jpg"
};

bgPresetRow?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-bg]");
  if (!button) return;
  const key = button.dataset.bg;
  const url = bgPresets[key];
  if (url && topPanel) {
    topPanel.style.backgroundImage = `url(${url})`;
    topPanel.style.backgroundSize = "cover";
    topPanel.style.backgroundPosition = "center";
  }
  bgPresetRow.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
});

function updateAbilityTransform() {
  const x = Number(abilityOffsetX?.value || 0);
  const y = Number(abilityOffsetY?.value || 0);
  const z = Number(abilityZoom?.value || 100) / 100;
  const transform = `translate(${x}px, ${y}px) scale(${z})`;
  if (activeAbilityIcon) activeAbilityIcon.style.transform = transform;
  if (passiveAbilityIcon) passiveAbilityIcon.style.transform = transform;
}

function wireAbilityUpload(button, input, target) {
  if (!button || !input || !target) return;
  button.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      target.src = e.target.result;
      target.style.display = "block";
      const placeholder = target.parentElement?.querySelector(".ability-placeholder");
      if (placeholder) placeholder.style.display = "none";
      updateAbilityTransform();
    };
    reader.readAsDataURL(file);
  });
}

wireAbilityUpload(activeAbilityUploadButton, activeAbilityInput, activeAbilityIcon);
wireAbilityUpload(passiveAbilityUploadButton, passiveAbilityInput, passiveAbilityIcon);
abilityOffsetX?.addEventListener("input", updateAbilityTransform);
abilityOffsetY?.addEventListener("input", updateAbilityTransform);
abilityZoom?.addEventListener("input", updateAbilityTransform);
updateAbilityTransform();

function getFieldContent(field) {
  if (!field) return { html: "", text: "" };
  if (typeof field.value === "string") {
    return { html: field.value, text: field.value };
  }
  return { html: field.innerHTML || "", text: field.textContent || "" };
}

function updateAbilityTooltips() {
  const activeContent = getFieldContent(activeTooltipInput);
  const passiveContent = getFieldContent(passiveTooltipInput);
  const activeTitle = activeTooltipTitleInput?.value || "";
  const passiveTitle = passiveTooltipTitleInput?.value || "";
  const activeTooltip = document.getElementById("activeAbilityTooltip");
  const passiveTooltip = document.getElementById("passiveAbilityTooltip");
  const applyTooltip = (tooltip, title, content) => {
    if (!tooltip) return;
    const titleEl = tooltip.querySelector(".ability-tooltip-title");
    const bodyEl = tooltip.querySelector(".ability-tooltip-body");
    if (!tooltip || !titleEl || !bodyEl) return;
    titleEl.textContent = title.trim();
    bodyEl.innerHTML = content.html;
    const hasText = titleEl.textContent || content.text.trim();
    tooltip.style.display = hasText ? "block" : "none";
    if (!hasText) {
      tooltip.dataset.pinned = "false";
      tooltip.classList.remove("show", "pinned");
    }
  };
  applyTooltip(activeTooltip, activeTitle, activeContent);
  applyTooltip(passiveTooltip, passiveTitle, passiveContent);
}

activeTooltipInput?.addEventListener("input", updateAbilityTooltips);
passiveTooltipInput?.addEventListener("input", updateAbilityTooltips);
activeTooltipTitleInput?.addEventListener("input", updateAbilityTooltips);
passiveTooltipTitleInput?.addEventListener("input", updateAbilityTooltips);
updateAbilityTooltips();

function updateShapeGlowStrength() {
  if (!phoneRoot || !shapeGlowStrength) return;
  phoneRoot.style.setProperty("--shape-glow-strength", shapeGlowStrength.value);
}

shapeGlowStrength?.addEventListener("input", updateShapeGlowStrength);
updateShapeGlowStrength();

const abilityCircles = document.querySelectorAll(".ability-circle");
const tooltipToolbar = document.querySelector(".tooltip-toolbar");
const tooltipColorPicker = document.getElementById("tooltipColorPicker");
const tooltipEditors = document.querySelectorAll(".tooltip-editor");
let activeTooltipEditor = null;
let savedTooltipRange = null;

function saveTooltipSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !activeTooltipEditor) return;
  const range = selection.getRangeAt(0);
  if (activeTooltipEditor.contains(range.commonAncestorContainer)) {
    savedTooltipRange = range;
  }
}

function restoreTooltipSelection() {
  const selection = window.getSelection();
  if (!selection || !savedTooltipRange) return;
  selection.removeAllRanges();
  selection.addRange(savedTooltipRange);
}

function ensureActiveTooltipEditor() {
  if (activeTooltipEditor) return activeTooltipEditor;
  if (activeTooltipInput) {
    activeTooltipEditor = activeTooltipInput;
    return activeTooltipEditor;
  }
  if (passiveTooltipInput) {
    activeTooltipEditor = passiveTooltipInput;
    return activeTooltipEditor;
  }
  return null;
}

function applyTooltipCommand(command, value) {
  const editor = ensureActiveTooltipEditor();
  if (!editor) return;
  editor.focus();
  restoreTooltipSelection();
  document.execCommand(command, false, value);
  saveTooltipSelection();
  updateAbilityTooltips();
}

tooltipEditors.forEach(editor => {
  editor.addEventListener("focus", () => {
    activeTooltipEditor = editor;
  });
  editor.addEventListener("keyup", saveTooltipSelection);
  editor.addEventListener("mouseup", saveTooltipSelection);
  editor.addEventListener("input", saveTooltipSelection);
});

tooltipToolbar?.addEventListener("mousedown", (event) => {
  if (event.target.closest("button[data-tooltip-action]")) {
    event.preventDefault();
  }
});

tooltipToolbar?.addEventListener("click", (event) => {
  const action = event.target.closest("button[data-tooltip-action]");
  if (!action) return;
  if (action.dataset.tooltipAction === "underline") {
    applyTooltipCommand("underline");
  }
});

tooltipColorPicker?.addEventListener("input", (event) => {
  applyTooltipCommand("foreColor", event.target.value);
});

function getCircleTooltip(circle) {
  const tooltipId = circle.dataset.tooltipId;
  if (tooltipId) return document.getElementById(tooltipId);
  return circle.querySelector(".ability-tooltip");
}

function tooltipHasContent(tooltip) {
  const titleText = tooltip.querySelector(".ability-tooltip-title")?.textContent?.trim();
  const bodyText = tooltip.querySelector(".ability-tooltip-body")?.textContent?.trim();
  return Boolean(titleText || bodyText);
}

function positionAbilityTooltip(circle) {
  const tooltip = getCircleTooltip(circle);
  if (!tooltip || !phoneRoot) return;
  updateAbilityTooltips();
  if (!tooltipHasContent(tooltip)) return;
  if (tooltip.parentElement !== phoneRoot) {
    phoneRoot.appendChild(tooltip);
  }
  tooltip.style.display = "block";
  const rect = circle.getBoundingClientRect();
  const phoneRect = phoneRoot.getBoundingClientRect();
  const baseWidth = phoneRoot.offsetWidth || 1;
  const baseHeight = phoneRoot.offsetHeight || 1;
  const scale = phoneRect.height / baseHeight;
  const localX = (rect.left - phoneRect.left) / scale + rect.width / (2 * scale);
  const localY = (rect.top - phoneRect.top) / scale;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const left = localX - tooltipWidth / 2;
  const top = localY - tooltipHeight - 10;
  const minLeft = 8;
  const maxLeft = baseWidth - tooltipWidth - 8;
  const minTop = 8;
  const maxTop = baseHeight - tooltipHeight - 8;
  const clampedLeft = Math.min(Math.max(left, minLeft), maxLeft);
  const clampedTop = Math.min(Math.max(top, minTop), maxTop);
  tooltip.style.left = `${clampedLeft}px`;
  tooltip.style.top = `${clampedTop}px`;
}

abilityCircles.forEach(circle => {
  const tooltip = getCircleTooltip(circle);
  if (!tooltip) return;
  circle.addEventListener("mouseenter", () => {
    positionAbilityTooltip(circle);
    tooltip.classList.add("show");
  });
  circle.addEventListener("mousemove", () => {
    positionAbilityTooltip(circle);
  });
  circle.addEventListener("mouseleave", () => {
    if (tooltip.dataset.pinned === "true") {
      positionAbilityTooltip(circle);
      tooltip.classList.add("show");
      return;
    }
    tooltip.classList.remove("show");
    if (!tooltipHasContent(tooltip)) tooltip.style.display = "none";
  });
  circle.addEventListener("click", () => {
    if (!tooltipHasContent(tooltip)) return;
    const isPinned = tooltip.dataset.pinned === "true";
    tooltip.dataset.pinned = isPinned ? "false" : "true";
    tooltip.classList.toggle("pinned", !isPinned);
    positionAbilityTooltip(circle);
    if (tooltip.dataset.pinned === "true") {
      tooltip.classList.add("show");
    } else if (!circle.matches(":hover")) {
      tooltip.classList.remove("show");
    }
  });
});

async function exportPhonePreview() {
  if (!phoneRoot) return;
  const folderAssets = exportPhonePreview.folderAssets || new Map();
  const assetCache = new Map();
  const toDataUrl = async (assetPath) => {
    if (!assetPath || assetPath.startsWith("data:")) return assetPath;
    const resolvedUrl = new URL(assetPath, window.location.href).href;
    const raw = assetPath.replace(/^[.\/]+/, "");
    const assetsIdx = raw.toLowerCase().lastIndexOf("assets/");
    const normalized = assetsIdx >= 0 ? raw.slice(assetsIdx) : raw;
    if (folderAssets.has(normalized)) return folderAssets.get(normalized);
    if (assetCache.has(resolvedUrl)) return assetCache.get(resolvedUrl);
    try {
      const response = await fetch(resolvedUrl);
      if (!response.ok) return assetPath;
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      assetCache.set(resolvedUrl, dataUrl);
      return dataUrl;
    } catch (err) {
      const ext = resolvedUrl.split(".").pop()?.toLowerCase()?.split("?")[0] || "";
      const imageExts = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
      if (!imageExts.includes(ext)) return assetPath;
      const dataUrl = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(assetPath);
              return;
            }
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } catch (e) {
            resolve(assetPath);
          }
        };
        img.onerror = () => resolve(assetPath);
        img.src = resolvedUrl;
      });
      assetCache.set(resolvedUrl, dataUrl);
      return dataUrl;
    }
  };

  const inlineCssAssets = async (text) => {
    const urlRegex = /url\((['"]?)([^'")]+)\1\)/g;
    const matches = Array.from(text.matchAll(urlRegex));
    for (const match of matches) {
      const full = match[0];
      const path = match[2];
      if (!path || path.startsWith("data:") || !path.includes("assets/")) continue;
      const dataUrl = await toDataUrl(path);
      text = text.replace(full, `url("${dataUrl}")`);
    }
    return text;
  };

  let cssText = "";
  try {
    const response = await fetch("style.css");
    if (response.ok) cssText = await response.text();
  } catch (err) {
    cssText = "";
  }

  if (!cssText) {
    const sheets = Array.from(document.styleSheets);
    cssText = sheets
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
        } catch (err) {
          return "";
        }
      })
      .join("\n");
  }
  cssText = await inlineCssAssets(cssText);

  const clone = phoneRoot.cloneNode(true);
  clone.removeAttribute("id");

  const imgNodes = clone.querySelectorAll("img[src]");
  for (const img of imgNodes) {
    const src = img.getAttribute("src");
    if (src && src.includes("assets/")) {
      img.setAttribute("src", await toDataUrl(src));
    }
  }

  const bgNodes = clone.querySelectorAll("[style]");
  for (const node of bgNodes) {
    const style = node.getAttribute("style") || "";
    const urlRegex = /url\((['"]?)(assets\/[^'")]+)\1\)/g;
    const matches = Array.from(style.matchAll(urlRegex));
    let nextStyle = style;
    for (const match of matches) {
      const full = match[0];
      const path = match[2];
      const dataUrl = await toDataUrl(path);
      nextStyle = nextStyle.replace(full, `url("${dataUrl}")`);
    }
    if (nextStyle !== style) node.setAttribute("style", nextStyle);
  }

  const exportStyles = `
    body {
      margin: 0;
      background: #0b0e15;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      color: #f8f9ff;
      font-family: "Montserrat", sans-serif;
    }
  `;

  const exportScript = `
    (() => {
      const circles = document.querySelectorAll(".ability-circle");
      function positionTooltip(circle) {
        const tooltip = circle.querySelector(".ability-tooltip");
        if (!tooltip) return;
        const rect = circle.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        const top = rect.top - tooltipRect.height - 10;
        tooltip.style.left = Math.max(8, left) + "px";
        tooltip.style.top = Math.max(8, top) + "px";
      }
      function showTooltip(tooltip) {
        tooltip.classList.add("show");
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateY(0)";
        tooltip.style.pointerEvents = "auto";
      }
      function hideTooltip(tooltip) {
        tooltip.classList.remove("show");
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(6px)";
        tooltip.style.pointerEvents = "none";
      }
      circles.forEach(circle => {
        const tooltip = circle.querySelector(".ability-tooltip");
        if (!tooltip) return;
        circle.addEventListener("mouseenter", () => {
          positionTooltip(circle);
          showTooltip(tooltip);
        });
        circle.addEventListener("mousemove", () => positionTooltip(circle));
        circle.addEventListener("mouseleave", () => hideTooltip(tooltip));
      });
    })();
  `;

  const useInlineStyles = !cssText;

  const buildCssText = (computed) => {
    let text = "";
    for (let i = 0; i < computed.length; i += 1) {
      const prop = computed[i];
      if (prop === "content") continue;
      const value = computed.getPropertyValue(prop);
      text += `${prop}:${value};`;
    }
    return text;
  };

  const inlineComputedStyles = (sourceRoot, targetRoot) => {
    const sourceNodes = [sourceRoot, ...sourceRoot.querySelectorAll("*")];
    const targetNodes = [targetRoot, ...targetRoot.querySelectorAll("*")];
    sourceNodes.forEach((sourceNode, index) => {
      const targetNode = targetNodes[index];
      if (!targetNode) return;
      const computed = window.getComputedStyle(sourceNode);
      targetNode.setAttribute("style", buildCssText(computed));
    });
  };

  const addPseudoClone = (sourceNode, targetNode, pseudo) => {
    const computed = window.getComputedStyle(sourceNode, pseudo);
    const content = computed.getPropertyValue("content");
    if (!content || content === "none" || content === "normal") return;
    const pseudoEl = document.createElement("span");
    pseudoEl.setAttribute("data-pseudo", pseudo);
    pseudoEl.setAttribute("style", buildCssText(computed));
    const cleaned = content.replace(/^["']|["']$/g, "");
    if (cleaned) pseudoEl.textContent = cleaned;
    targetNode.appendChild(pseudoEl);
  };

  if (useInlineStyles) {
    inlineComputedStyles(phoneRoot, clone);
    const sourceNodes = [phoneRoot, ...phoneRoot.querySelectorAll("*")];
    const targetNodes = [clone, ...clone.querySelectorAll("*")];
    sourceNodes.forEach((sourceNode, index) => {
      const targetNode = targetNodes[index];
      if (!targetNode) return;
      addPseudoClone(sourceNode, targetNode, "::before");
      addPseudoClone(sourceNode, targetNode, "::after");
    });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tacticus Export</title>
    ${useInlineStyles ? "" : `<style>${cssText}</style>`}
    <style>${exportStyles}</style>
  </head>
  <body>
    ${clone.outerHTML}
    <script>${exportScript}<\/script>
  </body>
</html>`;

  const nameSeed = (nameInput?.value || "tacticus").trim();
  const safeName = nameSeed.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  const fileName = `${safeName || "tacticus"}_export.html`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

exportButton?.addEventListener("click", exportPhonePreview);

async function loadAssetsFolder(files) {
  const map = new Map();
  const toData = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  for (const file of files) {
    if (!file || !file.webkitRelativePath) continue;
    const rel = file.webkitRelativePath.replace(/\\/g, "/");
    const idx = rel.toLowerCase().indexOf("assets/");
    if (idx === -1) continue;
    const key = rel.slice(idx);
    map.set(key, await toData(file));
  }
  exportPhonePreview.folderAssets = map;
}

assetsFolderButton?.addEventListener("click", () => assetsFolderInput?.click());
assetsFolderInput?.addEventListener("change", async () => {
  const files = assetsFolderInput.files ? Array.from(assetsFolderInput.files) : [];
  if (!files.length) return;
  await loadAssetsFolder(files);
  assetsFolderButton.textContent = "Assets loaded";
});

function fitPhoneInPreview() {
  if (!phoneRoot || !previewWrap) return;
  window.requestAnimationFrame(() => {
    const baseWidth = phoneRoot.offsetWidth || 1;
    const baseHeight = phoneRoot.offsetHeight || 1;
    const viewportHeight =
      window.visualViewport?.height ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
      baseHeight;
    const containerHeight = previewWrap.getBoundingClientRect().height || viewportHeight;
    const targetHeight = Math.min(containerHeight, viewportHeight);
    const scale = targetHeight / baseHeight;
    phoneRoot.style.transformOrigin = "top left";
    phoneRoot.style.transform = `scale(${scale.toFixed(4)})`;
    if (phoneLock) {
      phoneLock.style.width = `${baseWidth * scale}px`;
      phoneLock.style.height = `${baseHeight * scale}px`;
    }
  });
}

window.addEventListener("resize", fitPhoneInPreview);
window.addEventListener("orientationchange", fitPhoneInPreview);
window.visualViewport?.addEventListener("resize", fitPhoneInPreview);
fitPhoneInPreview();

if (previewWrap && "ResizeObserver" in window) {
  const previewObserver = new ResizeObserver(() => fitPhoneInPreview());
  previewObserver.observe(previewWrap);
}

function getSelectedIcon(selectEl) {
  const option = selectEl?.selectedOptions?.[0];
  return option?.dataset?.icon || "";
}

function updateAttackRows() {
  if (meleeAttackRow && meleeEnabled) {
    meleeAttackRow.classList.toggle("slot-hidden", !meleeEnabled.checked);
  }
  if (rangeAttackRow && rangeEnabled) {
    rangeAttackRow.classList.toggle("slot-hidden", !rangeEnabled.checked);
  }
}

function updateMeleeRow() {
  const iconFile = getSelectedIcon(meleeTypeSelect);
  if (meleeTypeIcon) {
    meleeTypeIcon.src = iconFile ? `assets/damageIcons/${iconFile}` : "";
  }
  if (meleeTypeLabel && meleeTypeSelect) {
    meleeTypeLabel.textContent = meleeTypeSelect.value || "";
    const meta = DAMAGE_META[meleeTypeSelect.value];
    meleeTypeLabel.style.color = meta ? meta.color : "inherit";
  }
  if (meleeHits && meleeHitsInput) {
    meleeHits.textContent = meleeHitsInput.value || "1";
  }
}

function updateRangeRow() {
  const iconFile = getSelectedIcon(rangeTypeSelect);
  if (rangeTypeIcon) {
    rangeTypeIcon.src = iconFile ? `assets/damageIcons/${iconFile}` : "";
  }
  if (rangeTypeLabel && rangeTypeSelect) {
    rangeTypeLabel.textContent = rangeTypeSelect.value || "";
    const meta = DAMAGE_META[rangeTypeSelect.value];
    rangeTypeLabel.style.color = meta ? meta.color : "inherit";
  }
  if (rangeHits && rangeHitsInput) {
    rangeHits.textContent = rangeHitsInput.value || "1";
  }
  if (rangeKindIcon && rangePatternSelect) {
    rangeKindIcon.src = rangePatternSelect.value === "range3"
      ? "assets/statIcons/Ranged_3_Icon.png"
      : "assets/statIcons/Ranged_2_Icon.png";
  }
}

function updateCritBlockRows() {
  if (critRow && critEnabled) {
    critRow.classList.toggle("slot-hidden", !critEnabled.checked);
  }
  if (blockRow && blockEnabled) {
    blockRow.classList.toggle("slot-hidden", !blockEnabled.checked);
  }
}

meleeEnabled?.addEventListener("change", updateAttackRows);
rangeEnabled?.addEventListener("change", updateAttackRows);
meleeTypeSelect?.addEventListener("change", updateMeleeRow);
rangeTypeSelect?.addEventListener("change", updateRangeRow);
rangePatternSelect?.addEventListener("change", updateRangeRow);
meleeHitsInput?.addEventListener("input", updateMeleeRow);
rangeHitsInput?.addEventListener("input", updateRangeRow);
critEnabled?.addEventListener("change", updateCritBlockRows);
blockEnabled?.addEventListener("change", updateCritBlockRows);

updateAttackRows();
updateMeleeRow();
updateRangeRow();
updateCritBlockRows();

if (phoneLock) {
  phoneLock.style.removeProperty("--phone-scale");
  phoneLock.style.removeProperty("width");
  phoneLock.style.removeProperty("height");
}

let phoneWindow = null;
let phoneWindowInterval = null;

function ensurePhoneWindowShell(targetWidth, targetHeight) {
  if (phoneWindow && !phoneWindow.closed) return true;
  const safeWidth = Math.max(320, Math.round(targetWidth || 520));
  const safeHeight = Math.max(480, Math.round(targetHeight || 980));
  phoneWindow = window.open(
    "",
    "tacticus-phone-preview",
    `width=${safeWidth},height=${safeHeight}`
  );
  if (!phoneWindow) return false;
  phoneWindow.document.open();
  phoneWindow.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phone Preview</title>
    <link rel="stylesheet" href="style.css" />
    <style>
      body {
        margin: 0;
        background: #0b0e15;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
      #phoneWindowRoot {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #phoneWindowRoot .phone {
        transform-origin: top left;
      }
    </style>
    <script>
      function fitPhoneToWindow() {
        const phone = document.querySelector("#phoneWindowRoot .phone");
        if (!phone) return;
        const baseWidth = Number(phone.dataset.phoneWidth) || phone.offsetWidth || 1;
        const baseHeight = Number(phone.dataset.phoneHeight) || phone.offsetHeight || 1;
        phone.style.width = baseWidth + "px";
        phone.style.height = baseHeight + "px";
        const scale = window.innerHeight / baseHeight;
        phone.style.transform = "scale(" + scale.toFixed(3) + ")";
      }
      window.addEventListener("resize", fitPhoneToWindow);
      window.addEventListener("load", fitPhoneToWindow);
    </script>
  </head>
  <body>
    <div id="phoneWindowRoot"></div>
  </body>
</html>`);
  phoneWindow.document.close();
  return true;
}

function renderPhoneWindow() {
  if (!phoneWindow || phoneWindow.closed || !phoneRoot) return;
  const container = phoneWindow.document.getElementById("phoneWindowRoot");
  if (!container) return;
  const clone = phoneRoot.cloneNode(true);
  clone.id = "phoneRootClone";
  container.textContent = "";
  container.appendChild(clone);
}

function startPhoneWindowUpdates() {
  if (phoneWindowInterval) return;
  phoneWindowInterval = window.setInterval(() => {
    if (!phoneWindow || phoneWindow.closed) {
      window.clearInterval(phoneWindowInterval);
      phoneWindowInterval = null;
      return;
    }
    renderPhoneWindow();
  }, 500);
}

if (openPhoneWindow) {
  openPhoneWindow.addEventListener("click", () => {
    const rect = phoneRoot?.getBoundingClientRect();
    const baseWidth = phoneRoot?.offsetWidth || rect?.width || 520;
    const baseHeight = phoneRoot?.offsetHeight || rect?.height || 980;
    const aspect = baseHeight && baseWidth ? baseHeight / baseWidth : 18 / 9;
    const width = baseWidth + 40;
    const height = Math.round(width * aspect) + 40;
    if (!ensurePhoneWindowShell(width, height)) return;
    renderPhoneWindow();
    startPhoneWindowUpdates();
    phoneWindow.focus();
  });
}
