import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteSettings.url}/sitemap.xml`,
    host: siteSettings.url,
  };
}
