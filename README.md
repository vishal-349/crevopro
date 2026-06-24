# CrevoPro

Marketing website for CrevoPro — a creative design & digital marketing agency.

Built with **React 19 + TypeScript + Vite**, animated with **Framer Motion**, styled with **modular SCSS**. Enquiries are captured to **Firebase Firestore** via **Vercel serverless functions**, with an optional email notification and a password-protected admin panel.

---

## Requirements

- **Node.js** ≥ 20.19 (developed on 22.x)
- **npm** ≥ 10

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

## Scripts

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR              |
| `npm run build`        | Type-check (`tsc -b`) then build for production |
| `npm run preview`      | Serve the production build locally              |
| `npm run type-check`   | Run the TypeScript compiler (no emit)           |
| `npm run lint`         | Run ESLint over the codebase                    |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Check formatting without writing                |

## Project structure

```
api/                          Vercel serverless functions
├── _lib/                     firebase, validation, auth, rate-limit, notifications
├── leads/                    POST create · GET list/CSV · PATCH status
└── admin/                    login · logout · session
src/
├── app/                      App shell (App.tsx — route split: home vs /admin)
├── assets/                   Images (optimized SVG/WebP)
├── components/
│   ├── layout/               Navbar, Footer
│   └── ui/                   Reusable primitives (Loader)
├── features/
│   ├── home/                 HomePage + sections (Hero, About, Services,
│   │                         Portfolio, WhyCrevoPro, Testimonial, Blog)
│   ├── contact/              ContactSection (posts to /api/leads)
│   └── admin/                AdminApp, LoginForm, LeadsDashboard (lazy /admin)
├── data/                     Typed content (services, portfolio, testimonials,
│                             blog, brands, stats, navigation)
├── hooks/                    useMediaQuery, useScrolled
├── lib/                      Shared helpers (animation variants)
├── types/                    Shared TypeScript types
├── styles/
│   ├── abstracts/            Design tokens + mixins (Sass)
│   ├── base/                 Reset, typography, utilities, loader
│   ├── sections/             One partial per page section
│   └── main.scss             Stylesheet entry (imported by main.tsx)
└── main.tsx                  Application entry
```

### Path alias

`@/` maps to `src/` (configured in `tsconfig` and resolved by `vite-tsconfig-paths`):

```ts
import { services } from '@/data/services';
```

## Styling

Styles are authored in SCSS and compiled by Vite. `main.scss` loads the design
tokens, base layer, and one partial per section in cascade order. Design tokens
(`src/styles/abstracts`) are available to new component styles via
`@use '../abstracts/variables' as *`.

## Tech stack

| Concern    | Choice                     |
| ---------- | -------------------------- |
| Framework  | React 19                   |
| Language   | TypeScript (strict)        |
| Build tool | Vite 6                     |
| Styling    | SCSS (modular partials)    |
| Animation  | Framer Motion              |
| Carousel   | Swiper                     |
| Linting    | ESLint (typescript-eslint) |
| Formatting | Prettier                   |

## Lead system & admin

Enquiries POST to `/api/leads`, are validated + spam-checked server-side, saved
to Firestore, and fanned out to optional notification channels (email, and
scaffolds for WhatsApp / CRM). A password-protected admin panel at **`/admin`**
lists leads with search, status filter, sort, status updates, and CSV export.

- Architecture, API reference, env vars, and testing checklist → **[LEAD_SYSTEM.md](LEAD_SYSTEM.md)**
- Firebase project + credentials setup → **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**

Email and all other channels are **optional** — if unconfigured, leads still
save and the site keeps working. No paid service is required to run the site.

## Deployment

Deploys to **Vercel**: import the repo (Vite auto-detected), add the environment
variables from [`.env.example`](.env.example), and deploy. The frontend builds
to `dist/`; the `api/` functions deploy automatically; `vercel.json` routes
`/admin` to the SPA. Full steps are in [LEAD_SYSTEM.md](LEAD_SYSTEM.md#deployment-vercel--firebase).

For local full-stack dev (frontend + functions): `npx vercel dev`.
