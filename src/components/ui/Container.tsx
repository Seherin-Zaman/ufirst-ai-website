import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  narrow,
}: {
  className?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", narrow ? "max-w-4xl" : "max-w-7xl", className)}>
      {children}
    </div>
  );
}
