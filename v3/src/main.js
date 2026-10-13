import { assets } from "./assets.js";
import { setupEditor } from "./editor.js";
import { exportReleaseSheet } from "./exporter.js";
import { renderCharacterScreen } from "./renderer.js";
import { state } from "./state.js";

const appShell = document.querySelector(".app-shell");
const gameScreen = document.getElementById("gameScreen");
const editorScreen = document.getElementById("editorScreen");
const swipeHint = document.getElementById("swipeHint");
const exportButton = document.getElementById("exportSheetButton");
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
setupEditor(state, render);
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
