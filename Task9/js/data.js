/* ==========================================================================
   Furnitur — Product Data
   Single source of truth for the catalog. Every page reads from this array,
   nothing is hardcoded into the HTML.
   ========================================================================== */

const PRODUCTS = [
  {
    id: "urban-lux-high-chair",
    name: "Urban Lux High Chair",
    category: "Chair",
    price: 2668.15,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.8,
    sold: 261,
    image: "assets/images/products/urban-lux-chair.jpg",
    description:
      "A sculptural high chair built on a solid walnut frame, upholstered in brushed bouclé. The raised silhouette adds presence to any dining nook or reading corner without weighing the room down.",
    features: [
      "Solid walnut frame with hand-rubbed oil finish",
      "High-density foam seat wrapped in bouclé fabric",
      "Slight recline angle for all-day comfort",
      "Protective felt floor glides included"
    ]
  },
  {
    id: "modern-black-hanging-light",
    name: "Modern Black Hanging Light",
    category: "Lighting",
    price: 1595.60,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.6,
    sold: 184,
    image: "assets/images/products/modern-black-hanging-light.jpg",
    description:
      "A matte-black pendant with a spun-metal shade that throws a soft, directional pool of light. Adjustable cable length lets it sit low over a table or high across an open room.",
    features: [
      "Spun aluminum shade, matte black powder coat",
      "Adjustable cable, 40–160cm drop",
      "Dimmable, E27 socket (bulb included)",
      "Suits dining tables and kitchen islands"
    ]
  },
  {
    id: "metro-fusion-table",
    name: "Metro Fusion Table",
    category: "Table",
    price: 2238.30,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.7,
    sold: 132,
    image: "assets/images/products/metro-fusion-table.jpg",
    description:
      "An asymmetric side table pairing a travertine top with a blackened-steel base. Compact enough for a reading chair, sturdy enough to double as an occasional stool.",
    features: [
      "Honed travertine top, sealed and stain-resistant",
      "Blackened steel base, welded joints",
      "Non-slip levelling feet",
      "Assembly required, tools included"
    ]
  },
  {
    id: "lumin-desk-lamp",
    name: "Lumin Desk Lamp",
    category: "Lighting",
    price: 1477.80,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.5,
    sold: 210,
    image: "assets/images/products/lumin-desk-lamp.jpg",
    description:
      "A folding-arm task lamp with a warm-dim LED engine. The counterweighted joint holds any angle without drifting, so the light stays exactly where you left it.",
    features: [
      "Warm-dim LED, 2700K–3000K",
      "Counterweighted folding arm",
      "Touch dimmer on the base",
      "USB-C powered, cable included"
    ]
  },
  {
    id: "timeless-edge-hanging-clock",
    name: "Timeless Edge Hanging Clock",
    category: "Decor",
    price: 1071.60,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.4,
    sold: 98,
    image: "assets/images/products/timeless-edge-clock.jpg",
    description:
      "A wide, low-profile wall clock with an oak veneer face and a silent sweep movement. Reads as a piece of art first, a clock second.",
    features: [
      "Oak veneer face, brushed brass hands",
      "Silent sweep movement — no ticking",
      "Battery powered (1x AA, included)",
      "Ready-to-hang mounting bracket"
    ]
  },
  {
    id: "zenith-pendant-light",
    name: "Zenith Pendant Light",
    category: "Lighting",
    price: 2069.59,
    oldPrice: null,
    onSale: false,
    featured: true,
    rating: 4.7,
    sold: 156,
    image: "assets/images/products/zenith-pendant-light.jpg",
    description:
      "A layered glass pendant that diffuses light into a soft, even glow rather than a single hot point. Reads sculptural even when switched off.",
    features: [
      "Hand-finished layered glass shade",
      "Adjustable cable, 40–200cm drop",
      "Dimmable, E27 socket (bulb included)",
      "Suits entryways and stairwells"
    ]
  },
  {
    id: "radiance-modern-sofa",
    name: "Radiance Modern Sofa",
    category: "Sofa",
    price: 2352.41,
    oldPrice: 3360.59,
    onSale: true,
    featured: true,
    rating: 4.9,
    sold: 261,
    image: "assets/images/products/radiance-modern-sofa.jpg",
    description:
      "A clean-lined sofa with a neutral upholstery that blends into almost any room, so the accent pieces around it can do the talking. Sturdy 8-leg kiln-dried frame underneath.",
    features: [
      "Kiln-dried hardwood frame, 8-leg support",
      "High-resilience foam with fibre wrap",
      "Removable, machine-washable covers",
      "Available in Long, Medium and Short"
    ],
    variants: {
      type: ["Long", "Medium", "Short"],
      color: ["Grey", "Sapphire", "Emerald", "Ruby"]
    }
  },
  {
    id: "designed-sofa",
    name: "Designed Sofa",
    category: "Sofa",
    price: 2450.00,
    oldPrice: null,
    onSale: false,
    featured: false,
    rating: 4.6,
    sold: 142,
    image: "assets/images/products/designed-sofa.jpg",
    description:
      "Our newest sofa: a considered combination of style and comfort, built to elevate a living space and hold up to everyday use.",
    features: [
      "Solid frame with reinforced corner blocks",
      "Plush, deep-fill cushions",
      "Woven upholstery, fade-resistant",
      "Available in Long, Medium and Short"
    ],
    variants: {
      type: ["Long", "Medium", "Short"]
    }
  },
  {
    id: "nova-chair",
    name: "Nova Chair",
    category: "Chair",
    price: 1890.00,
    oldPrice: null,
    onSale: false,
    featured: false,
    rating: 4.5,
    sold: 88,
    image: "assets/images/products/nova-chair.jpg",
    description:
      "A stylish, comfortable addition to any room. Sleek tapered legs and plush cushions come together for the ultimate seating experience.",
    features: [
      "Tapered solid-wood legs",
      "Plush cushioned seat and back",
      "Compact footprint, easy to move",
      "Spot-clean upholstery"
    ]
  },
  {
    id: "ambient-hanging-light",
    name: "Ambient Hanging Light",
    category: "Lighting",
    price: 1320.00,
    oldPrice: null,
    onSale: false,
    featured: false,
    rating: 4.4,
    sold: 76,
    image: "assets/images/products/ambient-hanging-light.jpg",
    description:
      "A modern hanging light with sleek lines, energy-efficient LED lighting and an adjustable drop, upgrading whatever room it hangs in.",
    features: [
      "Energy-efficient integrated LED",
      "Adjustable height at install",
      "Slim profile, minimal shadow-casting",
      "Dimmable with compatible switches"
    ]
  },
  {
    id: "modern-bronze-hanging-light",
    name: "Modern Bronze Hanging Light",
    category: "Lighting",
    price: 3252.41,
    oldPrice: null,
    onSale: false,
    featured: false,
    rating: 4.8,
    sold: 64,
    image: "assets/images/products/modern-bronze-hanging-light.jpg",
    description:
      "A stunning fixture that combines contemporary style with timeless elegance — crafted from high-quality bronze and finished with a smooth, lustrous surface.",
    features: [
      "Solid bronze construction",
      "Hand-polished lustrous finish",
      "Adjustable cable drop",
      "Dimmable, E27 socket (bulb included)"
    ]
  },
  {
    id: "sleekline-modulus-sofa",
    name: "Sleekline Modulus Sofa",
    category: "Sofa",
    price: 2352.41,
    oldPrice: 3360.59,
    onSale: true,
    featured: false,
    rating: 4.7,
    sold: 119,
    image: "assets/images/products/sleekline-modulus-sofa.jpg",
    description:
      "A stylish addition to a living room, or a functional piece for an outdoor patio — built with high-quality fabrics, metal frames and innovative composites.",
    features: [
      "Powder-coated metal frame",
      "Weather-resistant composite panels",
      "High-quality woven fabric cushions",
      "Available in Long, Medium and Short"
    ],
    variants: {
      type: ["Long", "Medium", "Short"]
    }
  }
];

const CATEGORIES = ["All", "On Sale", "Sofa", "Chair", "Table", "Lighting", "Decor"];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
