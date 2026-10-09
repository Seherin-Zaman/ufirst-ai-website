import type { SiteSettings } from "@/types/content";

/**
 * Site settings (CMS: "Site settings" singleton).
 * Contact details are PLACEHOLDERS — replace with the real values.
 */
export const siteSettings: SiteSettings = {
  name: "uFirst.Ai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ufirst.ai",
  tagline: "Reusable AI technology. Tailored systems for individual businesses.",
  description:
    "uFirst.Ai is an AI-powered business automation platform. One technology foundation, configured into tailored AI systems for individual businesses.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Our Products", href: "/products" },
    { label: "Partners", href: "/partners" },
    { label: "Resources", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: { label: "Book a Consultation", href: "/contact" },
  contact: {
    address: { value: "Office address to be supplied", isPlaceholder: true },
    phone: { value: "Phone number to be supplied", isPlaceholder: true },
    email: { value: "info@ufirstai.com", isPlaceholder: false },
    whatsapp: { value: "+44 7454 935517", isPlaceholder: false },
    // Paste a Google Maps embed URL here once the office address is confirmed.
    mapEmbedUrl: undefined,
  },
  // Social icons in the footer. Paste each profile URL into `href` and the icon
  // appears automatically; entries without an href stay hidden (no dead links).
  social: [
    { platform: "LinkedIn", href: undefined },
    { platform: "Facebook", href: undefined },
    { platform: "Instagram", href: undefined },
    { platform: "X", href: undefined },
    { platform: "YouTube", href: undefined },
  ],
  seo: {
    title: "uFirst AI — Build Smarter. Automate Faster. Scale with AI.",
    description:
      "uFirst AI delivers intelligent AI Agents, Automation and Custom AI Solutions that transform business operations, customer experience and growth.",
  },
};
