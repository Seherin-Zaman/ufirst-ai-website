"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { hero, heroSlides, type HeroSlide } from "@/content/home";
import { homeIcons } from "./icons";

const AUTOPLAY_MS = 6500;

/** Abstract AI network visual (pure SVG, no stock imagery). */
function NetworkVisual() {
  const nodes = [
    [210, 70], [120, 130], [300, 125], [60, 230], [170, 220], [255, 235], [360, 215],
    [110, 330], [215, 320], [320, 330], [165, 420], [270, 415],
  ];
  const links = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 5], [3, 7], [4, 8], [5, 8], [6, 9], [7, 10],
    [8, 10], [8, 11], [9, 11], [1, 2], [4, 7], [5, 9],
  ];
  return (
    <svg viewBox="0 0 420 480" aria-hidden className="h-full w-full">
      <defs>
        <radialGradient id="hero-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fd0fb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6fd0fb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="250" r="200" fill="url(#hero-core)" />
      <circle cx="210" cy="250" r="185" fill="none" stroke="#6fd0fb" strokeOpacity="0.25" strokeDasharray="2 6" className="hero-spin" />
      <circle cx="210" cy="250" r="140" fill="none" stroke="#6fd0fb" strokeOpacity="0.18" />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#8fdcff" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="4 4" className="hero-flow" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} fill="#1a82e6" fillOpacity="0.35" className="hero-pulse" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
          <circle cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3} fill="#bdeaff" />
        </g>
      ))}
      <text x="210" y="262" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="800" fontSize="44" fill="#ffffff" fillOpacity="0.95">
        AI
      </text>
    </svg>
  );
}

/** Lead funnel: many prospects in, a few qualified meetings out. */
function LeadsVisual() {
  const dots = Array.from({ length: 22 }, (_, i) => [40 + ((i * 47) % 340), 60 + ((i * 29) % 70)]);
  const stages = [
    { y: 175, w: 320, label: "Prospects researched" },
    { y: 255, w: 250, label: "Leads qualified" },
    { y: 335, w: 200, label: "Decision-makers engaged" },
  ];
  return (
    <svg viewBox="0 0 420 480" aria-hidden className="h-full w-full">
      <defs>
        <radialGradient id="hero-leads" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#6fd0fb" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6fd0fb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="260" r="210" fill="url(#hero-leads)" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3.5} fill="#bdeaff" fillOpacity={0.35 + (i % 3) * 0.2} className="hero-drop" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
      ))}
      {stages.map((s, i) => (
        <g key={s.label}>
          <rect x={210 - s.w / 2} y={s.y - 26} width={s.w} height={52} rx={26} fill="#1a82e6" fillOpacity={0.22 + i * 0.12} stroke="#6fd0fb" strokeOpacity="0.55" />
          <text x="210" y={s.y + 5} textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="600" fontSize={15} fill="#f3f7fd">
            {s.label}
          </text>
        </g>
      ))}
      <path d="M210 205 v18 M210 285 v18 M210 365 v24" stroke="#6fd0fb" strokeWidth="2" strokeOpacity="0.8" strokeDasharray="3 3" className="hero-flow" />
      <circle cx="210" cy="420" r="28" fill="#e8963a" className="hero-pulse" />
      <path d="M197 420 l9 9 l17 -18" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
  );
}

/** Hub of agents connected to everyday business channels. */
function AgentsVisual() {
  const spokes = [
    { a: -90, label: "Calls" },
    { a: -30, label: "Email" },
    { a: 30, label: "CRM" },
    { a: 90, label: "Docs" },
    { a: 150, label: "Chat" },
    { a: 210, label: "Social" },
  ];
  return (
    <svg viewBox="0 0 420 480" aria-hidden className="h-full w-full">
      <defs>
        <radialGradient id="hero-agents" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fd0fb" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6fd0fb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="250" r="200" fill="url(#hero-agents)" />
      <circle cx="210" cy="250" r="150" fill="none" stroke="#6fd0fb" strokeOpacity="0.25" strokeDasharray="3 7" className="hero-spin" />
      {spokes.map((s) => {
        const r = (s.a * Math.PI) / 180;
        const x = 210 + Math.cos(r) * 150;
        const y = 250 + Math.sin(r) * 150;
        return (
          <g key={s.label}>
            <line x1="210" y1="250" x2={x} y2={y} stroke="#8fdcff" strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="4 5" className="hero-flow" />
            <circle cx={x} cy={y} r="30" fill="#0b2554" stroke="#6fd0fb" strokeOpacity="0.7" />
            <text x={x} y={y + 5} textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="600" fontSize="13" fill="#f3f7fd">
              {s.label}
            </text>
          </g>
        );
      })}
      <circle cx="210" cy="250" r="54" fill="#1a82e6" fillOpacity="0.55" stroke="#bdeaff" strokeOpacity="0.8" className="hero-pulse" />
      <text x="210" y="246" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="800" fontSize="22" fill="#fff">
        AI
      </text>
      <text x="210" y="268" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="600" fontSize="12" fill="#bdeaff">
        Agents 24/7
      </text>
    </svg>
  );
}

const visuals = { network: NetworkVisual, leads: LeadsVisual, agents: AgentsVisual } as const;

function SlideVisual({ slide }: { slide: HeroSlide }) {
  if (slide.image) {
    return (
      <div className="relative mx-auto aspect-[7/8] w-full max-w-sm overflow-hidden rounded-3xl">
        <Image src={slide.image} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
      </div>
    );
  }
  const Visual = visuals[slide.visual];
  return (
    <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
      <div className="mx-auto aspect-[7/8] w-full max-w-sm">
        <Visual />
      </div>
      {slide.visual === "network" && (
        <ul className="grid gap-4 sm:grid-cols-1 max-sm:grid-cols-3">
          {hero.highlights.map((h) => {
            const Icon = homeIcons[h.icon];
            return (
              <li key={h.label} className="flex items-center gap-3 max-sm:flex-col max-sm:text-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/50 bg-white/5 text-accent">
                  <Icon aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <span className="text-sm leading-snug font-medium sm:max-w-24">{h.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function HomeHero() {
  const count = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false); // only the visitor's explicit Pause button stops it
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Runs automatically and continuously: no pause on hover, so the banner keeps
  // sliding even while the mouse rests on it.
  useEffect(() => {
    if (stopped || count < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, stopped, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="tone-deepest relative overflow-hidden bg-bg text-fg"
      style={{ "--hero-ms": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        aria-hidden
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 75% 45%, rgb(26 130 230 / 0.45), transparent 70%), radial-gradient(40% 60% at 0% 100%, rgb(29 95 184 / 0.35), transparent 70%), linear-gradient(rgb(111 208 251 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(111 208 251 / 0.05) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />

      {/* Sliding track: every slide sits side by side and the track moves left automatically. */}
      <div
        className="relative flex transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live={stopped ? "polite" : "off"}
      >
        {heroSlides.map((slide, i) => {
          const active = i === index;
          const TitleTag = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              className="hero-slide w-full shrink-0"
            >
              <Container className="grid items-center gap-10 pt-16 pb-24 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-28">
                <div>
                  <p className="hero-in flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ "--d": "100ms" } as React.CSSProperties}>
                    <span className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      <span className="text-orange-brand">u</span>First AI
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{slide.eyebrow}</span>
                  </p>
                  <TitleTag
                    id={i === 0 ? "hero-title" : undefined}
                    className="hero-in mt-5 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-[3.6rem]"
                    style={{ "--d": "250ms" } as React.CSSProperties}
                  >
                    {slide.titleLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="block text-accent">{slide.titleHighlight}</span>
                  </TitleTag>
                  <p className="hero-in mt-6 max-w-xl text-lg text-muted" style={{ "--d": "400ms" } as React.CSSProperties}>
                    {slide.description}
                  </p>
                  <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "550ms" } as React.CSSProperties}>
                    <Button href={slide.primary.href} variant="gold" size="lg" arrow>
                      {slide.primary.label}
                    </Button>
                    <Button href={slide.secondary.href} variant="secondary" size="lg" arrow>
                      {slide.secondary.label}
                    </Button>
                  </div>
                </div>
                <div className="hero-in hero-visual" style={{ "--d": "300ms" } as React.CSSProperties}>
                  <SlideVisual slide={slide} />
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <Container className="absolute inset-x-0 bottom-7 flex items-center gap-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className={cn(
                "relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300 hover:bg-white/45",
                i === index ? "w-14" : "w-6",
              )}
            >
              {i === index && (
                <span
                  key={`${index}-${stopped}`}
                  aria-hidden
                  className={cn("absolute inset-y-0 left-0 rounded-full bg-accent", stopped ? "w-full" : "hero-progress")}
                />
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            className="ml-2 grid size-8 place-items-center rounded-full text-fg/60 transition-colors hover:bg-white/10 hover:text-fg"
          >
            {stopped ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
          </button>
        </Container>
      )}
    </section>
  );
}
