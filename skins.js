const skinsGrid = document.getElementById("skinsGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const tierPrices = {
  "0cebb8be-46d7-c12a-d306-e9907bfc5a25": { name: "Select", price: 875 },
  "60bca009-4182-7998-dee7-b8a2558dc369": { name: "Deluxe", price: 1275 },
  "12683d76-48d7-84a3-4e09-6985794f0445": { name: "Premium", price: 1775 },
  "e046854e-406c-37f4-6607-19a9ba8426fc": { name: "Exclusive", price: 2175 },
  "60bca009-4182-7998-dee7-b8a2558dc369": { name: "Ultra", price: 2475 },
};

let allSkins = [];

async function loadSkins() {
  const response = await fetch("https://valorant-api.com/v1/weapons");
  const data = await response.json();

  const weapons = data.data;

  weapons.forEach((weapon) => {
    weapon.skins.forEach((skin) => {
      if (!skin.displayIcon) return;

      const tier = tierPrices[skin.contentTierUuid];

      allSkins.push({
        name: skin.displayName,
        weapon: weapon.displayName,
        image: skin.displayIcon,
        tier: tier ? tier.name : "Unknown",
        price: tier ? tier.price : "-",
      });
    });
  });

  renderSkins("all");
}

function renderSkins(selectedWeapon) {
  let filtered =
    selectedWeapon === "all"
      ? allSkins
      : allSkins.filter((s) => s.weapon === selectedWeapon);

  if (!filtered.length) {
    skinsGrid.innerHTML = `<div class="empty-state">No skins found.</div>`;
    return;
  }

  skinsGrid.innerHTML = filtered
    .map(
      (skin) => `
      <article class="skin-card">

        <div class="skin-image-wrap">
          <img class="skin-image" src="${skin.image}" alt="${skin.name}">
        </div>

<div class="skin-info">
<p class="skin-weapon">${skin.weapon}</p>
<h2 class="skin-name">${skin.name}</h2>
<p class="skin-tier">${skin.tier} Edition</p>
<p class="skin-price">${skin.price} VP</p>
</div>

      </article>
    `,
    )
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
