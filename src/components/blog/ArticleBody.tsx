import type { ContentBlock } from "@/types/content";

/** Renders structured article content (a simple, CMS-friendly block format). */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-article text-[1.075rem] text-fg">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return <p key={i}>{block.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;
        }
      })}
    </div>
  );
}
