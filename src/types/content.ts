/**
 * Content models.
 *
 * These types mirror the document types a headless CMS (Sanity, Strapi, …)
 * would expose. Pages and components only depend on these types — never on
 * where the data comes from — so the content source can be swapped inside
 * `src/lib/content` without touching the UI.
 *
 * `isPlaceholder` marks content that has NOT been supplied by the company yet.
 * Placeholder items are visibly tagged in the UI, excluded from the sitemap and
 * set to noindex where they have their own page.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SeoSettings {
  title?: string;
  description?: string;
  ogImage?: ImageAsset;
  noindex?: boolean;
}

export interface Link {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export interface ContactValue {
  value: string;
  isPlaceholder: boolean;
}

export interface SocialLink {
  platform: "LinkedIn" | "X" | "YouTube" | "Facebook" | "Instagram";
  /** Leave undefined until a real profile exists. */
  href?: string;
}

export interface SiteSettings {
  name: string;
  url: string;
  tagline: string;
  description: string;
  navigation: Link[];
  primaryCta: Link;
  contact: {
    address: ContactValue;
    phone: ContactValue;
    email: ContactValue;
    /** Digits-only international number (e.g. "447454935517"), no + or spaces — used to build wa.me links. */
    whatsapp?: ContactValue;
    /** Google Maps embed URL. Leave undefined until the address is confirmed. */
    mapEmbedUrl?: string;
  };
  social: SocialLink[];
  seo: SeoSettings;
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceCategoryId =
  | "ai-rag"
  | "communication"
  | "crm-lead"
  | "social-content"
  | "document-call";

export type ServiceIconName =
  | "headset"
  | "life-buoy"
  | "messages"
  | "mail"
  | "book"
  | "workflow"
  | "calendar"
  | "audio"
  | "file-scan"
  | "bot";

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  description: string;
  /** Hex colour, used for the interactive service map. */
  color: string;
}

export interface Service {
  id: string;
  slug: string;
  /** "01" … "10" — as defined in the service library. */
  number: string;
  name: string;
  summary: string;
  description: string;
  icon: ServiceIconName;
  categories: ServiceCategoryId[];
  capabilities: string[];
  workflow: { title: string; text: string }[];
  seo?: SeoSettings;
}

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export interface Person {
  id: string;
  name: string;
  designation: string;
  bio: string;
  expertise: string[];
  photo?: ImageAsset;
  linkedin?: string;
  isPlaceholder?: boolean;
}

export type Partner = Person;

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: ImageAsset;
  isPlaceholder?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingMinutes: number;
  featured?: boolean;
  coverImage?: ImageAsset;
  body: ContentBlock[];
  seo?: SeoSettings;
  /** Sample article supplied with the starter site — replace with real editorial content. */
  isPlaceholder?: boolean;
}

/* ------------------------------------------------------------------ */
/* Platform storytelling content                                       */
/* ------------------------------------------------------------------ */

export interface ArchitectureLayer {
  id: string;
  title: string;
  text: string;
  group: "core" | "client" | "result";
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
  phase: "Choose services" | "Configure templates" | "Deploy";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DeploymentExample {
  id: string;
  name: string;
  tagline: string;
  needs: string[];
  /** Service ids — illustrative selection only. */
  serviceIds: string[];
}
