/**
 * Content repository — the ONLY place pages read content from.
 *
 * Today every function returns local, typed data from `src/content`.
 * To connect a headless CMS (Sanity, Strapi, …) re-implement these functions
 * with the CMS client and keep the return types. No page or component changes.
 * See docs/CMS_INTEGRATION.md.
 *
 * All functions are async so a network-backed implementation is a drop-in swap.
 */
import { siteSettings } from "@/content/site";
import { serviceCategories, services } from "@/content/services";
import { partners } from "@/content/partner-people";
import { authors } from "@/content/authors";
import { posts } from "@/content/posts";
import type {
  Author,
  BlogPost,
  Partner,
  Service,
  ServiceCategory,
  SiteSettings,
} from "@/types/content";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

/* Services */
export async function getServices(): Promise<Service[]> {
  return services;
}
export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((s) => s.slug === slug);
}
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  return serviceCategories;
}
/** Services that share at least one category with `service` — used for "works well with". */
export async function getRelatedServices(service: Service, limit = 3): Promise<Service[]> {
  return services
    .filter((s) => s.id !== service.id)
    .map((s) => ({ s, overlap: s.categories.filter((c) => service.categories.includes(c)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.s.number.localeCompare(b.s.number))
    .slice(0, limit)
    .map((x) => x.s);
}

/* People */
export async function getPartners(): Promise<Partner[]> {
  return partners;
}

/* Blog */
export async function getPosts(): Promise<BlogPost[]> {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return posts.find((p) => p.slug === slug);
}
export async function getAuthor(id: string): Promise<Author> {
  return authors.find((a) => a.id === id) ?? authors[0];
}
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const all = await getPosts();
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
