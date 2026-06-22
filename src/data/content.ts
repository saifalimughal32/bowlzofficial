import { colorSwatch, type ProductColor } from "@/lib/productColors";

export const siteConfig = {
  name: "Bowlz",
  tagline: "Magnetic Bowl Piece",
  productHandle: "bowlz-v2",
  description:
    "Premium magnetic bowl pieces and glass — shatterproof, easy to clean, and built for everyday sessions. Fits 14mm bongs.",
  url: "https://bowlzofficial.com",
  email: "hello@bowlzofficial.com",
  freeShippingThreshold: 75,
  promo: "20% off magnetic glass + a free OG bowl. While supplies last.",
  reviewsBackground:
    "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7917.jpg?v=1774974454",
  instagram: "https://www.instagram.com/bowlzofficial/",
  facebook: "https://www.facebook.com/bowlzofficial",
  starRating: 4.9,
  reviewCount: "1,000+",
  customerCount: "50,000+",
  customerCountValue: 50000,
};

export type NavLink = {
  href: string;
  label: string;
};

export type NavItem =
  | (NavLink & { children?: never })
  | (NavLink & { children: NavLink[] });

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/shop",
    label: "Shop",
    children: [
      { href: "/shop", label: "All Products" },
      { href: "/shop/bowlz", label: "Bowlz" },
      { href: "/shop/bongz", label: "Bongz" },
      { href: "/shop/cleaning", label: "Cleaning Gear" },
    ],
  },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

/** @deprecated use mainNav */
export const navLinks: NavLink[] = [
  { href: "/shop", label: "All Products" },
  { href: "/shop/bowlz", label: "Bowlz" },
  { href: "/shop/bongz", label: "Bongz" },
  { href: "/shop/cleaning", label: "Cleaning Gear" },
];

export const collections = [
  {
    label: "Shop Bowlz",
    title: "Bowlz",
    subtitle: "Magnetic bowl pieces",
    href: "/shop/bowlz",
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8096.png?v=1774974454",
  },
  {
    label: "Shop Bongz",
    title: "Bongz",
    subtitle: "Magnetic glass",
    href: "/shop/bongz",
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1_fd5146ab-67d2-4f07-8183-be825247d297.png?v=1775494606",
  },
  {
    label: "Shop Cleaning Gear",
    title: "Cleaning Gear",
    subtitle: "Swabz & accessories",
    href: "/shop/cleaning",
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/Untitled_design_10.png?v=1780777450",
  },
];

export type StoreProduct = {
  handle: string;
  title: string;
  priceMin: number;
  priceMax: number;
  image: string;
  compareAt?: number;
  badge?: string;
  soldOut?: boolean;
  colors?: ProductColor[];
};

export const bowlzProducts: StoreProduct[] = [
  {
    handle: "platinum",
    title: "Stripe 14mm",
    priceMin: 50,
    priceMax: 50,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/Untitled_design_11.png?v=1774974454",
    colors: [
      colorSwatch(
        "Carbon",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4890-Edit.jpg?v=1774975266"
      ),
      colorSwatch(
        "Electric",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4880-Edit.jpg?v=1774975266"
      ),
      colorSwatch(
        "Emerald",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4881-Edit.jpg?v=1774975266"
      ),
    ],
  },
  {
    handle: "v3-18mm",
    title: "V3 14mm",
    priceMin: 39,
    priceMax: 39,
    compareAt: 49,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8003.jpg?v=1780777330",
    colors: [
      colorSwatch(
        "Slime green",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7776.jpg?v=1774985607"
      ),
      colorSwatch(
        "Pink Panther",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7815.jpg?v=1774982669"
      ),
      colorSwatch(
        "Fire OG",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7878.jpg?v=1774982669"
      ),
      colorSwatch(
        "Blueberry",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7809.jpg?v=1774982669"
      ),
      colorSwatch(
        "Carbon",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4888-Edit_e685949c-ae01-474a-afe4-9e86d98206a7.jpg?v=1774982669"
      ),
    ],
  },
  {
    handle: "bowlz-v2",
    title: "The OG 14mm",
    priceMin: 35,
    priceMax: 35,
    compareAt: 50,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8096.png?v=1774974454",
    colors: [
      colorSwatch(
        "Black Mamba",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7905.png?v=1774974454"
      ),
    ],
  },
  {
    handle: "xl-pre-order",
    title: "XL 14mm PRE-ORDER",
    priceMin: 59,
    priceMax: 59,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/Untitled_design_8.png?v=1774974454",
    colors: [
      colorSwatch(
        "Carbon",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A9197-1.jpg?v=1775502542"
      ),
      colorSwatch(
        "Grape",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/12.jpg?v=1775511811"
      ),
      colorSwatch(
        "Emerald",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A9197-2.jpg?v=1775511811"
      ),
    ],
  },
  {
    handle: "faceted",
    title: "Faceted 14mm",
    priceMin: 55,
    priceMax: 55,
    soldOut: true,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A5132_7e837930-8002-4491-b6fd-d9aebe10fa21.jpg?v=1770650047",
    colors: [
      colorSwatch(
        "Tundra",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4904-Edit.jpg?v=1770679478"
      ),
      colorSwatch(
        "Bubble Gum",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4915-Edit.jpg?v=1770679478"
      ),
      colorSwatch(
        "Carbon",
        "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A4923-Edit.jpg?v=1770649482"
      ),
    ],
  },
  {
    handle: "swabz",
    title: "Swabz",
    priceMin: 9.99,
    priceMax: 9.99,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/Untitled_design_10.png?v=1780777450",
  },
];

/** @deprecated use bowlzProducts */
export const bestsellingBowlz = bowlzProducts;

export const bongzProducts: StoreProduct[] = [
  {
    handle: "tubez",
    title: "Tubez",
    priceMin: 180,
    priceMax: 180,
    compareAt: 225,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1_fd5146ab-67d2-4f07-8183-be825247d297.png?v=1775494606",
  },
  {
    handle: "beakerz",
    title: "Beakerz",
    priceMin: 140,
    priceMax: 140,
    compareAt: 175,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1_8b18ff22-e2e0-4ab1-9ec0-2b612c647ff0.png?v=1775495004",
  },
  {
    handle: "percs",
    title: "Percz",
    priceMin: 40,
    priceMax: 40,
    compareAt: 50,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8753.png?v=1775495154",
  },
  {
    handle: "base",
    title: "Tubez Replacement Base",
    priceMin: 75,
    priceMax: 75,
    compareAt: 95,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8742.png?v=1775495325",
  },
  {
    handle: "tubez-replacement-neck",
    title: "Replacement neck",
    priceMin: 65,
    priceMax: 65,
    compareAt: 76,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8719.png?v=1775495283",
  },
  {
    handle: "replacement-glass-downstem",
    title: "Replacement Glass Downstem",
    priceMin: 6.99,
    priceMax: 6.99,
    soldOut: true,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8768.png?v=1775495191",
  },
];

export const cleaningProducts: StoreProduct[] = [
  {
    handle: "swabz",
    title: "Swabz",
    priceMin: 9.99,
    priceMax: 9.99,
    image:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/Untitled_design_10.png?v=1780777450",
  },
];

export const replacementParts: StoreProduct[] = bongzProducts.slice(3);

export const shopHero = {
  image:
    "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7917.jpg?v=1774974454",
  alt: "Bowlz magnetic bowl pieces and Bongz glass",
};

export const trustSignals = [
  {
    label: "Customers",
    description: "Trusted nationwide",
    animateCount: true,
  },
  {
    label: "Shatterproof Design",
    description: "Built for real sessions",
  },
  {
    label: "14mm Universal Fit",
    description: "Works with standard bongs",
  },
  {
    label: "One-Wipe Clean",
    description: "Post-session in seconds",
  },
];

/** Stashlogix-style banner copy shown at the top of collection pages. */
export const collectionTrustBanner = {
  primary: "20% OFF MAGNETIC GLASS + A FREE OG BOWL. WHILE SUPPLIES LAST.",
  secondary:
    "FREE SHIPPING ON ORDERS $75+ · 30-DAY WARRANTY · SECURE CHECKOUT",
};

export const promoHighlights = [
  {
    title: "Magnetic Lock",
    body: "High heat-resistant magnets create an airtight seal without affecting airflow.",
  },
  {
    title: "Easy to Clean",
    body: "Wipe your bowl clean after every session — no soaking or scrubbing required.",
  },
  {
    title: "Wholesale Ready",
    body: "Display-ready packaging and fast fulfillment for smoke shops nationwide.",
  },
];

export type ProductSection = {
  id: string;
  title: string;
  products: StoreProduct[];
  shopAllHref: string;
  shopAllLabel: string;
  columns?: 2 | 3 | 4;
  layout?: "grid" | "carousel";
};

export const productSections: ProductSection[] = [
  {
    id: "bowlz",
    title: "Bowlz",
    products: bowlzProducts,
    shopAllHref: "/shop/bowlz",
    shopAllLabel: "Shop All Bowlz",
    columns: 2,
  },
  {
    id: "bongz",
    title: "Bongz",
    products: bongzProducts,
    shopAllHref: "/shop/bongz",
    shopAllLabel: "Shop All Bongz",
    columns: 2,
    layout: "carousel",
  },
  {
    id: "cleaning",
    title: "Cleaning Gear",
    products: cleaningProducts,
    shopAllHref: "/shop/cleaning",
    shopAllLabel: "Shop Cleaning Gear",
    columns: 2,
  },
];

export const editorial = {
  image:
    "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7917.jpg?v=1774974454",
  headline: "Built for Sessions,\nInspired by Better Design",
  body: "Two friends set out in 2021 to make a better bowl — shatterproof, magnetic, and effortless to clean. The OG design still has a cult following for a reason.",
};

export const homeReviews = [
  {
    name: "Marcus T.",
    text: "The magnetic connection is solid and the bowl cleans with one wipe. No more broken glass on the floor — this thing is built different.",
    location: "Los Angeles, United States",
  },
  {
    name: "Jordan K.",
    text: "Fits my 14mm perfectly. Holds a half gram easy and the cool-touch material doesn't heat up like traditional glass.",
    location: "Denver, United States",
  },
  {
    name: "Alex R.",
    text: "Bought the OG and a V3. Both are airtight and don't mess with airflow. Shipping was fast and packaging felt premium.",
    location: "Portland, United States",
  },
  {
    name: "Chris M.",
    text: "Finally something clumsy-stoner friendly. Dropped it twice already and not a scratch. The Swabz pair perfectly for cleaning.",
    location: "Austin, United States",
  },
];

export const bundles = [
  {
    qty: 1,
    label: "1 Bowl — Try the OG",
    price: 35,
    compareAt: 50,
    save: 15,
    badge: null as string | null,
    subtitle: null as string | null,
    default: false,
  },
  {
    qty: 2,
    label: "2 Bowls — Backup ready",
    price: 65,
    compareAt: 78,
    save: 13,
    badge: "Most Popular",
    subtitle: "Save $13 · Mix OG + V3",
    default: true,
  },
  {
    qty: 3,
    label: "3 Bowls — Full rotation",
    price: 95,
    compareAt: 117,
    save: 22,
    badge: "Best Value",
    subtitle: "Save $22 · Free Swabz",
    default: false,
  },
];

export const bundleProductHandles = [
  "bowlz-v2",
] as const;

export function isBundleProduct(handle: string) {
  return (bundleProductHandles as readonly string[]).includes(handle);
}

export const buyBoxBullets = [
  "Fits 14mm bongs",
  "Higher volume (holds a half gram)",
  "Cleans with one wipe post-sesh",
  "100% shatterproof (aka clumsy st*ner friendly)",
  "Made from food-grade, cool-touch materials",
  "Airtight (doesn't affect airflow)",
  "High heat-resistant magnets",
];

export const productPolicies = [
  {
    title: "Shipping Info",
    body: `We ship to the USA, Canada, Australia, Mexico, New Zealand, the EU, and the UK.

In-stock orders ship in 1–2 business days.

Delivery estimates: Ground (3–5 business days), Priority (1–3 business days).

Disclaimer: Bowlz Official isn't responsible for lost or stolen packages. Add Route Shipping Insurance at checkout for coverage.`,
  },
  {
    title: "Warranty & Exchanges",
    body: `If your item is defective or incorrect, email us within 30 days for a free replacement.

Exchanges must be unused and in original packaging (no exchanges after use or cleaning). Exchange value is based on the original purchase price.

We cover return shipping for defective or incorrect items; otherwise, the return label cost is the customer's responsibility.

To request an exchange, email us your order number, the item requested, and photos if damaged. All exchanges are subject to availability.`,
  },
  {
    title: "Returns",
    body: `Returns follow the same eligibility and condition requirements as Warranty & Exchanges (unused, original packaging, 30-day window).

Approved refunds are issued to the original payment method within 2–5 business days after the return is received and approved. Original shipping charges are non-refundable.

International fees (shipping, duties, taxes, customs, and return shipping) are non-refundable.

Purchases made through third-party retailers or smoke shops are not eligible for return—please contact the original seller.`,
  },
  {
    title: "Privacy Policy",
    body: `Bowlz Official ("we", "us") respects your privacy. This policy describes how we collect, use, and protect personal information when you visit bowlzofficial.com or make a purchase.

We collect information you provide (name, email, shipping address, payment details processed by Shopify) and technical data (cookies, device info, analytics) to fulfill orders, improve our site, and communicate with you.

We do not sell your personal information. We share data only with service providers needed to operate our store (e.g., Shopify, shipping carriers, email platforms) and when required by law.

You may request access, correction, or deletion of your data by emailing hello@bowlzofficial.com.

By using this site you agree to this policy. We may update it periodically; continued use constitutes acceptance.`,
  },
];

export const bowlSizingGuide = {
  title: "Bowl Sizing Guide",
  intro:
    "You can use a penny to determine the size bowl you need for your bong. Place the penny into the downstem and depending on how deep it sinks in, you will know what size bowl you need.",
  sizes: [
    {
      label: "14mm",
      detail:
        "If the penny goes about 1/4 of the way in, that means you need a 14mm bowl. This is the most common size.",
      highlight: true,
    },
    {
      label: "18mm",
      detail: "If the penny goes in halfway, then you will need an 18mm bowl.",
    },
    {
      label: "10mm",
      detail:
        "If the penny barely goes in, then you need a 10mm bowl. We do not offer a 10mm size at this time.",
    },
  ],
};

export const productHowItWorks = [
  {
    title: "Snap",
    text: "High heat-resistant magnets lock your bowl in place with an airtight seal that doesn't affect airflow.",
  },
  {
    title: "Session",
    text: "Food-grade, cool-touch materials hold a half gram comfortably and stay shatterproof through real-life use.",
  },
  {
    title: "Wipe",
    text: "One wipe post-sesh keeps it like brand new — no soaking, scrubbing, or broken glass on the floor.",
  },
];

export const bongzBuyBoxBullets = [
  "Magnetic glass construction",
  "Built for everyday sessions",
  "Pairs with Bowlz magnetic bowls",
  "Premium, display-ready quality",
];

export const cartUpsell = {
  handle: "swabz",
  label: "Add Swabz cleaning kit",
  price: 9.99,
  description: "Keep your bowl spotless — pairs perfectly with every Bowlz piece.",
};

export const faqs = [
  {
    q: "What size bong does Bowlz fit?",
    a: "All Bowlz magnetic bowl pieces are designed for standard 14mm bong joints. Check individual product pages for size details on XL and specialty models.",
  },
  {
    q: "Is Bowlz really shatterproof?",
    a: "Yes — Bowlz is made from food-grade, cool-touch materials that won't shatter like traditional glass. It's built for real-life sessions.",
  },
  {
    q: "How do I clean my Bowlz?",
    a: "Most Bowlz pieces clean with a single wipe post-session. Pair with Swabz for a deeper clean on your bong and downstem.",
  },
  {
    q: "Do the magnets affect airflow?",
    a: "No — Bowlz uses an airtight magnetic seal designed to maintain full airflow through your piece without leaks or drag.",
  },
  {
    q: "What's the current promotion?",
    a: "20% off magnetic glass plus a free OG bowl while supplies last. Discount applied automatically at checkout on eligible items.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes — we work with smoke shops and dispensaries nationwide. Visit our wholesale page or contact us to create a wholesale account.",
  },
];

export const reviews = homeReviews.map((r) => ({
  text: r.text,
  author: r.name,
  location: r.location,
  date: "Recently",
  imageSrc: "",
}));

export const ratingDistribution = [
  { stars: 5, percent: 92 },
  { stars: 4, percent: 6 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 0 },
  { stars: 1, percent: 0 },
];

export const ugcClips = [
  { id: "ugc-1", label: "Magnetic snap", caption: "Satisfying every time", videoSrc: "" },
  { id: "ugc-2", label: "One-wipe clean", caption: "Post-sesh routine", videoSrc: "" },
  { id: "ugc-3", label: "OG unboxing", caption: "The original design", videoSrc: "" },
];

export const comparisonRows = [
  { feature: "Shatterproof", bowlz: true, glass: false, silicone: false },
  { feature: "Magnetic attachment", bowlz: true, glass: false, silicone: false },
  { feature: "One-wipe cleaning", bowlz: true, glass: false, silicone: false },
  { feature: "Cool-touch material", bowlz: true, glass: false, silicone: false },
  { feature: "Fits 14mm bongs", bowlz: true, glass: true, silicone: false },
];

export const benefits = [
  {
    title: "Magnetic snap-on",
    description: "High heat-resistant magnets lock in tight — airtight seal without affecting airflow.",
    imageLabel: "Magnetic connection",
    imageHint: "Bowlz attached to bong",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A8208.png?v=1774974454",
  },
  {
    title: "One-wipe clean",
    description: "No soaking, no scrubbing. Wipe and you're done — built for everyday sessions.",
    imageLabel: "Easy cleaning",
    imageHint: "Clean bowl close-up",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0738/8253/4171/files/1A9A7917.jpg?v=1774974454",
  },
];

export const homeFeatures = [
  { title: "Shatterproof Build", description: "Food-grade materials — clumsy-session friendly." },
  { title: "Magnetic Lock", description: "Airtight seal with high heat-resistant magnets." },
  { title: "One-Wipe Clean", description: "Post-session cleanup in seconds, not minutes." },
  { title: "14mm Universal Fit", description: "Works with standard 14mm bong joints." },
];

export const productSpecs = [
  { label: "Joint size", value: "14mm standard" },
  { label: "Capacity", value: "Holds ~0.5g" },
  { label: "Material", value: "Food-grade, cool-touch" },
  { label: "Magnets", value: "High heat-resistant" },
  { label: "Cleaning", value: "One wipe post-session" },
  { label: "Durability", value: "100% shatterproof" },
];

export const footerLinks = {
  shop: [
    { href: "/shop/bowlz", label: "Bowlz" },
    { href: "/shop/bongz", label: "Bongz" },
    { href: "/shop/cleaning", label: "Cleaning Gear" },
    { href: "/shop", label: "Shop All" },
    { href: "/", label: "Home" },
  ],
  learn: [
    { href: "/#reviews", label: "Reviews" },
    { href: "/wholesale", label: "Wholesale" },
    { href: "/products/bowlz-v2", label: "The OG 14mm" },
    { href: "https://bowlzofficial.com/blogs/news", label: "Blog" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/wholesale", label: "Wholesale" },
    { href: "/policies/shipping-policy", label: "Shipping Policy" },
    { href: "/policies/refund-policy", label: "Refund Policy" },
    { href: "/policies/privacy-policy", label: "Privacy Policy" },
  ],
  /** @deprecated use footerLinks.shop */
  main: [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop All" },
    { href: "/shop#bowlz", label: "Bowlz" },
    { href: "/shop#bongz", label: "Bongz" },
  ],
  order: [
    { href: "/policies/shipping-policy", label: "Shipping Policy" },
    { href: "/policies/refund-policy", label: "Return Policy" },
    { href: "https://bowlzofficial.com/account", label: "Account" },
  ],
  contact: [
    { href: "/wholesale", label: "Wholesale" },
    { href: "/contact", label: "Contact Us" },
  ],
  legal: [
    { href: "/policies/privacy-policy", label: "Privacy Policy" },
    { href: "https://bowlzofficial.com/policies/terms-of-service", label: "Terms of Use" },
    { href: "/policies/refund-policy", label: "Return Policy" },
  ],
};

export const footerSocial = [
  { href: siteConfig.facebook, label: "Facebook" },
  { href: siteConfig.instagram, label: "Instagram" },
];

export const brand = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  promoText: siteConfig.promo,
  editorialImage: editorial.image,
};

export const bestSellingProducts = bowlzProducts.slice(0, 4);
