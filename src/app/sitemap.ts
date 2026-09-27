import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/site";
import { getPosts, getServices } from "@/lib/content";

const staticRoutes = ["", "/about", "/services", "/partners", "/contact", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const url = (path: string) => `${siteSettings.url}${path}`;

  return [
    ...staticRoutes.map((path) => ({
      url: url(path),
      changeFrequency: (path === "" || path === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
