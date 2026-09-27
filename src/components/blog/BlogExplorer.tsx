"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/types/content";

/**
 * Blog listing with search, category filter and a featured article.
 * Posts are passed in from the server, so the page itself stays statically rendered
 * and fully crawlable; filtering is a progressive enhancement.
 */
export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const filtering = query.trim() !== "" || category !== "All";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inQuery =
        !q || [p.title, p.excerpt, p.category, ...p.tags].some((field) => field.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [posts, query, category]);

  const list = filtering ? results : posts.filter((p) => p.id !== featured?.id);

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.93rem] transition-colors",
                category === c ? "border-forest-600 bg-forest-600 text-white" : "border-line text-fg hover:bg-surface-strong",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-xs">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-line bg-surface py-2.5 pr-4 pl-11 text-[0.95rem] placeholder:text-muted focus:border-forest-600 focus:outline-none"
          />
        </div>
      </div>

      {!filtering && featured && (
        <article
          className={`group relative mt-10 grid overflow-hidden rounded-3xl border border-line bg-surface ${featured.coverImage ? "lg:grid-cols-2" : ""}`}
        >
          {featured.coverImage && (
            <Media image={featured.coverImage} aspect="aspect-[16/10] lg:aspect-auto lg:min-h-80" sizes="(min-width: 1024px) 50vw, 100vw" />
          )}
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-sm text-accent">Featured · {featured.category}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-semibold">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {featured.readingMinutes} min read
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
              Read article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      )}

      <p role="status" aria-live="polite" className="mt-10 text-sm text-muted">
        {filtering ? `${results.length} ${results.length === 1 ? "article" : "articles"} found` : "Latest articles"}
      </p>

      {list.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-line p-10 text-center">
          <p className="font-display text-xl font-semibold">No articles match your search</p>
          <p className="mt-2 text-muted">Try a different keyword or choose another category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full border border-line px-5 py-2.5 text-[0.95rem] font-medium hover:bg-surface-strong"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
