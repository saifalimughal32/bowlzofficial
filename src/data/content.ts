export const siteConfig = {
  name: "Nova Triggers",
  description:
    "Soothing, cordless period heat + massage pad. Wear it under your clothes. Ships from the USA. 30-Night Comfort Guarantee.",
  url: "https://novatriggers.com",
  email: "hello@novatriggers.com",
  freeShippingThreshold: 49,
  starRating: 4.8,
  reviewCount: "3,000+",
  customerCount: "20,000+",
};

export const bundles = [
  {
    qty: 1,
    label: "1 Pad — Try it",
    price: 49,
    compareAt: 79,
    save: null as number | null,
    badge: null as string | null,
    subtitle: null as string | null,
    default: false,
  },
  {
    qty: 2,
    label: "2 Pads — One for home, one for your bag",
    price: 79,
    compareAt: 98,
    save: 19,
    badge: "Most Popular",
    subtitle: "Save $19 · Free travel pouch",
    default: true,
  },
  {
    qty: 3,
    label: "3 Pads — Share with the women you love",
    price: 99,
    compareAt: 147,
    save: 48,
    badge: "Best Value",
    subtitle: "Save $48 · Free travel pouch",
    default: false,
  },
];

export const ratingDistribution = [
  { stars: 5, percent: 89 },
  { stars: 4, percent: 8 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

export const ugcClips = [
  {
    id: "ugc-1",
    label: "Day 1 at the office",
    caption: "Wore it under my sweater all day",
    videoSrc: "", // Add: /videos/ugc-office.mp4
  },
  {
    id: "ugc-2",
    label: "Morning routine",
    caption: "My go-to comfort ritual",
    videoSrc: "",
  },
  {
    id: "ugc-3",
    label: "Unboxing",
    caption: "Finally something that works",
    videoSrc: "",
  },
];

export const cartUpsell = {
  label: "Add a 2nd pad for your bag",
  price: 30,
  description: "One for home, one on the go — most women grab both.",
};

export const reviews = [
  {
    text: "I wore it under my sweater at the office and got through my whole day. First period in years I didn't go home early.",
    author: "Mia T.",
    location: "Denver CO",
    date: "2 weeks ago",
    imageSrc: "", // Add: /images/reviews/mia.jpg
  },
  {
    text: "Bought one, immediately ordered a second for my daughter. This is the gift every woman secretly wants.",
    author: "Karen L.",
    location: "Tampa FL",
    date: "1 month ago",
    imageSrc: "",
  },
  {
    text: "I was sure it was overhyped. Day 1 changed my mind — the heat actually stays warm. Skeptic turned believer.",
    author: "Destiny W.",
    location: "Columbus OH",
    date: "3 weeks ago",
    imageSrc: "",
  },
  {
    text: "So discreet under my work clothes. I finally feel like myself on day one and two instead of just surviving.",
    author: "Jessica M.",
    location: "Austin TX",
    date: "1 week ago",
    imageSrc: "",
  },
  {
    text: "The massage setting is my favorite. It's like a warm hug when cramps hit. Already recommended to three friends.",
    author: "Alicia R.",
    location: "Seattle WA",
    date: "2 months ago",
    imageSrc: "",
  },
  {
    text: "Got the 2-pack — one stays in my nightstand, one in my work bag. Best purchase I've made for myself in years.",
    author: "Taylor B.",
    location: "Nashville TN",
    date: "3 weeks ago",
    imageSrc: "",
  },
];

export const faqs = [
  {
    q: "Is it actually cordless?",
    a: "Yes — Nova Triggers is fully rechargeable. Wear it anywhere with no plug or wires. Charge it like your phone and take soothing comfort wherever you go.",
  },
  {
    q: "Can I wear it under clothes?",
    a: "Absolutely. It's slim and discreet under a hoodie, dress, or jeans. Most women wear it all day without anyone noticing.",
  },
  {
    q: "How long does the heat last?",
    a: "Several hours per charge depending on your heat level setting. Low heat lasts longest; higher settings provide more intense soothing warmth for shorter sessions.",
  },
  {
    q: "Is it safe to use?",
    a: "Nova Triggers is designed for comfortable, soothing warmth with auto heat regulation. It is a personal comfort product, not a medical device. Consult your healthcare provider for medical concerns.",
  },
  {
    q: "How long does shipping take?",
    a: "We ship from the USA. Most orders arrive within 3–7 business days. You'll receive tracking as soon as your order ships.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "You're covered by our 30-Night Comfort Guarantee. Try it through a full cycle — if it doesn't bring you real comfort, send it back for a full refund. No awkward questions.",
  },
  {
    q: "Can I use it for back or stomach?",
    a: "Yes — Nova Triggers wraps around your waist and works great for lower-belly and lower-back comfort. Position it wherever soothing warmth feels best.",
  },
  {
    q: "Is it a good gift?",
    a: "It's one of our most-gifted items. Choose the 2 or 3-pack for sisters, daughters, and best friends. Every woman deserves this kind of comfort.",
  },
];

export const benefits = [
  {
    title: "Cordless freedom",
    description:
      "Relief that follows you everywhere — desk, car, errands, bed. No plug. No wires. No staying put.",
    imageLabel: "Lifestyle photo",
    imageHint: "Woman wearing pad at desk / on couch",
    imageSrc: "", // Add: /images/benefits/cordless.jpg
  },
  {
    title: "3 heat levels",
    description:
      "Dial in exactly the warmth that feels good today. Some days you need gentle. Some days you need more.",
    imageLabel: "Controls close-up",
    imageHint: "Heat level buttons / LED indicator",
    imageSrc: "",
  },
  {
    title: "Heat + gentle massage",
    description:
      "Soothing warmth and gentle vibration work together to ease tension — a cozy ritual you actually look forward to.",
    imageLabel: "Product detail",
    imageHint: "Pad texture / massage mode",
    imageSrc: "",
  },
  {
    title: "Discreet & slim",
    description:
      "Wear it under a hoodie, dress, or jeans. Nobody has to know you're getting soothing comfort all day.",
    imageLabel: "Under clothing",
    imageHint: "Discreet wear under hoodie or dress",
    imageSrc: "",
  },
];

export const comparisonRows = [
  { feature: "Cordless", nova: true, pills: false, bottle: false },
  { feature: "Lasts hours", nova: true, pills: false, bottle: false },
  { feature: "Drug-free comfort", nova: true, pills: false, bottle: true },
  { feature: "Wear anywhere", nova: true, pills: true, bottle: false },
  { feature: "Heat + massage", nova: true, pills: false, bottle: false },
  { feature: "Discreet under clothes", nova: true, pills: true, bottle: false },
];

export const buyBoxBullets = [
  "Cordless & rechargeable",
  "Heat + gentle massage",
  "Discreet under clothes",
  "Drug-free, soothing comfort",
];
