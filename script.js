const API_URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");
const pickerGrid = document.getElementById("pickerGrid");
const spinBtn = document.getElementById("spinBtn");
const muteBtn = document.getElementById("muteBtn");
const noRepeatBtn = document.getElementById("noRepeatBtn");
const themeSelect = document.getElementById("themeSelect");
const statusText = document.getElementById("statusText");
const announcerText = document.getElementById("announcerText");
const historyList = document.getElementById("historyList");
const favoritesList = document.getElementById("favoritesList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const modeButtons = document.querySelectorAll(".mode-btn");
const filterChips = document.querySelectorAll(".filter-chip");
const filterInputs = document.querySelectorAll(".filter-chip input");
const skillPreference = document.getElementById("skillPreference");
const rankSelect = document.getElementById("rankSelect");
const shareBtn = document.getElementById("shareBtn");
const screenshotBtn = document.getElementById("screenshotBtn");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const particlesRoot = document.getElementById("particles");

const UI = {
  1: {
    card: document.getElementById("card1"),
    img: document.getElementById("agentImg1"),
    role: document.getElementById("agentRole1"),
    name: document.getElementById("agentName1"),
    desc: document.getElementById("agentDesc1"),
    difficulty: document.getElementById("agentDifficulty1"),
    playstyle: document.getElementById("agentPlaystyle1"),
    tip: document.getElementById("agentTip1"),
    maps: document.getElementById("agentMaps1"),
    rankAdvice: document.getElementById("rankAdvice1"),
  },
  2: {
    card: document.getElementById("card2"),
    img: document.getElementById("agentImg2"),
    role: document.getElementById("agentRole2"),
    name: document.getElementById("agentName2"),
    desc: document.getElementById("agentDesc2"),
    difficulty: document.getElementById("agentDifficulty2"),
    playstyle: document.getElementById("agentPlaystyle2"),
    tip: document.getElementById("agentTip2"),
    maps: document.getElementById("agentMaps2"),
    rankAdvice: document.getElementById("rankAdvice2"),
  },
  3: {
    card: document.getElementById("card3"),
    img: document.getElementById("agentImg3"),
    role: document.getElementById("agentRole3"),
    name: document.getElementById("agentName3"),
    desc: document.getElementById("agentDesc3"),
    difficulty: document.getElementById("agentDifficulty3"),
    playstyle: document.getElementById("agentPlaystyle3"),
    tip: document.getElementById("agentTip3"),
    maps: document.getElementById("agentMaps3"),
    rankAdvice: document.getElementById("rankAdvice3"),
  },
  4: {
    card: document.getElementById("card4"),
    img: document.getElementById("agentImg4"),
    role: document.getElementById("agentRole4"),
    name: document.getElementById("agentName4"),
    desc: document.getElementById("agentDesc4"),
    difficulty: document.getElementById("agentDifficulty4"),
    playstyle: document.getElementById("agentPlaystyle4"),
    tip: document.getElementById("agentTip4"),
    maps: document.getElementById("agentMaps4"),
    rankAdvice: document.getElementById("rankAdvice4"),
  },
  5: {
    card: document.getElementById("card5"),
    img: document.getElementById("agentImg5"),
    role: document.getElementById("agentRole5"),
    name: document.getElementById("agentName5"),
    desc: document.getElementById("agentDesc5"),
    difficulty: document.getElementById("agentDifficulty5"),
    playstyle: document.getElementById("agentPlaystyle5"),
    tip: document.getElementById("agentTip5"),
    maps: document.getElementById("agentMaps5"),
    rankAdvice: document.getElementById("rankAdvice5"),
  },
};

const loadingMessages = [
  "Syncing agent protocol...",
  "Loading tactical data...",
  "Preparing randomizer...",
];

const announcerLines = [
  "Agent assigned.",
  "Lock it in.",
  "The protocol chose violence.",
  "No excuses.",
  "Tactical profile loaded.",
];

const agentMeta = {
  Jett: {
    difficulty: "Hard",
    playstyle: "Aggressive",
    tip: "Best for aggressive entry and quick repositioning.",
    maps: ["Ascent", "Haven", "Split"],
    bg: "#63c5ff",
  },
  Phoenix: {
    difficulty: "Easy",
    playstyle: "Aggressive",
    tip: "Strong for self-sustain and entry flashes.",
    maps: ["Bind", "Haven", "Split"],
    bg: "#ff7a33",
  },
  Reyna: {
    difficulty: "Medium",
    playstyle: "Aggressive",
    tip: "Best when you trust your aim and want to snowball rounds.",
    maps: ["Haven", "Ascent", "Lotus"],
    bg: "#b14cff",
  },
  Raze: {
    difficulty: "Medium",
    playstyle: "Aggressive",
    tip: "Great for explosive space-taking and clearing corners.",
    maps: ["Bind", "Split", "Sunset"],
    bg: "#ff8f3d",
  },
  Yoru: {
    difficulty: "Hard",
    playstyle: "Strategic",
    tip: "Use deception and timing instead of forcing every duel.",
    maps: ["Bind", "Lotus", "Breeze"],
    bg: "#5f7cff",
  },
  Neon: {
    difficulty: "Hard",
    playstyle: "Aggressive",
    tip: "Chain fast pressure with confident pathing.",
    maps: ["Fracture", "Lotus", "Pearl"],
    bg: "#53e8ff",
  },
  Iso: {
    difficulty: "Medium",
    playstyle: "Aggressive",
    tip: "Look for clean isolated fights, not messy trades.",
    maps: ["Haven", "Ascent", "Lotus"],
    bg: "#ffd54d",
  },
  Sova: {
    difficulty: "Medium",
    playstyle: "Strategic",
    tip: "Use recon to start fights with information advantage.",
    maps: ["Ascent", "Haven", "Breeze"],
    bg: "#7cd7ff",
  },
  Fade: {
    difficulty: "Medium",
    playstyle: "Strategic",
    tip: "Excellent for coordinated clears and forcing defenders out.",
    maps: ["Ascent", "Lotus", "Bind"],
    bg: "#8d73ff",
  },
  Skye: {
    difficulty: "Medium",
    playstyle: "Support",
    tip: "Flexible pick with flashes, info, and team sustain.",
    maps: ["Bind", "Haven", "Sunset"],
    bg: "#8ef7b2",
  },
  Breach: {
    difficulty: "Medium",
    playstyle: "Aggressive",
    tip: "Play with teammates and turn every entry into a stun setup.",
    maps: ["Fracture", "Split", "Lotus"],
    bg: "#ffb347",
  },
  "KAY/O": {
    difficulty: "Medium",
    playstyle: "Strategic",
    tip: "Suppress key defenders before committing.",
    maps: ["Ascent", "Icebox", "Breeze"],
    bg: "#77b5ff",
  },
  Gekko: {
    difficulty: "Easy",
    playstyle: "Support",
    tip: "Great for plant utility and repeatable value.",
    maps: ["Bind", "Lotus", "Split"],
    bg: "#8dff8d",
  },
  Omen: {
    difficulty: "Medium",
    playstyle: "Strategic",
    tip: "Strong for sneaky lurks and flexible smoke timings.",
    maps: ["Ascent", "Split", "Lotus"],
    bg: "#8570ff",
  },
  Brimstone: {
    difficulty: "Easy",
    playstyle: "Support",
    tip: "Reliable smokes and simple execution power.",
    maps: ["Bind", "Fracture", "Split"],
    bg: "#ff6f61",
  },
  Viper: {
    difficulty: "Hard",
    playstyle: "Defensive",
    tip: "Manage fuel carefully and control long sightlines.",
    maps: ["Breeze", "Icebox", "Pearl"],
    bg: "#49d16d",
  },
  Astra: {
    difficulty: "Hard",
    playstyle: "Strategic",
    tip: "Best for patient players with strong macro awareness.",
    maps: ["Split", "Lotus", "Pearl"],
    bg: "#a57bff",
  },
  Harbor: {
    difficulty: "Medium",
    playstyle: "Support",
    tip: "Use moving cover to reshape space for your team.",
    maps: ["Breeze", "Lotus", "Pearl"],
    bg: "#46cfff",
  },
  Cypher: {
    difficulty: "Medium",
    playstyle: "Defensive",
    tip: "Perfect for flank control and trap-based site anchoring.",
    maps: ["Bind", "Sunset", "Split"],
    bg: "#ffd66d",
  },
  Killjoy: {
    difficulty: "Easy",
    playstyle: "Defensive",
    tip: "Very strong when anchoring sites and delaying pushes.",
    maps: ["Ascent", "Bind", "Lotus"],
    bg: "#f4da45",
  },
  Sage: {
    difficulty: "Easy",
    playstyle: "Support",
    tip: "Prioritize smart slows and life-saving utility timing.",
    maps: ["Split", "Icebox", "Lotus"],
    bg: "#8effe4",
  },
  Chamber: {
    difficulty: "Medium",
    playstyle: "Defensive",
    tip: "Play for picks and reposition before pressure arrives.",
    maps: ["Bind", "Lotus", "Sunset"],
    bg: "#cdbb6a",
  },
  Deadlock: {
    difficulty: "Medium",
    playstyle: "Defensive",
    tip: "Best when reacting to pushes and tightening choke points.",
    maps: ["Sunset", "Bind", "Lotus"],
    bg: "#7df0ff",
  },
  Vyse: {
    difficulty: "Medium",
    playstyle: "Strategic",
    tip: "Control enemy movement and punish forced entries.",
    maps: ["Ascent", "Split", "Sunset"],
    bg: "#ff84a1",
  },
};

const rankAdviceByStyle = {
  Easy: {
    Iron: "Reliable and forgiving pick for newer players.",
    Bronze: "Good for learning core habits without overload.",
    Silver: "Solid value if you want consistency.",
    Gold: "Still reliable, especially in structured rounds.",
    Platinum: "Simple but effective when played cleanly.",
    Diamond: "Works well if fundamentals are strong.",
    Immortal: "Viable, but utility timing matters a lot.",
    Radiant: "Only strong with perfect discipline.",
  },
  Medium: {
    Iron: "Playable, but may feel harder without team coordination.",
    Bronze: "Good if you want to improve game sense.",
    Silver: "Strong for players with decent mechanics.",
    Gold: "Very viable and flexible at this rank.",
    Platinum: "Great when paired with confident decision-making.",
    Diamond: "Strong pick if you understand timings.",
    Immortal: "High value with sharp execution.",
    Radiant: "Excellent if mastered.",
  },
  Hard: {
    Iron: "High ceiling, but difficult for beginners.",
    Bronze: "Can work, but mistakes are punished harder.",
    Silver: "Only worth it if you practice the agent often.",
    Gold: "Good if you are comfortable with high complexity.",
    Platinum: "Very rewarding with clean mechanics.",
    Diamond: "High-impact choice with strong mastery.",
    Immortal: "Excellent for confident players.",
    Radiant: "Top-tier in expert hands.",
  },
};

const preferenceWeights = {
  Aggressive: ["Aggressive"],
  Strategic: ["Strategic"],
  Support: ["Support"],
  Defensive: ["Defensive"],
};

let allAgents = [];
let currentMode = "solo";
let isMuted = false;
let isSpinning = false;
let noRepeatMode = false;
let usedAgentNames = [];
let lastPicks = [];

const FALLBACK_AGENTS = [
  {
    displayName: "Jett",
    description: "Swift movement and entry power.",
    role: { displayName: "Duelist" },
    image:
      "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png",
  },
  {
    displayName: "Sova",
    description: "Recon and information gathering.",
    role: { displayName: "Initiator" },
    image:
      "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png",
  },
  {
    displayName: "Omen",
    description: "Smokes and sneaky repositioning.",
    role: { displayName: "Controller" },
    image:
      "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png",
  },
  {
    displayName: "Killjoy",
    description: "Defensive setups and lockdown.",
    role: { displayName: "Sentinel" },
    image:
      "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/fullportrait.png",
  },
  {
    displayName: "Phoenix",
    description: "Flash, fire, and fearless entries.",
    role: { displayName: "Duelist" },
    image:
      "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png",
  },
];

function rotateLoadingText() {
  let index = 0;
  const interval = setInterval(() => {
    if (loadingScreen.classList.contains("hidden")) {
      clearInterval(interval);
      return;
    }
    loadingText.textContent = loadingMessages[index % loadingMessages.length];
    index++;
  }, 700);
}

function formatAgent(rawAgent) {
  return {
    name: rawAgent.displayName,
    description: rawAgent.description || "No description available.",
    role: rawAgent.role?.displayName || "Unknown",
    image:
      rawAgent.fullPortraitV2 ||
      rawAgent.fullPortrait ||
      rawAgent.bustPortrait ||
      rawAgent.displayIcon ||
      rawAgent.image ||
      "",
  };
}

async function loadAgents() {
  rotateLoadingText();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch agents");

    const json = await response.json();
    allAgents = json.data
      .map(formatAgent)
      .filter((agent) => agent.name && agent.role && agent.image);
    statusText.textContent = `Loaded ${allAgents.length} agents. Ready to roll.`;
  } catch (error) {
    allAgents = FALLBACK_AGENTS.map(formatAgent);
    statusText.textContent = "Could not load live API. Using fallback agents.";
    console.error(error);
  }

  setEmptyCards();
  renderHistory();
  renderFavorites();
  setTimeout(() => loadingScreen.classList.add("hidden"), 1200);
}

function getAgentMeta(agentName) {
  return (
    agentMeta[agentName] || {
      difficulty: "Medium",
      playstyle: "Strategic",
      tip: "Play around utility timing and map control.",
      maps: ["Ascent", "Bind"],
      bg: "#ff4655",
    }
  );
}

function getRankAdvice(agentName) {
  const rank = rankSelect.value;
  const difficulty = getAgentMeta(agentName).difficulty;

  if (rank === "any") {
    return "Choose a rank to see a tailored suggestion.";
  }

  const table = rankAdviceByStyle[difficulty] || {};
  return table[rank] || "Useful with the right team setup.";
}

function setEmptyCards() {
  const starter = allAgents[0];
  if (!starter) return;

  for (let i = 1; i <= 5; i++) {
    UI[i].role.textContent = "Role";
    UI[i].name.textContent = i === 1 ? "Ready to Roll" : "Waiting";
    UI[i].desc.textContent =
      i === 1 ? "Spin to assign your agent." : "Enable more players or spin.";
    UI[i].img.src = starter.image;
    UI[i].tip.textContent = "Waiting for assignment.";
    UI[i].maps.textContent = "—";
    UI[i].difficulty.textContent = "Difficulty";
    UI[i].difficulty.className = "meta-badge difficulty";
    UI[i].playstyle.textContent = "Playstyle";
    UI[i].playstyle.className = "meta-badge playstyle";
    UI[i].rankAdvice.textContent = "Choose a rank for suggestions.";
  }

  announcerText.textContent = "Ready to roll.";
  syncFavoriteButtons();
}

function getSelectedRoles() {
  const checked = [...filterInputs]
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (checked.includes("all") || checked.length === 0) return ["all"];
  return checked;
}

function getFilteredAgents() {
  const selectedRoles = getSelectedRoles();
  let pool = selectedRoles.includes("all")
    ? [...allAgents]
    : allAgents.filter((agent) => selectedRoles.includes(agent.role));

  const pref = skillPreference.value;

  if (pref !== "any") {
    const matches = pool.filter(
      (agent) => getAgentMeta(agent.name).playstyle === pref,
    );
    if (matches.length) {
      pool = [
        ...matches,
        ...pool.filter((agent) => getAgentMeta(agent.name).playstyle !== pref),
      ];
    }
  }

  return pool;
}

function getAvailablePool(basePool, excludedNames = []) {
  let pool = basePool.filter((agent) => !excludedNames.includes(agent.name));

  if (noRepeatMode) {
    pool = pool.filter((agent) => !usedAgentNames.includes(agent.name));
  }

  if (pool.length === 0 && noRepeatMode) {
    usedAgentNames = [];
    pool = basePool.filter((agent) => !excludedNames.includes(agent.name));
  }

  return pool;
}

function weightedPool(pool) {
  const pref = skillPreference.value;
  if (pref === "any") return pool;

  const preferred = pool.filter((agent) =>
    preferenceWeights[pref]?.includes(getAgentMeta(agent.name).playstyle),
  );
  const others = pool.filter(
    (agent) =>
      !preferenceWeights[pref]?.includes(getAgentMeta(agent.name).playstyle),
  );

  return [...preferred, ...preferred, ...others];
}

function getRandomAgent(basePool, excludedNames = []) {
  const pool = weightedPool(getAvailablePool(basePool, excludedNames));
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateCard(player, agent) {
  const target = UI[player];
  const meta = getAgentMeta(agent.name);

  target.role.textContent = agent.role;
  target.name.textContent = agent.name;
  target.desc.textContent = agent.description;
  target.img.src = agent.image;
  target.img.alt = `${agent.name} portrait`;

  target.tip.textContent = meta.tip;
  target.maps.textContent = meta.maps.join(", ");
  target.playstyle.textContent = meta.playstyle;
  target.difficulty.textContent = meta.difficulty;
  target.rankAdvice.textContent = getRankAdvice(agent.name);

  target.difficulty.className = "meta-badge difficulty";
  target.difficulty.classList.add(meta.difficulty.toLowerCase());

  syncFavoriteButtons();
}

function resetRevealAnimation(card) {
  card.classList.remove("reveal", "shine");
  void card.offsetWidth;
  card.classList.add("reveal", "shine");
}

function startSpinVisual(card) {
  card.classList.add("spinning");
}

function stopSpinVisual(card) {
  card.classList.remove("spinning");
}

function playTone(frequency, duration, volume = 0.03, type = "triangle") {
  if (isMuted) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    audioContext.close();
  }, duration);
}

function playSpinTick() {
  playTone(260 + Math.random() * 240, 45, 0.015, "triangle");
}

function playSuccessSound() {
  playTone(620, 110, 0.035, "sawtooth");
  setTimeout(() => playTone(780, 130, 0.03, "triangle"), 100);
  setTimeout(() => playTone(960, 160, 0.025, "sine"), 200);
}

function saveHistory(entry) {
  const existing = JSON.parse(
    localStorage.getItem("valorantPickerHistory") || "[]",
  );
  existing.unshift(entry);
  localStorage.setItem(
    "valorantPickerHistory",
    JSON.stringify(existing.slice(0, 10)),
  );
}

function renderHistory() {
  const history = JSON.parse(
    localStorage.getItem("valorantPickerHistory") || "[]",
  );

  if (!history.length) {
    historyList.innerHTML = `<p class="history-empty">No spins yet.</p>`;
    return;
  }

  historyList.innerHTML = history
    .map((item) => {
      const picksHtml = item.picks
        .map((pick) => {
          return `<span class="history-tag">${pick.player}: ${pick.name} · ${pick.role}</span>`;
        })
        .join("");

      return `
      <div class="history-item">
        <div class="history-main">${picksHtml}</div>
        <div class="history-time">${item.time}</div>
      </div>
    `;
    })
    .join("");
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("valorantFavorites") || "[]");
}

function saveFavorites(list) {
  localStorage.setItem("valorantFavorites", JSON.stringify(list));
}

function toggleFavorite(name) {
  if (!name || name === "Waiting" || name === "Ready to Roll") return;

  const favorites = getFavorites();
  const exists = favorites.includes(name);
  const updated = exists
    ? favorites.filter((item) => item !== name)
    : [...favorites, name];
  saveFavorites(updated);
  renderFavorites();
  syncFavoriteButtons();
}

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    favoritesList.innerHTML = `<p class="history-empty">No favorites yet.</p>`;
    return;
  }

  favoritesList.innerHTML = favorites
    .map((name) => {
      const meta = getAgentMeta(name);
      return `<div class="favorite-item"><span class="favorite-tag">★ ${name} · ${meta.playstyle}</span></div>`;
    })
    .join("");
}

function syncFavoriteButtons() {
  const favorites = getFavorites();

  favoriteButtons.forEach((button) => {
    const player = button.dataset.player;
    const currentName = UI[player].name.textContent;
    const active = favorites.includes(currentName);
    button.classList.toggle("active", active);
    button.textContent = active ? "★" : "☆";
  });
}

function getTimeStamp() {
  return new Date().toLocaleString();
}

function setVisibleCards(count) {
  for (let i = 1; i <= 5; i++) {
    UI[i].card.classList.toggle("hidden", i > count);
  }
}

function setMode(mode) {
  currentMode = mode;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  pickerGrid.classList.remove(
    "solo-mode",
    "duo-mode",
    "team-mode",
    "balanced-mode",
    "troll-mode",
  );

  if (mode === "solo") {
    pickerGrid.classList.add("solo-mode");
    setVisibleCards(1);
  } else if (mode === "duo") {
    pickerGrid.classList.add("duo-mode");
    setVisibleCards(2);
  } else if (mode === "team") {
    pickerGrid.classList.add("team-mode");
    setVisibleCards(5);
  } else if (mode === "balanced") {
    pickerGrid.classList.add("balanced-mode");
    setVisibleCards(5);
  } else if (mode === "troll") {
    pickerGrid.classList.add("troll-mode");
    setVisibleCards(5);
  }
}

function updateFilterUI() {
  filterChips.forEach((chip) => {
    const input = chip.querySelector("input");
    chip.classList.toggle("active", input.checked);
  });
}

function handleFilterChange(changedInput) {
  if (changedInput.value === "all") {
    if (changedInput.checked) {
      filterInputs.forEach((input) => {
        if (input.value !== "all") input.checked = false;
      });
    } else {
      changedInput.checked = true;
    }
  } else {
    if (changedInput.checked) {
      const allInput = [...filterInputs].find((input) => input.value === "all");
      allInput.checked = false;
    }

    const selectedSpecific = [...filterInputs].filter(
      (input) => input.value !== "all" && input.checked,
    );

    if (selectedSpecific.length === 0) {
      const allInput = [...filterInputs].find((input) => input.value === "all");
      allInput.checked = true;
    }
  }

  updateFilterUI();
}

function rememberAgents(agents) {
  if (!noRepeatMode) return;
  agents.forEach((agent) => {
    if (!usedAgentNames.includes(agent.name)) {
      usedAgentNames.push(agent.name);
    }
  });
}

function pickBalancedTeam(pool) {
  const rolesNeeded = ["Duelist", "Controller", "Sentinel", "Initiator"];
  const selected = [];
  const usedNames = [];

  for (const role of rolesNeeded) {
    const rolePool = pool.filter(
      (agent) => agent.role === role && !usedNames.includes(agent.name),
    );
    if (rolePool.length > 0) {
      const chosen = getRandomAgent(rolePool, usedNames);
      selected.push(chosen);
      usedNames.push(chosen.name);
    }
  }

  while (selected.length < 5 && usedNames.length < pool.length) {
    const chosen = getRandomAgent(pool, usedNames);
    selected.push(chosen);
    usedNames.push(chosen.name);
  }

  return selected.slice(0, 5);
}

function pickNormalTeam(pool, count) {
  const picks = [];
  const usedNames = [];

  while (picks.length < count && usedNames.length < pool.length) {
    const chosen = getRandomAgent(pool, usedNames);
    picks.push(chosen);
    usedNames.push(chosen.name);
  }

  return picks;
}

function pickTrollTeam(pool) {
  const roleGroups = {
    Duelist: pool.filter((agent) => agent.role === "Duelist"),
    Controller: pool.filter((agent) => agent.role === "Controller"),
    Sentinel: pool.filter((agent) => agent.role === "Sentinel"),
    Initiator: pool.filter((agent) => agent.role === "Initiator"),
  };

  const trollTypes = ["same-role", "duelist-heavy", "sentinel-chaos"];
  const trollType = trollTypes[Math.floor(Math.random() * trollTypes.length)];
  let selected = [];

  if (trollType === "same-role") {
    const availableRoles = Object.keys(roleGroups).filter(
      (role) => roleGroups[role].length >= 2,
    );
    const randomRole =
      availableRoles[Math.floor(Math.random() * availableRoles.length)];
    selected = pickNormalTeam(
      roleGroups[randomRole],
      Math.min(5, roleGroups[randomRole].length),
    );
    statusText.textContent = `Troll Mode: All-in on ${randomRole}.`;
  } else if (trollType === "duelist-heavy") {
    selected = [
      ...pickNormalTeam(
        roleGroups.Duelist,
        Math.min(3, roleGroups.Duelist.length),
      ),
      ...pickNormalTeam(
        pool.filter((agent) => agent.role !== "Duelist"),
        2,
      ),
    ].slice(0, 5);
    statusText.textContent = "Troll Mode: Duelist-heavy chaos.";
  } else {
    selected = [
      ...pickNormalTeam(
        roleGroups.Sentinel,
        Math.min(3, roleGroups.Sentinel.length),
      ),
      ...pickNormalTeam(
        pool.filter((agent) => agent.role !== "Sentinel"),
        2,
      ),
    ].slice(0, 5);
    statusText.textContent = "Troll Mode: Too much defense.";
  }

  return selected;
}

function createParticles(color = "#ffffff") {
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${45 + Math.random() * 10}%`;
    particle.style.top = `${35 + Math.random() * 18}%`;
    particle.style.color = color;
    particle.style.background = color;
    particle.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
    particle.style.setProperty("--y", `${(Math.random() - 0.5) * 220}px`);
    particlesRoot.appendChild(particle);

    setTimeout(() => particle.remove(), 850);
  }
}

function updateDynamicBackground(agentName) {
  const meta = getAgentMeta(agentName);
  document.documentElement.style.setProperty("--bg-agent", `${meta.bg}33`);
}

function randomAnnouncerLine() {
  return announcerLines[Math.floor(Math.random() * announcerLines.length)];
}

function spinPlayer(playerNumber, finalAgent, basePool, delayMs = 1500) {
  return new Promise((resolve) => {
    const card = UI[playerNumber].card;

    startSpinVisual(card);

    const interval = setInterval(() => {
      const randomTemp = basePool[Math.floor(Math.random() * basePool.length)];
      updateCard(playerNumber, randomTemp);
      playSpinTick();
    }, 85);

    setTimeout(() => {
      clearInterval(interval);
      updateCard(playerNumber, finalAgent);
      stopSpinVisual(card);
      resetRevealAnimation(card);
      resolve();
    }, delayMs);
  });
}

async function runSpin() {
  if (isSpinning) return;
  if (!allAgents.length) return;

  const filteredAgents = getFilteredAgents();

  if (!filteredAgents.length) {
    statusText.textContent = "No agents match the selected role filter.";
    announcerText.textContent = "No valid picks.";
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;
  spinBtn.querySelector("span").textContent = "Spinning...";
  announcerText.textContent = "Assigning tactical profile...";
  statusText.textContent = "Roulette is spinning...";

  let picks = [];

  if (currentMode === "solo") {
    picks = pickNormalTeam(filteredAgents, 1);
  } else if (currentMode === "duo") {
    picks = pickNormalTeam(filteredAgents, 2);
  } else if (currentMode === "team") {
    picks = pickNormalTeam(filteredAgents, 5);
  } else if (currentMode === "balanced") {
    picks = pickBalancedTeam(filteredAgents);
  } else if (currentMode === "troll") {
    picks = pickTrollTeam(filteredAgents);
  }

  const spinPromises = picks.map((agent, index) => {
    return spinPlayer(index + 1, agent, filteredAgents, 1500 + index * 120);
  });

  await Promise.all(spinPromises);

  lastPicks = picks;
  rememberAgents(picks);
  playSuccessSound();
  announcerText.textContent = randomAnnouncerLine();
  updateDynamicBackground(picks[0].name);
  createParticles(getAgentMeta(picks[0].name).bg);

  if (currentMode === "solo") {
    statusText.textContent = `Player 1 got ${picks[0].name}.`;
  } else {
    statusText.textContent = picks
      .map((agent, index) => `P${index + 1}: ${agent.name}`)
      .join(" · ");
  }

  saveHistory({
    time: getTimeStamp(),
    picks: picks.map((agent, index) => ({
      player: `P${index + 1}`,
      name: agent.name,
      role: agent.role,
    })),
  });

  renderHistory();
  syncFavoriteButtons();

  spinBtn.disabled = false;
  spinBtn.querySelector("span").textContent = "Spin Again";
  isSpinning = false;
}

function buildShareText() {
  if (!lastPicks.length) return "No result yet. Spin first.";

  const modeLabel = currentMode.toUpperCase();
  const picksText = lastPicks
    .map((pick, index) => `P${index + 1}: ${pick.name} (${pick.role})`)
    .join(" | ");

  return `Valorant Agent Picker [${modeLabel}] — ${picksText}`;
}

async function copyShareResult() {
  const text = buildShareText();
  try {
    await navigator.clipboard.writeText(text);
    announcerText.textContent = "Result copied.";
    statusText.textContent = text;
  } catch {
    statusText.textContent = text;
  }
}

async function makeScreenshot() {
  const target = document.querySelector(".picker-area");
  const canvas = await html2canvas(target, {
    backgroundColor: null,
    scale: 2,
  });

  const link = document.createElement("a");
  link.download = "valorant-agent-picker-result.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  announcerText.textContent = "Screenshot saved.";
}

function handleCardTilt(event, card, image) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = (x / rect.width - 0.5) * 8;
  const rotateX = (y / rect.height - 0.5) * -8;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  image.style.transform = `scale(1.05) translate(${rotateY * 1.2}px, ${rotateX * -1.2}px)`;
}

function resetCardTilt(card, image) {
  card.style.transform = "";
  image.style.transform = "scale(1.03)";
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

filterInputs.forEach((input) => {
  input.addEventListener("change", () => handleFilterChange(input));
});

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "🔇 Sound Off" : "🔊 Sound On";
});

noRepeatBtn.addEventListener("click", () => {
  noRepeatMode = !noRepeatMode;
  noRepeatBtn.textContent = noRepeatMode
    ? "♻️ No Repeat On"
    : "♻️ No Repeat Off";
  if (!noRepeatMode) usedAgentNames = [];
});

themeSelect.addEventListener("change", () => {
  document.documentElement.setAttribute("data-theme", themeSelect.value);
});

rankSelect.addEventListener("change", () => {
  for (let i = 1; i <= 5; i++) {
    const currentName = UI[i].name.textContent;
    if (currentName !== "Waiting" && currentName !== "Ready to Roll") {
      UI[i].rankAdvice.textContent = getRankAdvice(currentName);
    }
  }
});

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const player = button.dataset.player;
    const name = UI[player].name.textContent;
    toggleFavorite(name);
  });
});

shareBtn.addEventListener("click", copyShareResult);
screenshotBtn.addEventListener("click", makeScreenshot);
spinBtn.addEventListener("click", runSpin);

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("valorantPickerHistory");
  renderHistory();
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "select" || tag === "textarea") return;

  if (event.code === "Space") {
    event.preventDefault();
    runSpin();
  }

  if (event.key.toLowerCase() === "r") {
    runSpin();
  }

  if (event.key.toLowerCase() === "m") {
    muteBtn.click();
  }

  if (event.key.toLowerCase() === "t") {
    setMode("troll");
  }
});

Object.values(UI).forEach((item) => {
  item.card.addEventListener("mousemove", (event) =>
    handleCardTilt(event, item.card, item.img),
  );
  item.card.addEventListener("mouseleave", () =>
    resetCardTilt(item.card, item.img),
  );
});

loadAgents();
setMode("solo");
updateFilterUI();
renderFavorites();
