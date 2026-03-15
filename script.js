const API_URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

const pickerGrid = document.getElementById("pickerGrid");
const spinBtn = document.getElementById("spinBtn");
const muteBtn = document.getElementById("muteBtn");
const noRepeatBtn = document.getElementById("noRepeatBtn");
const statusText = document.getElementById("statusText");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const modeButtons = document.querySelectorAll(".mode-btn");
const filterChips = document.querySelectorAll(".filter-chip");
const filterInputs = document.querySelectorAll(".filter-chip input");

const UI = {
  1: {
    card: document.getElementById("card1"),
    img: document.getElementById("agentImg1"),
    role: document.getElementById("agentRole1"),
    name: document.getElementById("agentName1"),
    desc: document.getElementById("agentDesc1"),
  },
  2: {
    card: document.getElementById("card2"),
    img: document.getElementById("agentImg2"),
    role: document.getElementById("agentRole2"),
    name: document.getElementById("agentName2"),
    desc: document.getElementById("agentDesc2"),
  },
  3: {
    card: document.getElementById("card3"),
    img: document.getElementById("agentImg3"),
    role: document.getElementById("agentRole3"),
    name: document.getElementById("agentName3"),
    desc: document.getElementById("agentDesc3"),
  },
  4: {
    card: document.getElementById("card4"),
    img: document.getElementById("agentImg4"),
    role: document.getElementById("agentRole4"),
    name: document.getElementById("agentName4"),
    desc: document.getElementById("agentDesc4"),
  },
  5: {
    card: document.getElementById("card5"),
    img: document.getElementById("agentImg5"),
    role: document.getElementById("agentRole5"),
    name: document.getElementById("agentName5"),
    desc: document.getElementById("agentDesc5"),
  },
};

let allAgents = [];
let currentMode = "solo";
let isMuted = false;
let isSpinning = false;
let noRepeatMode = false;
let usedAgentNames = [];

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
  try {
    statusText.textContent = "Loading agents...";
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch agents");
    }

    const json = await response.json();
    allAgents = json.data
      .map(formatAgent)
      .filter((agent) => agent.name && agent.role && agent.image);
    statusText.textContent = `Loaded ${allAgents.length} agents. Ready to spin.`;
  } catch (error) {
    allAgents = FALLBACK_AGENTS.map(formatAgent);
    statusText.textContent = "Could not load live API. Using fallback agents.";
    console.error(error);
  }

  setEmptyCards();
  renderHistory();
}

function setEmptyCards() {
  const starter = allAgents[0];
  if (!starter) return;

  for (let i = 1; i <= 5; i++) {
    UI[i].role.textContent = "Role";
    UI[i].name.textContent = i === 1 ? "Click Spin" : "Waiting";
    UI[i].desc.textContent =
      i === 1 ? "Your random agent will appear here." : "Waiting for spin.";
    UI[i].img.src = starter.image;
    UI[i].img.alt = "Agent portrait";
  }
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
  if (selectedRoles.includes("all")) return allAgents;
  return allAgents.filter((agent) => selectedRoles.includes(agent.role));
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

function getRandomAgent(basePool, excludedNames = []) {
  const pool = getAvailablePool(basePool, excludedNames);
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateCard(player, agent) {
  const target = UI[player];
  target.role.textContent = agent.role;
  target.name.textContent = agent.name;
  target.desc.textContent = agent.description;
  target.img.src = agent.image;
  target.img.alt = `${agent.name} portrait`;
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
  const trimmed = existing.slice(0, 10);
  localStorage.setItem("valorantPickerHistory", JSON.stringify(trimmed));
}

function renderHistory() {
  const history = JSON.parse(
    localStorage.getItem("valorantPickerHistory") || "[]",
  );

  if (history.length === 0) {
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

  const remainingPool = pool.filter((agent) => !usedNames.includes(agent.name));
  while (selected.length < 5 && remainingPool.length > 0) {
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
  }

  if (trollType === "duelist-heavy") {
    const duelists = roleGroups.Duelist;
    const others = pool.filter((agent) => agent.role !== "Duelist");
    selected = [
      ...pickNormalTeam(duelists, Math.min(3, duelists.length)),
      ...pickNormalTeam(others, 2),
    ].slice(0, 5);
    statusText.textContent = "Troll Mode: Duelist-heavy chaos.";
  }

  if (trollType === "sentinel-chaos") {
    const sentinels = roleGroups.Sentinel;
    const others = pool.filter((agent) => agent.role !== "Sentinel");
    selected = [
      ...pickNormalTeam(sentinels, Math.min(3, sentinels.length)),
      ...pickNormalTeam(others, 2),
    ].slice(0, 5);
    statusText.textContent = "Troll Mode: Too much defense.";
  }

  return selected;
}

async function runSpin() {
  if (isSpinning) return;
  if (!allAgents.length) return;

  const filteredAgents = getFilteredAgents();

  if (filteredAgents.length === 0) {
    statusText.textContent = "No agents match the selected role filter.";
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;
  spinBtn.querySelector("span").textContent = "Spinning...";
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
    return spinPlayer(index + 1, agent, filteredAgents, 1500 + index * 130);
  });

  await Promise.all(spinPromises);

  rememberAgents(picks);
  playSuccessSound();

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
  spinBtn.disabled = false;
  spinBtn.querySelector("span").textContent = "Spin Again";
  isSpinning = false;
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

filterInputs.forEach((input) => {
  input.addEventListener("change", () => {
    handleFilterChange(input);
  });
});

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "🔇 Sound Off" : "🔊 Sound On";
  muteBtn.setAttribute("aria-pressed", String(isMuted));
});

noRepeatBtn.addEventListener("click", () => {
  noRepeatMode = !noRepeatMode;
  noRepeatBtn.textContent = noRepeatMode
    ? "♻️ No Repeat On"
    : "♻️ No Repeat Off";
  noRepeatBtn.setAttribute("aria-pressed", String(noRepeatMode));

  if (!noRepeatMode) {
    usedAgentNames = [];
  }
});

spinBtn.addEventListener("click", runSpin);

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("valorantPickerHistory");
  renderHistory();
});

loadAgents();
setMode("solo");
updateFilterUI();
