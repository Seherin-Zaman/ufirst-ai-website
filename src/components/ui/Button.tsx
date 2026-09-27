import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-gold-500 text-white hover:bg-gold-600 active:bg-gold-700",
  gold: "bg-gold-500 text-white shadow-[0_8px_24px_-10px_rgb(26_130_230/0.8)] hover:bg-gold-600 active:bg-gold-700",
  secondary: "border border-line text-fg hover:bg-surface-strong",
  ghost: "text-fg hover:bg-surface-strong",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = ButtonProps & { href: string; onClick?: never; type?: never; disabled?: never };
type NativeProps = ButtonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", size = "md", arrow, className, children } = props;
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (props.href !== undefined) {
    const external = /^https?:\/\//.test(props.href);
    return external ? (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
      {content}
    </button>
  );
}
