import type { Metadata } from "next";
import { siteSettings } from "@/content/site";
import type { SeoSettings } from "@/types/content";

interface BuildMetadataInput extends SeoSettings {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Builds consistent page metadata: title, description, canonical, Open Graph
 * and Twitter/X tags. Page-level SEO fields from the CMS (`title`,
 * `description`, `ogImage`, `noindex`) override the defaults passed in.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { path, type = "website" } = input;
  const title = input.title;
  const description = input.description;
  const image = input.ogImage
    ? { url: input.ogImage.src, alt: input.ogImage.alt, width: input.ogImage.width, height: input.ogImage.height }
    : { url: "/opengraph-image", alt: `${siteSettings.name} — ${siteSettings.tagline}`, width: 1200, height: 630 };

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: input.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteSettings.name,
      locale: "en_GB",
      type,
      images: [image],
      ...(type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteSettings.url).toString();
}

/* ------------------------------ JSON-LD ------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.name,
    url: siteSettings.url,
    description: siteSettings.description,
    logo: absoluteUrl("/icon.svg"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.name,
    url: siteSettings.url,
    description: siteSettings.description,
    publisher: { "@type": "Organization", name: siteSettings.name },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceJsonLd(service: { name: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@type": "Organization", name: siteSettings.name, url: siteSettings.url },
    serviceType: "AI business automation",
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.authorName },
    publisher: { "@type": "Organization", name: siteSettings.name, url: siteSettings.url },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
