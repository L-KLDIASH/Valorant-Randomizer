const spinBtn = document.getElementById("spinBtn");
const muteBtn = document.getElementById("muteBtn");
const noRepeatBtn = document.getElementById("noRepeatBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const statusText = document.getElementById("statusText");
const announcerText = document.getElementById("announcerText");
const challengeText = document.getElementById("challengeText");
const metaText = document.getElementById("metaText");
const synergyText = document.getElementById("synergyText");
const historyList = document.getElementById("historyList");

const featuredChampImage = document.getElementById("featuredChampImage");
const featuredChampRole = document.getElementById("featuredChampRole");
const featuredChampName = document.getElementById("featuredChampName");
const featuredChampDesc = document.getElementById("featuredChampDesc");
const featuredChampDifficulty = document.getElementById(
  "featuredChampDifficulty",
);
const featuredChampPlaystyle = document.getElementById(
  "featuredChampPlaystyle",
);
const featuredChampLane = document.getElementById("featuredChampLane");

const modeButtons = document.querySelectorAll(".lol-mode-btn");
const roleButtons = document.querySelectorAll(".lol-filter-chip");

const UI = {
  1: {
    card: document.getElementById("pick1"),
    img: document.getElementById("champImg1"),
    role: document.getElementById("champRole1"),
    name: document.getElementById("champName1"),
    playstyle: document.getElementById("champPlaystyle1"),
  },
  2: {
    card: document.getElementById("pick2"),
    img: document.getElementById("champImg2"),
    role: document.getElementById("champRole2"),
    name: document.getElementById("champName2"),
    playstyle: document.getElementById("champPlaystyle2"),
  },
  3: {
    card: document.getElementById("pick3"),
    img: document.getElementById("champImg3"),
    role: document.getElementById("champRole3"),
    name: document.getElementById("champName3"),
    playstyle: document.getElementById("champPlaystyle3"),
  },
  4: {
    card: document.getElementById("pick4"),
    img: document.getElementById("champImg4"),
    role: document.getElementById("champRole4"),
    name: document.getElementById("champName4"),
    playstyle: document.getElementById("champPlaystyle4"),
  },
  5: {
    card: document.getElementById("pick5"),
    img: document.getElementById("champImg5"),
    role: document.getElementById("champRole5"),
    name: document.getElementById("champName5"),
    playstyle: document.getElementById("champPlaystyle5"),
  },
};

const champions = [
  {
    name: "Ahri",
    role: "Mid",
    difficulty: "Medium",
    playstyle: "Mage",
    tip: "Look for charm windows after enemy cooldowns.",
    desc: "Mobile pick mage with strong roam threat.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
  },
  {
    name: "Yasuo",
    role: "Mid",
    difficulty: "Hard",
    playstyle: "Carry",
    tip: "Play around wave state before forcing fights.",
    desc: "Mechanical skirmisher with high carry ceiling.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
  },
  {
    name: "Lux",
    role: "Support",
    difficulty: "Easy",
    playstyle: "Mage",
    tip: "Use range to chip enemies before committing.",
    desc: "Long-range poke and control support.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
  },
  {
    name: "Thresh",
    role: "Support",
    difficulty: "Hard",
    playstyle: "Utility",
    tip: "Save lantern for real peel value.",
    desc: "Playmaking support with engage and rescue tools.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
  },
  {
    name: "Lee Sin",
    role: "Jungle",
    difficulty: "Hard",
    playstyle: "Aggressive",
    tip: "Attack early tempo before scaling starts.",
    desc: "Explosive early jungler with playmaking mobility.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg",
  },
  {
    name: "Sejuani",
    role: "Jungle",
    difficulty: "Easy",
    playstyle: "Tank",
    tip: "Draft with melee teammates for better follow-up.",
    desc: "Reliable engage tank for teamfights.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sejuani_0.jpg",
  },
  {
    name: "Jinx",
    role: "ADC",
    difficulty: "Easy",
    playstyle: "Carry",
    tip: "Stay safe until resets open the fight.",
    desc: "Hypercarry marksman with explosive cleanup.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
  },
  {
    name: "Ezreal",
    role: "ADC",
    difficulty: "Medium",
    playstyle: "Poke",
    tip: "Play front-to-back and hold E defensively.",
    desc: "Safe poke marksman with strong midgame.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg",
  },
  {
    name: "Darius",
    role: "Top",
    difficulty: "Easy",
    playstyle: "Bruiser",
    tip: "Control wave and punish short trades.",
    desc: "Lane bully with massive all-in pressure.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg",
  },
  {
    name: "Ornn",
    role: "Top",
    difficulty: "Easy",
    playstyle: "Tank",
    tip: "Absorb pressure and scale for teamfights.",
    desc: "Frontline tank with elite engage value.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg",
  },
  {
    name: "Zed",
    role: "Mid",
    difficulty: "Hard",
    playstyle: "Assassin",
    tip: "Track enemy flash and key peel cooldowns.",
    desc: "High-threat assassin with backline pressure.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg",
  },
  {
    name: "Leona",
    role: "Support",
    difficulty: "Easy",
    playstyle: "Engage",
    tip: "Only commit when your lane can follow up.",
    desc: "Hard engage support with strong lockdown.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg",
  },
  {
    name: "Nami",
    role: "Support",
    difficulty: "Medium",
    playstyle: "Utility",
    tip: "Short trades and wave control suit her best.",
    desc: "Enchanter with sustain, speed and disengage.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nami_0.jpg",
  },
  {
    name: "Viego",
    role: "Jungle",
    difficulty: "Medium",
    playstyle: "Carry",
    tip: "Fight where resets are likely to trigger.",
    desc: "Snowball skirmisher with possession resets.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viego_0.jpg",
  },
  {
    name: "Amumu",
    role: "Jungle",
    difficulty: "Easy",
    playstyle: "Tank",
    tip: "Force grouped fights around objectives.",
    desc: "Simple engage jungler with huge AoE impact.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Amumu_0.jpg",
  },
  {
    name: "Kai'Sa",
    role: "ADC",
    difficulty: "Medium",
    playstyle: "Carry",
    tip: "Wait for dive windows instead of forcing them.",
    desc: "Flexible marksman with scaling burst.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg",
  },
  {
    name: "Ashe",
    role: "ADC",
    difficulty: "Easy",
    playstyle: "Utility",
    tip: "Start picks with arrow instead of saving it too long.",
    desc: "Utility marksman with strong initiation tools.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg",
  },
  {
    name: "Fiora",
    role: "Top",
    difficulty: "Hard",
    playstyle: "Carry",
    tip: "Avoid forced 5v5s when side lane wins the map.",
    desc: "Duelist split-pusher with massive side pressure.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg",
  },
  {
    name: "Garen",
    role: "Top",
    difficulty: "Easy",
    playstyle: "Bruiser",
    tip: "Keep trades simple and punish bad spacing.",
    desc: "Simple bruiser with clear execution windows.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
  },
  {
    name: "Katarina",
    role: "Mid",
    difficulty: "Hard",
    playstyle: "Assassin",
    tip: "Join fights after major CC is gone.",
    desc: "Reset assassin that thrives in chaos.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_0.jpg",
  },
];

const announcerLines = [
  "The Rift has spoken.",
  "Your draft is complete.",
  "Summoner, lead your lane.",
  "A champion has been chosen.",
  "The board reveals your fate.",
];

const challenges = [
  "Roam before minute 10.",
  "Fight only around objectives.",
  "Play the lane through vision control.",
  "Win through wave management this game.",
  "Force one coordinated rotation early.",
  "Do not overforce before level 6.",
  "Play for scaling and avoid coinflip fights.",
  "Track the enemy jungler constantly.",
];

let currentMode = "solo";
let selectedRole = "all";
let isMuted = false;
let isSpinning = false;
let noRepeatMode = false;
let usedChampionNames = [];

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
  playTone(220 + Math.random() * 120, 45, 0.015, "triangle");
}

function playSuccessSound() {
  playTone(480, 110, 0.03, "sawtooth");
  setTimeout(() => playTone(660, 130, 0.025, "triangle"), 90);
}

function getFilteredChampions() {
  return selectedRole === "all"
    ? champions
    : champions.filter((champ) => champ.role === selectedRole);
}

function getAvailablePool(basePool, excludedNames = []) {
  let pool = basePool.filter((champ) => !excludedNames.includes(champ.name));

  if (noRepeatMode) {
    pool = pool.filter((champ) => !usedChampionNames.includes(champ.name));
  }

  if (!pool.length && noRepeatMode) {
    usedChampionNames = [];
    pool = basePool.filter((champ) => !excludedNames.includes(champ.name));
  }

  return pool;
}

function getRandomChampion(basePool, excludedNames = []) {
  const pool = getAvailablePool(basePool, excludedNames);
  return pool[Math.floor(Math.random() * pool.length)];
}

function setVisibleCards(count) {
  for (let i = 1; i <= 5; i++) {
    UI[i].card.classList.toggle("hidden", i > count);
  }
}

function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  if (mode === "solo") setVisibleCards(1);
  else if (mode === "duo") setVisibleCards(2);
  else setVisibleCards(5);
}

function updateFeatured(champ) {
  featuredChampImage.src = champ.image;
  featuredChampImage.alt = champ.name;
  featuredChampRole.textContent = champ.role;
  featuredChampName.textContent = champ.name;
  featuredChampDesc.textContent = champ.desc;
  featuredChampDifficulty.textContent = champ.difficulty;
  featuredChampPlaystyle.textContent = champ.playstyle;
  featuredChampLane.textContent = champ.role;
}

function updatePickCard(index, champ) {
  UI[index].img.src = champ.image;
  UI[index].img.alt = champ.name;
  UI[index].role.textContent = champ.role;
  UI[index].name.textContent = champ.name;
  UI[index].playstyle.textContent = champ.playstyle;
}

function getChampionSuggestion(champ) {
  if (champ.playstyle === "Tank")
    return "Strong when your draft lacks engage or frontline.";
  if (champ.playstyle === "Carry")
    return "Best when your team can play around resources and scaling.";
  if (champ.playstyle === "Mage")
    return "Great for waveclear, control and ranged pressure.";
  if (champ.playstyle === "Assassin")
    return "Strong into vulnerable backlines and low peel.";
  if (champ.playstyle === "Utility")
    return "Excellent when your team wants setup, peel and tempo.";
  if (champ.playstyle === "Bruiser")
    return "Useful for skirmishes and side-lane control.";
  if (champ.playstyle === "Engage")
    return "Best when the team needs reliable initiation.";
  return "Adapt your draft to lane matchup and team needs.";
}

function analyzeTeam(team) {
  const roles = team.map((c) => c.role);
  const styles = team.map((c) => c.playstyle);
  const issues = [];

  if (!roles.includes("Top")) issues.push("No top lane.");
  if (!roles.includes("Jungle")) issues.push("No jungle.");
  if (!roles.includes("Mid")) issues.push("No mid lane.");
  if (!roles.includes("ADC")) issues.push("No backline marksman.");
  if (!roles.includes("Support")) issues.push("No dedicated support.");

  const hasFrontline = styles.includes("Tank") || styles.includes("Bruiser");
  const hasEngage = styles.includes("Engage") || styles.includes("Tank");
  const hasCarry =
    styles.includes("Carry") ||
    styles.includes("Mage") ||
    styles.includes("Assassin");

  if (!hasFrontline) issues.push("Low frontline.");
  if (!hasEngage) issues.push("Low engage.");
  if (!hasCarry) issues.push("Low damage threat.");

  return issues.length
    ? issues.join(" ")
    : "Balanced draft with stable teamfight structure.";
}

function pickNormal(pool, count) {
  const picks = [];
  const used = [];

  while (picks.length < count && used.length < pool.length) {
    const champ = getRandomChampion(pool, used);
    picks.push(champ);
    used.push(champ.name);
  }

  return picks;
}

function pickBalanced(pool) {
  const roles = ["Top", "Jungle", "Mid", "ADC", "Support"];
  const picks = [];
  const used = [];

  for (const role of roles) {
    const rolePool = pool.filter(
      (champ) => champ.role === role && !used.includes(champ.name),
    );
    if (rolePool.length) {
      const champ = getRandomChampion(rolePool, used);
      picks.push(champ);
      used.push(champ.name);
    }
  }

  while (picks.length < 5 && used.length < pool.length) {
    const champ = getRandomChampion(pool, used);
    picks.push(champ);
    used.push(champ.name);
  }

  return picks.slice(0, 5);
}

function pickChaos(pool) {
  const carries = pool.filter((c) =>
    ["Carry", "Assassin", "Mage"].includes(c.playstyle),
  );
  const tanks = pool.filter((c) => c.playstyle === "Tank");

  const modes = ["glass", "frontline"];
  const selected = modes[Math.floor(Math.random() * modes.length)];

  if (selected === "glass") {
    statusText.textContent = "Chaos Draft: maximum damage, minimum safety.";
    return pickNormal(carries.length ? carries : pool, 5);
  }

  statusText.textContent = "Chaos Draft: the unbreakable wall.";
  return pickNormal(tanks.length ? tanks : pool, 5);
}

async function spinReveal(index, champ, pool, delay) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const temp = pool[Math.floor(Math.random() * pool.length)];
      updatePickCard(index, temp);
      if (index === 1) updateFeatured(temp);
      playSpinTick();
    }, 90);

    setTimeout(() => {
      clearInterval(interval);
      updatePickCard(index, champ);
      if (index === 1) updateFeatured(champ);
      resolve();
    }, delay);
  });
}

function saveHistory(entry) {
  const existing = JSON.parse(
    localStorage.getItem("lolDraftBoardHistory") || "[]",
  );
  existing.unshift(entry);
  localStorage.setItem(
    "lolDraftBoardHistory",
    JSON.stringify(existing.slice(0, 10)),
  );
}

function renderHistory() {
  const history = JSON.parse(
    localStorage.getItem("lolDraftBoardHistory") || "[]",
  );

  if (!history.length) {
    historyList.innerHTML = `<p class="lol-history-empty">No drafts yet.</p>`;
    return;
  }

  historyList.innerHTML = history
    .map(
      (item) => `
    <div class="lol-history-item">
      <div class="lol-history-tags">
        ${item.picks.map((pick) => `<span class="lol-history-tag">${pick.player}: ${pick.name} · ${pick.role}</span>`).join("")}
      </div>
      <p class="lol-history-time">${item.time}</p>
    </div>
  `,
    )
    .join("");
}

function setEmptyState() {
  const starter = champions[0];
  updateFeatured(starter);

  for (let i = 1; i <= 5; i++) {
    UI[i].img.src = starter.image;
    UI[i].img.alt = starter.name;
    UI[i].role.textContent = "Role";
    UI[i].name.textContent = "Empty Slot";
    UI[i].playstyle.textContent = "Playstyle";
  }
}

async function runDraft() {
  if (isSpinning) return;

  const filtered = getFilteredChampions();
  if (!filtered.length) {
    statusText.textContent = "No champions match the selected lane filter.";
    return;
  }

  isSpinning = true;
  spinBtn.textContent = "Drafting...";
  announcerText.textContent = "The board is drawing a champion...";
  statusText.textContent = "Draft in progress...";

  let picks = [];

  if (currentMode === "solo") picks = pickNormal(filtered, 1);
  else if (currentMode === "duo") picks = pickNormal(filtered, 2);
  else if (currentMode === "team") picks = pickNormal(filtered, 5);
  else if (currentMode === "balanced") picks = pickBalanced(filtered);
  else picks = pickChaos(filtered);

  await Promise.all(
    picks.map((champ, index) =>
      spinReveal(index + 1, champ, filtered, 1400 + index * 140),
    ),
  );

  if (noRepeatMode) {
    picks.forEach((champ) => {
      if (!usedChampionNames.includes(champ.name))
        usedChampionNames.push(champ.name);
    });
  }

  playSuccessSound();

  challengeText.textContent =
    challenges[Math.floor(Math.random() * challenges.length)];
  metaText.textContent = picks.length
    ? getChampionSuggestion(picks[0])
    : "No suggestion available.";
  synergyText.textContent =
    picks.length === 1
      ? `${picks[0].name} excels when drafted into the right lane matchup and team plan.`
      : analyzeTeam(picks);

  announcerText.textContent =
    announcerLines[Math.floor(Math.random() * announcerLines.length)];
  statusText.textContent = picks
    .map((champ, i) => `P${i + 1}: ${champ.name}`)
    .join(" • ");

  saveHistory({
    time: new Date().toLocaleString(),
    picks: picks.map((champ, i) => ({
      player: `P${i + 1}`,
      name: champ.name,
      role: champ.role,
    })),
  });

  renderHistory();
  spinBtn.textContent = "Spin Draft";
  isSpinning = false;
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

roleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    roleButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
    selectedRole = btn.dataset.role;
  });
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
  if (!noRepeatMode) usedChampionNames = [];
});

spinBtn.addEventListener("click", runDraft);

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("lolDraftBoardHistory");
  renderHistory();
});

setMode("solo");
setEmptyState();
renderHistory();
