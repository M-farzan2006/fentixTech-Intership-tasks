/* ==========================================================================
   Furnitur — Rendering
   Builds product-card markup from the PRODUCTS array. No product markup is
   ever hand-written in the HTML pages.
   ========================================================================== */

function productCardHTML(product) {
  const saleBadge = product.onSale
    ? `<span class="badge badge--sale">-${Math.round(
        (1 - product.price / product.oldPrice) * 100
      )}%</span>`
    : "";

  const priceHTML = product.onSale
    ? `<span class="price">${formatPrice(product.price)}</span>
       <span class="price price--old">${formatPrice(product.oldPrice)}</span>`
    : `<span class="price">${formatPrice(product.price)}</span>`;

  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <a class="product-card__media" href="product.html?id=${product.id}" aria-label="View ${product.name}">
        ${saleBadge}
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button class="product-card__quick-add" type="button" data-add-to-cart="${product.id}">
          Add to cart
        </button>
      </a>
      <div class="product-card__body">
        <h3 class="product-card__name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card__rating" aria-hidden="true">${starRating(product.rating)}</div>
        <div class="product-card__price">${priceHTML}</div>
      </div>
    </article>
  `;
}

function renderProductGrid(container, products) {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No products match that search just yet.</p>
        <p class="empty-state__hint">Try another keyword or clear the filter.</p>
      </div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join("");
}

/* Wire up every [data-add-to-cart] button inside a container (event
   delegation so it keeps working after re-renders). */
function bindAddToCart(container) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    addToCart(btn.dataset.addToCart, 1);
    flashAdded(btn);
  });
}

function flashAdded(btn) {
  const original = btn.textContent;
  btn.textContent = "Added ✓";
  btn.classList.add("is-added");
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove("is-added");
  }, 1200);
}
