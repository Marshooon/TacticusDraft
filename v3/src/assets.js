import { abilityCatalog, traitCatalog } from "./catalogs.js";

export const ASSET_BASE = "../assets/";

export const assets = {
  backgrounds: [
    { id: "astra_militarum", label: "Astra Militarum", src: "backgrounds/Background_Astra_Militarum.jpg" },
    { id: "bile_pits", label: "Bile Pits", src: "backgrounds/Background_Bile_Pits.png" },
    { id: "black_legion", label: "Black Legion", src: "backgrounds/Background_Black_Legion.jpg" },
    { id: "blood_angels", label: "Blood Angels", src: "backgrounds/Background_Blood_Angels.jpg" },
    { id: "custodes", label: "Custodes", src: "backgrounds/Background_Custodes.jpg" },
    { id: "dark_angels", label: "Dark Angels", src: "backgrounds/Background_Dark_Angels.jpg" },
    { id: "eldar", label: "Eldar", src: "backgrounds/Background_Eldar.jpg" },
    { id: "emperors_children", label: "Emperor's Children", src: "backgrounds/Background_Emperors_Children.jpg" },
    { id: "genestealers", label: "Genestealers", src: "backgrounds/Background_Genestealers.jpg" },
    { id: "golden_hall", label: "Golden Hall", src: "backgrounds/Background_Golden_Hall.png" },
    { id: "imperium_ruins", label: "Imperium Ruins", src: "backgrounds/Background_Imperium_Ruins.png" },
    { id: "lions_adamant", label: "Lions Adamant", src: "backgrounds/Background_Lions_Adamant.jpg" },
    { id: "mechanicus", label: "Mechanicus", src: "backgrounds/Background_Mechanicus.jpg" },
    { id: "orkz", label: "Orkz", src: "backgrounds/Background_Orkz.jpg" },
    { id: "spacewolves", label: "Space Wolves", src: "backgrounds/Background_SpaceWolves.jpg" },
    { id: "tau", label: "T'au Empire", src: "backgrounds/Background_Tau.jpg" },
    { id: "thousand_sons", label: "Thousand Sons", src: "backgrounds/Background_Thousand_Sons.jpg" },
    { id: "tyranids", label: "Tyranids", src: "backgrounds/Background_Tyranids.jpg" },
    { id: "ultramarines", label: "Ultramarines", src: "backgrounds/Background_Ultramarines.jpg" },
    { id: "verdant_lions", label: "Verdant Lions", src: "backgrounds/Background_Verdant_Lions.png" },
    { id: "world_eaters", label: "World Eaters", src: "backgrounds/Background_World_Eaters.jpg" },
    { id: "xenos_mauseleoum", label: "Xenos Mausoleum", src: "backgrounds/Background_Xenos_Mauseleoum.jpg" }
  ],
  portraits: [
    { id: "marec", label: "Marec", src: "portraits/marec2.png" },
    { id: "lotarra", label: "Lotarra Sarrin", src: "portraits/Lotarra.png" }
  ],
  allegiances: [
    { id: "imperium", label: "Ultramarines", src: "factionIcons/Ultramarines_Icon.png" },
    { id: "adepta_sororitas", label: "Adepta Sororitas", src: "factionIcons/Adepta_Sororitas_Icon.png" },
    { id: "adeptus_mechanicus", label: "Adeptus Mechanicus", src: "factionIcons/Adeptus_Mechanicus_Icon.png" },
    { id: "black_templars", label: "Black Templars", src: "factionIcons/Black_Templars_Icon.png" },
    { id: "black_legion", label: "Black Legion", src: "factionIcons/Black_Legion_Icon.png" },
    { id: "blood_angels", label: "Blood Angels", src: "factionIcons/Blood_Angels_Icon.png" },
    { id: "dark_angels", label: "Dark Angels", src: "factionIcons/Dark_Angels_Icon.png" },
    { id: "death_guard", label: "Death Guard", src: "factionIcons/Death_Guard_Icon.png" },
    { id: "emperors_children", label: "Emperor's Children", src: "factionIcons/Emperors_Children_Icon.png" },
    { id: "genestealer_cults", label: "Genestealer Cults", src: "factionIcons/Genestealer_Cults_Icon.png" },
    { id: "necrons", label: "Necrons", src: "factionIcons/Necrons_Icon.png" },
    { id: "orks", label: "Orks", src: "factionIcons/Orks_Icon.png" },
    { id: "space_wolves", label: "Space Wolves", src: "factionIcons/Space_Wolves_Icon.png" },
    { id: "adeptus_custodes", label: "Adeptus Custodes", src: "factionIcons/Adeptus_Custodes_Icon.png" },
    { id: "astra_militarum", label: "Astra Militarum", src: "factionIcons/Astra_Militarum_Icon.png" },
    { id: "aeldari", label: "Aeldari", src: "factionIcons/Aeldari_Icon.png" },
    { id: "tau_empire", label: "T'au Empire", src: "factionIcons/Tau_Empire_Icon.png" },
    { id: "thousand_sons", label: "Thousand Sons", src: "factionIcons/Thousand_Sons_Icon.png" },
    { id: "tyranids", label: "Tyranids", src: "factionIcons/Tyranids_Icon.png" },
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
    { id: "crit_booster", label: "Crit Booster", src: "equipmentIcons/Crit_Booster_Icon (1).png" },
    { id: "block_booster", label: "Block Booster", src: "equipmentIcons/Block_Booster_Icon (1).png" },
    { id: "defensive", label: "Defensive Item", src: "equipmentIcons/Defensive_Item_Icon (1).png" }
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
