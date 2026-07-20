# Wayfarly — Travel Planner

A full-stack trip-planning app built with Next.js (App Router), TypeScript, Tailwind CSS v4 and MongoDB. Built to demonstrate Server Components, Server Actions, Route Handlers, dynamic routing, the Metadata API, and production-style architecture — and to look genuinely good on a portfolio.

## What's inside

- **Landing page** — hero with an animated SVG route line, feature grid, "boarding pass" trip previews, CTA band
- **Navbar** — nested dropdowns, search, dark/light toggle, auth + admin dropdowns (admin options trigger a SweetAlert2 "restricted area" warning), full mobile menu
- **Footer** — big multi-column footer with a collapse/expand toggle and a "back to top" button
- **Floating Action Button** — bottom-left speed-dial for quick actions (new trip, budget, packing, photo)
- **Auth pages** — `/login`, `/register` with React Hook Form + Zod validation, wired to real Server Actions (bcrypt password hashing, JWT session cookie)
- **Dashboard** (`/dashboard`) — sidebar/mobile-tab navigation, stat cards, upcoming trips, recent activity
- **Trips** (`/trips`) — search + status filters, trip cards with budget progress bars, delete-with-confirm (SweetAlert2)
- **Create/Edit Trip** (`/trips/create`, `/trips/[tripId]/edit`) — validated form wired to Server Actions
- **Trip Details** (`/trips/[tripId]`) — dynamic route with `generateMetadata`, an editable day-by-day itinerary (add/remove days and activities), a budget tracker, an interactive packing checklist (add + toggle items), a photo gallery with real Cloudinary upload, and editable notes with a save state
- **Profile** (`/profile`)
- **Public trip sharing** — a toggle on the trip detail page turns on a read-only `/share/[shareId]` link (copy-to-clipboard, no auth required to view). Two of the four seed trips (Kyoto, Lisbon) are shared by default so you can try it immediately — visit `/trips/kyoto-autumn-wander` and toggle it, or go straight to `/share/kyoto-autumn-wander`
- **Content pages** — `/about`, `/careers`, `/press`, `/privacy`, `/terms`, `/status`, and `/contact` (with a real, validated — if unsent — contact form via a Server Action). Every link in the navbar and footer now resolves to a real page; nothing points at a placeholder `/` or a dead anchor.
- **Settings** (`/settings`) — a dedicated page for appearance (wired to the real dark-mode toggle), notification preferences, default currency, and a danger zone — separate from `/profile`, which stays focused on the account overview
- **Custom 404** (`not-found.tsx`) — travel-themed
- **PDF export** — "Export as PDF" on the trip detail page generates a real, branded, downloadable PDF (itinerary, budget summary, packing checklist, notes) client-side with `jsPDF` — no server round-trip
- **Admin area** (`/admin/dashboard`) — separate `AdminNavbar` + `AdminSidebar`, synced via `SidebarContext` (expand/collapse both together), nested dropdown sidebar groups, notification bell with badge, avatar, search
- **Loading skeletons** (`loading.tsx`) and **error boundaries** (`error.tsx`) for dashboard/trips/trip-details
- Dark/light mode via a custom `ThemeContext` (persisted to `localStorage`, respects system preference on first load)
- Design system: "cartography" palette (deep harbor navy, warm brass, coral accent, teal), `Fraunces` display serif + `Plus Jakarta Sans` body + `Space Mono` for data — all as CSS variables in `globals.css`, so it's consistent everywhere and easy to re-theme
- Every custom CSS class is scoped with a `wayfarly-*` prefix (e.g. `wayfarly-navbar-*`, `wayfarly-tripdetail-*`) to avoid collisions

## Demo data, by design

**The app runs and looks fully populated with zero setup** — `/dashboard`, `/trips`, and the trip detail pages render from seed data in `src/data/trips.ts`. This is intentional so it's immediately screenshot/demo-ready for a portfolio. The real backend (MongoDB models, Server Actions, auth) is fully implemented alongside it — connect a database and it takes over for real accounts and real trips.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the whole app works immediately with seed data, no `.env` required.

> **Note on the dev server:** `npm run dev` runs on webpack rather than Next.js 16's new default, Turbopack. Turbopack is still shaking out bugs — its dev-server file watcher can panic-crash-loop on certain setups (long/nested paths, paths with spaces or parentheses, some network or virtualized filesystems). If you'd like to try Turbopack anyway (it's noticeably faster once it's stable on your machine), run `npm run dev:turbopack` — and if it panics, `npm run dev` is the reliable fallback.

### Connecting the real backend (optional)

1. Copy `.env.example` to `.env.local` and fill in:
   - `MONGODB_URI` — a free MongoDB Atlas cluster works great (mongodb.com/cloud/atlas)
   - `JWT_SECRET` — any long random string (used to sign session cookies)
   - `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — free tier at cloudinary.com/console, used for cover images and gallery uploads
2. Registering an account (`/register`) will now create a real user in MongoDB and log you in via a JWT cookie.
3. Creating a trip (`/trips/create`) will save to MongoDB instead of just validating.
4. To actually **enforce** login on `/dashboard`, `/trips`, `/profile` once real auth is wired up, open `src/middleware.ts` and swap the empty `matcher: []` for the commented-out matcher above it.

Until you add these env vars, the forms still validate properly with Zod and will show a friendly inline message explaining the database isn't connected yet — they won't crash.

## Tech stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- MongoDB via Mongoose (`src/models`, `src/lib/db.ts`)
- Server Actions for all mutations (`src/actions`)
- Route Handlers for image upload + search (`src/app/api`)
- React Hook Form + Zod for all forms
- bcryptjs + jsonwebtoken for auth (cookie-based sessions)
- Cloudinary for image storage
- lucide-react for icons, sweetalert2 for alerts/confirmations

## Project structure

```
src/
├── app/
│   ├── (auth)/login, register        -> auth pages + shared auth.module.css
│   ├── admin/                        -> admin layout, dashboard (own navbar/sidebar)
│   ├── api/upload, search            -> Route Handlers
│   ├── dashboard/                    -> dashboard
│   ├── profile/
│   ├── trips/
│   │   ├── create/                   -> TripForm (shared by create + edit)
│   │   └── [tripId]/edit/            -> dynamic routes
│   ├── layout.tsx, page.tsx, globals.css, not-found.tsx
│   └── middleware.ts
├── actions/                          -> "use server" mutations (trips, auth)
├── components/
│   ├── navbar/, footer/, fab/        -> global chrome
│   └── admin/                        -> AdminNavbar, AdminSidebar, AdminShell
├── context/                          -> ThemeContext, SidebarContext
├── data/trips.ts                     -> seed/demo data
├── lib/                              -> db.ts, auth.ts, validations.ts
└── models/                           -> Mongoose schemas
```

## Notes on scope

This scaffold covers the full page list, database schema, auth flow, image-upload endpoint, and security patterns (ownership-scoped queries, bcrypt hashing, Zod validation on every Server Action) from the original spec.

Every panel on the trip detail page is genuinely interactive, following the same pattern throughout: optimistic local state update + a best-effort Server Action call, so everything feels responsive with the seed data alone and takes over for real once MongoDB is connected:

- **Itinerary** — add/remove days, add/remove activities per day (`src/actions/trips.ts`: `addItineraryDay`, `removeItineraryDay`, `addItineraryActivity`, `removeItineraryActivity`)
- **Packing checklist** — toggle items, add new items (`toggleChecklistItem`, `addChecklistItem`)
- **Gallery** — real Cloudinary upload via drag-and-drop (`addGalleryImage`)
- **Notes** — editable textarea with a save button and a "Saved"/"Unsaved changes" status (`saveTripNotes`)
- **Cover image** — same upload component as the gallery, used on the create/edit trip form

Not included, and a good next feature once the core is deployed: map integration (the last "optional" item from the original spec — PDF export and public sharing links from that same list are now implemented).
