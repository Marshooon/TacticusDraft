export const ASSET_BASE = "../assets/";

export const assets = {
  backgrounds: [
    { id: "lions_adamant", label: "Lions Adamant", src: "backgrounds/Background_Lions_Adamant.jpg" }
  ],
  portraits: [
    { id: "marec", label: "Marec", src: "portraits/marec2.png" }
  ],
  allegiances: [
    { id: "imperium", label: "Imperium", src: "factionIcons/Ultramarines_Icon.png" },
    { id: "black_templars", label: "Black Templars", src: "factionIcons/Black_Templars_Icon.png" },
    { id: "dark_angels", label: "Dark Angels", src: "factionIcons/Dark_Angels_Icon.png" },
    { id: "space_wolves", label: "Space Wolves", src: "factionIcons/Space_Wolves_Icon.png" },
    { id: "adeptus_custodes", label: "Adeptus Custodes", src: "factionIcons/Adeptus_Custodes_Icon.png" },
    { id: "astra_militarum", label: "Astra Militarum", src: "factionIcons/Astra_Militarum_Icon.png" }
  ],
  abilities: [
    { id: "marec_active", label: "From Oblivion...", src: "abilityIcons/MarecActive.png" },
    { id: "marec_passive", label: "...To Oblivion", src: "abilityIcons/MarecPassive.png" }
  ],
  traits: [
    { id: "healer", label: "Healer", src: "traitIcons/Healer_Icon.png", description: "As its action, this unit heals a friendly unit. The health restored equals the healer's damage multiplied by the highest number of hits from any of its weapons." },
    { id: "gravis", label: "Mk X Gravis", src: "traitIcons/Mk_X_Gravis_Icon.png", description: "Incoming damage must pass through armour twice. This does not apply to critical hits." },
    { id: "resilient", label: "Resilient", src: "traitIcons/Resilient_Icon.png", description: "If this unit would be defeated and is above one health, its health is reduced to one instead, unless it is overkilled." }
  ],
  statIcons: {
    health: "statIcons/Health_Icon.png",
    armor: "statIcons/Armor_Icon.png",
    damage: "statIcons/Damage_Icon.png",
    move: "statIcons/Move_Icon.png",
    melee: "statIcons/Melee_Icon.png",
    ranged2: "statIcons/Ranged_2_Icon.png",
    hits: "statIcons/hits.png",
    crit: "statIcons/Crit_Icon.png",
    chance: "statIcons/Chance_Icon.png",
    block: "statIcons/Block_Icon.png"
  },
  damageIcons: {
    Power: "damageIcons/Power_Icon.png",
    Melta: "damageIcons/Melta_Icon.png"
  },
  equipment: [
    { id: "crit", label: "Crit Item", src: "equipmentIcons/Crit_Item_Icon.png" },
    { id: "block", label: "Block Item", src: "equipmentIcons/Block_Item_Icon (1).png" },
    { id: "booster", label: "Crit Booster", src: "equipmentIcons/Crit_Booster_Icon (1).png" }
  ],
  rankIcons: {
    common: { src: "rankIcons/Gold_Star.png", count: 2 },
    uncommon: { src: "rankIcons/Gold_Star.png", count: 4 },
    rare: { src: "rankIcons/Red_Star.png", count: 1 },
    epic: { src: "rankIcons/Red_Star.png", count: 3 },
    legendary: { src: "rankIcons/Legendary_Star.png", count: 1 }
  }
};

export function assetUrl(path) {
  if (!path || path.startsWith("data:") || path.startsWith("blob:")) return path;
  return `${ASSET_BASE}${path}`;
}

export function byId(group, id) {
  return assets[group].find((item) => item.id === id);
}
