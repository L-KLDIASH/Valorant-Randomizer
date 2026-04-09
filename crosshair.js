const crosshairGrid = document.getElementById("crosshairGrid");
const crosshairSearch = document.getElementById("crosshairSearch");
const crosshairSort = document.getElementById("crosshairSort");
const resetCrosshairFilters = document.getElementById("resetCrosshairFilters");

const featuredCrosshairName = document.getElementById("featuredCrosshairName");
const featuredCrosshairDesc = document.getElementById("featuredCrosshairDesc");
const featuredCrosshairCategory = document.getElementById(
  "featuredCrosshairCategory",
);
const featuredCrosshairSize = document.getElementById("featuredCrosshairSize");
const featuredCrosshairUse = document.getElementById("featuredCrosshairUse");
const featuredCrosshairCode = document.getElementById("featuredCrosshairCode");
const featuredCrosshairPreview = document.getElementById(
  "featuredCrosshairPreview",
);
const copyFeaturedCode = document.getElementById("copyFeaturedCode");
const toggleFeaturedFavorite = document.getElementById(
  "toggleFeaturedFavorite",
);
const crosshairResultsTitle = document.getElementById("crosshairResultsTitle");
const crosshairResultsCount = document.getElementById("crosshairResultsCount");

const crosshairCodeInput = document.getElementById("crosshairCodeInput");
const importCrosshairBtn = document.getElementById("importCrosshairBtn");
const importMessage = document.getElementById("importMessage");

const crosshairPresets = [
  {
    id: 1,
    name: "Tiny Dot",
    category: "Dot",
    size: "Small",
    use: "Tap shots",
    code: "0;s;1;P;c;5;d;1;z;1;f;0",
    shape: { color: "white", dot: true, dotSize: 6, lines: false },
  },
  {
    id: 2,
    name: "Micro Focus",
    category: "Precise",
    size: "Small",
    use: "Headshots",
    code: "0;s;1;P;c;1;h;0;0l;2;0o;1;0a;1;0f;0",
    shape: {
      color: "cyan",
      dot: false,
      lines: true,
      length: 16,
      thickness: 3,
      gap: 8,
      opacity: 1,
    },
  },
  {
    id: 3,
    name: "Classic White",
    category: "Beginner",
    size: "Medium",
    use: "Balanced play",
    code: "0;s;1;P;c;5;h;0;0l;4;0o;1;0a;1;0f;0",
    shape: {
      color: "white",
      dot: false,
      lines: true,
      length: 24,
      thickness: 4,
      gap: 9,
      opacity: 1,
    },
  },
  {
    id: 4,
    name: "Aggro Red",
    category: "Aggressive",
    size: "Medium",
    use: "Fast duels",
    code: "0;s;1;P;c;7;h;0;0l;5;0o;1;0a;1;0f;0",
    shape: {
      color: "red",
      dot: false,
      lines: true,
      length: 26,
      thickness: 4,
      gap: 8,
      opacity: 1,
    },
  },
  {
    id: 5,
    name: "Pro Tap",
    category: "Precise",
    size: "Small",
    use: "Vandal taps",
    code: "0;s;1;P;c;1;u;000000FF;h;0;0l;2;0o;1;0a;1;0f;0",
    shape: {
      color: "green",
      dot: false,
      lines: true,
      length: 14,
      thickness: 3,
      gap: 9,
      opacity: 1,
    },
  },
  {
    id: 6,
    name: "Sharp Dot",
    category: "Dot",
    size: "Small",
    use: "Sheriff aim",
    code: "0;s;1;P;c;1;d;1;z;2;f;0",
    shape: { color: "green", dot: true, dotSize: 8, lines: false },
  },
  {
    id: 7,
    name: "Balanced Cyan",
    category: "Beginner",
    size: "Medium",
    use: "Daily use",
    code: "0;s;1;P;c;1;h;0;0l;4;0o;1;0a;1;0f;0",
    shape: {
      color: "cyan",
      dot: false,
      lines: true,
      length: 22,
      thickness: 4,
      gap: 10,
      opacity: 1,
    },
  },
  {
    id: 8,
    name: "Heavy Box",
    category: "Aggressive",
    size: "Large",
    use: "Spray feel",
    code: "0;s;1;P;c;7;h;0;0l;6;0o;2;0a;1;0f;0",
    shape: {
      color: "red",
      dot: false,
      lines: true,
      length: 30,
      thickness: 5,
      gap: 11,
      opacity: 1,
    },
  },
  {
    id: 9,
    name: "Minimal Green",
    category: "Precise",
    size: "Small",
    use: "Clean aim",
    code: "0;s;1;P;c;1;h;0;0l;3;0o;1;0a;0.8;0f;0",
    shape: {
      color: "green",
      dot: false,
      lines: true,
      length: 18,
      thickness: 3,
      gap: 10,
      opacity: 0.8,
    },
  },
  {
    id: 10,
    name: "Boxy Blue",
    category: "Beginner",
    size: "Medium",
    use: "Easy tracking",
    code: "0;s;1;P;c;2;h;0;0l;5;0o;2;0a;1;0f;0",
    shape: {
      color: "blue",
      dot: false,
      lines: true,
      length: 26,
      thickness: 5,
      gap: 10,
      opacity: 1,
    },
  },
  {
    id: 11,
    name: "Dot Sniper",
    category: "Dot",
    size: "Small",
    use: "Operator focus",
    code: "0;s;1;P;c;2;d;1;z;1;f;0",
    shape: { color: "blue", dot: true, dotSize: 6, lines: false },
  },
  {
    id: 12,
    name: "Wide Gap",
    category: "Funny",
    size: "Large",
    use: "Chaotic games",
    code: "0;s;1;P;c;3;h;0;0l;7;0o;1;0a;1;0f;0",
    shape: {
      color: "yellow",
      dot: false,
      lines: true,
      length: 32,
      thickness: 4,
      gap: 18,
      opacity: 1,
    },
  },
];

const state = {
  category: "all",
  size: "all",
  favorite: "all",
  search: "",
  sort: "name-asc",
};

let featuredPreset = crosshairPresets[0];

function getFavorites() {
  return JSON.parse(localStorage.getItem("valorantCrosshairFavorites") || "[]");
}

function saveFavorites(list) {
  localStorage.setItem("valorantCrosshairFavorites", JSON.stringify(list));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const exists = favorites.includes(id);
  const updated = exists
    ? favorites.filter((item) => item !== id)
    : [...favorites, id];
  saveFavorites(updated);
  renderCrosshairs();
  updateFeaturedFavoriteButton();
}

function updateChipActiveState(type, value) {
  const chips = document.querySelectorAll(
    `.sidebar-chip[data-filter-type="${type}"]`,
  );
  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.value === value);
  });
}

function getFilteredCrosshairs() {
  return crosshairPresets.filter((preset) => {
    const categoryMatch =
      state.category === "all" || preset.category === state.category;
    const sizeMatch = state.size === "all" || preset.size === state.size;
    const favoriteMatch = state.favorite === "all" || isFavorite(preset.id);

    const searchMatch =
      state.search.trim() === "" ||
      preset.name.toLowerCase().includes(state.search.toLowerCase()) ||
      preset.category.toLowerCase().includes(state.search.toLowerCase()) ||
      preset.use.toLowerCase().includes(state.search.toLowerCase());

    return categoryMatch && sizeMatch && favoriteMatch && searchMatch;
  });
}

function sortCrosshairs(list) {
  const sorted = [...list];

  if (state.sort === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (state.sort === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (state.sort === "style") {
    sorted.sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
  }

  return sorted;
}

function updateResultsMeta(count) {
  crosshairResultsCount.textContent = `${count} preset${count === 1 ? "" : "s"}`;

  const parts = [];
  if (state.category !== "all") parts.push(state.category);
  if (state.size !== "all") parts.push(state.size);
  if (state.favorite === "favorites") parts.push("Favorites");
  if (state.search.trim()) parts.push(`"${state.search.trim()}"`);

  crosshairResultsTitle.textContent = parts.length
    ? `Showing ${parts.join(" • ")}`
    : "Showing all crosshairs";
}

function createCrosshairHTML(shape) {
  const color = shape.color || "white";
  const opacity = shape.opacity ?? 1;
  const dot = shape.dot ?? false;
  const dotSize = shape.dotSize ?? 6;
  const lines = shape.lines ?? true;
  const length = shape.length ?? 22;
  const thickness = shape.thickness ?? 4;
  const gap = shape.gap ?? 10;

  const previewClass = [
    "preview-crosshair",
    color,
    lines ? "" : "no-lines",
    dot ? "" : "no-dot",
  ]
    .join(" ")
    .trim();

  return `
    <div class="${previewClass}" style="opacity:${opacity}">
      <span class="line top" style="width:${thickness}px;height:${length}px;top:${80 - gap - length}px;left:50%;transform:translateX(-50%);"></span>
      <span class="line right" style="width:${length}px;height:${thickness}px;top:50%;left:${80 + gap}px;transform:translateY(-50%);"></span>
      <span class="line bottom" style="width:${thickness}px;height:${length}px;top:${80 + gap}px;left:50%;transform:translateX(-50%);"></span>
      <span class="line left" style="width:${length}px;height:${thickness}px;top:50%;left:${80 - gap - length}px;transform:translateY(-50%);"></span>
      <span class="center-dot" style="width:${dotSize}px;height:${dotSize}px;top:50%;left:50%;transform:translate(-50%,-50%);"></span>
    </div>
  `;
}

// ნაწილობრივ parser — ყველაზე გავრცელებულ პარამეტრებს კითხულობს
function parseImportedCode(code) {
  const tokens = code.split(";");
  const getValue = (key) => {
    const index = tokens.indexOf(key);
    if (index !== -1 && tokens[index + 1] !== undefined) {
      return tokens[index + 1];
    }
    return null;
  };

  const colorMap = {
    1: "green",
    2: "blue",
    3: "yellow",
    5: "white",
    7: "red",
    8: "pink",
  };

  const c = getValue("c");
  const d = getValue("d");
  const z = getValue("z");
  const l = getValue("0l");
  const o = getValue("0o");
  const a = getValue("0a");
  const f = getValue("0f");

  const dotEnabled = d === "1";
  const dotSize = z ? Math.max(4, Number(z) * 4) : 6;
  const length = l ? Math.max(10, Number(l) * 5) : 22;
  const thickness = o ? Math.max(2, Number(o) * 2) : 4;
  const opacity = a ? Math.min(1, Number(a)) : 1;
  const gap = f ? 10 + Number(f) * 2 : 10;
  const lines = l !== null;

  return {
    color: colorMap[c] || "white",
    dot: dotEnabled,
    dotSize,
    lines,
    length,
    thickness,
    gap,
    opacity,
  };
}

function setFeaturedPreset(preset) {
  featuredPreset = preset;
  featuredCrosshairName.textContent = preset.name;
  featuredCrosshairDesc.textContent = `A ${preset.size.toLowerCase()} ${preset.category.toLowerCase()} crosshair, best for ${preset.use.toLowerCase()}.`;
  featuredCrosshairCategory.textContent = preset.category;
  featuredCrosshairSize.textContent = preset.size;
  featuredCrosshairUse.textContent = preset.use;
  featuredCrosshairCode.textContent = preset.code;
  featuredCrosshairPreview.innerHTML = createCrosshairHTML(preset.shape);
  updateFeaturedFavoriteButton();
}

function setImportedFeatured(code) {
  const parsed = parseImportedCode(code);

  featuredCrosshairName.textContent = "Imported Crosshair";
  featuredCrosshairDesc.textContent =
    "Imported from your custom Valorant code. Preview is a close approximation.";
  featuredCrosshairCategory.textContent = "Custom";
  featuredCrosshairSize.textContent = "Imported";
  featuredCrosshairUse.textContent = "User Code";
  featuredCrosshairCode.textContent = code;
  featuredCrosshairPreview.innerHTML = createCrosshairHTML(parsed);
  toggleFeaturedFavorite.textContent = "☆ Favorite";
}

function updateFeaturedFavoriteButton() {
  const active = isFavorite(featuredPreset.id);
  toggleFeaturedFavorite.textContent = active ? "★ Favorited" : "☆ Favorite";
}

function renderCrosshairs() {
  const filtered = sortCrosshairs(getFilteredCrosshairs());
  updateResultsMeta(filtered.length);

  if (!filtered.length) {
    crosshairGrid.innerHTML = `<div class="empty-state">No crosshairs found for this filter combination.</div>`;
    return;
  }

  crosshairGrid.innerHTML = filtered
    .map(
      (preset) => `
      <article class="crosshair-card ${featuredPreset.id === preset.id ? "active" : ""}" data-id="${preset.id}">
        <button class="crosshair-fav-btn ${isFavorite(preset.id) ? "active" : ""}" data-fav-id="${preset.id}">
          ${isFavorite(preset.id) ? "★" : "☆"}
        </button>

        <div class="crosshair-card-preview">
          ${createCrosshairHTML(preset.shape)}
        </div>

        <div class="crosshair-card-info">
          <p class="crosshair-card-category">${preset.category}</p>
          <h3 class="crosshair-card-name">${preset.name}</h3>

          <div class="crosshair-card-tags">
            <span class="crosshair-mini-tag">${preset.size}</span>
            <span class="crosshair-mini-tag">${preset.use}</span>
          </div>

          <div class="crosshair-card-bottom">
            <code class="crosshair-card-code">${preset.code}</code>
            <button class="copy-mini-btn" data-copy-id="${preset.id}">Copy</button>
          </div>
        </div>
      </article>
    `,
    )
    .join("");

  bindCardEvents();
}

function bindCardEvents() {
  const cards = document.querySelectorAll(".crosshair-card");
  const copyButtons = document.querySelectorAll(".copy-mini-btn");
  const favButtons = document.querySelectorAll(".crosshair-fav-btn");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("copy-mini-btn") ||
        event.target.classList.contains("crosshair-fav-btn")
      ) {
        return;
      }

      const id = Number(card.dataset.id);
      const preset = crosshairPresets.find((item) => item.id === id);
      if (!preset) return;

      setFeaturedPreset(preset);
      renderCrosshairs();
    });
  });

  copyButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const id = Number(button.dataset.copyId);
      const preset = crosshairPresets.find((item) => item.id === id);
      if (!preset) return;

      await navigator.clipboard.writeText(preset.code);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 900);
    });
  });

  favButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = Number(button.dataset.favId);
      toggleFavorite(id);
    });
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
      renderCrosshairs();
    });
  });
}

function resetFilters() {
  state.category = "all";
  state.size = "all";
  state.favorite = "all";
  state.search = "";
  state.sort = "name-asc";

  crosshairSearch.value = "";
  crosshairSort.value = "name-asc";

  updateChipActiveState("category", "all");
  updateChipActiveState("size", "all");
  updateChipActiveState("favorite", "all");

  renderCrosshairs();
}

crosshairSearch.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderCrosshairs();
});

crosshairSort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderCrosshairs();
});

resetCrosshairFilters.addEventListener("click", resetFilters);

copyFeaturedCode.addEventListener("click", async () => {
  await navigator.clipboard.writeText(featuredCrosshairCode.textContent);
  copyFeaturedCode.textContent = "Copied";
  setTimeout(() => {
    copyFeaturedCode.textContent = "Copy Code";
  }, 900);
});

toggleFeaturedFavorite.addEventListener("click", () => {
  if (featuredPreset && featuredPreset.id) {
    toggleFavorite(featuredPreset.id);
  }
});

importCrosshairBtn.addEventListener("click", () => {
  const code = crosshairCodeInput.value.trim();

  if (!code) {
    importMessage.textContent = "Please paste a crosshair code first.";
    return;
  }

  try {
    setImportedFeatured(code);
    importMessage.textContent =
      "Crosshair imported successfully. Preview is approximate.";
  } catch (error) {
    importMessage.textContent = "Could not parse that code.";
  }
});

bindFilterChips();
setFeaturedPreset(featuredPreset);
renderCrosshairs();
