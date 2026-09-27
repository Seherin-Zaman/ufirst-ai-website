import { cn } from "@/lib/cn";

/** Visible marker for content that has not been supplied yet. */
export function PlaceholderTag({ children = "Placeholder", className }: { children?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-gold-500/70 bg-gold-500/10 px-2 py-0.5 text-xs font-medium text-gold-700",
        "[.tone-dark_&]:text-gold-300 [.tone-deepest_&]:text-gold-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
