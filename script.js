const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const unlockRequirementsInput = document.getElementById("unlockRequirementsInput");
const unlockRequirementsPreview = document.getElementById("unlockRequirementsPreview");
const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const phoneRoot = document.getElementById("phoneRoot");
const phoneShell = document.querySelector(".phone-shell");
const rarityButtons = document.querySelectorAll("#rarityChoices .pill-btn");
const wizardTabs = document.querySelectorAll(".wizard-tab");
const wizardPanels = document.querySelectorAll(".wizard-panel");
const mobileWizardQuery = window.matchMedia("(max-width: 775px)");
const SHOW_UTILITIES_TAB = true;
const SHOW_UI_TEST_TAB = false;
const toggleReference = document.getElementById("toggleReference");
const exportHtmlButton = document.getElementById("exportHtmlButton");
const assetsFolderButton = document.getElementById("assetsFolderButton");
const assetsFolderInput = document.getElementById("assetsFolderInput");
const assetsTab = document.getElementById("assetsTab");
const exportAssetMap = new Map();
const isLocalFile = window.location.protocol === "file:";
const screenEl = document.querySelector(".screen");
const topPanel = document.querySelector(".top-panel");
const phoneLock = document.getElementById("phoneLock");
const presetList = document.getElementById("presetList");
const healthInput = document.getElementById("healthInput");
const armorInput = document.getElementById("armorInput");
const damageInput = document.getElementById("damageInput");
const moveInput = document.getElementById("moveInput");
const statHealth = document.getElementById("statHealth");
const statArmor = document.getElementById("statArmor");
const statDamage = document.getElementById("statDamage");
const statMove = document.getElementById("statMove");
const meleeEnabled = document.getElementById("meleeEnabled");
const rangeEnabled = document.getElementById("rangeEnabled");
const meleeTypeSelect = document.getElementById("meleeTypeSelect");
const rangeTypeSelect = document.getElementById("rangeTypeSelect");
const rangePatternSelect = document.getElementById("rangePatternSelect");
const meleeHitsInput = document.getElementById("meleeHitsInput");
const rangeHitsInput = document.getElementById("rangeHitsInput");
const meleeAttackRow = document.getElementById("meleeAttackRow");
const rangeAttackRow = document.getElementById("rangeAttackRow");
const meleeTypeIcon = document.getElementById("meleeTypeIcon");
const rangeTypeIcon = document.getElementById("rangeTypeIcon");
const rangeKindIcon = document.getElementById("rangeKindIcon");
const meleeTypeLabel = document.getElementById("meleeTypeLabel");
const rangeTypeLabel = document.getElementById("rangeTypeLabel");
const meleeHits = document.getElementById("meleeHits");
const rangeHits = document.getElementById("rangeHits");
const critEnabled = document.getElementById("critEnabled");
const blockEnabled = document.getElementById("blockEnabled");
const critValueInput = document.getElementById("critValueInput");
const critChanceInput = document.getElementById("critChanceInput");
const blockValueInput = document.getElementById("blockValueInput");
const blockChanceInput = document.getElementById("blockChanceInput");
const critValue = document.getElementById("critValue");
const critChance = document.getElementById("critChance");
const blockValue = document.getElementById("blockValue");
const blockChance = document.getElementById("blockChance");
const critRow = document.getElementById("critRow");
const blockRow = document.getElementById("blockRow");
const activeTooltipTitleInput = document.getElementById("activeTooltipTitleInput");
const passiveTooltipTitleInput = document.getElementById("passiveTooltipTitleInput");
const activeTooltipInput = document.getElementById("activeTooltipInput");
const passiveTooltipInput = document.getElementById("passiveTooltipInput");
const DAMAGE_META = {
  Bio: { color: "#7ad383" },
  Blast: { color: "#ffb347" },
  Chain: { color: "#e0d87a" },
  Direct: { color: "#ffffff" },
  Energy: { color: "#5ad2ff" },
  Eviscerating: { color: "#ff8080" },
  Flame: { color: "#ff944d" },
  "Heavy Round": { color: "#d6c18f" },
  Las: { color: "#ffef7a" },
  Melta: { color: "#ffda7a" },
  Molecular: { color: "#c487ff" },
  Particle: { color: "#7afff4" },
  Physical: { color: "#f0f0f0" },
  Piercing: { color: "#ffb6c1" },
  Plasma: { color: "#5cf8ff" },
  Power: { color: "#8ef7ff" },
  Projectile: { color: "#d2d2d2" },
  Psychic: { color: "#c76dff" },
  Pulse: { color: "#79f0ff" },
  Toxic: { color: "#8ddf5a" }
};
const portraitUploadButton = document.getElementById("portraitUploadButton");
const portraitInput = document.getElementById("portraitInput");
const portraitImage = document.getElementById("portraitImage");
const portraitPlaceholder = document.getElementById("portraitPlaceholder");
const portraitTint = document.querySelector(".portrait-tint");
const portraitLight = document.querySelector(".portrait-light");
const portraitShadow = document.querySelector(".portrait-shadow");
const portraitGroundShadow = document.querySelector(".portrait-ground-shadow");
const portraitTintColor = document.getElementById("portraitTintColor");
const portraitTintStrength = document.getElementById("portraitTintStrength");
const portraitLightColor = document.getElementById("portraitLightColor");
const portraitLightStrength = document.getElementById("portraitLightStrength");
const portraitLightAngle = document.getElementById("portraitLightAngle");
const portraitTintEnabled = document.getElementById("portraitTintEnabled");
const portraitLightEnabled = document.getElementById("portraitLightEnabled");
const portraitShadowColor = document.getElementById("portraitShadowColor");
const portraitShadowStrength = document.getElementById("portraitShadowStrength");
const portraitShadowAngle = document.getElementById("portraitShadowAngle");
const portraitShadowEnabled = document.getElementById("portraitShadowEnabled");
const portraitGroundEnabled = document.getElementById("portraitGroundEnabled");
const portraitGroundColor = document.getElementById("portraitGroundColor");
const portraitGroundStrength = document.getElementById("portraitGroundStrength");
const portraitGroundSize = document.getElementById("portraitGroundSize");
const portraitGroundBlur = document.getElementById("portraitGroundBlur");
const portraitGroundOffsetX = document.getElementById("portraitGroundOffsetX");
const portraitGroundOffsetY = document.getElementById("portraitGroundOffsetY");

const DEFAULT_LIGHTING = {
  tintEnabled: true,
  tintColor: "#ca611c",
  tintStrength: "37",
  lightEnabled: true,
  lightColor: "#f18c09",
  lightStrength: "30",
  lightAngle: "141",
  shadowEnabled: true,
  shadowColor: "#000000",
  shadowStrength: "36",
  shadowAngle: "312",
  groundEnabled: true,
  groundColor: "#000000",
  groundStrength: "104",
  groundSize: "102",
  groundBlur: "23",
  groundOffsetX: "0",
  groundOffsetY: "18"
};
const portraitOffsetX = document.getElementById("portraitOffsetX");
const portraitOffsetY = document.getElementById("portraitOffsetY");
const portraitZoom = document.getElementById("portraitZoom");
const bgPresetList = document.getElementById("bgPresetList");
const activeAbilityUploadButton = document.getElementById("activeAbilityUploadButton");
const passiveAbilityUploadButton = document.getElementById("passiveAbilityUploadButton");
const activeAbilityInput = document.getElementById("activeAbilityInput");
const passiveAbilityInput = document.getElementById("passiveAbilityInput");
const activeAbilityIcon = document.getElementById("activeAbilityIcon");
const passiveAbilityIcon = document.getElementById("passiveAbilityIcon");
const activeAbilityOffsetX = document.getElementById("activeAbilityOffsetX");
const activeAbilityOffsetY = document.getElementById("activeAbilityOffsetY");
const activeAbilityZoom = document.getElementById("activeAbilityZoom");
const passiveAbilityOffsetX = document.getElementById("passiveAbilityOffsetX");
const passiveAbilityOffsetY = document.getElementById("passiveAbilityOffsetY");
const passiveAbilityZoom = document.getElementById("passiveAbilityZoom");
const shapeGlowStrength = document.getElementById("shapeGlowStrength");
const previewWrap = document.querySelector(".preview");
const traitList = document.getElementById("traitList");
const traitTooltip = document.getElementById("traitTooltip");
const wizard = document.querySelector(".wizard");
const traitStack = document.getElementById("traitStack");
const customTraitEnabled = document.getElementById("customTraitEnabled");
const customTraitFields = document.getElementById("customTraitFields");
const customTraitName = document.getElementById("customTraitName");
const customTraitDesc = document.getElementById("customTraitDesc");
const customTraitUploadButton = document.getElementById("customTraitUploadButton");
const customTraitInput = document.getElementById("customTraitInput");
const stackTraitTooltip = document.getElementById("stackTraitTooltip");
const customTraitSearch = document.getElementById("customTraitSearch");
const customTraitLibraryGrid = document.getElementById("customTraitLibraryGrid");
const activeIconLibraryGrid = document.getElementById("activeIconLibraryGrid");
const activeIconLibrarySearch = document.getElementById("activeIconLibrarySearch");
const passiveIconLibraryGrid = document.getElementById("passiveIconLibraryGrid");
const passiveIconLibrarySearch = document.getElementById("passiveIconLibrarySearch");
const identityCard = document.querySelector(".identity-card");
const characterTooltip = document.getElementById("characterTooltip");
const characterTooltipTitle = document.getElementById("characterTooltipTitle");
const characterTooltipBody = document.getElementById("characterTooltipBody");
const traitIcons = [
  document.getElementById("previewTrait1"),
  document.getElementById("previewTrait2"),
  document.getElementById("previewTrait3"),
  document.getElementById("previewTrait4"),
  document.getElementById("previewTrait5"),
  document.getElementById("previewTrait6")
];
const traitCircles = traitIcons.map(icon => icon.parentElement);
let customTraitIconSrc = "";
const TRAIT_DESCRIPTIONS = {
  "2 Man Team": "Takes a maximum of 50% of its max health from a single hit. This does not apply to Blast damage. Once below 50% of its max health, the unit cannot be healed above 50% again.",
  "Act of Faith": "This unit gains +10% crit chance and increases crit damage by 25% each time a friendly Imperial unit dies or kills an enemy. Once a unit with this trait crits, the bonus resets. There is no cap on the damage.",
  "Ambush": "The first time this unit is defeated it leaves behind a decoy. At the beginning of its next turn, if a decoy remains on the battlefield, it resurrects on a random friendly decoy with full health and can act immediately. Characters resurrect before non-character units.",
  "Battle Fatigue": "If a friendly unit is defeated in an adjacent hex, there is a 10% chance that the unit with this trait flees and is removed from battle; the chance increases by 40% if the defeat was an overkill.",
  "Beast Slayer": "Deals +20% melee damage to Big Targets and Vehicles. Has a 10% chance to block damage equal to 20% of its max health.",
  "Big Target": "Cannot gain bonuses from Tall Grass or Trenches. Adjacent friendly units take one fewer hit from ranged attacks (minimum one hit). This unit cannot be displaced.",
  "Blessings of Khorne": "Deals 3% more damage and takes 8% less psychic damage for each unit defeated in melee during the battle, up to eight defeated units.",
  "Camouflage": "Ranged attacks against this character score one fewer hit. This reduction becomes two hits if the character is more than two hexes from the attacker and three hits when in Tall Grass. Attackers always score at least one hit.",
  "Close Combat Weakness": "When adjacent to enemy units or starting the turn adjacent, this unit deals 50% less melee damage and 25% less ranged damage.",
  "Contagions of Nurgle": "Aura - Non-Chaos units within the aura temporarily lose 20% armour (40% if affected by overlapping auras). The aura radius increases as the battle progresses: rounds 1-2 range 1, rounds 3-4 range 2, round 5 and beyond range 3.",
  "Crushing Strike": "Using cumbersome melee weapons, this unit deals 50% more damage with normal melee attacks if it has not moved this turn.",
  "Daemon": "This unit has a 25% chance to block damage equal to 50% of its current damage stat.",
  "Dakka": "For attacks with range three or more, this unit scores two extra hits when the target is at range two.",
  "Deep Strike": "On this unit's first turn it may teleport into any free hex that is not adjacent to an enemy. It cannot be attacked until after teleporting. If it has a ranged attack it may attack after teleporting.",
  "Diminutive": "Due to its small size, incoming multi-hit attacks deal one fewer hit, down to a minimum of one hit.",
  "Emplacement": "Deals 50% less damage in melee and 50% more damage with ranged attacks if it has not moved this turn.",
  "Explodes": "When this unit dies it explodes, dealing damage equal to 25% of its max health to all adjacent units.",
  "Final Vengeance": "When this unit loses its last health, it immediately makes a normal attack on a valid target before being defeated, unless it is overkilled.",
  "Flying": "This unit can move over impassable hexes and enemies and can move between different elevations. It does not gain bonuses from Tall Grass or Trenches.",
  "Get Stuck In": "For every two hits scored against an enemy within range two there is a 30% chance to score an additional hit. If two or more friendly Orks or four or more friendly units are adjacent to the target, the chance becomes 100%. Normal attacks and passive effects count separately when counting hits.",
  "Healer": "As its action, this unit heals a friendly unit. The health restored equals the healer's damage multiplied by the highest number of hits from any of its weapons.",
  "Heavy Weapon": "Deals 25% more damage with ranged attacks if it has not moved this turn.",
  "Immune": "This unit is immune to special hexes and hex effects. Its armour, hit count, movement and range cannot be reduced. It also cannot be stunned, suppressed or taunted and does not take knockback damage. The trait appears on guild raid bosses and minibosses.",
  "Indirect Fire": "Can shoot over obscuring terrain and ignores trenches.",
  "Infiltrate": "This unit does not trigger overwatch.",
  "Instinctive Behaviour": "Must attack its nearest enemy whenever there are targets in range.",
  "Let the Galaxy Burn": "When attacking, has a 50% chance to score an additional hit against the target or an adjacent unit if neither is Chaos. It can damage adjacent friendly non-Chaos units.",
  "Living Metal": "Regenerates 10% of its max health at the start of each turn and counts as mechanical. Mechanical units cannot be healed and instead regenerate health through other effects.",
  "Martial Ka'tah": "Normal attacks against this unit deal 20% less damage. This unit deals 100% more damage against summons.",
  "Mechanic": "As its action, repairs a friendly mechanical unit. The health restored equals the mechanic's damage multiplied by the highest number of hits from any of its weapons.",
  "Mechanical": "Cannot be healed but can be repaired instead.",
  "Mk X Gravis": "Incoming damage must pass through armour twice. This does not apply to critical hits.",
  "Object": "Automatically acts at the beginning of the turn if it has an action. Cannot be healed or repaired. A player loses the battle if their only remaining units are objects.",
  "Overwatch": "A unit that has not attacked on its turn immediately attacks when an enemy moves into range during that enemy's turn. Normal adjacency and terrain restrictions apply.",
  "Parry": "Incoming melee multi-hit attacks deal one fewer hit, down to a minimum of one hit.",
  "Psyker": "When performing a ranged attack with psychic damage, this unit uses smite and deals 50% of that damage to a random enemy adjacent to the original target. Only works on ranged psychic attacks.",
  "Rapid Assault": "Has +1 movement until it makes a melee attack. Its first melee attack each battle and all following melee attacks in the same turn deal 25% more damage.",
  "Resilient": "If this unit would be defeated and is above one health, its health is reduced to one instead, unless it is overkilled.",
  "Shadow in the Warp": "Enemy psykers within two hexes deal 25% less psychic damage. Tyranid psykers are unaffected.",
  "Steppable": "Destroyed if stepped on directly. Can be hit by splash damage but cannot be targeted directly. Stepping on coins or blackstone in Salvage Run collects them rather than destroying them.",
  "Summon": "Moves and attacks automatically at the beginning of its turn. Usually AI-controlled units not part of the initial deployment act in the order they were summoned.",
  "Suppressive Fire": "An enemy hit by this unit becomes suppressed. Suppression reduces movement by one, reduces damage by 30% and prevents overwatch; the effect disappears after two rounds.",
  "Swarm": "Attacks once per individual member of the swarm. Each incoming hit damages only one swarm member. Blast damage effects do not apply. Healing affects only one member. A full swarm of five scores five hits; a single remaining member scores one hit.",
  "Synapse": "Friendly units within two hexes that have the Instinctive Behaviour trait behave normally and ignore Battle Fatigue.",
  "Terminator Armour": "The first hit each turn deals 75% less damage to this unit. Hits dealing psychic or direct damage are excluded.",
  "Terrifying": "Takes 30% less damage from melee attacks.",
  "Unstoppable": "Movement is not blocked by special hexes. Replaces the mounted trait.",
  "Vehicle": "Movement is not blocked by special hexes. Does not gain bonuses from Tall Grass. Cannot end movement on a trench but may move through it.",
  "Weaver of Fates": "In a turn when three or more enemy units have taken psychic damage, this unit deals the maximum possible damage with its attacks and abilities. It maximizes natural damage variance and uses the maximum value for abilities with variable damage. It does not automatically crit or chain crits."
};
// Ability icon library: add new icons by file path here (assets/abilityIcons).
const ABILITY_ICON_LIBRARY = [
  "assets/abilityIcons/Abaddon_The_Despoiler_Ability_1_Icon.webp",
  "assets/abilityIcons/Abaddon_The_Despoiler_Ability_2_Icon.webp",
  "assets/abilityIcons/Abraxas_Ability_1_Icon.webp",
  "assets/abilityIcons/Abraxas_Ability_2_Icon.webp",
  "assets/abilityIcons/Actus_Ability_1_Icon.webp",
  "assets/abilityIcons/Actus_Ability_2_Icon.webp",
  "assets/abilityIcons/Aesoth_Ability_1_Icon.webp",
  "assets/abilityIcons/Aesoth_Ability_2_Icon.webp",
  "assets/abilityIcons/Aethana_Ability_1_Icon.webp",
  "assets/abilityIcons/Aethana_Ability_2_Icon.webp",
  "assets/abilityIcons/Ahriman_Ability_1_Icon.webp",
  "assets/abilityIcons/Ahriman_Ability_2_Icon.webp",
  "assets/abilityIcons/Aleph-Null_Ability_1_Icon.webp",
  "assets/abilityIcons/Aleph-Null_Ability_2_Icon.webp",
  "assets/abilityIcons/Ancient_Thoread_Ability_1_Icon.webp",
  "assets/abilityIcons/Ancient_Thoread_Ability_2_Icon.webp",
  "assets/abilityIcons/Angrax_Ability_1_Icon.webp",
  "assets/abilityIcons/Angrax_Ability_2_Icon.webp",
  "assets/abilityIcons/Anuphet_Ability_1_Icon.webp",
  "assets/abilityIcons/Anuphet_Ability_2_Icon.webp",
  "assets/abilityIcons/Archimatos_Ability_1_Icon.webp",
  "assets/abilityIcons/Archimatos_Ability_2_Icon.webp",
  "assets/abilityIcons/Arjac_Ability_1_Icon.webp",
  "assets/abilityIcons/Arjac_Ability_2_Icon.webp",
  "assets/abilityIcons/Asmodai_Ability_1_Icon.webp",
  "assets/abilityIcons/Asmodai_Ability_2_Icon.webp",
  "assets/abilityIcons/Aun%27Shi_Ability_1_Icon.webp",
  "assets/abilityIcons/Aun%27Shi_Ability_2_Icon.webp",
  "assets/abilityIcons/Azkor_Ability_1_Icon.webp",
  "assets/abilityIcons/Azkor_Ability_2_Icon.webp",
  "assets/abilityIcons/Azrael_Ability_1_Icon.webp",
  "assets/abilityIcons/Azrael_Ability_2_Icon.webp",
  "assets/abilityIcons/Baraqiel_Ability_1_Icon.webp",
  "assets/abilityIcons/Baraqiel_Ability_2_Icon.webp",
  "assets/abilityIcons/Bellator_Ability_1_Icon.webp",
  "assets/abilityIcons/Bellator_Ability_2_Icon.webp",
  "assets/abilityIcons/Boss_Gulgortz_Ability_1_Icon.webp",
  "assets/abilityIcons/Boss_Gulgortz_Ability_2_Icon.webp",
  "assets/abilityIcons/Brother_Burchard_Ability_1_Icon.webp",
  "assets/abilityIcons/Brother_Burchard_Ability_2_Icon.webp",
  "assets/abilityIcons/Brother_Jaeger_Ability_1_Icon.webp",
  "assets/abilityIcons/Brother_Jaeger_Ability_2_Icon.webp",
  "assets/abilityIcons/Calandis_Ability_1_Icon.webp",
  "assets/abilityIcons/Calandis_Ability_2_Icon.webp",
  "assets/abilityIcons/Castellan_Creed_Ability_1_Icon.webp",
  "assets/abilityIcons/Castellan_Creed_Ability_2_Icon.webp",
  "assets/abilityIcons/Celestine_Ability_1_Icon.webp",
  "assets/abilityIcons/Celestine_Ability_2_Icon.webp",
  "assets/abilityIcons/Certus_Ability_1_Icon.webp",
  "assets/abilityIcons/Certus_Ability_2_Icon.webp",
  "assets/abilityIcons/Commissar_Yarrick_Ability_1_Icon.webp",
  "assets/abilityIcons/Commissar_Yarrick_Ability_2_Icon.webp",
  "assets/abilityIcons/Corrodius_Ability_1_Icon.webp",
  "assets/abilityIcons/Corrodius_Ability_2_Icon.webp",
  "assets/abilityIcons/Darkstrider_Ability_1_Icon.webp",
  "assets/abilityIcons/Darkstrider_Ability_2_Icon.webp",
  "assets/abilityIcons/Deathleaper_Ability_1_Icon.webp",
  "assets/abilityIcons/Deathleaper_Ability_2_Icon.webp",
  "assets/abilityIcons/Eldryon_Ability_1_Icon.webp",
  "assets/abilityIcons/Eldryon_Ability_2_Icon.webp",
  "assets/abilityIcons/Exitor-Rho_Ability_1_Icon.webp",
  "assets/abilityIcons/Exitor-Rho_Ability_2_Icon.webp",
  "assets/abilityIcons/Forcas_Ability_1_Icon.webp",
  "assets/abilityIcons/Forcas_Ability_2_Icon.webp",
  "assets/abilityIcons/Gibbascrapz_Ability_1_Icon.webp",
  "assets/abilityIcons/Gibbascrapz_Ability_2_Icon.webp",
  "assets/abilityIcons/Haarken_Worldclaimer_Ability_1_Icon.webp",
  "assets/abilityIcons/Haarken_Worldclaimer_Ability_2_Icon.webp",
  "assets/abilityIcons/High_Marshal_Helbrecht_Ability_1_Icon.webp",
  "assets/abilityIcons/High_Marshal_Helbrecht_Ability_2_Icon.webp",
  "assets/abilityIcons/Hollan_Ability_1_Icon.webp",
  "assets/abilityIcons/Hollan_Ability_2_Icon.webp",
  "assets/abilityIcons/Imospekh_Ability_1_Icon.webp",
  "assets/abilityIcons/Imospekh_Ability_2_Icon.webp",
  "assets/abilityIcons/Incisus_Ability_1_Icon.webp",
  "assets/abilityIcons/Incisus_Ability_2_Icon.webp",
  "assets/abilityIcons/Isaak_Ability_1_Icon.webp",
  "assets/abilityIcons/Isaak_Ability_2_Icon.webp",
  "assets/abilityIcons/Isabella_Ability_1_Icon.webp",
  "assets/abilityIcons/Isabella_Ability_2_Icon.webp",
  "assets/abilityIcons/Jain_Zar_Ability_1_Icon.webp",
  "assets/abilityIcons/Jain_Zar_Ability_2_Icon.webp",
  "assets/abilityIcons/Kariyan_Ability_1_Icon.webp",
  "assets/abilityIcons/Kariyan_Ability_2_Icon.webp",
  "assets/abilityIcons/Kharn_Ability_1_Icon.webp",
  "assets/abilityIcons/Kharn_Ability_2_Icon.webp",
  "assets/abilityIcons/Kut_Skoden_Ability_1_Icon.webp",
  "assets/abilityIcons/Kut_Skoden_Ability_2_Icon.webp",
  "assets/abilityIcons/Lucien_Ability_1_Icon.webp",
  "assets/abilityIcons/Lucien_Ability_2_Icon.webp",
  "assets/abilityIcons/Macer_Ability_1_Icon.webp",
  "assets/abilityIcons/Macer_Ability_2_Icon.webp",
  "assets/abilityIcons/Makhotep_Ability_1_Icon.webp",
  "assets/abilityIcons/Makhotep_Ability_2_Icon.webp",
  "assets/abilityIcons/Maladus_Ability_1_Icon.webp",
  "assets/abilityIcons/Maladus_Ability_2_Icon.webp",
  "assets/abilityIcons/Marneus_Calgar_Ability_1_Icon.webp",
  "assets/abilityIcons/Marneus_Calgar_Ability_2_Icon.webp",
  "assets/abilityIcons/Mataneo_Ability_1_Icon.webp",
  "assets/abilityIcons/Mataneo_Ability_2_Icon.webp",
  "assets/abilityIcons/Maugan_Ra_Ability_1_Icon.webp",
  "assets/abilityIcons/Maugan_Ra_Ability_2_Icon.webp",
  "assets/abilityIcons/Mephiston_Ability_1_Icon.webp",
  "assets/abilityIcons/Mephiston_Ability_2_Icon.webp",
  "assets/abilityIcons/Morvenn_Vahl_Ability_1_Icon.webp",
  "assets/abilityIcons/Morvenn_Vahl_Ability_2_Icon.webp",
  "assets/abilityIcons/Nauseous_Rotbone_Ability_1_Icon.webp",
  "assets/abilityIcons/Nauseous_Rotbone_Ability_2_Icon.webp",
  "assets/abilityIcons/Neurothrope_Ability_1_Icon.webp",
  "assets/abilityIcons/Neurothrope_Ability_2_Icon.webp",
  "assets/abilityIcons/Nicodemus_Ability_1_Icon.webp",
  "assets/abilityIcons/Nicodemus_Ability_2_Icon.webp",
  "assets/abilityIcons/Parasite_of_Mortrex_Ability_1_Icon.webp",
  "assets/abilityIcons/Parasite_of_Mortrex_Ability_2_Icon.webp",
  "assets/abilityIcons/Pestillian_Ability_1_Icon.webp",
  "assets/abilityIcons/Pestillian_Ability_2_Icon.webp",
  "assets/abilityIcons/Re%27vas_Ability_1_Icon.webp",
  "assets/abilityIcons/Re%27vas_Ability_2_Icon.webp",
  "assets/abilityIcons/Shadowsun_Ability_1_Icon.webp",
  "assets/abilityIcons/Shadowsun_Ability_2_Icon.webp",
  "assets/abilityIcons/Sho'Syl_Active.webp",
  "assets/abilityIcons/Sho'Syl_Passive.webp",
  "assets/abilityIcons/Snotflogga_Ability_1_Icon.webp",
  "assets/abilityIcons/Thaumachus_Ability_1_Icon.webp",
  "assets/abilityIcons/Thaumachus_Ability_2_Icon.webp",
  "assets/abilityIcons/Toth_Ability_1_Icon.webp",
  "assets/abilityIcons/Toth_Ability_2_Icon.webp",
  "assets/abilityIcons/Typhus_Ability_1_Icon.webp",
  "assets/abilityIcons/Typhus_Ability_2_Icon.webp",
  "assets/abilityIcons/Volk_Ability_1_Icon.webp",
  "assets/abilityIcons/Volk_Ability_2_Icon.webp",
  "assets/abilityIcons/Wrask_Ability_1_Icon.webp",
  "assets/abilityIcons/Wrask_Ability_2_Icon.webp",
  "assets/abilityIcons/Yazaghor_Ability_1_Icon.webp",
  "assets/abilityIcons/Yazaghor_Ability_2_Icon.webp"
];
const STAT_ICON_ASSETS = [
  "assets/statIcons/Health_Icon.png",
  "assets/statIcons/Armor_Icon.png",
  "assets/statIcons/Damage_Icon.png",
  "assets/statIcons/Move_Icon.png",
  "assets/statIcons/Melee_Icon.png",
  "assets/statIcons/Ranged_2_Icon.png",
  "assets/statIcons/Ranged_3_Icon.png",
  "assets/statIcons/Crit_Icon.png",
  "assets/statIcons/Chance_Icon.png",
  "assets/statIcons/Block_Icon.png"
];

function bindInput(input, output) {
  if (!input || !output) return;
  const update = () => {
    output.textContent = input.value || "";
  };
  input.addEventListener("input", update);
  update();
}

bindInput(nameInput, previewName);
bindInput(titleInput, previewTitle);
bindInput(healthInput, statHealth);
bindInput(armorInput, statArmor);
bindInput(damageInput, statDamage);
bindInput(moveInput, statMove);
bindInput(critValueInput, critValue);
bindInput(critChanceInput, critChance);
bindInput(blockValueInput, blockValue);
bindInput(blockChanceInput, blockChance);

if (unlockRequirementsInput && unlockRequirementsPreview) {
  const syncUnlockRequirements = () => {
    const value = unlockRequirementsInput.value.trim();
    unlockRequirementsPreview.textContent = value || "Unlock requirements";
  };
  unlockRequirementsInput.addEventListener("input", syncUnlockRequirements);
  syncUnlockRequirements();
}

// Trait list: add new traits here and matching entries in TRAIT_DESCRIPTIONS.
const TRAITS = [
  { label: "Act of Faith", icon: "Act_of_Faith_Icon.png" },
  { label: "2 Man Team", icon: "2-Man_Team_Icon.png" },
  { label: "Ambush", icon: "Ambush_Icon.png" },
  { label: "Battle Fatigue", icon: "Battle_Fatigue_Icon.png" },
  { label: "Beast Slayer", icon: "Beast_Slayer_Icon.png" },
  { label: "Big Target", icon: "Big_Target_Icon.png" },
  { label: "Blessings of Khorne", icon: "Blessings_of_Khorne_Icon.png" },
  { label: "Camouflage", icon: "Camouflage_Icon.png" },
  { label: "Close Combat Weakness", icon: "Close_Combat_Weakness_Icon.png" },
  { label: "Contagions of Nurgle", icon: "Contagions_of_Nurgle_Icon.png" },
  { label: "Crushing Strike", icon: "Crushing_Strike_Icon.png" },
  { label: "Daemon", icon: "Daemon_Icon.png" },
  { label: "Dakka", icon: "Dakka_Icon.png" },
  { label: "Deep Strike", icon: "Deep_Strike_Icon.png" },
  { label: "Diminutive", icon: "Diminutive_Icon.png" },
  { label: "Emplacement", icon: "Emplacement_Icon.png" },
  { label: "Explodes", icon: "Explodes_Icon.png" },
  { label: "Final Vengeance", icon: "Final_Vengeance_Icon.png" },
  { label: "Flying", icon: "Flying_Icon.png" },
  { label: "Get Stuck In", icon: "Get_Stuck_In_Icon.png" },
  { label: "Healer", icon: "Healer_Icon.png" },
  { label: "Heavy Weapon", icon: "Heavy_Weapon_Icon.png" },
  { label: "Immune", icon: "Immune_Icon.png" },
  { label: "Indirect Fire", icon: "Indirect_Fire_Icon.png" },
  { label: "Infiltrate", icon: "Infiltrate_Icon.png" },
  { label: "Instinctive Behaviour", icon: "Instinctive_Behaviour_Icon.png" },
  { label: "Let the Galaxy Burn", icon: "Let_the_Galaxy_Burn_Icon.png" },
  { label: "Living Metal", icon: "Living_Metal_Icon.png" },
  { label: "Martial Ka'tah", icon: "Martial_Ka%27tah_Icon.png" },
  { label: "Mechanic", icon: "Mechanic_Icon.png" },
  { label: "Mechanical", icon: "Mechanical_Icon.png" },
  { label: "Mk X Gravis", icon: "Mk_X_Gravis_Icon.png" },
  { label: "Object", icon: "Objact_Icon.png" },
  { label: "Overwatch", icon: "Overwatch_Icon.png" },
  { label: "Parry", icon: "Parry_Icon.png" },
  { label: "Psyker", icon: "Psyker_Icon.png" },
  { label: "Rapid Assault", icon: "Rapid_Assault_Icon.png" },
  { label: "Resilient", icon: "Resilient_Icon.png" },
  { label: "Shadow in the Warp", icon: "Shadow_in_the_Warp_Icon.png" },
  { label: "Steppable", icon: "Steppable_Icon.png" },
  { label: "Summon", icon: "Summon_Icon.png" },
  { label: "Suppressive Fire", icon: "Suppressive_Fire_Icon.png" },
  { label: "Swarm", icon: "Swarm_Icon.png" },
  { label: "Synapse", icon: "Synapse_Icon.png" },
  { label: "Terminator Armour", icon: "Terminator_Armour_Icon.png" },
  { label: "Terrifying", icon: "Terrifying_Icon.png" },
  { label: "Unstoppable", icon: "Unstoppable_Icon.png" },
  { label: "Vehicle", icon: "Vehicle_Icon.png" },
  { label: "Weaver of Fates", icon: "Weaver_of_Fates_Icon.png" }
];

function renderTraits() {
  if (!traitList) return;
  const frag = document.createDocumentFragment();
  TRAITS.forEach((trait, index) => {
    const label = document.createElement("label");
    label.className = "trait-option";
    label.dataset.trait = trait.label;
    label.dataset.description = TRAIT_DESCRIPTIONS[trait.label] || "Trait description goes here.";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "trait-checkbox";
    checkbox.dataset.icon = trait.icon;
    checkbox.dataset.label = trait.label;
    checkbox.id = `trait-${index}`;

    const text = document.createElement("span");
    text.textContent = trait.label;

    label.appendChild(checkbox);
    label.appendChild(text);
    frag.appendChild(label);
  });
  traitList.textContent = "";
  traitList.appendChild(frag);
}

function refreshTraitPreview() {
  const checkboxes = document.querySelectorAll(".trait-checkbox");
  const selected = Array.from(checkboxes).filter(cb => cb.checked);
  const customEnabled = Boolean(customTraitEnabled?.checked);
  const customName = (customTraitName?.value || "Custom Trait").trim();
  const customDesc = (customTraitDesc?.value || "").trim();
  const entries = selected.map(cb => ({
    label: cb.dataset.label,
    description: TRAIT_DESCRIPTIONS[cb.dataset.label] || "",
    icon: cb.dataset.icon ? `assets/traitIcons/${cb.dataset.icon}` : ""
  }));
  if (customEnabled) {
    entries.push({
      label: customName || "Custom Trait",
      description: customDesc,
      icon: customTraitIconSrc
    });
  }

  traitIcons.forEach((icon, i) => {
    const circle = traitCircles[i];
    const entry = entries[i];
    if (!entry) {
      circle.style.display = "none";
      icon.removeAttribute("src");
      icon.style.display = "none";
      circle.removeAttribute("data-trait-label");
      circle.removeAttribute("data-trait-desc");
      return;
    }

    circle.style.display = "flex";
    circle.dataset.traitLabel = entry.label || "";
    circle.dataset.traitDesc = entry.description || "";
    if (entry.icon) {
      icon.src = entry.icon;
      icon.style.display = "block";
      icon.style.width = "";
      icon.style.height = "";
      icon.style.objectFit = "contain";
    } else {
      icon.removeAttribute("src");
      icon.style.display = "none";
      icon.style.width = "";
      icon.style.height = "";
    }
  });

  const limit = 6;
  const lock = selected.length + (customEnabled ? 1 : 0) >= limit;
  checkboxes.forEach(cb => {
    if (!cb.checked) {
      cb.disabled = lock;
      cb.closest(".trait-option")?.classList.toggle("disabled", cb.disabled);
    } else {
      cb.disabled = false;
      cb.closest(".trait-option")?.classList.remove("disabled");
    }
  });
}

renderTraits();
traitList?.addEventListener("change", refreshTraitPreview);
refreshTraitPreview();

function updateCustomTraitState() {
  if (!customTraitFields) return;
  const enabled = Boolean(customTraitEnabled?.checked);
  customTraitFields.classList.toggle("is-disabled", !enabled);
}

function wireCustomTraitUpload() {
  if (!customTraitUploadButton || !customTraitInput) return;
  customTraitUploadButton.addEventListener("click", () => customTraitInput.click());
  customTraitInput.addEventListener("change", () => {
    const file = customTraitInput.files && customTraitInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      customTraitIconSrc = e.target.result;
      refreshTraitPreview();
    };
    reader.readAsDataURL(file);
  });
}

function renderCustomTraitLibrary() {
  if (!customTraitLibraryGrid) return;
  const query = (customTraitSearch?.value || "").trim().toLowerCase();
  customTraitLibraryGrid.textContent = "";
  const frag = document.createDocumentFragment();
  TRAITS.forEach((trait) => {
    const label = trait.label || "";
    if (query && !label.toLowerCase().includes(query)) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.src = `assets/traitIcons/${trait.icon}`;
    button.title = label;
    const img = document.createElement("img");
    img.src = `assets/traitIcons/${trait.icon}`;
    img.alt = label;
    button.appendChild(img);
    button.addEventListener("click", () => {
      customTraitIconSrc = `assets/traitIcons/${trait.icon}`;
      if (customTraitEnabled && !customTraitEnabled.checked) {
        customTraitEnabled.checked = true;
        updateCustomTraitState();
      }
      refreshTraitPreview();
    });
    frag.appendChild(button);
  });
  customTraitLibraryGrid.appendChild(frag);
}

customTraitEnabled?.addEventListener("change", () => {
  updateCustomTraitState();
  refreshTraitPreview();
});
customTraitName?.addEventListener("input", refreshTraitPreview);
customTraitDesc?.addEventListener("input", refreshTraitPreview);
updateCustomTraitState();
wireCustomTraitUpload();
customTraitSearch?.addEventListener("input", renderCustomTraitLibrary);
renderCustomTraitLibrary();

function positionStackTraitTooltip(circle, options = {}) {
  if (!stackTraitTooltip || !phoneRoot) return;
  const label = circle.dataset.traitLabel || "";
  const desc = circle.dataset.traitDesc || "";
  if (!label && !desc) return;
  if (stackTraitTooltip.parentElement !== phoneRoot) {
    phoneRoot.appendChild(stackTraitTooltip);
  }
  const titleEl = stackTraitTooltip.querySelector(".stack-trait-tooltip-title");
  const bodyEl = stackTraitTooltip.querySelector(".stack-trait-tooltip-body");
  if (titleEl) titleEl.textContent = label;
  if (bodyEl) bodyEl.textContent = desc;
  const rect = circle.getBoundingClientRect();
  const phoneRect = phoneRoot.getBoundingClientRect();
  const baseWidth = phoneRoot.offsetWidth || 1;
  const baseHeight = phoneRoot.offsetHeight || 1;
  const scale = phoneRect.height / baseHeight;
  const localLeft = (rect.left - phoneRect.left) / scale;
  const localTop = (rect.top - phoneRect.top) / scale;
  if (options.prepare) {
    stackTraitTooltip.style.display = "block";
    stackTraitTooltip.style.visibility = "hidden";
  }
  const tooltipWidth = stackTraitTooltip.offsetWidth;
  const tooltipHeight = stackTraitTooltip.offsetHeight;
  let left = localLeft - tooltipWidth - 12;
  let top = localTop + rect.height / (2 * scale) - tooltipHeight / 2;
  if (left < 8) {
    left = localLeft + rect.width / scale + 12;
  }
  const minLeft = 8;
  const maxLeft = Math.max(minLeft, baseWidth - tooltipWidth - 8);
  const minTop = 8;
  const maxTop = Math.max(minTop, baseHeight - tooltipHeight - 8);
  left = Math.min(Math.max(left, minLeft), maxLeft);
  top = Math.min(Math.max(top, minTop), maxTop);
  stackTraitTooltip.style.left = `${left}px`;
  stackTraitTooltip.style.top = `${top}px`;
  if (options.prepare) {
    stackTraitTooltip.style.visibility = "";
  }
}

traitCircles.forEach(circle => {
  circle.addEventListener("mouseenter", () => {
    if (!stackTraitTooltip || circle.style.display === "none") return;
    traitStack?.classList.add("is-hovering");
    positionStackTraitTooltip(circle, { prepare: true });
    stackTraitTooltip.classList.add("show");
    stackTraitTooltip.setAttribute("aria-hidden", "false");
  });
  circle.addEventListener("mousemove", () => {
    if (!stackTraitTooltip || circle.style.display === "none") return;
    positionStackTraitTooltip(circle);
  });
  circle.addEventListener("mouseleave", () => {
    if (!stackTraitTooltip) return;
    stackTraitTooltip.classList.remove("show");
    stackTraitTooltip.setAttribute("aria-hidden", "true");
    stackTraitTooltip.style.display = "none";
    traitStack?.classList.remove("is-hovering");
  });
});

function updateCharacterTooltipContent() {
  if (!characterTooltipTitle || !characterTooltipBody || !characterTooltip) return;
  const nameText = (nameInput?.value || previewName?.textContent || "").trim();
  const descText = (descriptionInput?.value || "").trim();
  characterTooltipTitle.textContent = nameText;
  characterTooltipBody.textContent = descText;
  const hasText = nameText || descText;
  characterTooltip.style.display = hasText ? "block" : "none";
  if (!hasText) {
    characterTooltip.classList.remove("show");
    characterTooltip.setAttribute("aria-hidden", "true");
  }
}

function positionCharacterTooltip() {
  if (!identityCard || !characterTooltip || !phoneRoot) return;
  if (characterTooltip.parentElement !== phoneRoot) {
    phoneRoot.appendChild(characterTooltip);
  }
  const rect = identityCard.getBoundingClientRect();
  const phoneRect = phoneRoot.getBoundingClientRect();
  const baseWidth = phoneRoot.offsetWidth || 1;
  const baseHeight = phoneRoot.offsetHeight || 1;
  const scale = phoneRect.height / baseHeight;
  const localX = (rect.left - phoneRect.left) / scale + rect.width / (2 * scale);
  const localTop = (rect.top - phoneRect.top) / scale;
  const localBottom = (rect.bottom - phoneRect.top) / scale;
  const tooltipWidth = characterTooltip.offsetWidth;
  const tooltipHeight = characterTooltip.offsetHeight;
  let left = localX - tooltipWidth / 2;
  let top = localTop - tooltipHeight - 10;
  if (top < 8) {
    top = localBottom + 10;
  }
  const minLeft = 8;
  const maxLeft = baseWidth - tooltipWidth - 8;
  const minTop = 8;
  const maxTop = baseHeight - tooltipHeight - 8;
  left = Math.min(Math.max(left, minLeft), maxLeft);
  top = Math.min(Math.max(top, minTop), maxTop);
  characterTooltip.style.left = `${left}px`;
  characterTooltip.style.top = `${top}px`;
}

descriptionInput?.addEventListener("input", updateCharacterTooltipContent);
nameInput?.addEventListener("input", updateCharacterTooltipContent);
updateCharacterTooltipContent();

identityCard?.addEventListener("mouseenter", () => {
  updateCharacterTooltipContent();
  if (!characterTooltip || characterTooltip.style.display === "none") return;
  positionCharacterTooltip();
  characterTooltip.classList.add("show");
  characterTooltip.setAttribute("aria-hidden", "false");
});

identityCard?.addEventListener("mousemove", () => {
  if (!characterTooltip || characterTooltip.style.display === "none") return;
  positionCharacterTooltip();
});

identityCard?.addEventListener("mouseleave", () => {
  if (!characterTooltip) return;
  characterTooltip.classList.remove("show");
  characterTooltip.setAttribute("aria-hidden", "true");
});

function positionTraitTooltip(event) {
  if (!traitTooltip || !wizard) return;
  const rect = wizard.getBoundingClientRect();
  const tooltipRect = traitTooltip.getBoundingClientRect();
  const offsetX = 5;
  const offsetY = 5;
  let x = event.clientX - rect.left + offsetX;
  let y = event.clientY - rect.top + offsetY;
  const maxX = rect.width - tooltipRect.width - 12;
  const maxY = rect.height - tooltipRect.height - 12;
  x = Math.min(Math.max(x, 12), Math.max(12, maxX));
  y = Math.min(Math.max(y, 12), Math.max(12, maxY));
  traitTooltip.style.left = `${x}px`;
  traitTooltip.style.top = `${y}px`;
}

function showTraitTooltip(option, event) {
  if (!traitTooltip || !option) return;
  const titleEl = traitTooltip.querySelector(".trait-tooltip-title");
  const bodyEl = traitTooltip.querySelector(".trait-tooltip-body");
  if (!titleEl || !bodyEl) return;
  titleEl.textContent = option.dataset.trait || "";
  bodyEl.textContent = option.dataset.description || "";
  traitTooltip.classList.add("show");
  traitTooltip.setAttribute("aria-hidden", "false");
  positionTraitTooltip(event);
}

function hideTraitTooltip() {
  if (!traitTooltip) return;
  traitTooltip.classList.remove("show");
  traitTooltip.setAttribute("aria-hidden", "true");
}

traitList?.addEventListener("mouseenter", (event) => {
  const option = event.target.closest(".trait-option");
  if (!option) return;
  showTraitTooltip(option, event);
}, true);

traitList?.addEventListener("mousemove", (event) => {
  const option = event.target.closest(".trait-option");
  if (!option) return;
  showTraitTooltip(option, event);
});

traitList?.addEventListener("mouseleave", () => {
  hideTraitTooltip();
});

rarityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    rarityButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const r = btn.dataset.rarity;
    phoneRoot.classList.remove("rarity-common", "rarity-uncommon", "rarity-rare", "rarity-epic", "rarity-legendary");
    phoneRoot.classList.add("rarity-" + r);
  });
});

function syncWizardTabs() {
  const isMobile = mobileWizardQuery.matches;
  document.body.classList.toggle("is-mobile", isMobile);
  const assetsReady = isLocalFile ? exportAssetMap.size > 0 : true;
  const tabVisibility = {
    identity: true,
    visuals: true,
    abilities: true,
    stats: true,
    utilities: SHOW_UTILITIES_TAB,
    "ui-test": SHOW_UI_TEST_TAB
  };
  wizardTabs.forEach(tab => {
    const key = tab.dataset.tab;
    const isVisible = tabVisibility[key] !== false;
    tab.style.display = isVisible ? "" : "none";
    tab.classList.toggle("is-hidden", !isVisible);
    tab.classList.toggle("is-disabled", !assetsReady && key !== "assets");
  });
  wizardPanels.forEach(panel => {
    const key = panel.dataset.tab;
    const isVisible = tabVisibility[key] !== false;
    panel.style.display = isVisible ? "" : "none";
    panel.classList.toggle("is-hidden", !isVisible);
    panel.classList.toggle("is-disabled", !assetsReady && key !== "assets");
  });

  const firstVisibleTab = Array.from(wizardTabs).find(tab => tab.style.display !== "none");
  const activeTab = Array.from(wizardTabs).find(tab => tab.classList.contains("active") && tab.style.display !== "none");
  const nextActive = activeTab || firstVisibleTab;
  if (nextActive) {
    const key = nextActive.dataset.tab;
    wizardTabs.forEach(t => t.classList.toggle("active", t === nextActive));
    wizardPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.tab === key));
  }
}

wizardTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.style.display === "none") return;
    const assetsReady = isLocalFile ? exportAssetMap.size > 0 : true;
    if (!assetsReady && tab.dataset.tab !== "assets") return;
    if (mobileWizardQuery.matches) return;
    const key = tab.dataset.tab;
    wizardTabs.forEach(t => t.classList.toggle("active", t === tab));
    wizardPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.tab === key));
  });
});

syncWizardTabs();
mobileWizardQuery.addEventListener("change", syncWizardTabs);

function buildMobileAccordion() {
  if (!mobileWizardQuery.matches) return;
  if (!wizardPanels.length) return;
  const tabLabels = {};
  wizardTabs.forEach(tab => {
    const key = tab.dataset.tab;
    const label = tab.textContent?.trim() || key;
    if (key) tabLabels[key] = label;
  });
  wizardPanels.forEach(panel => {
    if (panel.dataset.accordionBuilt === "true") return;
    const summary = document.createElement("summary");
    summary.className = "wizard-panel-summary";
    summary.textContent = tabLabels[panel.dataset.tab] || "Section";
    const body = document.createElement("div");
    body.className = "wizard-panel-body";
    while (panel.firstChild) {
      body.appendChild(panel.firstChild);
    }
    panel.appendChild(summary);
    panel.appendChild(body);
    panel.dataset.accordionBuilt = "true";
    summary.addEventListener("click", () => {
      if (!mobileWizardQuery.matches) return;
      const willOpen = !panel.classList.contains("is-open");
      wizardPanels.forEach(other => other.classList.remove("is-open"));
      if (willOpen) panel.classList.add("is-open");
    });
  });
  wizardPanels[0]?.classList.add("is-open");
}

buildMobileAccordion();
mobileWizardQuery.addEventListener("change", buildMobileAccordion);

if (toggleReference && screenEl) {
  toggleReference.addEventListener("click", () => {
    const isOn = screenEl.classList.toggle("reference-on");
    toggleReference.textContent = isOn ? "Hide reference" : "Show reference";
  });
}

async function buildAssetsMap(files) {
  const map = new Map();
  const entries = files.map(file => ({
    file,
    path: file.webkitRelativePath || file.name
  }));
  const toData = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  for (const entry of entries) {
    const file = entry?.file;
    const relPath = entry?.path || "";
    if (!file || !relPath) continue;
    const rel = relPath.replace(/\\/g, "/");
    const idx = rel.toLowerCase().indexOf("assets/");
    const key = idx === -1 ? `assets/${rel.replace(/^\/+/, "")}` : rel.slice(idx);
    map.set(key, await toData(file));
  }
  return map;
}

assetsFolderButton?.addEventListener("click", () => assetsFolderInput?.click());

assetsFolderInput?.addEventListener("change", async () => {
  const files = assetsFolderInput.files ? Array.from(assetsFolderInput.files) : [];
  if (!files.length) return;
  const map = await buildAssetsMap(files);
  exportAssetMap.clear();
  map.forEach((value, key) => {
    exportAssetMap.set(key, value);
  });
  assetsFolderButton.textContent = `Assets loaded (${exportAssetMap.size})`;
  assetsTab?.classList.toggle("is-required", isLocalFile && exportAssetMap.size === 0);
  syncWizardTabs();
});

assetsTab?.classList.toggle("is-required", isLocalFile && exportAssetMap.size === 0);

function updatePortraitTransform() {
  if (!portraitImage) return;
  const x = Number(portraitOffsetX?.value || 0);
  const y = Number(portraitOffsetY?.value || 0);
  const z = Number(portraitZoom?.value || 100) / 100;
  portraitImage.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
  const transform = `translate(${x}px, ${y}px) scale(${z})`;
  if (portraitTint) portraitTint.style.transform = transform;
  if (portraitLight) portraitLight.style.transform = transform;
  if (portraitShadow) portraitShadow.style.transform = transform;
  updatePortraitMasks();
}

const PRESET_CHARACTERS = [
  {
    key: "marec",
    label: "Marec",
    subtitle: "Legendary • Lions Adamant",
    name: "Marec",
    title: "Warden of the Archine",
    description: "A steadfast sentinel of the Lions Adamant, known for unbreakable resolve.",
    rarity: "legendary",
    bgKey: "lions_adamant",
    portrait: "assets/portraits/marecTacticus.png",
    portraitPosition: { x: "0", y: "-21", zoom: "110" },
    traits: ["Act of Faith", "Battle Fatigue", "Big Target"],
    stats: { health: 3325, armor: 874, damage: 2293, move: 3 },
    abilities: {
      activeIcon: "assets/abilityIcons/Actus_Ability_1_Icon.webp",
      passiveIcon: "assets/abilityIcons/Actus_Ability_2_Icon.webp",
      activeTitle: "Active Ability",
      passiveTitle: "Passive Ability",
      activeDesc: "Unleash a focused barrage that empowers allies in range.",
      passiveDesc: "Steadfast vigilance grants bonus protection to nearby units."
    }
  }
];

function setInputValue(input, value) {
  if (!input) return;
  input.value = value ?? "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function resolveAssetSrc(src) {
  if (!src) return "";
  return exportAssetMap.get(src) || src;
}

function setPortraitSource(src) {
  if (!portraitImage) return;
  if (!src) {
    portraitImage.removeAttribute("src");
    portraitImage.style.display = "none";
    if (portraitPlaceholder) portraitPlaceholder.style.display = "block";
    updatePortraitMasks();
    return;
  }
  portraitImage.addEventListener("load", () => {
    updatePortraitMasks();
    updatePortraitLighting();
  }, { once: true });
  portraitImage.src = src;
  portraitImage.style.display = "block";
  if (portraitPlaceholder) portraitPlaceholder.style.display = "none";
  updatePortraitTransform();
  updatePortraitLighting();
}

function setAbilityIconTarget(icon, src) {
  if (!icon) return;
  if (!src) {
    icon.removeAttribute("src");
    icon.style.display = "none";
    const placeholder = icon.parentElement?.querySelector(".ability-placeholder");
    if (placeholder) placeholder.style.display = "";
    return;
  }
  icon.src = src;
  icon.style.display = "block";
  const placeholder = icon.parentElement?.querySelector(".ability-placeholder");
  if (placeholder) placeholder.style.display = "none";
  updateAbilityTransform();
}

function applyPresetCharacter(preset) {
  if (!preset) return;
  setInputValue(nameInput, preset.name);
  setInputValue(titleInput, preset.title);
  setInputValue(descriptionInput, preset.description);
  if (preset.stats) {
    setInputValue(healthInput, preset.stats.health);
    setInputValue(armorInput, preset.stats.armor);
    setInputValue(damageInput, preset.stats.damage);
    setInputValue(moveInput, preset.stats.move);
  }
  if (preset.rarity) {
    const btn = Array.from(rarityButtons).find(b => b.dataset.rarity === preset.rarity);
    btn?.click();
  }
  if (preset.bgKey) {
    currentBgKey = preset.bgKey;
    applyBackgroundPreset(preset.bgKey);
  } else if (topPanel) {
    currentBgKey = "";
    topPanel.style.backgroundImage = "";
  }

  const portraitSrc = resolveAssetSrc(preset.portrait);
  setPortraitSource(portraitSrc);
  if (preset.portraitPosition) {
    if (portraitOffsetX) portraitOffsetX.value = preset.portraitPosition.x ?? portraitOffsetX.value;
    if (portraitOffsetY) portraitOffsetY.value = preset.portraitPosition.y ?? portraitOffsetY.value;
    if (portraitZoom) portraitZoom.value = preset.portraitPosition.zoom ?? portraitZoom.value;
    updatePortraitTransform();
  }

  const activeSrc = resolveAssetSrc(preset.abilities?.activeIcon);
  const passiveSrc = resolveAssetSrc(preset.abilities?.passiveIcon);
  setAbilityIcon(activeAbilityIcon, activeSrc, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom);
  setAbilityIcon(passiveAbilityIcon, passiveSrc, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom);

  if (activeTooltipTitleInput) activeTooltipTitleInput.value = preset.abilities?.activeTitle || "";
  if (passiveTooltipTitleInput) passiveTooltipTitleInput.value = preset.abilities?.passiveTitle || "";
  if (activeTooltipInput) activeTooltipInput.innerHTML = preset.abilities?.activeDesc || "";
  if (passiveTooltipInput) passiveTooltipInput.innerHTML = preset.abilities?.passiveDesc || "";
  updateAbilityTooltips();

  const checkboxes = document.querySelectorAll(".trait-checkbox");
  const selected = new Set(preset.traits || []);
  checkboxes.forEach(cb => {
    cb.checked = selected.has(cb.dataset.label || "");
  });
  refreshTraitPreview();
}

function renderPresetList() {
  if (!presetList) return;
  presetList.textContent = "";
  const frag = document.createDocumentFragment();
  PRESET_CHARACTERS.forEach(preset => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset-button";
    button.innerHTML = `${preset.label}<span>${preset.subtitle}</span>`;
    button.addEventListener("click", () => applyPresetCharacter(preset));
    frag.appendChild(button);
  });
  presetList.appendChild(frag);
}

renderPresetList();

function applyLightingDefaults() {
  if (portraitTintEnabled) portraitTintEnabled.checked = DEFAULT_LIGHTING.tintEnabled;
  if (portraitTintColor) portraitTintColor.value = DEFAULT_LIGHTING.tintColor;
  if (portraitTintStrength) portraitTintStrength.value = DEFAULT_LIGHTING.tintStrength;
  if (portraitLightEnabled) portraitLightEnabled.checked = DEFAULT_LIGHTING.lightEnabled;
  if (portraitLightColor) portraitLightColor.value = DEFAULT_LIGHTING.lightColor;
  if (portraitLightStrength) portraitLightStrength.value = DEFAULT_LIGHTING.lightStrength;
  if (portraitLightAngle) portraitLightAngle.value = DEFAULT_LIGHTING.lightAngle;
  if (portraitShadowEnabled) portraitShadowEnabled.checked = DEFAULT_LIGHTING.shadowEnabled;
  if (portraitShadowColor) portraitShadowColor.value = DEFAULT_LIGHTING.shadowColor;
  if (portraitShadowStrength) portraitShadowStrength.value = DEFAULT_LIGHTING.shadowStrength;
  if (portraitShadowAngle) portraitShadowAngle.value = DEFAULT_LIGHTING.shadowAngle;
  if (portraitGroundEnabled) portraitGroundEnabled.checked = DEFAULT_LIGHTING.groundEnabled;
  if (portraitGroundColor) portraitGroundColor.value = DEFAULT_LIGHTING.groundColor;
  if (portraitGroundStrength) portraitGroundStrength.value = DEFAULT_LIGHTING.groundStrength;
  if (portraitGroundSize) portraitGroundSize.value = DEFAULT_LIGHTING.groundSize;
  if (portraitGroundBlur) portraitGroundBlur.value = DEFAULT_LIGHTING.groundBlur;
  if (portraitGroundOffsetX) portraitGroundOffsetX.value = DEFAULT_LIGHTING.groundOffsetX;
  if (portraitGroundOffsetY) portraitGroundOffsetY.value = DEFAULT_LIGHTING.groundOffsetY;
  updatePortraitLighting();
}

if (portraitUploadButton && portraitInput) {
  portraitUploadButton.addEventListener("click", () => portraitInput.click());
  portraitInput.addEventListener("change", () => {
    const file = portraitInput.files && portraitInput.files[0];
    if (!file || !portraitImage) return;
    const reader = new FileReader();
    reader.onload = e => {
      portraitImage.src = e.target.result;
      portraitImage.style.display = "block";
      if (portraitPlaceholder) portraitPlaceholder.style.display = "none";
      updatePortraitTransform();
      updatePortraitLighting();
    };
    reader.readAsDataURL(file);
  });
}

portraitOffsetX?.addEventListener("input", updatePortraitTransform);
portraitOffsetY?.addEventListener("input", updatePortraitTransform);
portraitZoom?.addEventListener("input", updatePortraitTransform);
updatePortraitTransform();
portraitTintColor?.addEventListener("change", updatePortraitLighting);
portraitTintStrength?.addEventListener("input", updatePortraitLighting);
portraitLightColor?.addEventListener("change", updatePortraitLighting);
portraitLightStrength?.addEventListener("input", updatePortraitLighting);
portraitLightAngle?.addEventListener("input", updatePortraitLighting);
portraitTintEnabled?.addEventListener("change", updatePortraitLighting);
portraitLightEnabled?.addEventListener("change", updatePortraitLighting);
portraitShadowColor?.addEventListener("change", updatePortraitLighting);
portraitShadowStrength?.addEventListener("input", updatePortraitLighting);
portraitShadowAngle?.addEventListener("input", updatePortraitLighting);
portraitShadowEnabled?.addEventListener("change", updatePortraitLighting);
portraitGroundEnabled?.addEventListener("change", updatePortraitLighting);
portraitGroundColor?.addEventListener("change", updatePortraitLighting);
portraitGroundStrength?.addEventListener("input", updatePortraitLighting);
portraitGroundSize?.addEventListener("input", updatePortraitLighting);
portraitGroundBlur?.addEventListener("input", updatePortraitLighting);
portraitGroundOffsetX?.addEventListener("input", updatePortraitLighting);
portraitGroundOffsetY?.addEventListener("input", updatePortraitLighting);
updatePortraitMasks();
if (portraitImage) {
  portraitImage.removeAttribute("src");
  portraitImage.style.display = "none";
  if (portraitPlaceholder) portraitPlaceholder.style.display = "block";
}
applyLightingDefaults();

// Background list: add/remove entries here (key must be unique, src must match assets/backgrounds file).
const bgPresets = [
  { key: "astra_militarum", label: "Astra Militarum", src: "assets/backgrounds/Background_Astra_Militarum.jpg" },
  { key: "bile_pits", label: "Bile Pits", src: "assets/backgrounds/Background_Bile_Pits.png" },
  { key: "black_legion", label: "Black Legion", src: "assets/backgrounds/Background_Black_Legion.jpg" },
  { key: "blood_angels", label: "Blood Angels", src: "assets/backgrounds/Background_Blood_Angels.jpg" },
  { key: "custodes", label: "Custodes", src: "assets/backgrounds/Background_Custodes.jpg" },
  { key: "dark_angels", label: "Dark Angels", src: "assets/backgrounds/Background_Dark_Angels.jpg" },
  { key: "eldar", label: "Eldar", src: "assets/backgrounds/Background_Eldar.jpg" },
  { key: "emperors_children", label: "Emperors Children", src: "assets/backgrounds/Background_Emperors_Children.jpg" },
  { key: "genestealers", label: "Genestealers", src: "assets/backgrounds/Background_Genestealers.jpg" },
  { key: "golden_hall", label: "Golden Hall", src: "assets/backgrounds/Background_Golden_Hall.png" },
  { key: "imperium_ruins", label: "Imperium Ruins", src: "assets/backgrounds/Background_Imperium_Ruins.png" },
  { key: "lions_adamant", label: "Lions Adamant", src: "assets/backgrounds/Background_Lions_Adamant.jpg" },
  { key: "mechanicus", label: "Mechanicus", src: "assets/backgrounds/Background_Mechanicus.jpg" },
  { key: "orkz", label: "Orkz", src: "assets/backgrounds/Background_Orkz.jpg" },
  { key: "spacewolves", label: "Space Wolves", src: "assets/backgrounds/Background_SpaceWolves.jpg" },
  { key: "tau", label: "Tau", src: "assets/backgrounds/Background_Tau.jpg" },
  { key: "thousand_sons", label: "Thousand Sons", src: "assets/backgrounds/Background_Thousand_Sons.jpg" },
  { key: "tyranids", label: "Tyranids", src: "assets/backgrounds/Background_Tyranids.jpg" },
  { key: "ultramarines", label: "Ultramarines", src: "assets/backgrounds/Background_Ultramarines.jpg" },
  { key: "verdant_lions", label: "Verdant Lions", src: "assets/backgrounds/Background_Verdant_Lions.png" },
  { key: "world_eaters", label: "World Eaters", src: "assets/backgrounds/Background_World_Eaters.jpg" },
  { key: "xenos_mauseleoum", label: "Xenos Mauseleoum", src: "assets/backgrounds/Background_Xenos_Mauseleoum.jpg" }
];
let currentBgKey = "";

function hexToRgba(hex, alpha) {
  const raw = hex.replace("#", "").trim();
  if (raw.length === 3) {
    const r = parseInt(raw[0] + raw[0], 16);
    const g = parseInt(raw[1] + raw[1], 16);
    const b = parseInt(raw[2] + raw[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (raw.length === 6) {
    const r = parseInt(raw.slice(0, 2), 16);
    const g = parseInt(raw.slice(2, 4), 16);
    const b = parseInt(raw.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(0, 0, 0, ${alpha})`;
}

function updatePortraitMasks() {
  if (!portraitImage) return;
  const rawSrc = portraitImage.getAttribute("src") || portraitImage.src;
  const isVisible = portraitImage.style.display !== "none" && Boolean(rawSrc);
  const maskValue = isVisible ? `url("${rawSrc}")` : "none";
  if (portraitTint) {
    portraitTint.style.webkitMaskImage = maskValue;
    portraitTint.style.maskImage = maskValue;
    portraitTint.style.display = isVisible ? "block" : "none";
  }
  if (portraitLight) {
    portraitLight.style.webkitMaskImage = maskValue;
    portraitLight.style.maskImage = maskValue;
    portraitLight.style.display = isVisible ? "block" : "none";
  }
  if (portraitShadow) {
    portraitShadow.style.webkitMaskImage = maskValue;
    portraitShadow.style.maskImage = maskValue;
    portraitShadow.style.display = isVisible ? "block" : "none";
  }
}

function updatePortraitLighting() {
  if (!topPanel) return;
  const tintOn = portraitTintEnabled ? portraitTintEnabled.checked : true;
  const lightOn = portraitLightEnabled ? portraitLightEnabled.checked : true;
  const shadowOn = portraitShadowEnabled ? portraitShadowEnabled.checked : true;
  const tintColor = portraitTintColor?.value || "#000000";
  const tintAlpha = Number(portraitTintStrength?.value || 0) / 100;
  const lightColor = portraitLightColor?.value || "#ffffff";
  const lightAlpha = Number(portraitLightStrength?.value || 0) / 100;
  const angle = Number(portraitLightAngle?.value || 135);
  const shadowColor = portraitShadowColor?.value || "#000000";
  const shadowAlpha = Number(portraitShadowStrength?.value || 0) / 100;
  const shadowAngle = Number(portraitShadowAngle?.value || 315);
  const groundOn = portraitGroundEnabled ? portraitGroundEnabled.checked : true;
  const groundColor = portraitGroundColor?.value || "#0b0f18";
  const groundAlpha = Number(portraitGroundStrength?.value || 0) / 100;
  const groundSize = Number(portraitGroundSize?.value || 100) / 100;
  const groundBlur = Number(portraitGroundBlur?.value || 0);
  const groundX = Number(portraitGroundOffsetX?.value || 0);
  const groundY = Number(portraitGroundOffsetY?.value || 40);
  topPanel.style.setProperty("--portrait-tint", tintOn ? hexToRgba(tintColor, tintAlpha) : "transparent");
  topPanel.style.setProperty("--portrait-light-color", lightOn ? hexToRgba(lightColor, lightAlpha) : "transparent");
  topPanel.style.setProperty("--portrait-light-angle", `${angle}deg`);
  topPanel.style.setProperty("--portrait-shadow-color", shadowOn ? hexToRgba(shadowColor, shadowAlpha) : "transparent");
  topPanel.style.setProperty("--portrait-shadow-angle", `${shadowAngle}deg`);
  topPanel.style.setProperty("--portrait-ground-color", groundOn ? hexToRgba(groundColor, groundAlpha) : "transparent");
  topPanel.style.setProperty("--portrait-ground-scale", `${groundSize}`);
  topPanel.style.setProperty("--portrait-ground-blur", `${groundBlur}px`);
  topPanel.style.setProperty("--portrait-ground-x", `${groundX}px`);
  topPanel.style.setProperty("--portrait-ground-y", `${groundY}px`);
  if (portraitTint) portraitTint.style.display = tintOn ? "" : "none";
  if (portraitLight) portraitLight.style.display = lightOn ? "" : "none";
  if (portraitShadow) portraitShadow.style.display = shadowOn ? "" : "none";
  if (portraitGroundShadow) portraitGroundShadow.style.display = groundOn ? "" : "none";
  updatePortraitMasks();
}

function applyBackgroundPreset(key) {
  const preset = bgPresets.find(item => item.key === key);
  if (!preset || !topPanel) return;
  currentBgKey = key;
  topPanel.style.backgroundImage = `url(${preset.src})`;
  topPanel.style.backgroundSize = "cover";
  topPanel.style.backgroundPosition = "center";
  bgPresetList?.querySelectorAll(".bg-option").forEach(option => {
    option.classList.toggle("active", option.dataset.bg === key);
  });
}

function renderBackgroundList() {
  if (!bgPresetList) return;
  bgPresetList.textContent = "";
  const frag = document.createDocumentFragment();
  bgPresets.forEach((preset, index) => {
    const label = document.createElement("label");
    label.className = "bg-option";
    label.dataset.bg = preset.key;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "bgPreset";
    input.value = preset.key;
    input.id = `bg-preset-${index}`;
    input.addEventListener("change", () => applyBackgroundPreset(preset.key));
    if (currentBgKey && preset.key === currentBgKey) {
      input.checked = true;
      label.classList.add("active");
    }
    const text = document.createElement("span");
    text.textContent = preset.label;
    label.appendChild(input);
    label.appendChild(text);
    frag.appendChild(label);
  });
  bgPresetList.appendChild(frag);
}

renderBackgroundList();
updatePortraitLighting();

function updateAbilityTransform(icon, offsetX, offsetY, zoom) {
  if (!icon) return;
  const x = Number(offsetX?.value || 0);
  const y = Number(offsetY?.value || 0);
  const z = Number(zoom?.value || 100) / 100;
  const transform = `translate(${x}px, ${y}px) scale(${z})`;
  icon.style.transform = transform;
}

function setAbilityIcon(icon, src, offsetX, offsetY, zoom) {
  if (!icon) return;
  if (!src) {
    icon.removeAttribute("src");
    icon.style.display = "none";
    const placeholder = icon.parentElement?.querySelector(".ability-placeholder");
    if (placeholder) placeholder.style.display = "";
    return;
  }
  icon.src = src;
  icon.style.display = "block";
  const placeholder = icon.parentElement?.querySelector(".ability-placeholder");
  if (placeholder) placeholder.style.display = "none";
  updateAbilityTransform(icon, offsetX, offsetY, zoom);
}

function getAbilityLabel(src) {
  const file = decodeURIComponent(src.split("/").pop() || "");
  return file
    .replace(/_Ability_[12]_Icon/i, "")
    .replace(/_Ability_[12]/i, "")
    .replace(/_Icon/i, "")
    .replace(/\.webp$/i, "")
    .replace(/_/g, " ")
    .trim();
}

function renderAbilityIconLibrary(grid, searchInput, iconTarget, offsetX, offsetY, zoom) {
  if (!grid) return;
  const query = (searchInput?.value || "").trim().toLowerCase();
  grid.textContent = "";
  const frag = document.createDocumentFragment();
  ABILITY_ICON_LIBRARY.forEach((src) => {
    const label = getAbilityLabel(src);
    if (query && !label.toLowerCase().includes(query)) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.src = src;
    button.title = label;
    const img = document.createElement("img");
    img.src = src;
    img.alt = label;
    button.appendChild(img);
    button.addEventListener("click", () => setAbilityIcon(iconTarget, src, offsetX, offsetY, zoom));
    frag.appendChild(button);
  });
  grid.appendChild(frag);
}

function wireAbilityUpload(button, input, target, offsetX, offsetY, zoom) {
  if (!button || !input || !target) return;
  button.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      target.src = e.target.result;
      target.style.display = "block";
      const placeholder = target.parentElement?.querySelector(".ability-placeholder");
      if (placeholder) placeholder.style.display = "none";
      updateAbilityTransform(target, offsetX, offsetY, zoom);
    };
    reader.readAsDataURL(file);
  });
}

wireAbilityUpload(activeAbilityUploadButton, activeAbilityInput, activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom);
wireAbilityUpload(passiveAbilityUploadButton, passiveAbilityInput, passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom);
activeAbilityOffsetX?.addEventListener("input", () => updateAbilityTransform(activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom));
activeAbilityOffsetY?.addEventListener("input", () => updateAbilityTransform(activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom));
activeAbilityZoom?.addEventListener("input", () => updateAbilityTransform(activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom));
passiveAbilityOffsetX?.addEventListener("input", () => updateAbilityTransform(passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom));
passiveAbilityOffsetY?.addEventListener("input", () => updateAbilityTransform(passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom));
passiveAbilityZoom?.addEventListener("input", () => updateAbilityTransform(passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom));
updateAbilityTransform(activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom);
updateAbilityTransform(passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom);

activeIconLibrarySearch?.addEventListener("input", () => renderAbilityIconLibrary(activeIconLibraryGrid, activeIconLibrarySearch, activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom));
passiveIconLibrarySearch?.addEventListener("input", () => renderAbilityIconLibrary(passiveIconLibraryGrid, passiveIconLibrarySearch, passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom));
renderAbilityIconLibrary(activeIconLibraryGrid, activeIconLibrarySearch, activeAbilityIcon, activeAbilityOffsetX, activeAbilityOffsetY, activeAbilityZoom);
renderAbilityIconLibrary(passiveIconLibraryGrid, passiveIconLibrarySearch, passiveAbilityIcon, passiveAbilityOffsetX, passiveAbilityOffsetY, passiveAbilityZoom);

function getFieldContent(field) {
  if (!field) return { html: "", text: "" };
  if (typeof field.value === "string") {
    return { html: field.value, text: field.value };
  }
  return { html: field.innerHTML || "", text: field.textContent || "" };
}

function updateAbilityTooltips() {
  const activeContent = getFieldContent(activeTooltipInput);
  const passiveContent = getFieldContent(passiveTooltipInput);
  const activeTitle = activeTooltipTitleInput?.value || "";
  const passiveTitle = passiveTooltipTitleInput?.value || "";
  const activeTooltip = document.getElementById("activeAbilityTooltip");
  const passiveTooltip = document.getElementById("passiveAbilityTooltip");
  const applyTooltip = (tooltip, title, content) => {
    if (!tooltip) return;
    const titleEl = tooltip.querySelector(".ability-tooltip-title");
    const bodyEl = tooltip.querySelector(".ability-tooltip-body");
    if (!tooltip || !titleEl || !bodyEl) return;
    titleEl.textContent = title.trim();
    bodyEl.innerHTML = content.html;
    const hasText = titleEl.textContent || content.text.trim();
    tooltip.style.display = hasText ? "block" : "none";
    if (!hasText) {
      tooltip.dataset.pinned = "false";
      tooltip.classList.remove("show", "pinned");
    }
  };
  applyTooltip(activeTooltip, activeTitle, activeContent);
  applyTooltip(passiveTooltip, passiveTitle, passiveContent);
}

activeTooltipInput?.addEventListener("input", updateAbilityTooltips);
passiveTooltipInput?.addEventListener("input", updateAbilityTooltips);
activeTooltipTitleInput?.addEventListener("input", updateAbilityTooltips);
passiveTooltipTitleInput?.addEventListener("input", updateAbilityTooltips);
updateAbilityTooltips();

function updateShapeGlowStrength() {
  if (!phoneRoot || !shapeGlowStrength) return;
  phoneRoot.style.setProperty("--shape-glow-strength", shapeGlowStrength.value);
}

shapeGlowStrength?.addEventListener("input", updateShapeGlowStrength);
updateShapeGlowStrength();

const abilityCircles = document.querySelectorAll(".ability-circle");
const tooltipToolbars = document.querySelectorAll(".tooltip-toolbar");
const tooltipColorPickers = document.querySelectorAll(".tooltip-color-picker");
const tooltipEditors = document.querySelectorAll(".tooltip-editor");
let activeTooltipEditor = null;
let savedTooltipRange = null;

function saveTooltipSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !activeTooltipEditor) return;
  const range = selection.getRangeAt(0);
  if (activeTooltipEditor.contains(range.commonAncestorContainer)) {
    savedTooltipRange = range;
  }
}

function restoreTooltipSelection() {
  const selection = window.getSelection();
  if (!selection || !savedTooltipRange) return;
  selection.removeAllRanges();
  selection.addRange(savedTooltipRange);
}

function ensureActiveTooltipEditor() {
  if (activeTooltipEditor) return activeTooltipEditor;
  if (activeTooltipInput) {
    activeTooltipEditor = activeTooltipInput;
    return activeTooltipEditor;
  }
  if (passiveTooltipInput) {
    activeTooltipEditor = passiveTooltipInput;
    return activeTooltipEditor;
  }
  return null;
}

function applyTooltipCommand(command, value) {
  const editor = ensureActiveTooltipEditor();
  if (!editor) return;
  editor.focus();
  restoreTooltipSelection();
  document.execCommand(command, false, value);
  saveTooltipSelection();
  updateAbilityTooltips();
}

function getUnderlineNodesForSelection(editor) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return [];
  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer.nodeType === 1
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  if (!container) return [];
  const nodes = new Set();
  const directUnderline = container.closest("u");
  if (directUnderline && editor.contains(directUnderline)) {
    nodes.add(directUnderline);
  }
  const scope = container.querySelectorAll ? container : editor;
  scope.querySelectorAll("u").forEach(node => {
    if (!editor.contains(node)) return;
    try {
      if (range.intersectsNode(node)) nodes.add(node);
    } catch (err) {
      nodes.add(node);
    }
  });
  return Array.from(nodes);
}

function applyTooltipColor(value) {
  const editor = ensureActiveTooltipEditor();
  if (!editor) return;
  editor.focus();
  restoreTooltipSelection();
  document.execCommand("underline", false, null);
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, value);
  const underlineNodes = getUnderlineNodesForSelection(editor);
  underlineNodes.forEach(node => {
    node.style.color = value;
    node.style.textDecorationColor = value;
  });
  saveTooltipSelection();
  updateAbilityTooltips();
}

tooltipEditors.forEach(editor => {
  editor.addEventListener("focus", () => {
    activeTooltipEditor = editor;
  });
  editor.addEventListener("keyup", saveTooltipSelection);
  editor.addEventListener("mouseup", saveTooltipSelection);
  editor.addEventListener("input", saveTooltipSelection);
});

tooltipToolbars.forEach(toolbar => {
  toolbar.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
});

tooltipColorPickers.forEach((picker) => {
  picker.addEventListener("input", (event) => {
    applyTooltipColor(event.target.value);
  });
});

function getCircleTooltip(circle) {
  const tooltipId = circle.dataset.tooltipId;
  if (tooltipId) return document.getElementById(tooltipId);
  return circle.querySelector(".ability-tooltip");
}

function tooltipHasContent(tooltip) {
  const titleText = tooltip.querySelector(".ability-tooltip-title")?.textContent?.trim();
  const bodyText = tooltip.querySelector(".ability-tooltip-body")?.textContent?.trim();
  return Boolean(titleText || bodyText);
}

function positionAbilityTooltip(circle) {
  const tooltip = getCircleTooltip(circle);
  if (!tooltip || !phoneRoot) return;
  updateAbilityTooltips();
  if (!tooltipHasContent(tooltip)) return;
  if (tooltip.parentElement !== phoneRoot) {
    phoneRoot.appendChild(tooltip);
  }
  tooltip.style.display = "block";
  const rect = circle.getBoundingClientRect();
  const phoneRect = phoneRoot.getBoundingClientRect();
  const baseWidth = phoneRoot.offsetWidth || 1;
  const baseHeight = phoneRoot.offsetHeight || 1;
  const scale = phoneRect.height / baseHeight;
  const localX = (rect.left - phoneRect.left) / scale + rect.width / (2 * scale);
  const localY = (rect.top - phoneRect.top) / scale;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const left = localX - tooltipWidth / 2;
  const top = localY - tooltipHeight - 10;
  const minLeft = 8;
  const maxLeft = baseWidth - tooltipWidth - 8;
  const minTop = 8;
  const maxTop = baseHeight - tooltipHeight - 8;
  const clampedLeft = Math.min(Math.max(left, minLeft), maxLeft);
  const clampedTop = Math.min(Math.max(top, minTop), maxTop);
  tooltip.style.left = `${clampedLeft}px`;
  tooltip.style.top = `${clampedTop}px`;
}

abilityCircles.forEach(circle => {
  const tooltip = getCircleTooltip(circle);
  if (!tooltip) return;
  circle.addEventListener("mouseenter", () => {
    positionAbilityTooltip(circle);
    tooltip.classList.add("show");
  });
  circle.addEventListener("mousemove", () => {
    positionAbilityTooltip(circle);
  });
  circle.addEventListener("mouseleave", () => {
    if (tooltip.dataset.pinned === "true") {
      positionAbilityTooltip(circle);
      tooltip.classList.add("show");
      return;
    }
    tooltip.classList.remove("show");
    if (!tooltipHasContent(tooltip)) tooltip.style.display = "none";
  });
  circle.addEventListener("click", () => {
    if (!tooltipHasContent(tooltip)) return;
    const isPinned = tooltip.dataset.pinned === "true";
    tooltip.dataset.pinned = isPinned ? "false" : "true";
    tooltip.classList.toggle("pinned", !isPinned);
    positionAbilityTooltip(circle);
    if (tooltip.dataset.pinned === "true") {
      tooltip.classList.add("show");
    } else if (!circle.matches(":hover")) {
      tooltip.classList.remove("show");
    }
  });
});


async function exportPhoneHtml() {
  if (!phoneRoot) return;

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (err) {
      // Ignore font readiness errors and continue export.
    }
  }

  if (typeof refreshTraitPreview === "function") refreshTraitPreview();
  if (typeof updateAbilityTooltips === "function") updateAbilityTooltips();
  if (typeof updateCharacterTooltipContent === "function") updateCharacterTooltipContent();

  // Tooltips are exported with their stylesheet + hover logic (no inline styles).

  const assetCache = new Map();
  const normalizeAssetPath = (assetPath) => {
    const resolvedUrl = new URL(assetPath, window.location.href).href;
    const raw = assetPath.replace(/^[.\/]+/, "");
    const assetsIdx = raw.toLowerCase().lastIndexOf("assets/");
    const normalized = assetsIdx >= 0 ? raw.slice(assetsIdx) : raw;
    return { resolvedUrl, normalized };
  };

  const fetchAsDataUrl = async (resolvedUrl) => {
    try {
      const response = await fetch(resolvedUrl);
      if (!response.ok) return "";
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result || "");
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      return "";
    }
  };

  const primeDefaultPortraitCache = async () => {
    if (!portraitImage) return;
    const src = portraitImage.getAttribute("src") || "";
    if (!src) return;
    const defaultPortrait = "assets/portraits/marecTacticus.png";
    if (!src.includes(defaultPortrait)) return;
    const { resolvedUrl, normalized } = normalizeAssetPath(src);
    if (normalized && exportAssetMap.has(normalized)) return;
    const dataUrl = await fetchAsDataUrl(resolvedUrl || defaultPortrait);
    if (!dataUrl) return;
    assetCache.set(src, dataUrl);
    assetCache.set(resolvedUrl, dataUrl);
    if (normalized) assetCache.set(normalized, dataUrl);
  };

  const primeDefaultBackgroundCache = async () => {
    const preset = bgPresets.find(item => item.key === currentBgKey);
    const src = preset?.src || "";
    if (!src) return;
    const { resolvedUrl, normalized } = normalizeAssetPath(src);
    if (normalized && exportAssetMap.has(normalized)) return;
    const dataUrl = await fetchAsDataUrl(resolvedUrl || src);
    if (!dataUrl) return;
    assetCache.set(src, dataUrl);
    assetCache.set(resolvedUrl, dataUrl);
    if (normalized) assetCache.set(normalized, dataUrl);
  };

  const primeImageCache = async () => {
    const imgs = Array.from(document.querySelectorAll("img[src]"));
    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (!src) continue;
      if (src.startsWith("data:")) {
        assetCache.set(src, src);
        continue;
      }
      const { resolvedUrl, normalized } = normalizeAssetPath(src);
      if (normalized && exportAssetMap.has(normalized)) {
        const dataUrl = exportAssetMap.get(normalized);
        assetCache.set(src, dataUrl);
        assetCache.set(resolvedUrl, dataUrl);
        assetCache.set(normalized, dataUrl);
        continue;
      }
      try {
        if (img.decode) {
          await img.decode();
        }
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        assetCache.set(src, dataUrl);
        assetCache.set(resolvedUrl, dataUrl);
        if (normalized) assetCache.set(normalized, dataUrl);
      } catch (err) {
        // Skip cache entry when canvas is not readable.
      }
    }
  };

  await primeDefaultPortraitCache();
  await primeDefaultBackgroundCache();
  await primeImageCache();

  const toDataUrl = async (assetPath) => {
    if (!assetPath || assetPath.startsWith("data:")) return assetPath;
    const { resolvedUrl, normalized } = normalizeAssetPath(assetPath);
    if (normalized && exportAssetMap.has(normalized)) return exportAssetMap.get(normalized);
    if (assetCache.has(assetPath)) return assetCache.get(assetPath);
    if (assetCache.has(resolvedUrl)) return assetCache.get(resolvedUrl);
    if (normalized && assetCache.has(normalized)) return assetCache.get(normalized);
    try {
      const response = await fetch(resolvedUrl);
      if (response.ok) {
        const blob = await response.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            assetCache.set(assetPath, reader.result);
            assetCache.set(resolvedUrl, reader.result);
            if (normalized) assetCache.set(normalized, reader.result);
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });
      }
    } catch (err) {
      // Fall back to image load below.
    }
    return await new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(assetPath);
            return;
          }
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          assetCache.set(assetPath, dataUrl);
          assetCache.set(resolvedUrl, dataUrl);
          if (normalized) assetCache.set(normalized, dataUrl);
          resolve(dataUrl);
        } catch (e) {
          resolve(assetPath);
        }
      };
      img.onerror = () => resolve(assetPath);
      img.src = resolvedUrl;
    });
  };

  const cssText = "";

  const clone = phoneRoot.cloneNode(true);
  clone.setAttribute("id", "exportPhoneRoot");

  const buildCssText = (computed) => {
    let text = "";
    for (let i = 0; i < computed.length; i += 1) {
      const prop = computed[i];
      if (prop === "content") continue;
      const value = computed.getPropertyValue(prop);
      text += `${prop}:${value};`;
    }
    return text;
  };

  const shouldSkipInline = (node) =>
    node.closest(".ability-tooltip, .stack-trait-tooltip, .character-tooltip");

  const inlineComputedStyles = (sourceRoot, targetRoot) => {
    const sourceNodes = [sourceRoot, ...sourceRoot.querySelectorAll("*")];
    const targetNodes = [targetRoot, ...targetRoot.querySelectorAll("*")];
    sourceNodes.forEach((sourceNode, index) => {
      const targetNode = targetNodes[index];
      if (!targetNode) return;
      if (shouldSkipInline(sourceNode)) return;
      const computed = window.getComputedStyle(sourceNode);
      targetNode.setAttribute("style", buildCssText(computed));
    });
  };

  const addPseudoClone = (sourceNode, targetNode, pseudo) => {
    const computed = window.getComputedStyle(sourceNode, pseudo);
    const content = computed.getPropertyValue("content");
    if (!content || content === "none" || content === "normal") return;
    const pseudoEl = document.createElement("span");
    pseudoEl.setAttribute("data-pseudo", pseudo);
    pseudoEl.setAttribute("style", buildCssText(computed));
    const cleaned = content.replace(/^["']|["']$/g, "");
    if (cleaned) pseudoEl.textContent = cleaned;
    targetNode.appendChild(pseudoEl);
  };

  inlineComputedStyles(phoneRoot, clone);
  const sourceNodes = [phoneRoot, ...phoneRoot.querySelectorAll("*")];
  const targetNodes = [clone, ...clone.querySelectorAll("*")];
  sourceNodes.forEach((sourceNode, index) => {
    const targetNode = targetNodes[index];
    if (!targetNode) return;
    addPseudoClone(sourceNode, targetNode, "::before");
    addPseudoClone(sourceNode, targetNode, "::after");
  });

  const collectCssVars = () => {
    const vars = new Map();
    Array.from(document.styleSheets).forEach((sheet) => {
      let rules = [];
      try {
        rules = Array.from(sheet.cssRules || []);
      } catch (err) {
        return;
      }
      rules.forEach((rule) => {
        if (rule.type !== CSSRule.STYLE_RULE) return;
        const selector = rule.selectorText || "";
        if (!selector.includes(":root")) return;
        Array.from(rule.style).forEach((prop) => {
          if (!prop.startsWith("--")) return;
          const value = rule.style.getPropertyValue(prop);
          if (value) vars.set(prop, value.trim());
        });
      });
    });
    return vars;
  };

  const rootVarMap = collectCssVars();

  const copyCssVars = (sourceEl, targetEl) => {
    if (!sourceEl || !targetEl) return;
    const computed = window.getComputedStyle(sourceEl);
    for (let i = 0; i < computed.length; i += 1) {
      const prop = computed[i];
      if (!prop.startsWith("--")) continue;
      const value = computed.getPropertyValue(prop).trim();
      if (value) {
        targetEl.style.setProperty(prop, value);
      } else if (rootVarMap.has(prop)) {
        targetEl.style.setProperty(prop, rootVarMap.get(prop));
      }
    }
    rootVarMap.forEach((value, prop) => {
      if (!targetEl.style.getPropertyValue(prop)) {
        targetEl.style.setProperty(prop, value);
      }
    });
  };
  copyCssVars(document.documentElement, clone);

  // Keep tooltip nodes and let exportStyles drive their appearance.

  const imgNodes = clone.querySelectorAll("img[src]");
  for (const img of imgNodes) {
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:")) continue;
    img.setAttribute("src", await toDataUrl(src));
  }

  const styledNodes = clone.querySelectorAll("[style]");
  for (const node of styledNodes) {
    const style = node.getAttribute("style") || "";
    const urlRegex = /url\((['"]?)([^'")]+)\1\)/g;
    const matches = Array.from(style.matchAll(urlRegex));
    let nextStyle = style;
    for (const match of matches) {
      const full = match[0];
      const path = match[2];
      if (!path || path.startsWith("data:") || path.startsWith("#")) continue;
      const dataUrl = await toDataUrl(path);
      nextStyle = nextStyle.replace(full, `url("${dataUrl}")`);
    }
    if (nextStyle !== style) node.setAttribute("style", nextStyle);
  }

  const exportStyles = `
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top, #1b2132 0, #0b0e15 65%);
      color: #f8f9ff;
      font-family: "Montserrat", sans-serif;
    }
    .stack-trait-tooltip {
      position: absolute;
      max-width: 260px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(10, 12, 16, 0.94);
      border: 1px solid transparent;
      border-image-slice: 1;
      border-image-source: var(--tooltip-border-gradient);
      box-shadow:
        0 12px 24px rgba(0, 0, 0, 0.55),
        0 0 12px var(--tooltip-border-glow);
      color: rgba(255, 255, 255, 0.92);
      font-size: 0.78rem;
      line-height: 1.3;
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: opacity 0.12s ease, transform 0.12s ease;
      z-index: 20;
    }

    .stack-trait-tooltip.show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .stack-trait-tooltip-title {
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    .stack-trait-tooltip-body {
      color: rgba(255, 255, 255, 0.92);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .character-tooltip {
      position: absolute;
      min-width: 220px;
      max-width: 300px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(10, 12, 16, 0.92);
      border: 1px solid transparent;
      border-image-slice: 1;
      border-image-source: var(--tooltip-border-gradient);
      box-shadow:
        0 12px 24px rgba(0, 0, 0, 0.55),
        0 0 12px var(--tooltip-border-glow);
      color: rgba(255, 255, 255, 0.92);
      font-size: 0.82rem;
      line-height: 1.35;
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: opacity 0.12s ease, transform 0.12s ease;
      z-index: 6;
    }

    .character-tooltip.show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .character-tooltip-title {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-align: center;
    }

    .character-tooltip-body {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .ability-tooltip {
      position: absolute;
      max-width: 280px;
      min-width: 180px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(10, 12, 16, 0.92);
      border: 1px solid transparent;
      border-image-slice: 1;
      border-image-source: var(--tooltip-border-gradient);
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.55),
        0 0 12px var(--tooltip-border-glow);
      color: rgba(255, 255, 255, 0.92);
      font-size: 0.88rem;
      line-height: 1.25;
      transform: translateY(6px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.12s ease, transform 0.12s ease;
      z-index: 9999;
      display: block;
    }

    .ability-tooltip.show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .ability-tooltip-title {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.8;
      margin-bottom: 6px;
      text-align: center;
    }

    .ability-tooltip-body {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      overflow: hidden;
    }

    .ability-tooltip-body u {
      text-decoration-color: currentColor;
    }

    .ability-tooltip-body span[style*="text-decoration"] {
      text-decoration-color: currentColor;
    }

    .ability-tooltip::after {
      display: none;
    }
  `;
  const exportScript = `
    (() => {
      const phoneRoot = document.getElementById("exportPhoneRoot");
      if (!phoneRoot) return;
      phoneRoot.style.position = "relative";
      phoneRoot.style.overflow = "hidden";

      const tooltipHasContent = (tooltip) => {
        const titleText = tooltip.querySelector(".ability-tooltip-title")?.textContent?.trim();
        const bodyText = tooltip.querySelector(".ability-tooltip-body")?.textContent?.trim();
        return Boolean(titleText || bodyText);
      };

      const positionAbilityTooltip = (circle) => {
        const tooltipId = circle.dataset.tooltipId;
        const tooltip = tooltipId ? document.getElementById(tooltipId) : circle.querySelector(".ability-tooltip");
        if (!tooltip || !tooltipHasContent(tooltip)) return;
        if (tooltip.parentElement !== phoneRoot) {
          phoneRoot.appendChild(tooltip);
        }
        const rect = circle.getBoundingClientRect();
        const phoneRect = phoneRoot.getBoundingClientRect();
        const baseWidth = phoneRoot.offsetWidth || 1;
        const baseHeight = phoneRoot.offsetHeight || 1;
        const scale = phoneRect.height / baseHeight;
        const localX = (rect.left - phoneRect.left) / scale + rect.width / (2 * scale);
        const localY = (rect.top - phoneRect.top) / scale;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const left = localX - tooltipWidth / 2;
        const top = localY - tooltipHeight - 10;
        const minLeft = 8;
        const maxLeft = baseWidth - tooltipWidth - 8;
        const minTop = 8;
        const maxTop = baseHeight - tooltipHeight - 8;
        const clampedLeft = Math.min(Math.max(left, minLeft), maxLeft);
        const clampedTop = Math.min(Math.max(top, minTop), maxTop);
        tooltip.style.left = clampedLeft + "px";
        tooltip.style.top = clampedTop + "px";
      };

      const abilityCircles = phoneRoot.querySelectorAll(".ability-circle");
      abilityCircles.forEach(circle => {
        const tooltipId = circle.dataset.tooltipId;
        const tooltip = tooltipId ? document.getElementById(tooltipId) : circle.querySelector(".ability-tooltip");
        if (!tooltip) return;
        circle.addEventListener("mouseenter", () => {
          positionAbilityTooltip(circle);
          tooltip.classList.add("show");
        });
        circle.addEventListener("mousemove", () => {
          positionAbilityTooltip(circle);
        });
        circle.addEventListener("mouseleave", () => {
          tooltip.classList.remove("show");
        });
      });

      const stackTooltip = phoneRoot.querySelector("#stackTraitTooltip");
      const traitStack = phoneRoot.querySelector("#traitStack");
      const traitCircles = phoneRoot.querySelectorAll(".trait-circle");
      const positionStackTooltip = (circle) => {
        if (!stackTooltip) return;
        const label = circle.dataset.traitLabel || "";
        const desc = circle.dataset.traitDesc || "";
        if (!label && !desc) return;
        if (stackTooltip.parentElement !== phoneRoot) {
          phoneRoot.appendChild(stackTooltip);
        }
        const titleEl = stackTooltip.querySelector(".stack-trait-tooltip-title");
        const bodyEl = stackTooltip.querySelector(".stack-trait-tooltip-body");
        if (titleEl) titleEl.textContent = label;
        if (bodyEl) bodyEl.textContent = desc;
        const rect = circle.getBoundingClientRect();
        const phoneRect = phoneRoot.getBoundingClientRect();
        const baseWidth = phoneRoot.offsetWidth || 1;
        const baseHeight = phoneRoot.offsetHeight || 1;
        const scale = phoneRect.height / baseHeight;
        const localLeft = (rect.left - phoneRect.left) / scale;
        const localTop = (rect.top - phoneRect.top) / scale;
        const tooltipWidth = stackTooltip.offsetWidth;
        const tooltipHeight = stackTooltip.offsetHeight;
        let left = localLeft - tooltipWidth - 12;
        let top = localTop + rect.height / (2 * scale) - tooltipHeight / 2;
        if (left < 8) {
          left = localLeft + rect.width / scale + 12;
        }
        const minLeft = 8;
        const maxLeft = Math.max(minLeft, baseWidth - tooltipWidth - 8);
        const minTop = 8;
        const maxTop = Math.max(minTop, baseHeight - tooltipHeight - 8);
        left = Math.min(Math.max(left, minLeft), maxLeft);
        top = Math.min(Math.max(top, minTop), maxTop);
        stackTooltip.style.left = left + "px";
        stackTooltip.style.top = top + "px";
      };

      traitCircles.forEach(circle => {
        circle.addEventListener("mouseenter", () => {
          if (!stackTooltip || circle.style.display === "none") return;
          traitStack?.classList.add("is-hovering");
          positionStackTooltip(circle);
          stackTooltip.classList.add("show");
          stackTooltip.setAttribute("aria-hidden", "false");
        });
        circle.addEventListener("mousemove", () => {
          if (!stackTooltip || circle.style.display === "none") return;
          positionStackTooltip(circle);
        });
        circle.addEventListener("mouseleave", () => {
          if (!stackTooltip) return;
          stackTooltip.classList.remove("show");
          stackTooltip.setAttribute("aria-hidden", "true");
          traitStack?.classList.remove("is-hovering");
        });
      });

      const identityCard = phoneRoot.querySelector(".identity-card");
      const characterTooltip = phoneRoot.querySelector("#characterTooltip");
      if (identityCard && characterTooltip) {
        const positionCharacterTooltip = () => {
          const rect = identityCard.getBoundingClientRect();
          const phoneRect = phoneRoot.getBoundingClientRect();
          const baseWidth = phoneRoot.offsetWidth || 1;
          const baseHeight = phoneRoot.offsetHeight || 1;
          const scale = phoneRect.height / baseHeight;
          const localX = (rect.left - phoneRect.left) / scale + rect.width / (2 * scale);
          const localTop = (rect.top - phoneRect.top) / scale;
          const localBottom = (rect.bottom - phoneRect.top) / scale;
          const tooltipWidth = characterTooltip.offsetWidth;
          const tooltipHeight = characterTooltip.offsetHeight;
          let left = localX - tooltipWidth / 2;
          let top = localTop - tooltipHeight - 10;
          if (top < 8) {
            top = localBottom + 10;
          }
          const minLeft = 8;
          const maxLeft = baseWidth - tooltipWidth - 8;
          const minTop = 8;
          const maxTop = baseHeight - tooltipHeight - 8;
          left = Math.min(Math.max(left, minLeft), maxLeft);
          top = Math.min(Math.max(top, minTop), maxTop);
          characterTooltip.style.left = left + "px";
          characterTooltip.style.top = top + "px";
        };
        identityCard.addEventListener("mouseenter", () => {
          positionCharacterTooltip();
          characterTooltip.classList.add("show");
          characterTooltip.setAttribute("aria-hidden", "false");
        });
        identityCard.addEventListener("mousemove", () => {
          positionCharacterTooltip();
        });
        identityCard.addEventListener("mouseleave", () => {
          characterTooltip.classList.remove("show");
          characterTooltip.setAttribute("aria-hidden", "true");
        });
      }
    })();
  `;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tacticus Export</title>
    <style>${exportStyles}</style>
  </head>
  <body>
    ${clone.outerHTML}
    ${exportScript ? `<script>${exportScript}<\/script>` : ""}
  </body>
</html>`;

  const nameSeed = (nameInput?.value || "tacticus").trim();
  const safeName = nameSeed.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  const fileName = `${safeName || "tacticus"}_export.html`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

exportHtmlButton?.addEventListener("click", exportPhoneHtml);

function fitPhoneInPreview() {
  if (!phoneRoot || !previewWrap || !phoneShell) return;
  if (mobileWizardQuery.matches) {
    phoneShell.style.transform = "";
    if (phoneLock) {
      phoneLock.style.removeProperty("width");
      phoneLock.style.removeProperty("height");
    }
    return;
  }
  window.requestAnimationFrame(() => {
    const baseWidth = phoneRoot.offsetWidth || 1;
    const baseHeight = phoneRoot.offsetHeight || 1;
    const viewportHeight =
      window.visualViewport?.height ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
      baseHeight;
    const containerHeight = previewWrap.getBoundingClientRect().height || viewportHeight;
    const targetHeight = Math.min(containerHeight, viewportHeight);
    const scale = targetHeight / baseHeight;
    phoneShell.style.transformOrigin = "top left";
    phoneShell.style.transform = `scale(${scale.toFixed(4)})`;
    if (phoneLock) {
      phoneLock.style.width = `${baseWidth * scale}px`;
      phoneLock.style.height = `${baseHeight * scale}px`;
    }
  });
}

window.addEventListener("resize", fitPhoneInPreview);
window.addEventListener("orientationchange", fitPhoneInPreview);
window.visualViewport?.addEventListener("resize", fitPhoneInPreview);
fitPhoneInPreview();

if (previewWrap && "ResizeObserver" in window) {
  const previewObserver = new ResizeObserver(() => fitPhoneInPreview());
  previewObserver.observe(previewWrap);
}

function getSelectedIcon(selectEl) {
  const option = selectEl?.selectedOptions?.[0];
  return option?.dataset?.icon || "";
}

function updateAttackRows() {
  if (meleeAttackRow && meleeEnabled) {
    meleeAttackRow.classList.toggle("slot-hidden", !meleeEnabled.checked);
  }
  if (rangeAttackRow && rangeEnabled) {
    rangeAttackRow.classList.toggle("slot-hidden", !rangeEnabled.checked);
  }
}

function updateMeleeRow() {
  const iconFile = getSelectedIcon(meleeTypeSelect);
  if (meleeTypeIcon) {
    meleeTypeIcon.src = iconFile ? `assets/damageIcons/${iconFile}` : "";
  }
  if (meleeTypeLabel && meleeTypeSelect) {
    meleeTypeLabel.textContent = meleeTypeSelect.value || "";
    const meta = DAMAGE_META[meleeTypeSelect.value];
    meleeTypeLabel.style.color = meta ? meta.color : "inherit";
  }
  if (meleeHits && meleeHitsInput) {
    meleeHits.textContent = meleeHitsInput.value || "1";
  }
}

function updateRangeRow() {
  const iconFile = getSelectedIcon(rangeTypeSelect);
  if (rangeTypeIcon) {
    rangeTypeIcon.src = iconFile ? `assets/damageIcons/${iconFile}` : "";
  }
  if (rangeTypeLabel && rangeTypeSelect) {
    rangeTypeLabel.textContent = rangeTypeSelect.value || "";
    const meta = DAMAGE_META[rangeTypeSelect.value];
    rangeTypeLabel.style.color = meta ? meta.color : "inherit";
  }
  if (rangeHits && rangeHitsInput) {
    rangeHits.textContent = rangeHitsInput.value || "1";
  }
  if (rangeKindIcon && rangePatternSelect) {
    rangeKindIcon.src = rangePatternSelect.value === "range3"
      ? "assets/statIcons/Ranged_3_Icon.png"
      : "assets/statIcons/Ranged_2_Icon.png";
  }
}

function updateCritBlockRows() {
  if (critRow && critEnabled) {
    critRow.classList.toggle("slot-hidden", !critEnabled.checked);
  }
  if (blockRow && blockEnabled) {
    blockRow.classList.toggle("slot-hidden", !blockEnabled.checked);
  }
}

meleeEnabled?.addEventListener("change", updateAttackRows);
rangeEnabled?.addEventListener("change", updateAttackRows);
meleeTypeSelect?.addEventListener("change", updateMeleeRow);
rangeTypeSelect?.addEventListener("change", updateRangeRow);
rangePatternSelect?.addEventListener("change", updateRangeRow);
meleeHitsInput?.addEventListener("input", updateMeleeRow);
rangeHitsInput?.addEventListener("input", updateRangeRow);
critEnabled?.addEventListener("change", updateCritBlockRows);
blockEnabled?.addEventListener("change", updateCritBlockRows);

updateAttackRows();
updateMeleeRow();
updateRangeRow();
updateCritBlockRows();

if (phoneLock) {
  phoneLock.style.removeProperty("--phone-scale");
}
