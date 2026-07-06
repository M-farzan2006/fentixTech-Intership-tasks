/* ==========================================================================
   Furnitur — Product Detail Page
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const product = getProductById(qs("id"));
  const root = document.querySelector("[data-product-root]");
  if (!product || !root) {
    if (root) {
      root.innerHTML = `<div class="empty-state">
        <p>We couldn't find that product.</p>
        <p class="empty-state__hint"><a href="shop.html">Back to shop</a></p>
      </div>`;
    }
    return;
  }

  document.title = `${product.name} — Furnitur`;

  document.querySelector("[data-breadcrumb]").innerHTML =
    `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${product.name}`;

  document.querySelector("[data-product-image]").src = product.image;
  document.querySelector("[data-product-image]").alt = product.name;
  document.querySelector("[data-product-name]").textContent = product.name;
  document.querySelector("[data-product-rating]").innerHTML =
    `<span aria-hidden="true">${starRating(product.rating)}</span> ${product.sold} sold`;
  document.querySelector("[data-product-description]").textContent = product.description;

  const priceEl = document.querySelector("[data-product-price]");
  priceEl.innerHTML = product.onSale
    ? `<span class="price price--lg">${formatPrice(product.price)}</span>
       <span class="price price--old price--lg-old">${formatPrice(product.oldPrice)}</span>
       <span class="badge badge--sale">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>`
    : `<span class="price price--lg">${formatPrice(product.price)}</span>`;

  const featuresEl = document.querySelector("[data-product-features]");
  featuresEl.innerHTML = product.features.map((f) => `<li>${f}</li>`).join("");

  // Variants (decorative selection state, informs nothing but the UI itself)
  const variantsEl = document.querySelector("[data-product-variants]");
  if (product.variants) {
    variantsEl.innerHTML = Object.entries(product.variants)
      .map(
        ([group, options]) => `
        <div class="variant-group">
          <span class="variant-group__label">${slugToLabel(group)}</span>
          <div class="variant-group__options">
            ${options
              .map(
                (opt, i) =>
                  `<button type="button" class="variant-pill ${i === 0 ? "is-selected" : ""}" data-variant="${group}">${opt}</button>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");
    variantsEl.addEventListener("click", (e) => {
      const pill = e.target.closest(".variant-pill");
      if (!pill) return;
      pill.parentElement
        .querySelectorAll(".variant-pill")
        .forEach((p) => p.classList.remove("is-selected"));
      pill.classList.add("is-selected");
    });
  }

  // Quantity stepper
  let qty = 1;
  const qtyEl = document.querySelector("[data-qty-value]");
  document.querySelector("[data-qty-decrease]").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyEl.textContent = qty;
  });
  document.querySelector("[data-qty-increase]").addEventListener("click", () => {
    qty = Math.min(20, qty + 1);
    qtyEl.textContent = qty;
  });

  document.querySelector("[data-add-to-cart-main]").addEventListener("click", (e) => {
    addToCart(product.id, qty);
    flashAdded(e.currentTarget);
  });

  document.querySelector("[data-buy-now]").addEventListener("click", () => {
    addToCart(product.id, qty);
    window.location.href = "cart.html";
  });

  // Related products: same category, excluding self
  const relatedGrid = document.querySelector("[data-related-grid]");
  if (relatedGrid) {
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
    renderProductGrid(relatedGrid, related.length ? related : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3));
    bindAddToCart(relatedGrid);
  }
});
