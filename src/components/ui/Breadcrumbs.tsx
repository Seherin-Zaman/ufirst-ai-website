import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Link as LinkType } from "@/types/content";

/** Visible breadcrumb trail plus BreadcrumbList structured data. Last item is the current page. */
export function Breadcrumbs({ items }: { items: LinkType[] }) {
  const trail: LinkType[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="underline-offset-4 hover:text-fg hover:underline">
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
