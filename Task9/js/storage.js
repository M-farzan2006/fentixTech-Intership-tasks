/* ==========================================================================
   Furnitur — Cart Storage
   All reads/writes to localStorage go through here so every page (and every
   tab) agrees on one shape: { [productId]: quantity }
   ========================================================================== */

const CART_KEY = "furnitur_cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Could not read cart from storage:", err);
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Let other tabs/components on the same page know the cart changed.
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
  } catch (err) {
    console.error("Could not save cart to storage:", err);
  }
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
  return cart;
}

function setQuantity(productId, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  return cart;
}

function clearCart() {
  saveCart({});
}

function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartLines() {
  const cart = getCart();
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = getProductById(id);
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}
