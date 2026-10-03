import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
  titleClassName,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Overrides the default heading size/alignment. */
  titleClassName?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-sm font-medium text-accent",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display font-semibold text-fg",
          Tag === "h1" ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl" : "text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {description && <p className="mt-5 text-lg text-muted">{description}</p>}
    </div>
  );
}
