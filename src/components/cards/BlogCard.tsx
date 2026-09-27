import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/types/content";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      {post.coverImage && <Media image={post.coverImage} aspect="aspect-[16/9]" />}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-accent">{post.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-fg">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-[0.95rem] text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-5 text-sm text-muted">
          <span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
          </span>
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
