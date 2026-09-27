import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { Media } from "@/components/ui/Media";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { BlogCard } from "@/components/cards/BlogCard";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { getAuthor, getPostBySlug, getPosts, getRelatedPosts } from "@/lib/content";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate, initials } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    ogImage: post.seo?.ogImage ?? post.coverImage,
    noindex: post.seo?.noindex,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [author, related] = await Promise.all([getAuthor(post.authorId), getRelatedPosts(post)]);

  return (
    <>
      <JsonLd data={articleJsonLd({ ...post, authorName: author.name })} />
      <header className="tone-deepest bg-bg text-fg">
        <Container narrow className="pt-12 pb-14 md:pt-16 md:pb-20">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <p className="mt-10 text-accent">{post.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] font-semibold sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-4">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-forest-600 font-display text-sm font-semibold text-white">
              {initials(author.name)}
            </span>
            <div className="text-sm">
              <p className="font-medium">{author.name}</p>
              <p className="text-muted">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Section className="py-14! md:py-20!">
        <article className="mx-auto max-w-3xl">
          {post.coverImage && <Media image={post.coverImage} aspect="aspect-[16/9]" priority sizes="(min-width: 768px) 768px, 100vw" className="mb-10 rounded-3xl" />}
          {post.isPlaceholder && (
            <p className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-gold-500/70 bg-gold-500/10 px-5 py-3 text-sm">
              <PlaceholderTag>Sample article</PlaceholderTag>
              Educational sample content supplied with the starter site — replace it with your own editorial content.
            </p>
          )}
          <ArticleBody blocks={post.body} />

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>

          <aside aria-label="About the author" className="mt-12 flex gap-5 rounded-3xl border border-line bg-surface p-6">
            <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-forest-600 font-display font-semibold text-white">
              {initials(author.name)}
            </span>
            <div>
              <p className="font-display text-lg font-semibold">{author.name}</p>
              <p className="text-sm text-accent">{author.role}</p>
              <p className="mt-2 text-[0.95rem] text-muted">{author.bio}</p>
            </div>
          </aside>

          <Link href="/blog" className="mt-10 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
            <ArrowLeft aria-hidden className="size-4" /> All resources
          </Link>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="mist" labelledBy="related-articles-title">
          <SectionHeading id="related-articles-title" title="Related articles" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
