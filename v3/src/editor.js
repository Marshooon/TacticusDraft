import { assets } from "./assets.js";
import { getPath, setPath } from "./state.js";

export function setupEditor(character, onChange) {
  fillAssetSelects(character);
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
    <label class="trait-pick">
      <img src="../assets/${trait.src}" alt="" />
      <span>${trait.label}</span>
      <input type="checkbox" data-trait-id="${trait.id}" />
    </label>
  `).join("");

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
