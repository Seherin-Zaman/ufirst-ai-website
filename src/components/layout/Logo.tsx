import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * uFirst AI Limited logo: the official circular mark plus the company name,
 * using the exact colours of the supplied logo artwork
 * (orange "u", blue gradient name, blue tagline).
 */
export function Logo({ className }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="uFirst AI Limited — home" className={cn("inline-flex shrink-0 items-center gap-2.5", className)}>
      <Image src="/images/logo/ufirst-mark.png" alt="" width={191} height={191} className="size-10 shrink-0 lg:size-11" priority />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3rem] font-bold tracking-tight whitespace-nowrap lg:text-[1.45rem]">
          <span className="text-[#d55931]">u</span>
          <span className="bg-[linear-gradient(180deg,#51a9d8_0%,#418ebf_45%,#2a508e_100%)] bg-clip-text text-transparent">
            First AI Limited
          </span>
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] whitespace-nowrap text-[#356aa4] uppercase">
          A Place of Excellence
        </span>
      </span>
    </Link>
  );
}
