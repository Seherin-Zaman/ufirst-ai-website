import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "light" | "mist" | "dark" | "deepest";

const toneClass: Record<Tone, string> = {
  light: "",
  mist: "tone-mist",
  dark: "tone-dark",
  deepest: "tone-deepest",
};

export function Section({
  tone = "light",
  id,
  className,
  containerClassName,
  labelledBy,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("bg-bg text-fg py-20 md:py-28", toneClass[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
