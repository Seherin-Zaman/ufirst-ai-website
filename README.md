# uFirst.Ai website

Next.js (App Router) + React + TypeScript + Tailwind CSS v4.

## Run
    npm install
    cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL and FORM_WEBHOOK_URL
    npm run dev                    # http://localhost:3000
    npm run build && npm start     # production

## Where things are
- `src/content/` — all copy and data (typed). Source material: the uFirst.Ai platform deck.
- `src/lib/content.ts` — the single data-access layer (swap for a CMS: see `docs/CMS_INTEGRATION.md`).
- `src/components/` — ui, layout, cards, sections, forms, blog.
- `src/app/` — routes, metadata, sitemap, robots, OG image.
- `src/app/globals.css` — design tokens (colours, fonts, motion).

## Content still to supply before launch
- About page: formal company values are marked "Draft — confirm wording"
- Partners page (/partners): partnership types, benefits and process are drafts
- Blog: four sample articles, marked "Sample article"
- Office address, phone and social links: hidden until added in `src/content/site.ts`

## Where to edit content
- Homepage wording (hero, about, mission/vision, services, industries, markets, why choose us): `src/content/home.ts`
- Partner profiles: `src/content/partner-people.ts` (photos in `public/images/partners/`)
- Logo: `public/images/logo/ufirst-ai-logo.png`
- Contact details and menu: `src/content/site.ts`
- Colours and fonts: `src/app/globals.css`
