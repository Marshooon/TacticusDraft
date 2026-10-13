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
    }
  },
  abilities: {
    active: {
      iconId: "marec_active",
      src: "",
      name: "From Oblivion...",
      description: "Marec gains +10% Crit Damage and +10% Crit Chance. After taking damage equal to 30% of their HP from one attack, this ability may be used again."
    },
    passive: {
      iconId: "marec_passive",
      src: "",
      name: "...To Oblivion",
      description: "Whenever Marec scores a Critical Hit, adjacent friendly Characters are healed for 2000 Health."
    }
  },
  traits: ["healer", "gravis", "resilient"],
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
    { id: "booster" }
  ],
  progress: {
    level: 40,
    xpText: "Maximum for Current Character Rarity"
  }
};

export const state = structuredClone(defaultCharacter);

export function getPath(target, path) {
  return path.split(".").reduce((value, part) => value?.[part], target);
}

export function setPath(target, path, nextValue) {
  const parts = path.split(".");
  const leaf = parts.pop();
  const host = parts.reduce((value, part) => value[part], target);
  host[leaf] = nextValue;
}
