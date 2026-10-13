(() => {
  const preset = {
    key: "lotarra_sarrin",
    label: "Lotarra Sarrin",
    subtitle: "Epic - World Eaters",
    name: "Lotarra Sarrin",
    title: "The Mistress",
    description: "When the influence of Khorne began to consume the World Eaters, Angron, and even the Conqueror itself, Lotara was one of the very last members who refused to succumb to it. Eventually though it claimed her as well, and the insane machine spirit of the flagship merged with her, becoming the psychotic revenant known as The Mistress. This fusion in a sense shattered Lotara's very soul, and remnants of her mortal life still haunt the halls of the ship, while the wicked wraith that sits upon the ship's throne barks orders and madness, still believing the Heresy to be in full swing despite it being 10,000 years later.",
    unlockRequirements: "asdfv",
    rarity: "epic",
    bgKey: "world_eaters",
    portrait: "assets/portraits/Lotarra.png",
    portraitPosition: { x: "-11", y: "44", zoom: "105" },
    lighting: {
      portraitTintEnabled: true,
      portraitTintColor: "#ff0000",
      portraitTintStrength: "9",
      portraitLightEnabled: true,
      portraitLightColor: "#d32203",
      portraitLightStrength: "31",
      portraitLightAngle: "141",
      portraitShadowEnabled: true,
      portraitShadowColor: "#803900",
      portraitShadowStrength: "36",
      portraitShadowAngle: "306",
      portraitGroundEnabled: true,
      portraitGroundColor: "#000000",
      portraitGroundStrength: "104",
      portraitGroundSize: "124",
      portraitGroundBlur: "17",
      portraitGroundOffsetX: "0",
      portraitGroundOffsetY: "44"
    },
    traits: [],
    stats: { health: "3325", armor: "874", damage: "2293", move: "3" },
    equipment: [{ label: "", icon: "" }, { label: "", icon: "" }, { label: "", icon: "" }],
    melee: { enabled: true, type: "Bio", hits: "1" },
    ranged: { enabled: true, type: "Pulse", hits: "1", pattern: "range2" },
    crit: { enabled: true, value: "+1121", chance: "40%" },
    block: { enabled: true, value: "+874", chance: "20%" },
    abilities: {
      activeIcon: "assets/abilityIcons/Ahriman_Ability_1_Icon.png",
      passiveIcon: "",
      activeTitle: "asdf",
      passiveTitle: "",
      activeDesc: "asdfas",
      passiveDesc: "",
      activePosition: { x: "0", y: "0", zoom: "100" },
      passivePosition: { x: "0", y: "0", zoom: "100" }
    }
  };

  const presetList = document.getElementById("presetList");
  if (!presetList || typeof window.applyPresetCharacter !== "function") return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "preset-button";
  button.innerHTML = `${preset.label}<span>${preset.subtitle}</span>`;
  button.addEventListener("click", () => {
    window.applyPresetCharacter(preset);
    const unlockInput = document.getElementById("unlockRequirementsInput");
    if (unlockInput) {
      unlockInput.value = preset.unlockRequirements;
      unlockInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  presetList.appendChild(button);
})();
