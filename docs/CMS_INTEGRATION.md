# Connecting a headless CMS (Sanity, Strapi, or similar)

The site is CMS-ready but ships with **local typed content** so it works with no
external services. Every page reads content through one file:

    src/lib/content.ts

Today those functions return data from `src/content/*.ts`. To go live with a CMS you
re-implement the functions in that one file using the CMS client. **No page or
component needs to change**, as long as the return types stay the same.

## 1. Content model → CMS schema

All shapes are defined in `src/types/content.ts`. Create one CMS document type per row:

| CMS type        | TS type        | Used by                                   | Notes |
|-----------------|----------------|-------------------------------------------|-------|
| Site settings   | `SiteSettings` | Navbar, footer, contact page, SEO defaults | Singleton |
| Service         | `Service`      | /services, /services/[slug], home         | Keep `slug`, `number`, `categories`, `iconName` |
| Service category| `ServiceCategory` | Interactive service map                | 5 categories today |
| Product         | `Product`      | /products, /products/[slug]               | Starts as placeholders (noindex) |
| Team member     | `TeamMember`   | /team, home preview                       | `isPlaceholder` false once real |
| Ambassador      | `Ambassador`   | /ambassadors, home preview                | |
| Author          | `Author`       | Blog article byline                       | |
| Blog post       | `BlogPost`     | /blog, /blog/[slug]                       | Body is `ContentBlock[]` |

`platform.ts` content (architecture layers, process steps, FAQs, deployment examples,
partner copy) is currently local. It can stay in code, or be moved to CMS later
with the same approach (add a getter in `content.ts`).

### Blog body
`BlogPost.body` is an array of `ContentBlock` (heading / paragraph / list / callout).
In Sanity, model this as Portable Text and map it to `ContentBlock[]` in the getter.
In Strapi, use a Dynamic Zone with one component per block type.

### Placeholders
Every person/product/post has an `isPlaceholder` flag. When a real record replaces a
placeholder, set it to `false` (or omit it). Placeholder products are `noindex` and
excluded from `sitemap.xml`; real ones are indexed automatically.

## 2. Swap the repository

Example for Sanity (`npm i next-sanity`):

```ts
// src/lib/content.ts
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

export async function getServices(): Promise<Service[]> {
  return client.fetch(`*[_type == "service"] | order(number asc){
    "id": _id, "slug": slug.current, number, title, summary, capabilities, workflow, categories, iconName
  }`, {}, { next: { revalidate: 300, tags: ["service"] } });
}
```

Rules:
- Keep every exported function name and return type.
- Map CMS field names to the TS types inside the getter (GROQ projections / Strapi `populate`).
- Keep functions `async`.

## 3. Rendering and freshness

Pages are statically generated (`generateStaticParams` for services, products and posts).
Two ways to keep them fresh:

1. **Time-based**: `next: { revalidate: 300 }` on CMS fetches (shown above).
2. **On publish** (recommended): add a route `src/app/api/revalidate/route.ts` that verifies
   a shared secret from the CMS webhook, then calls `revalidateTag("service")` /
   `revalidatePath("/blog")`. Point the CMS publish webhook at it.

## 4. Images
`ImageAsset` = `{ src, alt, width, height }`. Add the CMS image host (for example
`cdn.sanity.io`) to `images.remotePatterns` in `next.config.ts`. The `Media` component
already falls back to a neutral placeholder when no image is supplied.

## 5. SEO
Site settings, services, products and blog posts carry an `seo` object (`SeoSettings`: title, description,
OG image, `noindex`). `buildMetadata()` in `src/lib/seo.ts` merges it with defaults,
so editors control meta tags per page. JSON-LD (Organization, Service, FAQ, Article,
Breadcrumb) is generated from the same data.

## 6. Forms
Contact and partner forms POST to `/api/contact` and `/api/partner`, which validate
with zod and forward JSON to `FORM_WEBHOOK_URL` (intended: an n8n webhook that
routes to email/CRM). Field names are defined in `src/lib/validation.ts`.

## 7. Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG |
| `FORM_WEBHOOK_URL` | Form delivery endpoint |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` | (if using Sanity) |
| `REVALIDATE_SECRET` | (if using on-publish revalidation) |
