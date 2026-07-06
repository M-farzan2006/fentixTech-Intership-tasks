/* ==========================================================================
   Furnitur — Home Page
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-featured-grid]");
  const tabs = document.querySelectorAll("[data-featured-tab]");

  function applyFilter(filter) {
    let list = PRODUCTS.filter((p) => p.featured);
    if (filter === "On Sale") list = list.filter((p) => p.onSale);
    else if (filter !== "All") list = list.filter((p) => p.category === filter);
    renderProductGrid(grid, list);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      applyFilter(tab.dataset.featuredTab);
    });
  });

  if (grid) {
    bindAddToCart(grid);
    applyFilter("All");
  }

  // "Best combined with" strip — three handpicked, non-featured items.
  const combinedGrid = document.querySelector("[data-combined-grid]");
  if (combinedGrid) {
    const combined = PRODUCTS.filter((p) => p.featured).slice(0, 3);
    renderProductGrid(combinedGrid, combined);
    bindAddToCart(combinedGrid);
  }

  // FAQ accordion
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const question = item.querySelector("[data-faq-question]");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll("[data-faq-item]").forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });
});
