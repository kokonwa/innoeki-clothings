import teeShorts from "@/assets/tee-shorts.jpg";
import crossStrapSlides from "@/assets/cross-strap-slides.jpg";
import colourblockTracksuit from "@/assets/colourblock-tracksuit.jpg";
import drawstringTrousers from "@/assets/relaxed-drawstring-trousers.jpg";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  currency?: "NGN";
  imageFit?: "contain";
  description: string;
  fabricDetails: string[];
  sizes: string[];
  colors: ColorOption[];
  image: string;
  badge?: string;
  inStock: boolean;
  fitGuide: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface StylingService {
  id: string;
  name: string;
  duration: string;
  price: number;
  tagline: string;
  deliverables: string[];
}

export interface Booking {
  ref: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  silhouette: string;
  occasion: string;
  colorPref: string;
  budget: string;
  notes: string;
  status: "Confirmed";
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const BRAND = {
  name: "Innoeki Clothings Brand",
  shortName: "Innoeki Clothings",
  monogram: "ICI",
  tagline: "Curated Garments. Bespoke Personal Styling.",
  email: "contact@innoekiclothings.com",
  phone: "+1 (415) 555-0182",
  address: "24 Foundry Lane, Studio 3, San Francisco, CA",
  hours: "Tue to Sat, 10am to 6pm",
  instagram: "https://instagram.com",
  pinterest: "https://pinterest.com",
  lookbook: "#collection",
};

// ---------------------------------------------------------------------------
// Imagery
// ---------------------------------------------------------------------------
const IMG = {
  overcoat:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-overcoat-4eb43545-1794805508314.webp",
  trench:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-trench-8f94f43e-1794805508410.webp",
  trousers:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-trousers-6526e2cd-1794805508367.webp",
  blazer:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-blazer-aaba8d67-1794805508159.webp",
  blouse:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-blouse-35612c8e-1794805508951.webp",
  linen:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-linen-7debe027-1794805512096.webp",
  knit:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-knit-8f98a3e6-1794805512343.webp",
  slipdress:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-slipdress-c65fb0e8-1794805512590.webp",
  gown:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-gown-e02e98f0-1794805514102.webp",
  tote:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-tote-74650791-1794805512279.webp",
  scarf:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/p-scarf-dbc7ef27-1794805515572.webp",
  hero: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/296f4a79-d4fb-4380-a897-74762429b0df/hero-lookbook-b1810d58-1794805508673.webp",
};

export const HERO_IMAGE = IMG.hero;

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  "All",
  "Trousers",
  "Tracksuits",
  "Matching Sets",
  "Footwear",
  "Outerwear",
  "Tailoring",
  "Essentials",
  "Eveningwear",
  "Accessories",
];

const C = {
  camel: { name: "Camel", hex: "#b08d57" },
  charcoal: { name: "Charcoal", hex: "#36454f" },
  ivory: { name: "Ivory", hex: "#f3efe6" },
  indigo: { name: "Indigo", hex: "#1e3a8a" },
  sand: { name: "Sand", hex: "#d9c7ae" },
  oat: { name: "Oatmeal", hex: "#d8cbb4" },
  sage: { name: "Sage", hex: "#8a9a83" },
  cobalt: { name: "Cobalt", hex: "#2563eb" },
  tan: { name: "Tan", hex: "#c19a6b" },
  black: { name: "Ink", hex: "#1c1917" },
};

export const PRODUCTS: Product[] = [
  {
    id: "relaxed-drawstring-trousers",
    name: "Relaxed Drawstring Trousers",
    category: "Trousers",
    price: 22000,
    currency: "NGN",
    description: "Relaxed-leg trousers with a drawstring waist and front pockets, shown in cream, grey, and black.",
    fabricDetails: ["Drawstring waistband", "Front pockets", "Relaxed leg"],
    sizes: [],
    colors: [
      { name: "Cream", hex: "#f3efe6" },
      { name: "Grey", hex: "#a8a9ae" },
      { name: "Black", hex: "#17181c" },
    ],
    image: drawstringTrousers,
    imageFit: "contain",
    inStock: true,
    fitGuide: "Ask us about available sizes before ordering.",
  },
  {
    id: "colourblock-tracksuit",
    name: "Colourblock Tracksuit Set",
    category: "Tracksuits",
    price: 70000,
    currency: "NGN",
    description: "A matching zip-up jacket and trousers with bold contrast panels, shown in yellow and blue and in white and blue.",
    fabricDetails: ["Two-piece set", "Zip-up jacket", "Contrast colour panels"],
    sizes: [],
    colors: [
      { name: "Yellow and Blue", hex: "#f7cb14" },
      { name: "White and Blue", hex: "#e4edf5" },
    ],
    image: colourblockTracksuit,
    imageFit: "contain",
    inStock: true,
    fitGuide: "Ask us about available sizes before ordering.",
  },
  {
    id: "oversized-tee-shorts-set",
    name: "Oversized T-Shirt & Shorts Set",
    category: "Matching Sets",
    price: 25000,
    currency: "NGN",
    description: "A matching oversized T-shirt and drawstring shorts set, shown in red and pale yellow.",
    fabricDetails: ["Crew-neck T-shirt", "Drawstring shorts", "Two-piece set"],
    sizes: [],
    colors: [
      { name: "Red", hex: "#a5222d" },
      { name: "Pale Yellow", hex: "#f3e589" },
    ],
    image: teeShorts,
    imageFit: "contain",
    inStock: true,
    fitGuide: "Ask us about available sizes before ordering.",
  },
  {
    id: "blazer",
    name: "Sculpted Double-Breasted Blazer",
    category: "Tailoring",
    price: 460,
    description:
      "A tailored double-breasted blazer with a nipped waist and padded shoulder in deep indigo.",
    fabricDetails: [
      "Stretch wool crepe",
      "Full cupro lining",
      "Six-button front",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [C.indigo, C.charcoal, C.ivory],
    image: IMG.blazer,
    badge: "New",
    inStock: true,
    fitGuide: "Tailored fit. Size up for an oversized silhouette.",
  },
  {
    id: "blouse",
    name: "Relaxed Silk Blouse",
    category: "Essentials",
    price: 220,
    description:
      "A fluid silk blouse with a soft stand collar and covered placket that drapes without clinging.",
    fabricDetails: [
      "100% sandwashed silk",
      "Covered button placket",
      "French seams",
      "Hand wash cold",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [C.ivory, C.sage, C.black],
    image: IMG.blouse,
    inStock: true,
    fitGuide: "Relaxed drape. True to size for a soft, easy fit.",
  },
  {
    id: "linen",
    name: "Linen Studio Set",
    category: "Essentials",
    price: 340,
    description:
      "A matching shirt-and-trouser set in washed European linen, designed for warm studio days.",
    fabricDetails: [
      "Washed European linen",
      "Two-piece set",
      "Elastic back waist",
      "Machine wash cold",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [C.sand, C.ivory],
    image: IMG.linen,
    badge: "Set",
    inStock: true,
    fitGuide: "Easy fit through both pieces. Sits at the natural waist.",
  },
  {
    id: "knit",
    name: "Cashmere Crewneck",
    category: "Essentials",
    price: 310,
    salePrice: 248,
    description:
      "A featherweight grade-A cashmere crewneck with ribbed trims and a clean, unfussy neckline.",
    fabricDetails: [
      "Grade-A Mongolian cashmere",
      "12-gauge knit",
      "Ribbed neck, cuff, hem",
      "Dry clean or hand wash",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [C.oat, C.sage, C.charcoal],
    image: IMG.knit,
    badge: "Sale",
    inStock: true,
    fitGuide: "Regular fit. Oversized on request, size up one.",
  },
  {
    id: "slipdress",
    name: "Silk Column Slip Dress",
    category: "Eveningwear",
    price: 395,
    description:
      "A bias-cut silk column dress with delicate adjustable straps and a liquid, floor-skimming fall.",
    fabricDetails: [
      "100% mulberry silk charmeuse",
      "Bias cut",
      "Adjustable straps",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [C.sage, C.ivory, C.black],
    image: IMG.slipdress,
    badge: "Evening",
    inStock: true,
    fitGuide: "Bias cut hugs the body. Take your usual size.",
  },
  {
    id: "gown",
    name: "Draped Evening Gown",
    category: "Eveningwear",
    price: 780,
    description:
      "A sculptural gown with a gathered side-drape and column skirt in deep cobalt crepe.",
    fabricDetails: [
      "Heavy silk crepe",
      "Gathered side drape",
      "Concealed back zip",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [C.cobalt, C.black],
    image: IMG.gown,
    badge: "Couture",
    inStock: false,
    fitGuide: "Made to order. Book a fitting for precise measurement.",
  },
  {
    id: "cross-strap-slide-sandals",
    name: "Cross-Strap Slide Sandals",
    category: "Footwear",
    price: 40000,
    currency: "NGN",
    description: "Open-toe slides with wide crossover straps and black soles, shown in tan and olive.",
    fabricDetails: ["Crossed straps", "Open toe", "Textured outsole"],
    sizes: [],
    colors: [
      { name: "Tan", hex: "#bd8848" },
      { name: "Olive", hex: "#656e42" },
    ],
    image: crossStrapSlides,
    imageFit: "contain",
    inStock: true,
    fitGuide: "Ask us about available shoe sizes before ordering.",
  },
  {
    id: "scarf",
    name: "Silk Twill Scarf",
    category: "Accessories",
    price: 140,
    description:
      "A hand-rolled silk twill scarf printed with an abstract indigo and sand marbled motif.",
    fabricDetails: [
      "100% silk twill",
      "Hand-rolled edges",
      "90 x 90 cm",
      "Dry clean only",
    ],
    sizes: ["One Size"],
    colors: [C.indigo, C.sand],
    image: IMG.scarf,
    inStock: true,
    fitGuide: "Generous 90cm square, styled multiple ways.",
  },
];

// ---------------------------------------------------------------------------
// Styling services
// ---------------------------------------------------------------------------
export const STYLING_SERVICES: StylingService[] = [
  {
    id: "virtual-audit",
    name: "Virtual Wardrobe Audit",
    duration: "60 min",
    price: 180,
    tagline: "A focused edit of what you own, mapped to what you actually wear.",
    deliverables: [
      "Live video session",
      "Personalized keep / tailor / release list",
      "Digital lookbook of five new outfits",
      "Follow-up email recap",
    ],
  },
  {
    id: "studio-fitting",
    name: "In-Studio Bespoke Fitting",
    duration: "90 min",
    price: 320,
    tagline: "Hands-on tailoring and curation in our Foundry Lane atelier.",
    deliverables: [
      "Private studio appointment",
      "Body mapping and fit notes",
      "Curated try-on from current collection",
      "Complimentary hem on one purchase",
    ],
  },
  {
    id: "vip-event",
    name: "VIP Event Curation",
    duration: "Half day",
    price: 650,
    tagline: "End-to-end styling for a wedding, gala, or press moment.",
    deliverables: [
      "Dedicated senior stylist",
      "Full look development with accessories",
      "Priority made-to-order scheduling",
      "Day-of touch-up kit",
    ],
  },
];

export const MORNING_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM"];
export const AFTERNOON_SLOTS = ["2:00 PM", "3:30 PM", "5:00 PM"];

export const SILHOUETTES = ["Tailored", "Relaxed", "Structured", "Fluid"];
export const OCCASIONS = [
  "Everyday",
  "Workwear",
  "Evening",
  "Special Event",
];
export const COLOR_PREFS = ["Neutrals", "Jewel Tones", "Monochrome", "Warm Earth"];
export const BUDGETS = ["Under $500", "$500 to $1,500", "$1,500 to $3,000", "$3,000+"];

// ---------------------------------------------------------------------------
// Brand story + social proof
// ---------------------------------------------------------------------------
export const STATS = [
  { value: "100%", label: "Sustainable fibers" },
  { value: "Hand", label: "Finished in studio" },
  { value: "500+", label: "Clients styled" },
];

export const TIMELINE = [
  {
    year: "2016",
    title: "First cutting table",
    text: "Frank Ogiakha Innocent begins with a single borrowed sewing machine and a made-to-order list of twelve clients.",
  },
  {
    year: "2019",
    title: "The Foundry studio",
    text: "Innoeki Clothings Brand opens its atelier in a converted foundry, pairing tailoring with a resident styling practice.",
  },
  {
    year: "2022",
    title: "Sustainable pledge",
    text: "Every collection moves to traceable wool, linen, and silk with zero-waste pattern cutting.",
  },
  {
    year: "2024",
    title: "500 fittings",
    text: "The styling program passes five hundred private clients styled across three continents.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The audit reshaped how I dress in a single afternoon. I finally own a wardrobe that fits my real life.",
    name: "Priya N.",
    role: "Wardrobe Audit client",
  },
  {
    quote:
      "My gown was sculpted to the millimetre. I have never felt more like myself on a red carpet.",
    name: "Dana R.",
    role: "VIP Event Curation",
  },
  {
    quote:
      "Beautiful, honest clothing. The camel overcoat is the most worn piece I own.",
    name: "Elena M.",
    role: "Boutique customer",
  },
];

export const PRESS = ["VOGUE", "ELLE", "KINFOLK", "THE GENTLEWOMAN", "Harper's BAZAAR"];