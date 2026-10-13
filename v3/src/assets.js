import { abilityCatalog, traitCatalog } from "./catalogs.js";

export const ASSET_BASE = "../assets/";

export const assets = {
  backgrounds: [
    { id: "lions_adamant", label: "Lions Adamant", src: "backgrounds/Background_Lions_Adamant.jpg" },
    { id: "world_eaters", label: "World Eaters", src: "backgrounds/Background_World_Eaters.jpg" }
  ],
  portraits: [
    { id: "marec", label: "Marec", src: "portraits/marec2.png" },
    { id: "lotarra", label: "Lotarra Sarrin", src: "portraits/Lotarra.png" }
  ],
  allegiances: [
    { id: "imperium", label: "Imperium", src: "factionIcons/Ultramarines_Icon.png" },
    { id: "black_templars", label: "Black Templars", src: "factionIcons/Black_Templars_Icon.png" },
    { id: "dark_angels", label: "Dark Angels", src: "factionIcons/Dark_Angels_Icon.png" },
    { id: "space_wolves", label: "Space Wolves", src: "factionIcons/Space_Wolves_Icon.png" },
    { id: "adeptus_custodes", label: "Adeptus Custodes", src: "factionIcons/Adeptus_Custodes_Icon.png" },
    { id: "astra_militarum", label: "Astra Militarum", src: "factionIcons/Astra_Militarum_Icon.png" },
    { id: "world_eaters", label: "World Eaters", src: "factionIcons/World_Eaters_Icon.png" }
  ],
  abilities: [
    { id: "marec_active", label: "From Oblivion...", src: "abilityIcons/MarecActive.png" },
    { id: "marec_passive", label: "...To Oblivion", src: "abilityIcons/MarecPassive.png" },
    { id: "lotarra_active", label: "Lotarra Active", src: "abilityIcons/Ahriman_Ability_1_Icon.png" },
    ...abilityCatalog
  ],
  traits: traitCatalog,
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
    Bio: "damageIcons/Bio_Icon.png",
    Power: "damageIcons/Power_Icon.png",
    Melta: "damageIcons/Melta_Icon.png",
    Pulse: "damageIcons/Pulse_Icon.png"
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
