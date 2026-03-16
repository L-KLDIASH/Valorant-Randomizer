const skinsGrid = document.getElementById("skinsGrid");
const filterButtons = document.querySelectorAll(".filter-button");

// Riot-ის tier-based VP approximation
const PRICE_BY_TIER = {
  "Select Edition": { gun: 875, melee: 1750 },
  "Deluxe Edition": { gun: 1275, melee: 2550 },
  "Premium Edition": { gun: 1775, melee: 3550 },
  "Exclusive Edition": { gun: 2175, melee: 4350 },
  "Ultra Edition": { gun: 2475, melee: 4950 },
};

let allSkins = [];

function normalizeWeaponName(name) {
  return name === "Melee" ? "Knife" : name;
}

function getApproxPrice(tierName, weaponName) {
  const tier = PRICE_BY_TIER[tierName];
  if (!tier) return "-";

  const isMelee = weaponName === "Melee" || weaponName === "Knife";
  return isMelee ? tier.melee : tier.gun;
}

function getTierClass(tierName) {
  return tierName.toLowerCase().replace(" edition", "").replace(/\s+/g, "-");
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

    // დუბლიკატების მოცილება
    const uniqueMap = new Map();
    skins.forEach((skin) => {
      if (!uniqueMap.has(skin.uuid)) {
        uniqueMap.set(skin.uuid, skin);
      }
    });

    allSkins = [...uniqueMap.values()].sort(
      (a, b) =>
        a.weapon.localeCompare(b.weapon) || a.name.localeCompare(b.name),
    );

    renderSkins("all");
  } catch (error) {
    console.error(error);
    skinsGrid.innerHTML = `
      <div class="empty-state">
        Could not load skins right now.
      </div>
    `;
  }
}

function renderSkins(selectedWeapon = "all") {
  const filtered =
    selectedWeapon === "all"
      ? allSkins
      : allSkins.filter((skin) => skin.weapon === selectedWeapon);

  if (!filtered.length) {
    skinsGrid.innerHTML = `
      <div class="empty-state">
        No skins found for this weapon.
      </div>
    `;
    return;
  }

  skinsGrid.innerHTML = filtered
    .map((skin) => {
      const tierClass = getTierClass(skin.tier);

      return `
        <article class="skin-card">
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
                ${skin.price === "-" ? "Price N/A" : `${skin.price} VP`}
              </span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderSkins(button.dataset.weapon);
  });
});

loadSkins();
