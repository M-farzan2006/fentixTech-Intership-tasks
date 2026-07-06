/* ==========================================================================
   Furnitur — Shared Nav Behavior
   Cart badge count, mobile menu toggle, and the navbar search box.
   Runs on every page.
   ========================================================================== */

function refreshCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const count = getCartCount();
    el.textContent = count;
    el.classList.toggle("is-hidden", count === 0);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initNavSearch() {
  const form = document.querySelector("[data-nav-search]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type='search']");
    const value = input.value.trim();
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    window.location.href = "shop.html" + (params.toString() ? "?" + params.toString() : "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  refreshCartBadge();
  initMobileMenu();
  initNavSearch();
});

// Keep the badge correct if the cart changes in another tab.
window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) refreshCartBadge();
});
document.addEventListener("cart:updated", refreshCartBadge);
