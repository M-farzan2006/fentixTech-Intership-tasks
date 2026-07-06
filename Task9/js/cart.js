/* ==========================================================================
   Furnitur — Cart Page
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const linesEl = document.querySelector("[data-cart-lines]");
  const emptyEl = document.querySelector("[data-cart-empty]");
  const summaryEl = document.querySelector("[data-cart-summary]");
  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  const totalEl = document.querySelector("[data-cart-total]");
  const shippingEl = document.querySelector("[data-cart-shipping]");

  const SHIPPING_FLAT = 49;

  function lineHTML({ product, qty }) {
    return `
      <div class="cart-line" data-line="${product.id}">
        <a class="cart-line__media" href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <div class="cart-line__info">
          <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <p class="cart-line__category">${product.category}</p>
          <button type="button" class="cart-line__remove" data-remove="${product.id}">Remove</button>
        </div>
        <div class="qty-stepper" data-qty-group="${product.id}">
          <button type="button" data-step="-1" aria-label="Decrease quantity">−</button>
          <span data-qty-display>${qty}</span>
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <div class="cart-line__price">${formatPrice(product.price * qty)}</div>
      </div>`;
  }

  function render() {
    const lines = getCartLines();
    if (!lines.length) {
      linesEl.innerHTML = "";
      emptyEl.classList.remove("is-hidden");
      summaryEl.classList.add("is-hidden");
      return;
    }
    emptyEl.classList.add("is-hidden");
    summaryEl.classList.remove("is-hidden");
    linesEl.innerHTML = lines.map(lineHTML).join("");

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(shipping);
    totalEl.textContent = formatPrice(subtotal + shipping);
  }

  linesEl.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-remove]");
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.remove);
      render();
      return;
    }
    const stepBtn = e.target.closest("[data-step]");
    if (stepBtn) {
      const group = stepBtn.closest("[data-qty-group]").dataset.qtyGroup;
      const cart = getCart();
      const next = (cart[group] || 0) + Number(stepBtn.dataset.step);
      setQuantity(group, next);
      render();
    }
  });

  document.querySelector("[data-clear-cart]")?.addEventListener("click", () => {
    clearCart();
    render();
  });

  document.querySelector("[data-checkout]")?.addEventListener("click", () => {
    if (!getCartCount()) return;
    alert("This is a demo storefront — checkout isn't wired up to a payment processor yet.");
  });

  render();
});
