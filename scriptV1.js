// Step switching
const stepTabs = document.querySelectorAll(".step-tab");
const steps = document.querySelectorAll(".wizard-step");

stepTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const step = tab.dataset.step;
    stepTabs.forEach(t => t.classList.toggle("active", t === tab));
    steps.forEach(s => s.classList.toggle("active", s.dataset.step === step));
  });
});

// Helper to bind input text to preview element
const bindText = (inputId, previewId, transform) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;
  const update = () => {
    const val = input.value;
    preview.textContent = transform ? transform(val) : val;
  };
  input.addEventListener("input", update);
  update();
};

bindText("nameInput", "previewName");
bindText("titleInput", "previewTitle");
bindText("statHealthInput", "statHealth");
bindText("statArmorInput", "statArmor");
bindText("statDamageInput", "statDamage");
bindText("statMoveInput", "statMove");
bindText("critDamageInput", "critDamage");
bindText("critChanceInput", "critChance");
bindText("blockDamageInput", "blockDamage");
bindText("blockChanceInput", "blockChance");

// Rank binding and image
const rankInput = document.getElementById("rankInput");
const previewRank = document.getElementById("previewRank");
const rankImg = document.getElementById("rankImg");

function updateRank(rankVal) {
  const clean = rankVal || "1";
  previewRank.textContent = "Rank " + clean;
  const imgPath = "assets/rank/Rank_" + clean + ".png";
  rankImg.src = imgPath;
  rankImg.style.display = "inline-block";
}

rankInput.addEventListener("input", () => updateRank(rankInput.value));
updateRank(rankInput.value);

// Rarity buttons
const phoneRoot = document.getElementById("phoneRoot");
const rarityButtons = document.querySelectorAll("#rarityChoices .pill-btn");
rarityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    rarityButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const r = btn.dataset.rarity;
    phoneRoot.classList.remove("rarity-common", "rarity-rare", "rarity-epic", "rarity-legendary");
    phoneRoot.classList.add("rarity-" + r);
  });
});

// Trait selection: any number of traits, first 6 show as icons
const traitCheckboxes = document.querySelectorAll(".trait-checkbox");
const traitIcons = [
  document.getElementById("previewTrait1"),
  document.getElementById("previewTrait2"),
  document.getElementById("previewTrait3"),
  document.getElementById("previewTrait4"),
  document.getElementById("previewTrait5"),
  document.getElementById("previewTrait6")
];
const traitCircles = traitIcons.map(img => img.parentElement);

function refreshTraitCircles() {
  const selected = Array.from(traitCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb);

  for (let i = 0; i < traitIcons.length; i++) {
    const img = traitIcons[i];
    const circle = traitCircles[i];
    const cb = selected[i];

    if (cb) {
      const iconFile = cb.dataset.icon;

      circle.style.display = "flex";
      if (iconFile) {
        img.src = `assets/traitIcons/${iconFile}`;
        img.style.display = "block";
      } else {
        img.removeAttribute("src");
        img.style.display = "none";
      }
    } else {
      circle.style.display = "none";
      img.removeAttribute("src");
      img.style.display = "none";
    }
  }
}

traitCheckboxes.forEach(cb => {
  cb.addEventListener("change", refreshTraitCircles);
});
refreshTraitCircles();

// Background presets
const bgPresets = {
  spacewolves: "assets/backgrounds/Background_SpaceWolves.jpg",
  tau: "assets/backgrounds/Background_Tau.jpg",
  mechanicus: "assets/backgrounds/Background_Mechanicus.jpg"
};
const screenBg = document.getElementById("screenBg");
const bgPresetButtons = document.querySelectorAll("#bgPresetRow .pill-btn");

bgPresetButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    bgPresetButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.dataset.bg;
    const url = bgPresets[key];
    if (url) {
      screenBg.style.backgroundImage = 'url("' + url + '")';
    }
  });
});

const portraitOffsetX = document.getElementById("portraitOffsetX");
const portraitOffsetY = document.getElementById("portraitOffsetY");
const portraitZoom    = document.getElementById("portraitZoom");

function updatePortraitView() {
  if (!portraitImage) return;

  const x = portraitOffsetX ? Number(portraitOffsetX.value) : 0;   // px offset
  const y = portraitOffsetY ? Number(portraitOffsetY.value) : 0;   // px offset
  const z = portraitZoom    ? Number(portraitZoom.value)    : 100; // percent

  const scale = z / 100;

  // Pan + zoom in one transform
  // Order matters: this pans in scaled space. If you prefer pan independent of scale,
  // swap to: transform = `scale(${scale}) translate(${x}px, ${y}px)`;
  portraitImage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}


// Hook sliders
if (portraitOffsetX) {
  portraitOffsetX.addEventListener("input", updatePortraitView);
}
if (portraitOffsetY) {
  portraitOffsetY.addEventListener("input", updatePortraitView);
}
if (portraitZoom) {
  portraitZoom.addEventListener("input", updatePortraitView);
}


// Hook sliders
if (portraitOffsetX) {
  portraitOffsetX.addEventListener("input", updatePortraitView);
}
if (portraitOffsetY) {
  portraitOffsetY.addEventListener("input", updatePortraitView);
}


portraitUploadButton.addEventListener("click", () => portraitInput.click());
portraitInput.addEventListener("change", function () {
  console.log("Portrait file selected:", this.files);
  const file = this.files && this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    portraitImage.src = e.target.result;
    portraitImage.style.display = "block";
    portraitPlaceholder.style.display = "none";
    updatePortraitView(); // make sure current slider values apply
  };
  reader.readAsDataURL(file);
});
updatePortraitView();


// --- ATTACK LINES: text, icons, visibility ---

const meleeEnabled      = document.getElementById("meleeEnabled");
const rangeEnabled      = document.getElementById("rangeEnabled");
const meleeAttackRow    = document.getElementById("meleeAttackRow");
const rangeAttackRow    = document.getElementById("rangeAttackRow");

const meleeTypeInput    = document.getElementById("meleeTypeInput");
const rangeTypeInput    = document.getElementById("rangeTypeInput");
const hitsInput         = document.getElementById("hitsInput");
const meleeAttackLine   = document.getElementById("meleeAttackLine");
const rangeAttackLine   = document.getElementById("rangeAttackLine");

// pattern icons (melee / range 2 / range 3)
const meleeKindIcon     = document.getElementById("meleeKindIcon");
const rangeKindIcon     = document.getElementById("rangeKindIcon");
const rangePatternSelect = document.getElementById("rangePatternSelect");

// damage-type icons (inner circle)
const meleeTypeIcon     = document.getElementById("meleeTypeIcon");
const rangeTypeIcon     = document.getElementById("rangeTypeIcon");

// radios
const meleeDamageRadios = document.querySelectorAll("input[name='meleeDamageType']");
const rangeDamageRadios = document.querySelectorAll("input[name='rangeDamageType']");

// adjust these to your actual paths
const MELEE_PATTERN_ICON = "assets/statIcons/Melee_Icon.png";
const RANGE_PATTERN_2    = "assets/statIcons/Ranged_2_Icon.png";
const RANGE_PATTERN_3    = "assets/statIcons/Ranged_3_Icon.png";
const DAMAGE_ICON_PATH   = "assets/damageIcons/";

// dev-side color / label map
const DAMAGE_META = {
  Bio:          { label: "Bio",          color: "#7ad383" },
  Blast:        { label: "Blast",        color: "#ffb347" },
  Chain:        { label: "Chain",        color: "#e0d87a" },
  Direct:       { label: "Direct",       color: "#ffffff" },
  Energy:       { label: "Energy",       color: "#5ad2ff" },
  Eviscerating: { label: "Eviscerating", color: "#ff8080" },
  Flame:        { label: "Flame",        color: "#ff944d" },
  "Heavy Round":{ label: "Heavy Round",  color: "#d6c18f" },
  Las:          { label: "Las",          color: "#ffef7a" },
  Melta:        { label: "Melta",        color: "#ffda7a" },
  Molecular:    { label: "Molecular",    color: "#c487ff" },
  Particle:     { label: "Particle",     color: "#7afff4" },
  Physical:     { label: "Physical",     color: "#f0f0f0" },
  Piercing:     { label: "Piercing",     color: "#ffb6c1" },
  Plasma:       { label: "Plasma",       color: "#5cf8ff" },
  Power:        { label: "Power",        color: "#8ef7ff" },
  Projectile:   { label: "Projectile",   color: "#d2d2d2" },
  Psychic:      { label: "Psychic",      color: "#c76dff" },
  Pulse:        { label: "Pulse",        color: "#79f0ff" },
  Toxic:        { label: "Toxic",        color: "#8ddf5a" }
};

// 1) text lines (name + hits)
function updateAttackLines() {
  const meleeKey = getSelectedDamageKey(meleeDamageRadios);
  const rangeKey = getSelectedDamageKey(rangeDamageRadios);
  const hits = hitsInput.value || "1";

  const meleeMeta = DAMAGE_META[meleeKey] || { label: meleeKey || "Melee", color: "#ffffff" };
  const rangeMeta = DAMAGE_META[rangeKey] || { label: rangeKey || "Ranged", color: "#ffffff" };

  // write into inputs (so user can override if they really want)
  if (meleeKey) meleeTypeInput.value = meleeMeta.label;
  if (rangeKey) rangeTypeInput.value = rangeMeta.label;

  meleeAttackLine.textContent = (meleeTypeInput.value || meleeMeta.label) + " · x" + hits;
  rangeAttackLine.textContent = (rangeTypeInput.value || rangeMeta.label) + " · x" + hits;

  meleeAttackLine.style.color = meleeMeta.color;
  rangeAttackLine.style.color = rangeMeta.color;
}

function getSelectedDamageKey(nodeList) {
  const checked = Array.from(nodeList).find(r => r.checked);
  return checked ? checked.value : "";
}

// 2) damage-type icons inside the type circles
function updateDamageTypeIcons() {
  const meleeChecked  = Array.from(meleeDamageRadios).find(r => r.checked);
  const rangeChecked  = Array.from(rangeDamageRadios).find(r => r.checked);

  if (meleeChecked && meleeChecked.dataset.icon) {
    meleeTypeIcon.src = DAMAGE_ICON_PATH + meleeChecked.dataset.icon;
    meleeTypeIcon.style.display = "block";
  } else {
    meleeTypeIcon.src = "";
    meleeTypeIcon.style.display = "none";
  }

  if (rangeChecked && rangeChecked.dataset.icon) {
    rangeTypeIcon.src = DAMAGE_ICON_PATH + rangeChecked.dataset.icon;
    rangeTypeIcon.style.display = "block";
  } else {
    rangeTypeIcon.src = "";
    rangeTypeIcon.style.display = "none";
  }
}

// 3) melee / ranged pattern icons
function updatePatternIcons() {
  // melee is always the same pattern
  meleeKindIcon.src = MELEE_PATTERN_ICON;

  // ranged depends on Range 2 / Range 3
  if (rangePatternSelect.value === "range3") {
    rangeKindIcon.src = RANGE_PATTERN_3;
  } else {
    rangeKindIcon.src = RANGE_PATTERN_2;
  }
}

// 4) show/hide attack rows without collapsing layout
function updateAttackVisibility() {
  meleeAttackRow.style.opacity = meleeEnabled.checked ? "1" : "0";
  rangeAttackRow.style.opacity = rangeEnabled.checked ? "1" : "0";
}

// wire it up
[meleeEnabled, rangeEnabled, hitsInput].forEach(el =>
  el.addEventListener("change", () => {
    updateAttackVisibility();
    updateAttackLines();
  })
);

[meleeTypeInput, rangeTypeInput].forEach(el =>
  el.addEventListener("input", updateAttackLines)
);

meleeDamageRadios.forEach(r =>
  r.addEventListener("change", () => {
    updateDamageTypeIcons();
    updateAttackLines();
  })
);

rangeDamageRadios.forEach(r =>
  r.addEventListener("change", () => {
    updateDamageTypeIcons();
    updateAttackLines();
  })
);

rangePatternSelect.addEventListener("change", updatePatternIcons);

// initial paint
updateAttackVisibility();
updatePatternIcons();
updateDamageTypeIcons();
updateAttackLines();


// Faction selection list
const factionCheckboxes = document.querySelectorAll(".faction-choice");
const previewFactionIcon = document.getElementById("previewFactionIcon");

factionCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    if (cb.checked) {
      // uncheck all others
      factionCheckboxes.forEach(other => {
        if (other !== cb) other.checked = false;
      });

      // update badge
      const iconFile = cb.dataset.icon;
      if (iconFile) {
        previewFactionIcon.src = "assets/factionIcons/" + iconFile;
        previewFactionIcon.style.display = "block";
      } else {
        previewFactionIcon.style.display = "none";
      }
    } else {
      // if unchecked, remove badge
      previewFactionIcon.removeAttribute("src");
      previewFactionIcon.style.display = "none";
    }
  });
});


function fillSelect(select, options) {
  select.innerHTML = "";
  options.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
}

// Items
const itemSelects = [
  document.getElementById("itemSlot1"),
  document.getElementById("itemSlot2"),
  document.getElementById("itemSlot3")
];
const itemPreviews = [
  document.getElementById("previewItem1"),
  document.getElementById("previewItem2"),
  document.getElementById("previewItem3")
];

itemSelects.forEach((sel, idx) => {
  fillSelect(sel, itemPool);
  sel.addEventListener("change", () => {
    const val = sel.value;
    itemPreviews[idx].textContent = val;
  });
  sel.dispatchEvent(new Event("change"));
});

