# Klyde Joseph Yabo — Portfolio

Personal portfolio built on the [brewed-ops/portfolio-template](https://github.com/brewed-ops/portfolio-template) layout: profile rail, animated contour background, bento home, 3D showcase carousel, and phone layout.

Stack: Vite 6, React 19, TypeScript, Three.js, GSAP, Lenis, React Router 7.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + dist/
```

## Your content

| What | Where |
|------|--------|
| Name, headline, avatar, socials, phone stats | `src/data/profile.ts` |
| Web & client apps in project panels | `src/data/projects.ts` |
| About copy & capabilities | `src/components/AboutGrid.tsx` |
| FAQs & contact headline | `src/data/faqs.ts`, `src/components/ContactGrid.tsx` |
| Tools marquee | `src/components/ToolsMarquee.tsx` |
| Featured bento cards (titles) | `src/components/ProjectsGrid.tsx` |
| 3D carousel sites | `src/data/funnels.ts` + `public/funnels/` / `public/samples/` |
| Contact (Supabase + EmailJS) | `.env` — see `.env.example` |
| SEO & share image | `index.html`, `public/og-image.png` |

Contact form behavior matches the previous site: messages go to Supabase when configured, with optional EmailJS alerts (`src/lib/contact.ts`).

## Deploy

Vercel SPA rewrites are in `vercel.json`. Set the same `VITE_*` env vars in the Vercel project dashboard.

## License

This repo includes template code from brewed-ops/portfolio-template (PolyForm Noncommercial 1.0.0, with permission for your own portfolio). See `LICENSE` in the repo root.
