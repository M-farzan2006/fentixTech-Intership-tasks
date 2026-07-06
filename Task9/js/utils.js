/* ==========================================================================
   Furnitur — Shared Utilities
   ========================================================================== */

function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

function starRating(rating) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(full);
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function slugToLabel(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
