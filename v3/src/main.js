import { assets } from "./assets.js";
import { setupEditor } from "./editor.js";
import { exportReleaseSheet } from "./exporter.js?v=20261013-15";
import { renderCharacterScreen } from "./renderer.js?v=20261013-10";
import { applyPreset, presets, state } from "./state.js";

const appShell = document.querySelector(".app-shell");
const gameScreen = document.getElementById("gameScreen");
const editorScreen = document.getElementById("editorScreen");
const swipeHint = document.getElementById("swipeHint");
const exportButton = document.getElementById("exportSheetButton");
const exportPresetButton = document.getElementById("exportPresetButton");
const importPresetInput = document.getElementById("importPresetInput");
const HUD_BASE_WIDTH = 474;
const HUD_BASE_HEIGHT = 430;
let touchStartX = 0;
let touchStartY = 0;
let pointerStartX = 0;
let pointerStartY = 0;
let hintStage = "card";
let historyGuardReady = false;

function updateViewportMetrics() {
  const width = window.innerWidth || HUD_BASE_WIDTH;
  const height = window.innerHeight || 900;
  const widthScale = width / HUD_BASE_WIDTH;
  const shortWide = width / height > 0.62;
  const heightLimit = shortWide ? height * 0.58 : Number.POSITIVE_INFINITY;
  const heightScale = heightLimit / HUD_BASE_HEIGHT;
  const scale = Math.max(0.74, Math.min(widthScale, heightScale));
  document.documentElement.style.setProperty("--hud-scale", scale.toFixed(4));
  document.documentElement.style.setProperty("--hud-height", `${Math.round(HUD_BASE_HEIGHT * scale)}px`);
}

function render() {
  updateViewportMetrics();
  renderCharacterScreen(gameScreen, state);
}

function toggleMode() {
  const nextMode = appShell.dataset.mode === "card" ? "editor" : "card";
  setMode(nextMode);
}

function setMode(nextMode) {
  appShell.dataset.mode = nextMode;
  editorScreen.hidden = nextMode !== "editor";
  gameScreen.hidden = nextMode !== "card";
  updateSwipeHint();
}

function dismissHint() {
  hintStage = "hidden";
  updateSwipeHint();
}

function updateSwipeHint() {
  if (!swipeHint) return;
  const editing = appShell.dataset.mode === "editor";
  const shouldShow = hintStage !== "hidden" && ((editing && hintStage === "editor") || (!editing && hintStage === "card"));
  swipeHint.classList.toggle("is-hidden", !shouldShow);
  swipeHint.querySelector(".swipe-copy").textContent = editing ? "Swipe to view" : "Swipe to edit";
}

function handleTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  if (Math.abs(deltaX) < 58 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
  const mode = appShell.dataset.mode;
  if (mode === "card" && deltaX < 0) {
    setMode("editor");
    if (hintStage === "card") hintStage = "editor";
  }
  if (mode === "editor" && deltaX > 0) {
    setMode("card");
    if (hintStage === "editor") hintStage = "hidden";
  }
  updateSwipeHint();
}

function handlePointerDown(event) {
  if (event.pointerType === "touch") return;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
}

function handlePointerUp(event) {
  if (event.pointerType === "touch") return;
  const deltaX = event.clientX - pointerStartX;
  const deltaY = event.clientY - pointerStartY;
  if (Math.abs(deltaX) < 58 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
  const mode = appShell.dataset.mode;
  if (mode === "card" && deltaX < 0) {
    setMode("editor");
    if (hintStage === "card") hintStage = "editor";
  }
  if (mode === "editor" && deltaX > 0) {
    setMode("card");
    if (hintStage === "editor") hintStage = "hidden";
  }
  updateSwipeHint();
}

function setupBackNavigationGuard() {
  if (historyGuardReady || !window.history?.pushState) return;
  historyGuardReady = true;
  window.history.replaceState({ tacticusV3: true }, "", window.location.href);
  window.history.pushState({ tacticusV3Guard: true }, "", window.location.href);
  window.addEventListener("popstate", () => {
    window.history.pushState({ tacticusV3Guard: true }, "", window.location.href);
  });
}

function handleShortcutKeys(event) {
  const target = event.target;
  const editingText = target?.matches?.("input, textarea, [contenteditable='true']");
  const browserBack =
    (event.altKey && event.key === "ArrowLeft") ||
    (event.metaKey && event.key === "[") ||
    (event.key === "Backspace" && !editingText);
  if (browserBack) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function ensureInitialOptions() {
  const equipmentSelects = document.querySelectorAll('[data-asset-select="equipment"]');
  equipmentSelects.forEach((select) => {
    if (!select.querySelector('option[value=""]')) {
      select.insertAdjacentHTML("afterbegin", '<option value="">Empty</option>');
    }
  });

  if (!assets.equipment.some((item) => item.id === "")) {
    assets.equipment.unshift({ id: "", label: "Empty", src: "" });
  }
}

ensureInitialOptions();
const syncEditor = setupEditor(state, render, {
  onStart: () => {
    appShell.classList.add("slider-preview-active");
    setMode("card");
  },
  onEnd: () => {
    appShell.classList.remove("slider-preview-active");
    setMode("editor");
  }
});
document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    const preset = presets.find((item) => item.key === button.dataset.preset);
    if (!preset) return;
    applyPreset(state, preset);
    syncEditor();
    render();
    setMode("card");
  });
});

exportPresetButton?.addEventListener("click", () => {
  const payload = JSON.stringify({ generatedAt: new Date().toISOString(), preset: state }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.identity.name.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "character"}_preset.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

importPresetInput?.addEventListener("change", async () => {
  const [file] = importPresetInput.files || [];
  if (!file) return;
  const data = JSON.parse(await file.text());
  const imported = data.preset || data;
  const character = imported.identity ? imported : legacyPresetToCharacter(imported);
  applyPreset(state, { character });
  syncEditor();
  render();
  setMode("card");
  importPresetInput.value = "";
});

function legacyPresetToCharacter(preset) {
  const assetPath = (value) => String(value || "").replace(/^\.\.\/assets\//, "").replace(/^assets\//, "");
  const base = structuredClone(presets[0].character);
  base.identity = {
    name: preset.name || "Character", title: preset.title || "", description: preset.description || "",
    unlock: preset.unlockRequirements || "", rarity: preset.rarity || "common",
    allegianceId: preset.bgKey === "world_eaters" ? "world_eaters" : "imperium"
  };
  base.scene.backgroundId = preset.bgKey || base.scene.backgroundId;
  base.scene.portraitId = /Lotarra\.png$/i.test(preset.portrait || "") ? "lotarra" : base.scene.portraitId;
  base.scene.portraitSrc = String(preset.portrait || "").startsWith("data:") ? preset.portrait : "";
  base.scene.portrait = {
    zoom: Number(preset.portraitPosition?.zoom || 100),
    focalX: 50 + Number(preset.portraitPosition?.x || 0) / 2,
    focalY: 50 + Number(preset.portraitPosition?.y || 0) / 2
  };
  const light = preset.lighting || {};
  base.scene.lighting = {
    tintEnabled: light.portraitTintEnabled ?? true, tintColor: light.portraitTintColor || "#000000", tintStrength: Number(light.portraitTintStrength || 0),
    lightEnabled: light.portraitLightEnabled ?? true, lightColor: light.portraitLightColor || "#ffffff", lightStrength: Number(light.portraitLightStrength || 0), lightAngle: Number(light.portraitLightAngle || 0),
    shadowEnabled: light.portraitShadowEnabled ?? true, shadowColor: light.portraitShadowColor || "#000000", shadowStrength: Number(light.portraitShadowStrength || 0), shadowAngle: Number(light.portraitShadowAngle || 0)
  };
  base.stats = { ...base.stats, ...(preset.stats || {}) };
  base.attacks = { melee: preset.melee || base.attacks.melee, ranged: preset.ranged || base.attacks.ranged };
  base.crit = preset.crit || base.crit;
  base.block = preset.block || base.block;
  base.abilities.active = { iconId: "", src: assetPath(preset.abilities?.activeIcon), name: preset.abilities?.activeTitle || "", description: preset.abilities?.activeDesc || "", position: preset.abilities?.activePosition || { x: 0, y: 0, zoom: 100 } };
  base.abilities.passive = { iconId: "", src: assetPath(preset.abilities?.passiveIcon), name: preset.abilities?.passiveTitle || "", description: preset.abilities?.passiveDesc || "", position: preset.abilities?.passivePosition || { x: 0, y: 0, zoom: 100 } };
  return base;
}
setupBackNavigationGuard();
render();
updateSwipeHint();

swipeHint.addEventListener("click", dismissHint);
appShell.addEventListener("touchstart", handleTouchStart, { passive: true });
appShell.addEventListener("touchend", handleTouchEnd, { passive: true });
appShell.addEventListener("pointerdown", handlePointerDown);
appShell.addEventListener("pointerup", handlePointerUp);
window.addEventListener("keydown", handleShortcutKeys, true);
exportButton.addEventListener("click", () => exportReleaseSheet(state));
window.addEventListener("resize", render);
window.addEventListener("orientationchange", render);
