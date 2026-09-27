import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { homeIcons } from "./icons";

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
      <circle cx="210" cy="250" r="185" fill="none" stroke="#6fd0fb" strokeOpacity="0.25" strokeDasharray="2 6" />
      <circle cx="210" cy="250" r="140" fill="none" stroke="#6fd0fb" strokeOpacity="0.18" />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#8fdcff" strokeOpacity="0.45" strokeWidth="1.2" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} fill="#1a82e6" fillOpacity="0.35" />
          <circle cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3} fill="#bdeaff" />
        </g>
      ))}
      <text x="210" y="262" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, sans-serif" fontWeight="800" fontSize="44" fill="#ffffff" fillOpacity="0.95">
        AI
      </text>
    </svg>
  );
}

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="tone-deepest relative overflow-hidden bg-bg text-fg">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 75% 45%, rgb(26 130 230 / 0.45), transparent 70%), radial-gradient(40% 60% at 0% 100%, rgb(29 95 184 / 0.35), transparent 70%), linear-gradient(rgb(111 208 251 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(111 208 251 / 0.05) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />
      <Container className="relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-orange-brand">u</span>First AI
            </span>
            <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{hero.eyebrow}</span>
          </p>
          <h1 id="hero-title" className="mt-5 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-[3.6rem]">
            {hero.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <span className="block text-accent">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{hero.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primary.href} variant="gold" size="lg" arrow>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary" size="lg" arrow>
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
          <div className="mx-auto aspect-[7/8] w-full max-w-sm">
            <NetworkVisual />
          </div>
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
        </div>
      </Container>
    </section>
  );
}
