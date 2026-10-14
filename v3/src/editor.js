import { assets } from "./assets.js";
import { getPath, setPath } from "./state.js";

export function setupEditor(character, onChange, previewHandlers = {}) {
  fillAssetSelects(character);
  fillDamageTypeSelects();
  fillTraitEditor(character, onChange);
  fillAbilityLibraries(character, onChange);
  syncControls(character);

  document.querySelectorAll("[data-bind]").forEach((control) => {
    control.addEventListener("input", () => {
      const value = control.type === "checkbox"
        ? control.checked
        : control.type === "number" || control.type === "range"
        ? Number(control.value)
        : control.value;
      setPath(character, control.dataset.bind, value);
      onChange();
    });
  });

  setupSliderPreview(document.querySelectorAll('input[type="range"][data-bind]'), previewHandlers);

  document.querySelectorAll("[data-upload]").forEach((input) => {
    input.addEventListener("change", async () => {
      const [file] = input.files || [];
      if (!file) return;
      setPath(character, input.dataset.upload, await fileToDataUrl(file));
      onChange();
    });
  });

  document.querySelectorAll("[data-editor-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.editorTarget;
      document.querySelectorAll("[data-editor-target]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-editor-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.editorPanel === target));
    });
  });

  return () => syncControls(character);
}

function fillDamageTypeSelects() {
  const damageTypes = Object.keys(assets.damageIcons);
  document.querySelectorAll("[data-damage-type-select]").forEach((select) => {
    select.innerHTML = `<option value="">None</option>${damageTypes.map((type) => `<option value="${type}">${type}</option>`).join("")}`;
  });
}

function setupSliderPreview(sliders, handlers) {
  sliders.forEach((slider) => {
    slider.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();

      const pointerId = event.pointerId;
      const startX = event.clientX;
      const startValue = Number(slider.value);
      const min = Number(slider.min || 0);
      const max = Number(slider.max || 100);
      const step = Number(slider.step || 1);
      const dragWidth = Math.max(180, window.innerWidth * 0.8);

      handlers.onStart?.(slider);

      const move = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        const raw = startValue + ((moveEvent.clientX - startX) / dragWidth) * (max - min);
        const stepped = Math.round(raw / step) * step;
        slider.value = Math.min(max, Math.max(min, stepped));
        slider.dispatchEvent(new Event("input", { bubbles: true }));
      };

      const finish = (upEvent) => {
        if (upEvent.pointerId !== pointerId) return;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
        handlers.onEnd?.(slider);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", finish);
      window.addEventListener("pointercancel", finish);
    });
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fillAssetSelects(character) {
  document.querySelectorAll("[data-asset-select]").forEach((select) => {
    const group = select.dataset.assetSelect;
    select.innerHTML = assets[group].map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  });
}

function fillTraitEditor(character, onChange) {
  const host = document.getElementById("traitEditor");
  if (!host) return;
  host.innerHTML = assets.traits.map((trait) => `
    <div class="trait-pick" tabindex="0" data-trait-body="${trait.id}" aria-expanded="false">
      <img src="../assets/${trait.src}" alt="" />
      <span class="trait-copy"><strong>${escapeHtml(trait.label)}</strong><span class="trait-description">${escapeHtml(trait.description)}</span></span>
      <input type="checkbox" data-trait-id="${trait.id}" aria-label="Add ${escapeHtml(trait.label)}" />
    </div>
  `).join("");

  const toggleDescription = (item) => {
    const expanded = !item.classList.contains("expanded");
    item.classList.toggle("expanded", expanded);
    item.setAttribute("aria-expanded", String(expanded));
  };

  host.querySelectorAll("[data-trait-body]").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.closest('input[type="checkbox"]')) return;
      toggleDescription(item);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.matches('input[type="checkbox"]')) return;
      event.preventDefault();
      toggleDescription(item);
    });
  });

  host.querySelectorAll("[data-trait-id]").forEach((checkbox) => {
    checkbox.checked = character.traits.includes(checkbox.dataset.traitId);
    checkbox.addEventListener("change", () => {
      const id = checkbox.dataset.traitId;
      character.traits = checkbox.checked
        ? [...new Set([...character.traits, id])].slice(0, 6)
        : character.traits.filter((traitId) => traitId !== id);
      syncControls(character);
      onChange();
    });
  });

  const search = document.getElementById("traitSearch");
  search?.addEventListener("input", () => filterLibrary(host, search.value, ".trait-pick"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fillAbilityLibraries(character, onChange) {
  for (const kind of ["active", "passive"]) {
    const host = document.getElementById(`${kind}AbilityLibrary`);
    const search = document.getElementById(`${kind}AbilitySearch`);
    if (!host) continue;
    host.innerHTML = assets.abilities.map((ability) => `
      <button class="asset-pick" type="button" data-ability-id="${ability.id}" title="${ability.label}">
        <img src="../assets/${ability.src}" alt="" />
        <span>${ability.label}</span>
      </button>
    `).join("");
    host.addEventListener("click", (event) => {
      const button = event.target.closest("[data-ability-id]");
      if (!button) return;
      character.abilities[kind].iconId = button.dataset.abilityId;
      character.abilities[kind].src = "";
      onChange();
    });
    search?.addEventListener("input", () => filterLibrary(host, search.value, ".asset-pick"));
  }
}

function filterLibrary(host, query, selector) {
  const needle = query.trim().toLowerCase();
  host.querySelectorAll(selector).forEach((item) => {
    item.hidden = Boolean(needle) && !item.textContent.toLowerCase().includes(needle);
  });
}

function syncControls(character) {
  document.querySelectorAll("[data-bind]").forEach((control) => {
    const value = getPath(character, control.dataset.bind);
    if (control.type === "checkbox") control.checked = Boolean(value);
    else if (control.value !== String(value ?? "")) control.value = value ?? "";
  });

  document.querySelectorAll("[data-trait-id]").forEach((checkbox) => {
    checkbox.checked = character.traits.includes(checkbox.dataset.traitId);
  });
}
