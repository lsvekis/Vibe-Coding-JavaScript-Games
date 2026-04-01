
const STORAGE_KEY = "heroDiceVillainCrisis_v1";

const HEROES = [
  {
    id: "blazeTitan",
    name: "Blaze Titan",
    role: "Heavy striker",
    description: "Massive fire damage and burn pressure. Best against swarms and ice threats.",
    affinity: "fire",
    counters: ["swarm", "ice", "organic"],
    weakAgainst: ["shielded", "water", "armored"],
    stats: { maxHp: 32, attack: 7, defense: 2, power: 6 },
    abilityName: "Inferno Surge",
    abilityText: "On power 5-6, deals +4 damage and applies burn for 2 rounds.",
    unlockLevel: 1
  },
  {
    id: "stormPulse",
    name: "Storm Pulse",
    role: "Control specialist",
    description: "Electric disruption, strong against tech and flying enemies, with stun potential.",
    affinity: "electric",
    counters: ["flying", "tech", "speed"],
    weakAgainst: ["grounded", "insulated"],
    stats: { maxHp: 28, attack: 6, defense: 3, power: 7 },
    abilityName: "Chain Voltage",
    abilityText: "On power 5-6, stun the villain next round and deal +2 damage.",
    unlockLevel: 1
  },
  {
    id: "ironWarden",
    name: "Iron Warden",
    role: "Tank defender",
    description: "Can absorb huge hits and is ideal for hostage and brute-force encounters.",
    affinity: "armor",
    counters: ["brute", "hostage", "armored"],
    weakAgainst: ["psychic", "pierce"],
    stats: { maxHp: 38, attack: 5, defense: 7, power: 4 },
    abilityName: "Bulwark Protocol",
    abilityText: "On power 4-6, gain +3 defense this round and reflect 2 damage.",
    unlockLevel: 1
  },
  {
    id: "shadowShift",
    name: "Shadow Shift",
    role: "Stealth assassin",
    description: "Fast, evasive, and dangerous against trap-heavy or stealth villains.",
    affinity: "shadow",
    counters: ["stealth", "trap", "psychic"],
    weakAgainst: ["area", "radiant"],
    stats: { maxHp: 26, attack: 7, defense: 3, power: 6 },
    abilityName: "Phase Strike",
    abilityText: "On power 5-6, dodge all incoming damage and crit for +5 damage.",
    unlockLevel: 2
  },
  {
    id: "mindNova",
    name: "Mind Nova",
    role: "Psionic controller",
    description: "Debuffs villains and manipulates events. Excellent versus masterminds and psychic enemies.",
    affinity: "psychic",
    counters: ["psychic", "mastermind", "chaos"],
    weakAgainst: ["brute", "silence"],
    stats: { maxHp: 27, attack: 5, defense: 4, power: 8 },
    abilityName: "Mind Fracture",
    abilityText: "On power 4-6, reduce villain attack by 2 for 2 rounds and deal +2 damage.",
    unlockLevel: 3
  },
  {
    id: "voltFang",
    name: "Volt Fang",
    role: "Combo duelist",
    description: "Fast attacker with chain damage, strong against speed and lightly armored foes.",
    affinity: "speed",
    counters: ["speed", "tech", "flying"],
    weakAgainst: ["brute", "armor"],
    stats: { maxHp: 29, attack: 6, defense: 4, power: 6 },
    abilityName: "Rapid Arc",
    abilityText: "On power 5-6, make a second attack for half damage.",
    unlockLevel: 4
  }
];

const VILLAINS = [
  {
    id: "dreadRook",
    name: "Dread Rook",
    type: "armored",
    tags: ["armored", "hostage", "brute"],
    description: "A siege-engine villain crushing city streets with plated armor.",
    stats: { maxHp: 34, attack: 6, defense: 4, power: 4 }
  },
  {
    id: "skyViper",
    name: "Sky Viper",
    type: "flying",
    tags: ["flying", "speed", "tech"],
    description: "A hit-and-run raider attacking from above with drone support.",
    stats: { maxHp: 28, attack: 7, defense: 3, power: 5 }
  },
  {
    id: "Null Priest",
    name: "Null Priest",
    type: "psychic",
    tags: ["psychic", "mastermind", "chaos"],
    description: "A mind-bending villain distorting logic and turning allies on each other.",
    stats: { maxHp: 30, attack: 5, defense: 4, power: 8 }
  },
  {
    id: "Frost Maw",
    name: "Frost Maw",
    type: "ice",
    tags: ["ice", "brute", "organic"],
    description: "A frozen giant whose body hardens as the battle drags on.",
    stats: { maxHp: 36, attack: 6, defense: 3, power: 5 }
  },
  {
    id: "Ash Scarab",
    name: "Ash Scarab",
    type: "swarm",
    tags: ["swarm", "stealth", "organic"],
    description: "A villain that breaks into countless smaller threats and overwhelms defenders.",
    stats: { maxHp: 26, attack: 7, defense: 2, power: 6 }
  },
  {
    id: "Circuit Judge",
    name: "Circuit Judge",
    type: "tech",
    tags: ["tech", "shielded", "mastermind"],
    description: "A cold strategic machine protected by adaptive barriers.",
    stats: { maxHp: 31, attack: 6, defense: 5, power: 6 }
  }
];

const SCENARIOS = [
  {
    id: "bankSiege",
    name: "Bank Siege at Iron Square",
    summary: "A villain has trapped civilians inside a reinforced tower and is demanding a citywide shutdown.",
    tags: ["hostage", "urban", "pressure"],
    eventBias: "defense",
    reward: 45
  },
  {
    id: "reactorSpiral",
    name: "Reactor Spiral",
    summary: "A power plant is destabilizing while an enemy siphons its core from above.",
    tags: ["tech", "flying", "meltdown"],
    eventBias: "power",
    reward: 50
  },
  {
    id: "midnightLab",
    name: "Midnight Lab Breach",
    summary: "A stealth-heavy villain has entered a research lab packed with traps and prototypes.",
    tags: ["stealth", "trap", "science"],
    eventBias: "attack",
    reward: 48
  },
  {
    id: "cathedralStatic",
    name: "Cathedral of Static",
    summary: "A psychic signal is spreading panic across the city from an abandoned cathedral.",
    tags: ["psychic", "chaos", "ritual"],
    eventBias: "power",
    reward: 52
  },
  {
    id: "harborFreeze",
    name: "Harbor Freezefront",
    summary: "A frozen brute is locking down the harbor and shattering supply lines.",
    tags: ["ice", "brute", "harbor"],
    eventBias: "defense",
    reward: 47
  }
];

const EVENT_DIE = {
  1: { label: "Setback", effect: "heroDamage", amount: 2 },
  2: { label: "Complication", effect: "villainDefense", amount: 1 },
  3: { label: "Neutral", effect: "none", amount: 0 },
  4: { label: "Opening", effect: "heroAttack", amount: 1 },
  5: { label: "Advantage", effect: "heroPower", amount: 1 },
  6: { label: "Momentum", effect: "heroAttack", amount: 2 }
};

const defaultState = {
  credits: 100,
  wins: 0,
  losses: 0,
  missionsCleared: 0,
  currentMission: null,
  selectedHeroId: null,
  heroes: HEROES.reduce((acc, h) => {
    acc[h.id] = { level: 1, xp: 0, unlocked: h.unlockLevel === 1 };
    return acc;
  }, {})
};

const el = {
  credits: document.getElementById("credits"),
  wins: document.getElementById("wins"),
  losses: document.getElementById("losses"),
  missionsCleared: document.getElementById("missionsCleared"),
  missionPanel: document.getElementById("missionPanel"),
  heroGrid: document.getElementById("heroGrid"),
  selectedHeroPanel: document.getElementById("selectedHeroPanel"),
  villainPanel: document.getElementById("villainPanel"),
  battleLog: document.getElementById("battleLog"),
  diceTray: document.getElementById("diceTray"),
  startBattleBtn: document.getElementById("startBattleBtn"),
  newMissionBtn: document.getElementById("newMissionBtn"),
  resetProgressBtn: document.getElementById("resetProgressBtn"),
  toast: document.getElementById("toast")
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      heroes: { ...structuredClone(defaultState).heroes, ...(parsed.heroes || {}) }
    };
  } catch (e) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(text) {
  el.toast.textContent = text;
  el.toast.classList.remove("hidden");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => el.toast.classList.add("hidden"), 1800);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getHeroBase(heroId) {
  return HEROES.find(h => h.id === heroId);
}

function getHeroRuntimeStats(heroId) {
  const hero = getHeroBase(heroId);
  const progress = state.heroes[heroId];
  const level = progress.level;
  return {
    maxHp: hero.stats.maxHp + (level - 1) * 3,
    attack: hero.stats.attack + Math.floor((level - 1) / 1.5),
    defense: hero.stats.defense + Math.floor((level - 1) / 2),
    power: hero.stats.power + Math.floor((level - 1) / 2)
  };
}

function xpNeeded(level) {
  return 30 + (level - 1) * 20;
}

function generateMission() {
  const scenario = clone(randomItem(SCENARIOS));
  const villain = clone(randomItem(VILLAINS));
  state.currentMission = {
    id: `${scenario.id}-${Date.now()}`,
    scenario,
    villain
  };
  state.selectedHeroId = null;
  saveState();
  render();
}

function scoreHeroForMission(hero, mission) {
  let score = 0;
  mission.villain.tags.forEach(tag => {
    if (hero.counters.includes(tag)) score += 3;
    if (hero.weakAgainst.includes(tag)) score -= 2;
  });
  mission.scenario.tags.forEach(tag => {
    if (hero.counters.includes(tag)) score += 2;
    if (hero.weakAgainst.includes(tag)) score -= 1;
  });
  score += state.heroes[hero.id].level;
  return score;
}

function renderMission() {
  const mission = state.currentMission;
  if (!mission) {
    el.missionPanel.innerHTML = "<p>No mission active. Generate one to begin.</p>";
    return;
  }
  const bestHero = HEROES
    .filter(h => state.heroes[h.id].unlocked)
    .sort((a,b) => scoreHeroForMission(b, mission) - scoreHeroForMission(a, mission))[0];

  el.missionPanel.innerHTML = `
    <div class="mission-name">${mission.scenario.name}</div>
    <p>${mission.scenario.summary}</p>
    <div class="tag-row">
      ${mission.scenario.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      ${mission.villain.tags.map(t => `<span class="tag warn">${t}</span>`).join("")}
    </div>
    <p><strong>Villain:</strong> ${mission.villain.name} — ${mission.villain.description}</p>
    <p><strong>Suggested match:</strong> <span class="tag good">${bestHero.name}</span></p>
    <p><strong>Mission reward:</strong> ${mission.scenario.reward} credits</p>
  `;
}

function renderDashboard() {
  el.credits.textContent = state.credits;
  el.wins.textContent = state.wins;
  el.losses.textContent = state.losses;
  el.missionsCleared.textContent = state.missionsCleared;
}

function renderHeroes() {
  const mission = state.currentMission;
  el.heroGrid.innerHTML = HEROES.map(hero => {
    const progress = state.heroes[hero.id];
    const unlocked = progress.unlocked;
    const level = progress.level;
    const currentXp = progress.xp;
    const need = xpNeeded(level);
    const stats = getHeroRuntimeStats(hero.id);
    const score = mission && unlocked ? scoreHeroForMission(hero, mission) : 0;
    const hint = !mission ? "No mission selected" : score >= 7 ? "Strong match" : score >= 3 ? "Good option" : score >= 0 ? "Risky pick" : "Poor match";
    return `
      <article class="hero-card ${state.selectedHeroId === hero.id ? "selected" : ""}">
        <div class="hero-top">
          <div>
            <div class="hero-name">${hero.name}</div>
            <div class="hero-role">${hero.role}</div>
          </div>
          <div class="tag ${score >= 7 ? "good" : score >= 3 ? "" : "warn"}">${hint}</div>
        </div>
        <div class="hero-description">${hero.description}</div>
        <div class="hero-stats">
          <div class="mini-stat"><span>HP</span><strong>${stats.maxHp}</strong></div>
          <div class="mini-stat"><span>ATK</span><strong>${stats.attack}</strong></div>
          <div class="mini-stat"><span>DEF</span><strong>${stats.defense}</strong></div>
          <div class="mini-stat"><span>PWR</span><strong>${stats.power}</strong></div>
        </div>
        <div class="tag-row">
          ${hero.counters.slice(0,3).map(t => `<span class="tag good">${t}</span>`).join("")}
          ${hero.weakAgainst.slice(0,2).map(t => `<span class="tag warn">${t}</span>`).join("")}
        </div>
        <div class="hero-actions">
          <div class="hero-level">${unlocked ? `Level ${level}` : `Unlocks at ${hero.unlockLevel} wins`}</div>
          <button class="${unlocked ? "secondary" : "ghost"}" ${unlocked ? "" : "disabled"} data-select-hero="${hero.id}">
            ${state.selectedHeroId === hero.id ? "Selected" : unlocked ? "Select Hero" : "Locked"}
          </button>
        </div>
        <div class="hero-xp">
          <div class="hero-xp-fill" style="width:${Math.min(100, (currentXp / need) * 100)}%"></div>
        </div>
      </article>
    `;
  }).join("");

  el.heroGrid.querySelectorAll("[data-select-hero]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedHeroId = btn.dataset.selectHero;
      saveState();
      render();
    });
  });
}

function renderSelectedPanels() {
  const mission = state.currentMission;
  const hero = state.selectedHeroId ? getHeroBase(state.selectedHeroId) : null;

  if (!hero) {
    el.selectedHeroPanel.className = "selection-panel empty";
    el.selectedHeroPanel.textContent = "Choose a hero to begin.";
  } else {
    const stats = getHeroRuntimeStats(hero.id);
    const progress = state.heroes[hero.id];
    el.selectedHeroPanel.className = "selection-panel";
    el.selectedHeroPanel.innerHTML = `
      <div class="hero-name">${hero.name}</div>
      <div class="hero-role">${hero.role}</div>
      <p>${hero.description}</p>
      <div class="tag-row">${hero.counters.map(t => `<span class="tag good">${t}</span>`).join("")}</div>
      <div class="tag-row">${hero.weakAgainst.map(t => `<span class="tag warn">${t}</span>`).join("")}</div>
      <p><strong>${hero.abilityName}:</strong> ${hero.abilityText}</p>
      <p><strong>Level:</strong> ${progress.level}</p>
      <div class="hero-stats">
        <div class="mini-stat"><span>HP</span><strong>${stats.maxHp}</strong></div>
        <div class="mini-stat"><span>ATK</span><strong>${stats.attack}</strong></div>
        <div class="mini-stat"><span>DEF</span><strong>${stats.defense}</strong></div>
        <div class="mini-stat"><span>PWR</span><strong>${stats.power}</strong></div>
      </div>
    `;
  }

  if (!mission) {
    el.villainPanel.innerHTML = "No villain selected.";
  } else {
    const v = mission.villain;
    el.villainPanel.className = "selection-panel";
    el.villainPanel.innerHTML = `
      <div class="hero-name">${v.name}</div>
      <div class="hero-role">${v.type} threat</div>
      <p>${v.description}</p>
      <div class="tag-row">${v.tags.map(t => `<span class="tag warn">${t}</span>`).join("")}</div>
      <div class="hero-stats">
        <div class="mini-stat"><span>HP</span><strong>${v.stats.maxHp}</strong></div>
        <div class="mini-stat"><span>ATK</span><strong>${v.stats.attack}</strong></div>
        <div class="mini-stat"><span>DEF</span><strong>${v.stats.defense}</strong></div>
        <div class="mini-stat"><span>PWR</span><strong>${v.stats.power}</strong></div>
      </div>
    `;
  }

  el.startBattleBtn.disabled = !(state.currentMission && state.selectedHeroId);
}

function addLog(text, type="info") {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = text;
  el.battleLog.appendChild(entry);
  el.battleLog.scrollTop = el.battleLog.scrollHeight;
}

function clearLog() {
  el.battleLog.innerHTML = "";
}

function renderDice(dice) {
  el.diceTray.innerHTML = [
    ["Attack", dice.attack],
    ["Defense", dice.defense],
    ["Power", dice.power],
    ["Event", `${dice.event} · ${EVENT_DIE[dice.event].label}`]
  ].map(([label, value]) => `
    <div class="die">
      <div class="die-label">${label}</div>
      <div class="die-value">${value}</div>
    </div>
  `).join("");
}

function buildHealthPanel(name, hp, maxHp, villain = false) {
  const pct = Math.max(0, (hp / maxHp) * 100);
  return `
    <div class="health-bar-wrap">
      <div class="health-meta"><span>${name}</span><span>${hp} / ${maxHp}</span></div>
      <div class="health-bar"><div class="health-fill ${villain ? "villain-fill" : ""}" style="width:${pct}%"></div></div>
    </div>
  `;
}

function missionSynergy(hero, mission) {
  let bonus = 0;
  mission.villain.tags.forEach(t => {
    if (hero.counters.includes(t)) bonus += 1;
    if (hero.weakAgainst.includes(t)) bonus -= 1;
  });
  mission.scenario.tags.forEach(t => {
    if (hero.counters.includes(t)) bonus += 1;
    if (hero.weakAgainst.includes(t)) bonus -= 1;
  });
  return bonus;
}

function unlockHeroesIfNeeded() {
  const unlockedNow = [];
  HEROES.forEach(hero => {
    if (!state.heroes[hero.id].unlocked && state.wins >= hero.unlockLevel) {
      state.heroes[hero.id].unlocked = true;
      unlockedNow.push(hero.name);
    }
  });
  return unlockedNow;
}

function awardXp(heroId, amount) {
  const progress = state.heroes[heroId];
  progress.xp += amount;
  let leveledUp = 0;
  while (progress.xp >= xpNeeded(progress.level)) {
    progress.xp -= xpNeeded(progress.level);
    progress.level += 1;
    leveledUp += 1;
  }
  return leveledUp;
}

async function startBattle() {
  if (!(state.currentMission && state.selectedHeroId)) return;

  el.startBattleBtn.disabled = true;
  el.newMissionBtn.disabled = true;
  clearLog();
  el.diceTray.innerHTML = "";

  const mission = clone(state.currentMission);
  const hero = getHeroBase(state.selectedHeroId);
  const heroStats = getHeroRuntimeStats(hero.id);
  const villainStats = clone(mission.villain.stats);

  let heroHp = heroStats.maxHp;
  let villainHp = villainStats.maxHp;
  let heroMod = { burn: 0, stunNext: false, extraDefense: 0, villainAttackDebuff: 0 };
  let villainMod = { burn: 0, stunned: false, defenseBoost: 0, attackDebuff: 0 };

  addLog(`Mission start: ${mission.scenario.name}. ${hero.name} confronts ${mission.villain.name}.`, "info");
  addLog(`Scenario reward: ${mission.scenario.reward} credits.`, "info");

  for (let round = 1; round <= 12; round++) {
    if (heroHp <= 0 || villainHp <= 0) break;

    addLog(`Round ${round} begins.`, "info");

    if (villainMod.burn > 0) {
      villainHp -= 2;
      villainMod.burn -= 1;
      addLog(`${mission.villain.name} suffers 2 burn damage.`, "good");
      if (villainHp <= 0) break;
    }

    const dice = {
      attack: rollDie(),
      defense: rollDie(),
      power: rollDie(),
      event: rollDie()
    };
    renderDice(dice);

    const eventMeta = EVENT_DIE[dice.event];
    let heroAttackBoost = 0;
    let heroPowerBoost = 0;
    let villainDefenseBoost = villainMod.defenseBoost || 0;
    let bonusHeroDamage = 0;

    if (eventMeta.effect === "heroDamage") {
      heroHp -= eventMeta.amount;
      addLog(`Event die: ${eventMeta.label}. ${hero.name} takes ${eventMeta.amount} crisis damage.`, "bad");
    }
    if (eventMeta.effect === "villainDefense") {
      villainDefenseBoost += eventMeta.amount;
      addLog(`Event die: ${eventMeta.label}. ${mission.villain.name} gains +${eventMeta.amount} defense.`, "bad");
    }
    if (eventMeta.effect === "heroAttack") {
      heroAttackBoost += eventMeta.amount;
      addLog(`Event die: ${eventMeta.label}. ${hero.name} gains +${eventMeta.amount} attack this round.`, "good");
    }
    if (eventMeta.effect === "heroPower") {
      heroPowerBoost += eventMeta.amount;
      addLog(`Event die: ${eventMeta.label}. ${hero.name}'s power surges by +${eventMeta.amount}.`, "good");
    }

    const synergy = missionSynergy(hero, mission);
    if (synergy > 0) addLog(`${hero.name} is a strong tactical match for this crisis (+${synergy} matchup bonus).`, "good");
    if (synergy < 0) addLog(`${hero.name} is poorly matched for this crisis (${synergy} matchup penalty).`, "bad");

    // Hero ability resolution
    let attackValue = heroStats.attack + dice.attack + heroAttackBoost + synergy;
    let defenseValue = heroStats.defense + dice.defense + heroMod.extraDefense;
    let powerValue = heroStats.power + dice.power + heroPowerBoost;
    let heroDodges = false;
    let reflectDamage = 0;
    let extraAttackDamage = 0;

    if (hero.id === "blazeTitan" && dice.power >= 5) {
      bonusHeroDamage += 4;
      villainMod.burn = Math.max(villainMod.burn, 2);
      addLog(`${hero.name} triggers Inferno Surge: +4 damage and burn applied.`, "good");
    }

    if (hero.id === "stormPulse" && dice.power >= 5) {
      bonusHeroDamage += 2;
      villainMod.stunned = true;
      addLog(`${hero.name} triggers Chain Voltage: ${mission.villain.name} is stunned next round.`, "good");
    }

    if (hero.id === "ironWarden" && dice.power >= 4) {
      defenseValue += 3;
      reflectDamage = 2;
      addLog(`${hero.name} activates Bulwark Protocol: +3 defense and reflect 2 damage.`, "good");
    }

    if (hero.id === "shadowShift" && dice.power >= 5) {
      heroDodges = true;
      bonusHeroDamage += 5;
      addLog(`${hero.name} uses Phase Strike: full dodge and +5 critical damage.`, "good");
    }

    if (hero.id === "mindNova" && dice.power >= 4) {
      villainMod.attackDebuff = 2;
      bonusHeroDamage += 2;
      addLog(`${hero.name} casts Mind Fracture: villain attack reduced by 2 for 2 rounds.`, "good");
    }

    if (hero.id === "voltFang" && dice.power >= 5) {
      extraAttackDamage = Math.max(2, Math.floor(attackValue / 2));
      addLog(`${hero.name} triggers Rapid Arc for an extra ${extraAttackDamage} damage.`, "good");
    }

    const totalHeroDamage = Math.max(1, attackValue + bonusHeroDamage - (villainStats.defense + villainDefenseBoost));
    villainHp -= totalHeroDamage;
    addLog(`${hero.name} rolls ${dice.attack}/${dice.defense}/${dice.power} and deals ${totalHeroDamage} damage.`, "good");
    if (extraAttackDamage > 0 && villainHp > 0) {
      villainHp -= extraAttackDamage;
      addLog(`${hero.name} follows up for ${extraAttackDamage} bonus combo damage.`, "good");
    }

    if (villainHp <= 0) break;

    // Villain turn
    if (villainMod.stunned) {
      villainMod.stunned = false;
      addLog(`${mission.villain.name} is stunned and loses the turn.`, "good");
    } else {
      const villainAttackRoll = rollDie();
      const villainPowerRoll = rollDie();
      let villainAttack = villainStats.attack + villainAttackRoll - (villainMod.attackDebuff || 0);
      let villainPower = villainStats.power + villainPowerRoll;
      let incoming = Math.max(1, villainAttack - defenseValue);

      if (mission.villain.id === "Circuit Judge" && villainPowerRoll >= 5) {
        incoming += 2;
        addLog(`${mission.villain.name} overloads defenses for +2 damage.`, "bad");
      }
      if (mission.villain.id === "Frost Maw" && villainPowerRoll >= 5) {
        villainStats.defense += 1;
        addLog(`${mission.villain.name} hardens its armor: defense permanently +1.`, "bad");
      }
      if (mission.villain.id === "Ash Scarab" && villainPowerRoll >= 5) {
        incoming += 1;
        addLog(`${mission.villain.name} swarms around ${hero.name}, adding +1 damage.`, "bad");
      }
      if (mission.villain.id === "Null Priest" && villainPowerRoll >= 5) {
        heroHp -= 2;
        addLog(`${mission.villain.name} inflicts psychic backlash for 2 direct damage.`, "bad");
      }

      if (heroDodges) {
        incoming = 0;
      }

      heroHp -= incoming;
      addLog(`${mission.villain.name} strikes back for ${incoming} damage.`, incoming > 4 ? "bad" : "info");

      if (reflectDamage > 0) {
        villainHp -= reflectDamage;
        addLog(`${hero.name} reflects ${reflectDamage} damage.`, "good");
      }
    }

    villainMod.attackDebuff = Math.max(0, (villainMod.attackDebuff || 0) - 1);
    heroMod.extraDefense = 0;

    addLog(stripHtml(buildHealthPanel(hero.name, heroHp, heroStats.maxHp)), "info");
    addLog(stripHtml(buildHealthPanel(mission.villain.name, villainHp, mission.villain.stats.maxHp, true)), "info");
    await wait(450);
  }

  const victory = heroHp > 0 && villainHp <= 0;
  if (victory) {
    state.wins += 1;
    state.missionsCleared += 1;
    state.credits += mission.scenario.reward;
    const xpGain = 18 + Math.max(0, missionSynergy(hero, mission)) * 3;
    const levels = awardXp(hero.id, xpGain);
    addLog(`${hero.name} wins the mission and earns ${mission.scenario.reward} credits and ${xpGain} XP.`, "good");
    if (levels > 0) addLog(`${hero.name} leveled up ${levels} time(s)!`, "good");
    const unlocked = unlockHeroesIfNeeded();
    unlocked.forEach(name => addLog(`${name} has joined the roster.`, "good"));
    showToast("Mission cleared");
  } else {
    state.losses += 1;
    const pityXp = 8;
    const levels = awardXp(hero.id, pityXp);
    addLog(`${hero.name} was defeated. The city regroups. ${pityXp} XP gained from the attempt.`, "bad");
    if (levels > 0) addLog(`${hero.name} leveled up despite the loss.`, "good");
    showToast("Mission failed");
  }

  state.currentMission = null;
  state.selectedHeroId = null;
  saveState();
  render();
  el.newMissionBtn.disabled = false;
}

function stripHtml(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  return d.textContent || d.innerText || "";
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetProgress() {
  if (!confirm("Reset all saved progress for Hero Dice: Villain Crisis?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  generateMission();
  showToast("Progress reset");
}

function render() {
  renderDashboard();
  renderMission();
  renderHeroes();
  renderSelectedPanels();
}

el.newMissionBtn.addEventListener("click", generateMission);
el.startBattleBtn.addEventListener("click", startBattle);
el.resetProgressBtn.addEventListener("click", resetProgress);

if (!state.currentMission) {
  generateMission();
} else {
  render();
}
