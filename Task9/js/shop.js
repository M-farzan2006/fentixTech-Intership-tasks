/* ==========================================================================
   Furnitur — Shop Page
   Category filtering + product search, both instant and URL-synced so a
   link like shop.html?category=Sofa&q=chair keeps working, but every filter
   change afterwards happens client-side with no page reload.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-shop-grid]");
  const chips = document.querySelectorAll("[data-category-chip]");
  const searchInput = document.querySelector("[data-shop-search]");
  const resultCount = document.querySelector("[data-result-count]");

  const state = {
    category: qs("category") || "All",
    query: (qs("q") || "").trim()
  };

  function matchesCategory(product, category) {
    if (category === "All") return true;
    if (category === "On Sale") return product.onSale;
    return product.category === category;
  }

  function matchesQuery(product, query) {
    if (!query) return true;
    const haystack = (product.name + " " + product.category).toLowerCase();
    return haystack.includes(query.toLowerCase());
  }

  function render() {
    const filtered = PRODUCTS.filter(
      (p) => matchesCategory(p, state.category) && matchesQuery(p, state.query)
    );
    renderProductGrid(grid, filtered);
    if (resultCount) {
      resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;
    }
  }

  function setActiveChip() {
    chips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.categoryChip === state.category);
    });
  }

  function syncUrl() {
    const params = new URLSearchParams();
    if (state.category !== "All") params.set("category", state.category);
    if (state.query) params.set("q", state.query);
    const next = params.toString();
    history.replaceState(null, "", next ? `?${next}` : window.location.pathname);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.categoryChip;
      setActiveChip();
      syncUrl();
      render();
    });
  });

  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener(
      "input",
      debounce(() => {
        state.query = searchInput.value.trim();
        syncUrl();
        render();
      }, 150)
    );
  }

  if (grid) bindAddToCart(grid);
  setActiveChip();
  render();
});
