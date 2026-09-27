import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resources & Blog — AI Automation Insights",
  description: "Articles and guides from uFirst.Ai on AI automation, RAG and knowledge retrieval, workflow automation and implementing AI in your business.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        title="Resources"
        description="Articles and guides on AI automation, knowledge retrieval and putting AI to work in a real business."
        breadcrumbs={[{ label: "Resources", href: "/blog" }]}
      />
      <Section labelledBy="blog-list-title">
        <h2 id="blog-list-title" className="sr-only">Articles</h2>
        <BlogExplorer posts={posts} />
      </Section>
    </>
  );
}
