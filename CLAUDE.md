# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (Pages Router) app that lists and displays NYC restaurants sourced from the MongoDB `sample_restaurants` sample dataset. Originally scaffolded from Vercel's `with-mongodb` example. UI is built with `react-bootstrap`; restaurant locations render on a Leaflet map via `react-leaflet`.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`; do not use npm/yarn).

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server at http://localhost:3000
pnpm build        # production build
pnpm start        # run production build
```

There is no lint script and no test suite configured in this repo — don't assume `pnpm lint` or `pnpm test` exist.

### Environment

Requires `.env.local` with at least `MONGODB_URI` (a MongoDB connection string for a cluster containing the `sample_restaurants` sample database, collection `restaurants`). `lib/mongodb.ts` throws at import time if `MONGODB_URI` is missing.

## Architecture

- **Pages Router**, mixed JS/TS (`.js`/`.jsx` for pages/components, `.ts` for the Mongo client). `tsconfig.json` has `strict: true` but `allowJs: true`, so JS files aren't type-checked.
- **Data flow**: pages fetch from local API routes using SWR, not directly from MongoDB.
  - `pages/api/restaurants.js` — paginated list, `?page=&borough=`, queries the `restaurants` collection, returns `{ restaurants, totalCount, totalPages }`. Page size is fixed at 10 (`itemsPerPage`).
  - `pages/api/restaurant.js` — single restaurant by `?id=` (matched against `restaurant_id`, not Mongo `_id`).
  - Both routes get the shared client via `clientPromise` from `lib/mongodb.ts`, which caches the connection on `global._mongoClientPromise` in dev to survive HMR, and creates a fresh client per instance in production.
- **Pages**:
  - `pages/index.js` — landing page with hero image (`components/background.js`) and CTA into `/restaurants`.
  - `pages/restaurants.js` — paginated table, filterable by `borough` (query param, case-normalized via `capitalizeWords`). Resets to page 1 whenever the borough filter changes. Handles loading/error/empty states inline (no shared data-state component).
  - `pages/restaurant.js` — detail view: address, a Leaflet map of the restaurant's coordinates, and up to 4 recent inspection grades. `components/map.js` is loaded via `next/dynamic` with `ssr: false` because Leaflet needs `window`.
  - `pages/about.js` — static About page.
- **`components/layout.js`** wraps every page (registered in `pages/_app.jsx`): navbar with a borough search box that navigates to `/restaurants?borough=...`.
- **`utils/formatters.js`** — `formatAddress` (building + street) and `capitalizeWords`, shared by list and detail pages.
- **Styling**: global CSS in `styles.css` (imported in `_app.jsx` alongside Bootstrap and Leaflet CSS) using CSS custom properties defined on `:root` (e.g. `--color-orange-primary`) for the app's theme/accent color — prefer reusing these over hardcoding colors. React-Bootstrap's `variant="orange"` (used on buttons/navbar) maps to the `.btn-orange` class here, not a built-in Bootstrap variant.

## Data shape notes

Restaurant documents come from MongoDB's sample dataset and are used mostly as-is (not normalized through a schema/type in this app): `restaurant_id`, `name`, `borough`, `cuisine`, `address: { building, street, coord: [lng, lat] }`, `grades: [{ grade, date, ... }]`. `address.coord` is `[longitude, latitude]` — note the order flip when constructing `{ lat, lng }` for the map (see `pages/restaurant.js`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
