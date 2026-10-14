export const defaultCharacter = {
  identity: {
    name: "Marec",
    title: "Warden of the Archine",
    description: "Marec is the founder and Chapter Master of the Lions Adamant, forged by the catastrophe that consumed Yridian Kell. He leads his Chapter with cold certainty, enduring every assault before relegating the enemy to distant memory.",
    unlock: "Unlocked from the Secrets of The Kell Legendary event by collecting Forgotten Dataslates.",
    rarity: "legendary",
    allegianceId: "imperium"
  },
  scene: {
    backgroundId: "lions_adamant",
    backgroundSrc: "",
    portraitId: "marec",
    portraitSrc: "",
    portrait: {
      zoom: 104,
      focalX: 50,
      focalY: 45
    },
    lighting: {
      tintEnabled: true, tintColor: "#ca611c", tintStrength: 37,
      lightEnabled: true, lightColor: "#f18c09", lightStrength: 30, lightAngle: 141,
      shadowEnabled: true, shadowColor: "#000000", shadowStrength: 36, shadowAngle: 312,
      groundEnabled: true, groundColor: "#000000", groundStrength: 104,
      groundSize: 102, groundBlur: 23, groundOffsetX: 0, groundOffsetY: 18
    }
  },
  abilities: {
    active: {
      iconId: "marec_active",
      src: "",
      name: "From Oblivion...",
      description: "Marec gains +10% Crit Damage and +10% Crit Chance. After taking damage equal to 30% of their HP from one attack, this ability may be used again.",
      position: { x: 0, y: 2, zoom: 117 }
    },
    passive: {
      iconId: "marec_passive",
      src: "",
      name: "...To Oblivion",
      description: "Whenever Marec scores a Critical Hit, adjacent friendly Characters are healed for 2000 Health.",
      position: { x: 0, y: 1, zoom: 109 }
    }
  },
  traits: ["trait_healer_icon", "trait_mk_x_gravis_icon", "trait_resilient_icon"],
  customTrait: {
    enabled: false,
    name: "",
    description: "",
    iconId: "trait_healer_icon",
    src: ""
  },
  stats: {
    health: 9400,
    armor: 2200,
    damage: 2656,
    move: 3
  },
  attacks: {
    melee: { type: "Power", hits: 2 },
    ranged: { type: "Melta", hits: 2, range: 2 }
  },
  crit: {
    value: "2213",
    chance: "25%"
  },
  block: {
    value: "1204",
    chance: "30%"
  },
  equipment: [
    { id: "crit" },
    { id: "block" },
    { id: "crit_booster" }
  ],
  progress: {
    level: 40,
    xpText: "Maximum for Current Character Rarity"
  }
};

export const state = structuredClone(defaultCharacter);

export const presets = [
  { key: "marec", label: "Marec", subtitle: "Legendary - Lions Adamant", character: defaultCharacter },
  {
    key: "lotarra_sarrin",
    label: "Lotarra Sarrin",
    subtitle: "Epic - World Eaters",
    character: {
      identity: {
        name: "Lotarra Sarrin",
        title: "The Mistress",
        description: "When the influence of Khorne began to consume the World Eaters, Angron, and even the Conqueror itself, Lotara was one of the very last members who refused to succumb to it. Eventually though it claimed her as well, and the insane machine spirit of the flagship merged with her, becoming the psychotic revenant known as The Mistress. This fusion in a sense shattered Lotara's very soul, and remnants of her mortal life still haunt the halls of the ship, while the wicked wraith that sits upon the ship's throne barks orders and madness, still believing the Heresy to be in full swing despite it being 10,000 years later.",
        unlock: "asdfv",
        rarity: "epic",
        allegianceId: "world_eaters"
      },
      scene: {
        backgroundId: "world_eaters",
        backgroundSrc: "",
        portraitId: "lotarra",
        portraitSrc: "",
        portrait: { zoom: 105, focalX: 48, focalY: 52 },
        lighting: {
          tintEnabled: true, tintColor: "#ff0000", tintStrength: 9,
          lightEnabled: true, lightColor: "#d32203", lightStrength: 31, lightAngle: 141,
          shadowEnabled: true, shadowColor: "#803900", shadowStrength: 36, shadowAngle: 306,
          groundEnabled: true, groundColor: "#000000", groundStrength: 104,
          groundSize: 124, groundBlur: 17, groundOffsetX: 0, groundOffsetY: 44
        }
      },
      abilities: {
        active: { iconId: "lotarra_active", src: "", name: "asdf", description: "asdfas", position: { x: 0, y: 0, zoom: 100 } },
        passive: { iconId: "", src: "", name: "", description: "", position: { x: 0, y: 0, zoom: 100 } }
      },
      traits: [],
      customTrait: { enabled: false, name: "", description: "", iconId: "trait_healer_icon", src: "" },
      stats: { health: 3325, armor: 874, damage: 2293, move: 3 },
      attacks: {
        melee: { type: "Bio", hits: 1 },
        ranged: { type: "Pulse", hits: 1, range: 2 }
      },
      crit: { value: "+1121", chance: "40%" },
      block: { value: "+874", chance: "20%" },
      equipment: [{ id: "" }, { id: "" }, { id: "" }],
      progress: { level: 40, xpText: "Maximum for Current Character Rarity" }
    }
  }
];

export function applyPreset(target, preset) {
  const next = structuredClone(preset.character);
  next.customTrait ||= structuredClone(defaultCharacter.customTrait);
  next.equipment?.forEach((slot) => {
    if (slot.id === "booster") slot.id = "crit_booster";
  });
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, next);
}

export function getPath(target, path) {
  return path.split(".").reduce((value, part) => value?.[part], target);
}

export function setPath(target, path, nextValue) {
  const parts = path.split(".");
  const leaf = parts.pop();
  const host = parts.reduce((value, part) => value[part], target);
  host[leaf] = nextValue;
}
