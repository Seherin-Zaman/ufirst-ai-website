import Link from "next/link";
import Image from "next/image";

/** uFirst logo lockup, as shown in the supplied design: mark, name and tagline. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="uFirst Limited — home" className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/images/logo/ufirst-ai-logo.png"
        alt="uFirst.Ai"
        width={96}
        height={96}
        className="size-10 shrink-0 lg:size-11"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3rem] font-bold tracking-tight text-fg lg:text-[1.45rem]">
          uFirst <span className="text-accent">Limited</span>
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-orange-brand uppercase">
          A Place of Excellence
        </span>
      </span>
    </Link>
  );
}
