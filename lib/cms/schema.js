import {
  BIZ,
  FAQ_GROUPS,
  HERO_FEATURES,
  INQUIRY_TYPES,
  NAV,
  PC_BRANDS,
  PC_POINTS,
  PC_STEPS,
  PC_TYPES,
  PROCESS,
  PRODUCT_TRUST,
  PRODUCTS,
  QUOTE_DEVICES,
  QUOTE_ISSUES,
  QUOTE_MODELS,
  REVIEWS,
  SERVICES,
  STATS,
  TRUST_STRIP,
  WHY,
} from "../data.js";
import { PRIVACY, PRIVACY_UPDATED } from "../privacy.js";

export const CONTENT_SCHEMA_VERSION = 1;
export const MAX_CONTENT_BYTES = 2 * 1024 * 1024;
export const MAX_COLLECTION_ITEMS = 500;
export const MAX_JSON_DEPTH = 20;
export const MAX_JSON_STRING_LENGTH = 100_000;

const copy = (value) => JSON.parse(JSON.stringify(value));

// These are the collections that can be addressed by the generic collection API.
// Values from lib/data.js are copied into the defaults rather than redefined here.
export const COLLECTION_SCHEMAS = {
  business: "object",
  navigation: "array",
  landing: "object",
  services: "array",
  trustStrip: "array",
  productTrust: "array",
  products: "array",
  customPc: "object",
  why: "array",
  process: "array",
  stats: "array",
  reviews: "array",
  faq: "array",
  inquiryTypes: "array",
  quote: "object",
  seo: "object",
  tracking: "object",
  footer: "object",
  legal: "object",
};

export const COLLECTION_NAMES = Object.keys(COLLECTION_SCHEMAS);
export const CONTENT_SCHEMA = {
  version: CONTENT_SCHEMA_VERSION,
  collections: { ...COLLECTION_SCHEMAS },
};

export const DEFAULT_CONTENT = {
  schemaVersion: CONTENT_SCHEMA_VERSION,

  // The complete existing BIZ object remains available in the runtime document.
  business: {
    ...copy(BIZ),
    legalName: BIZ.name,
    country: "Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    currency: "MYR",
    social: {
      facebookUrl: "",
      instagramUrl: "",
      tiktokUrl: "",
    },
  },

  // Existing navigation and all landing data are retained in their own collections.
  navigation: copy(NAV),
  landing: {
    header: {
      logo: "/logo.png",
      logoAlt: "SK IT Services",
      callLabel: "Call Now",
      quoteLabel: "Get a Free Quote",
      mobileCallLabel: "Call us",
      mobileWhatsAppLabel: "Chat on WhatsApp",
      mobileMenuLabel: "Open menu",
      mobileCloseLabel: "Close menu",
      mobileFaqLabel: "FAQ",
      mobileFaqHref: "#faq",
    },
    heroFeatures: copy(HERO_FEATURES),
    hero: {
      eyebrow: "SK IT Services · Kuala Lumpur",
      title: "Your Trusted Partner in",
      titleAccent: "IT Solutions.",
      description: "Quality computers, professional repairs and practical IT solutions for individuals and businesses — all under one roof.",
      image: "/images/hero.jpg",
      imageAlt: "Technician repairing a laptop at SK IT Services",
      primaryCta: "Explore Our Services",
      primaryHref: "#services",
      secondaryCta: "Get a Free Quote",
      tagline: BIZ.tagline,
    },
    services: {
      eyebrow: "Our Core Services",
      title: "One Partner.",
      titleAccent: "Complete IT Solutions.",
      description: "From computers and accessories to professional repairs and business IT assistance, SK IT Services provides practical technology solutions tailored to your needs.",
      trust: copy(TRUST_STRIP),
    },
    products: {
      eyebrow: "Shop Our Products",
      title: "Computers & Technology",
      titleAccent: "for Every Need.",
      description: "Explore our range of new and refurbished computers, components and accessories, with trusted brands and expert advice to help you find the right solution.",
      sourcingTitle: "Can't find what you're looking for?",
      sourcingText: "Contact our team and we'll help you source the right product.",
      trust: copy(PRODUCT_TRUST),
    },
    customPc: {
      eyebrow: "Custom PC Builder",
      title: "Custom PC",
      titleAccent: "Builds.",
      description: "Build a computer that fits your needs. Whether it's for gaming, study, work or content creation, we'll help you choose the right parts and build a reliable system within your budget.",
      primaryCta: "Start Building Your PC",
      secondaryCta: "Get a Consultation",
      buildMessage: "Hello SK IT Services! I'd like to build a custom PC. My usage: ____ and budget: ____",
      consultationMessage: "Hello SK IT Services! I'd like a consultation for a custom PC build.",
      image: "/images/Builder-HeroBanner.png",
      imageAlt: "Custom PC build workstation",
      processEyebrow: "How It Works",
      processTitle: "A Simple Process.",
      closingText: "From entry-level builds to high-performance setups, we'll help you get the right PC for your needs.",
    },
    why: {
      eyebrow: "Why Choose SK IT",
      title: "More Than a Computer Shop.",
      titleAccent: "A Partner You Can Trust.",
      description: "At SK IT Services, we combine quality products, professional expertise and genuine customer support to deliver the right IT solutions for individuals and businesses.",
      image: "/images/why-hero.jpg",
      imageAlt: "Inside the SK IT Services store",
    },
    process: {
      eyebrow: "How We Work",
      title: "A Simple Process.",
      titleAccent: "From Inquiry to Solution.",
      description: "We make it easy for you to get the right IT solution. Whether it's a new computer, a repair or a business IT request, our process is simple, transparent and hassle-free.",
      image: "/images/how-hero.jpg",
      imageAlt: "SK IT technician at work",
      note: "Simple.\nTransparent.\nHassle-free.",
    },
    reviews: {
      eyebrow: "Customer Reviews",
      title: "Real Customers.",
      titleAccent: "Real Experiences.",
      description: "Here are some of the feedback from our customers who have trusted SK IT Services for their computers, repairs and IT solutions.",
      note: "Thank you\nfor your trust\nand support!",
      joinTitle: "Join Our Happy Customers",
      joinText: "Be part of the SK IT family and experience our reliable service, quality products and friendly support.",
      image: "/images/why-hero.jpg",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked",
      titleAccent: "Questions.",
      description: "Find quick answers to common questions about our products, repair services and IT solutions. If you still need help, feel free to contact our team.",
      note: "Your Questions.\nOur Support.",
      image: "/images/faq-hero.jpg",
      imageAlt: "SK IT Services technician at the counter",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Let's Talk About",
      titleAccent: "Your IT Needs.",
      description: "Need a computer, repair service or business IT support? Get in touch with our team through WhatsApp, phone, email or visit our store at Plaza Imbi, Kuala Lumpur.",
      note: "Same Team.\nReal Support.",
      quoteTitle: "How Can We Help You?",
      quoteDescription: "Choose a category to get started. We'll direct you to WhatsApp with the relevant details to assist you faster.",
      storeTitle: "Our Store",
      storeDescription: "Visit us for product enquiries, repairs or consultation.",
      stillQuestionsEyebrow: "Still have questions?",
      stillQuestionsTitle: "We're Here to Help.",
      stillQuestionsText: "Not sure what you need? Our friendly team is ready to advise you on the right solution based on your usage, budget and requirements.",
      image: "/images/contact-hero.jpg",
      imageAlt: "SK IT Services front desk",
      storeImage: "/images/store.jpg",
      storeImageAlt: "SK IT Services store at Plaza Imbi",
      quoteEyebrow: "Get a Free Quote",
      quoteHint: "Select your device and issue to get a quick quote.",
      storeEyebrow: "Our Store",
      storeHint: "Visit us for product enquiries, repairs or a consultation.",
      cards: [
        { icon: "whatsapp", title: "WhatsApp", main: "", sub: "Fastest response", action: "whatsapp" },
        { icon: "phone", title: "Phone Call", main: "", sub: "Mon – Sat, 10AM – 7PM", action: "phone" },
        { icon: "mail", title: "Email", main: "", sub: "We'll get back to you soon", action: "email" },
        { icon: "pin", title: "Visit Our Store", main: "Plaza Imbi, Kuala Lumpur", sub: "See location details below", action: "maps" },
      ],
      directionsLabel: "Get Directions →",
      addressLabel: "Address",
      hoursLabel: "Operating Hours",
      stillQuestionsItems: [["chat", "Product Enquiry"], ["wrench", "Repair Support"], ["briefcase", "Business IT Consultation"], ["users", "General Questions"]],
    },
    floating: {
      callLabel: "Call SK IT Services",
      whatsappLabel: "Chat with SK IT Services on WhatsApp",
    },
  },
  services: copy(SERVICES),
  trustStrip: copy(TRUST_STRIP),
  productTrust: copy(PRODUCT_TRUST),
  products: copy(PRODUCTS),
  customPc: {
    types: copy(PC_TYPES),
    steps: copy(PC_STEPS),
    points: copy(PC_POINTS),
    brands: copy(PC_BRANDS),
  },
  why: copy(WHY),
  process: copy(PROCESS),
  stats: copy(STATS),
  reviews: copy(REVIEWS),
  faq: copy(FAQ_GROUPS),
  inquiryTypes: copy(INQUIRY_TYPES),

  quote: {
    devices: copy(QUOTE_DEVICES),
    models: copy(QUOTE_MODELS),
    issues: copy(QUOTE_ISSUES),
    steps: ["Device", "Model", "Issue"],
    titles: ["What device do you have?", "Choose your device model.", "What is the issue?"],
    subtitles: [
      "Select your device type to get started.",
      "Choose the brand or model for your device.",
      "What issue are you experiencing?",
    ],
    submitLabel: "Send for pricing",
    backLabel: "Back",
    continueLabel: "Continue",
    privacyNotice: "Your device details will be sent to SK IT Services on WhatsApp.",
    successMessage: "WhatsApp opened with your message. Just press send to reach us.",
      messageTemplate: "Hello SK IT Services! I'd like a quote.\n\nDevice: {{device}}\nBrand / Model: {{model}}\nIssue: {{issue}}\n\nPlease let me know the pricing. Thank you!",
  },

  seo: {
    title: "SK IT Services | Laptop Repair, Refurbished Laptops & IT Support in Kuala Lumpur",
    description: "Buy refurbished laptops, get laptop repair and computer repair, or book office network setup and IT support in Kuala Lumpur with SK IT Services. Call +60192399656 for a free quote.",
    keywords: "laptop repair Kuala Lumpur, computer repair Kuala Lumpur, refurbished laptops Kuala Lumpur, custom PC builder Kuala Lumpur, IT support for small business Kuala Lumpur",
    canonicalUrl: "https://www.skitservices.com.my",
    openGraphTitle: "SK IT Services | Your Trusted Partner in IT Solutions",
    openGraphDescription: "Quality computers, professional repairs and practical IT solutions in Kuala Lumpur.",
    openGraphImage: "/og-image.jpg",
    locale: "en_MY",
    robots: "index,follow",
  },

  // Tracking identifiers intentionally default to empty strings; deployment secrets and IDs
  // can be entered through the CMS without placing them in source control.
  tracking: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    metaPixelId: "",
    consentMode: "disabled",
    customHead: "",
    customBodyStart: "",
    customBodyEnd: "",
  },

  footer: {
    groups: [
      { title: "Quick Links", links: [["Home", "#home"], ["Products", "#products"], ["Repair Services", "#services"], ["Business IT", "#business-it"]] },
      { title: "Company", links: [["About Us", "#why"], ["Contact Us", "#contact"], ["FAQ", "#faq"]] },
    ],
    whatsappLabel: "WhatsApp us",
    contactHeading: "Contact Details",
    privacyLabel: "Privacy Policy",
    privacyHref: "/privacy-policy",
    copyright: "© 2026 SK IT Services. All rights reserved.",
  },

  legal: {
    privacy: {
      eyebrow: "Legal",
      title: "Privacy",
      titleAccent: "Policy.",
      description: "How SK IT Services collects, uses and protects your personal data.",
      updated: PRIVACY_UPDATED,
      sections: copy(PRIVACY),
    },
    terms: {
      enabled: false,
      title: "Terms & Conditions",
      sections: [],
    },
  },
};

export class CmsValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = "CmsValidationError";
    this.code = "CMS_VALIDATION_ERROR";
    this.details = details;
  }
}

function validateJsonValue(value, path = "$", depth = 0) {
  if (depth > MAX_JSON_DEPTH) {
    throw new CmsValidationError(`${path} is nested too deeply`);
  }

  if (value === null || typeof value === "string" || typeof value === "boolean") {
    if (typeof value === "string" && value.length > MAX_JSON_STRING_LENGTH) {
      throw new CmsValidationError(`${path} is too long`);
    }
    return value;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new CmsValidationError(`${path} must be finite`);
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length > MAX_COLLECTION_ITEMS) {
      throw new CmsValidationError(`${path} has too many items`);
    }
    value.forEach((item, index) => validateJsonValue(item, `${path}[${index}]`, depth + 1));
    return value;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length > MAX_COLLECTION_ITEMS) {
      throw new CmsValidationError(`${path} has too many fields`);
    }
    for (const key of keys) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        throw new CmsValidationError(`${path} contains a reserved field`);
      }
      validateJsonValue(value[key], `${path}.${key}`, depth + 1);
    }
    return value;
  }

  throw new CmsValidationError(`${path} must contain JSON-compatible values`);
}

export function validateCollection(name, value) {
  const expectedType = COLLECTION_SCHEMAS[name];
  if (!expectedType) throw new CmsValidationError(`Unknown content collection: ${name}`);
  const isExpectedType = expectedType === "array"
    ? Array.isArray(value)
    : value !== null && typeof value === expectedType && !Array.isArray(value);
  if (!isExpectedType) {
    throw new CmsValidationError(`${name} must be a JSON ${expectedType}`);
  }
  validateJsonValue(value, `$.${name}`);
  return value;
}

export function validateContent(content) {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    throw new CmsValidationError("Content must be a JSON object");
  }
  if (content.schemaVersion !== CONTENT_SCHEMA_VERSION) {
    throw new CmsValidationError(`Unsupported content schema version: ${content.schemaVersion}`);
  }

  const expectedKeys = new Set(["schemaVersion", ...COLLECTION_NAMES]);
  for (const key of Object.keys(content)) {
    if (!expectedKeys.has(key)) throw new CmsValidationError(`Unknown content field: ${key}`);
  }
  for (const name of COLLECTION_NAMES) {
    if (!(name in content)) throw new CmsValidationError(`Missing content collection: ${name}`);
    validateCollection(name, content[name]);
  }
  validateJsonValue(content.schemaVersion, "$.schemaVersion");
  return content;
}

export function getDefaultContent() {
  return copy(DEFAULT_CONTENT);
}

export function cloneContent(content) {
  return copy(content);
}

// Add fields introduced by a newer CMS version without replacing values an
// operator has already edited. Arrays are intentionally replaced as a whole so
// deleting an item remains a real delete instead of being re-added by a merge.
export function mergeContentDefaults(content) {
  const merge = (defaults, value) => {
    if (Array.isArray(defaults)) return Array.isArray(value) ? value : copy(defaults);
    if (defaults && typeof defaults === "object" && !Array.isArray(defaults)) {
      if (!value || typeof value !== "object" || Array.isArray(value)) return copy(defaults);
      const result = { ...defaults };
      for (const [key, item] of Object.entries(value)) result[key] = key in defaults ? merge(defaults[key], item) : item;
      return result;
    }
    if (value === undefined || typeof value !== typeof defaults) return defaults;
    return value;
  };
  return merge(DEFAULT_CONTENT, content);
}
