import { assets } from "./assets.js";
import { getPath, setPath } from "./state.js";

export function setupEditor(character, onChange) {
  fillAssetSelects(character);
  fillTraitEditor(character, onChange);
  syncControls(character);

  document.querySelectorAll("[data-bind]").forEach((control) => {
    control.addEventListener("input", () => {
      const value = control.type === "number" || control.type === "range"
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
}

function syncControls(character) {
  document.querySelectorAll("[data-bind]").forEach((control) => {
    const value = getPath(character, control.dataset.bind);
    if (control.value !== String(value ?? "")) control.value = value ?? "";
  });

  document.querySelectorAll("[data-trait-id]").forEach((checkbox) => {
    checkbox.checked = character.traits.includes(checkbox.dataset.traitId);
  });
}
