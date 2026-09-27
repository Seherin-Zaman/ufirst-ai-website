"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";
import type { Link as NavLink } from "@/types/content";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ navigation, cta }: { navigation: NavLink[]; cta: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, focus handling and a simple focus trap while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
        toggleRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ].filter((el): el is HTMLElement => !!el);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line text-fg shadow-[0_1px_12px_-6px_rgb(11_37_84/0.18)]">
      {/* Blur lives on its own layer: backdrop-filter on the header itself would
          become the containing block for the fixed mobile menu panel. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white supports-[backdrop-filter]:bg-white/92 supports-[backdrop-filter]:backdrop-blur-xl" />
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[4.75rem] lg:px-10">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block px-3 py-2 text-[0.92rem] font-medium whitespace-nowrap transition-colors",
                      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform",
                      active ? "text-accent after:scale-x-100" : "text-fg/80 after:scale-x-0 hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <p className="hidden items-center gap-2 text-[0.72rem] leading-tight text-muted min-[1440px]:flex">
            <Globe aria-hidden strokeWidth={1.6} className="size-6 shrink-0 text-accent" />
            <span>
              Bangladesh · UK · Malaysia
              <br />
              Europe · USA · Canada · Australia
            </span>
          </p>
          <span className="hidden sm:block">
            <Button href={cta.href} variant="gold">
              {cta.label}
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-surface-strong xl:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open}
        aria-hidden={!open}
        className="menu-panel fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-white lg:top-[4.75rem] xl:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 pt-6 pb-10 sm:px-8">
          <ul className="divide-y divide-line">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-display text-2xl font-medium",
                      active ? "text-accent" : "text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="menu-item mt-8" style={{ "--i": navigation.length } as React.CSSProperties}>
            <Button href={cta.href} variant="gold" size="lg" arrow className="w-full">
              {cta.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
