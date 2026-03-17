const skinsGrid = document.getElementById("skinsGrid");
const searchInput = document.getElementById("skinSearch");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const resultsCount = document.getElementById("resultsCount");
const resultsTitle = document.getElementById("resultsTitle");

const modal = document.getElementById("skinModal");
const modalOverlay = document.getElementById("skinModalOverlay");
const modalClose = document.getElementById("skinModalClose");
const modalSkinImage = document.getElementById("modalSkinImage");
const modalSkinWeapon = document.getElementById("modalSkinWeapon");
const modalSkinName = document.getElementById("modalSkinName");
const modalSkinTier = document.getElementById("modalSkinTier");
const modalSkinPrice = document.getElementById("modalSkinPrice");

const PRICE_BY_TIER = {
  "Select Edition": { gun: 875, melee: 1750 },
  "Deluxe Edition": { gun: 1275, melee: 2550 },
  "Premium Edition": { gun: 1775, melee: 3550 },
  "Exclusive Edition": { gun: 2175, melee: 4350 },
  "Ultra Edition": { gun: 2475, melee: 4950 },
};

const TIER_ORDER = {
  "Select Edition": 1,
  "Deluxe Edition": 2,
  "Premium Edition": 3,
  "Exclusive Edition": 4,
  "Ultra Edition": 5,
};

let allSkins = [];

const state = {
  weapon: "all",
  rarity: "all",
  price: "all",
  search: "",
  sort: "name-asc",
};

function normalizeWeaponName(name) {
  return name === "Melee" ? "Knife" : name;
}

function getApproxPrice(tierName, weaponName) {
  const tier = PRICE_BY_TIER[tierName];
  if (!tier) return null;

  const isMelee = weaponName === "Knife" || weaponName === "Melee";
  return isMelee ? tier.melee : tier.gun;
}

function getTierClass(tierName) {
  return tierName.toLowerCase().replace(" edition", "").replace(/\s+/g, "-");
}

function matchesPriceFilter(price, filter) {
  if (filter === "all") return true;
  if (price === null) return false;

  if (filter === "under-1000") return price < 1000;
  if (filter === "1000-2000") return price >= 1000 && price <= 2000;
  if (filter === "2000-plus") return price > 2000;

  return true;
}

function getFilteredSkins() {
  return allSkins.filter((skin) => {
    const weaponMatch = state.weapon === "all" || skin.weapon === state.weapon;
    const rarityMatch = state.rarity === "all" || skin.tier === state.rarity;
    const priceMatch = matchesPriceFilter(skin.price, state.price);

    const searchMatch =
      state.search.trim() === "" ||
      skin.name.toLowerCase().includes(state.search.toLowerCase()) ||
      skin.weapon.toLowerCase().includes(state.search.toLowerCase());

    return weaponMatch && rarityMatch && priceMatch && searchMatch;
  });
}

function sortSkins(skins) {
  const sorted = [...skins];

  if (state.sort === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (state.sort === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (state.sort === "price-asc") {
    sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  }

  if (state.sort === "price-desc") {
    sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  }

  if (state.sort === "tier") {
    sorted.sort(
      (a, b) => (TIER_ORDER[b.tier] || 0) - (TIER_ORDER[a.tier] || 0),
    );
  }

  return sorted;
}

function updateResultsMeta(count) {
  resultsCount.textContent = `${count} skin${count === 1 ? "" : "s"}`;

  const parts = [];
  if (state.weapon !== "all") parts.push(state.weapon);
  if (state.rarity !== "all") parts.push(state.rarity.replace(" Edition", ""));
  if (state.price !== "all") parts.push("custom price");
  if (state.search.trim()) parts.push(`"${state.search.trim()}"`);

  resultsTitle.textContent = parts.length
    ? `Showing ${parts.join(" • ")}`
    : "Showing all skins";
}

function renderSkins() {
  const filtered = sortSkins(getFilteredSkins());
  updateResultsMeta(filtered.length);

  if (!filtered.length) {
    skinsGrid.innerHTML = `
      <div class="empty-state">
        No skins found for this filter combination.
      </div>
    `;
    return;
  }

  skinsGrid.innerHTML = filtered
    .map((skin) => {
      const tierClass = getTierClass(skin.tier);

      return `
        <article class="skin-card" data-skin-id="${skin.uuid}">
          <div class="skin-image-wrap">
            <img
              class="skin-image"
              src="${skin.image}"
              alt="${skin.name}"
              loading="lazy"
            />
          </div>

          <div class="skin-info">
            <p class="skin-weapon">${skin.weapon}</p>
            <h2 class="skin-name">${skin.name}</h2>

            <div class="skin-meta-row">
              <span class="skin-tier-badge ${tierClass}">
                ${skin.tier}
              </span>

              <span class="skin-price">
                ${skin.price === null ? "Price N/A" : `${skin.price} VP`}
              </span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  attachCardEvents();
}

function attachCardEvents() {
  const cards = document.querySelectorAll(".skin-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const skinId = card.dataset.skinId;
      const skin = allSkins.find((item) => item.uuid === skinId);
      if (!skin) return;

      openModal(skin);
    });
  });
}

function openModal(skin) {
  modalSkinImage.src = skin.image;
  modalSkinImage.alt = skin.name;
  modalSkinWeapon.textContent = skin.weapon;
  modalSkinName.textContent = skin.name;
  modalSkinTier.textContent = skin.tier;
  modalSkinTier.className = `skin-tier-badge ${getTierClass(skin.tier)}`;
  modalSkinPrice.textContent =
    skin.price === null ? "Price N/A" : `${skin.price} VP`;

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function updateChipActiveState(type, value) {
  const chips = document.querySelectorAll(
    `.sidebar-chip[data-filter-type="${type}"]`,
  );
  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.value === value);
  });
}

function bindFilterChips() {
  const chips = document.querySelectorAll(".sidebar-chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const type = chip.dataset.filterType;
      const value = chip.dataset.value;

      state[type] = value;
      updateChipActiveState(type, value);
      renderSkins();
    });
  });
}

function resetFilters() {
  state.weapon = "all";
  state.rarity = "all";
  state.price = "all";
  state.search = "";
  state.sort = "name-asc";

  searchInput.value = "";
  sortSelect.value = "name-asc";

  updateChipActiveState("weapon", "all");
  updateChipActiveState("rarity", "all");
  updateChipActiveState("price", "all");

  renderSkins();
}

async function loadSkins() {
  try {
    const [weaponsRes, tiersRes] = await Promise.all([
      fetch("https://valorant-api.com/v1/weapons"),
      fetch("https://valorant-api.com/v1/contenttiers"),
    ]);

    if (!weaponsRes.ok || !tiersRes.ok) {
      throw new Error("Failed to load Valorant API data.");
    }

    const weaponsJson = await weaponsRes.json();
    const tiersJson = await tiersRes.json();

    const tierMap = {};
    tiersJson.data.forEach((tier) => {
      tierMap[tier.uuid] = tier.displayName;
    });

    const skins = [];

    weaponsJson.data.forEach((weapon) => {
      const weaponName = normalizeWeaponName(weapon.displayName);

      weapon.skins.forEach((skin) => {
        const image =
          skin.displayIcon ||
          skin.wallpaper ||
          skin.chromas?.[0]?.displayIcon ||
          "";

        if (!image) return;

        const tierName = tierMap[skin.contentTierUuid] || "Unknown Tier";
        const price = getApproxPrice(tierName, weaponName);

        skins.push({
          uuid: skin.uuid,
          name: skin.displayName,
          weapon: weaponName,
          image,
          tier: tierName,
          price,
        });
      });
    });

    const uniqueMap = new Map();
    skins.forEach((skin) => {
      if (!uniqueMap.has(skin.uuid)) {
        uniqueMap.set(skin.uuid, skin);
      }
    });

    allSkins = [...uniqueMap.values()];
    renderSkins();
  } catch (error) {
    console.error(error);
    skinsGrid.innerHTML = `
      <div class="empty-state">
        Could not load skins right now.
      </div>
    `;
    resultsCount.textContent = "0 skins";
    resultsTitle.textContent = "Load failed";
  }
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderSkins();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderSkins();
});

resetFiltersBtn.addEventListener("click", resetFilters);
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

bindFilterChips();
loadSkins();
