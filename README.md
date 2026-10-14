# Customer Dashboard

SvelteKit 2 + Svelte 5 (runes) + TypeScript. Lists customers from a REST API, with status filter, search, responsive layout and a detail modal.

## Requirements

- Node.js >= 20
- npm

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm test           # unit tests (Vitest)
npm run check      # type check (svelte-check)
npm run build      # production build
```

## Mock API

Internal SvelteKit endpoint: `GET /api/customers` (700 ms simulated latency).

To try the non-happy paths, add a query string to the page URL:

- `/?fail=1`: API returns 500 -> error state with "Reintentar".
- `/?empty=1`: API returns `[]` -> empty state.

## Structure

```
src/
  routes/
    +page.svelte              page composition only
    api/customers/+server.ts  mock REST endpoint
  lib/
    features/customers/
      domain/      types, pure filter logic, repository interface
      data/        HTTP repository implementation
      state/       rune-based store
      components/  StatusBadge, SearchInput, StatusFilter, CustomerTable, CustomerCardList, CustomerList, CustomerDetailModal
    shared/        generic UI states (Loading/Error/Empty), formatters
    server/        mock data
    styles/        design tokens + global CSS
```

## Technical decisions

- **Feature-based + layered**: domain (pure TS) / data / state / UI. Dependencies point inward.
- **SOLID**: filtering, fetching, state and rendering are separate units. The store depends on a `CustomerRepository` interface (DIP), so tests inject fakes and the REST source can be swapped without touching UI.
- **Runes store (class)**: `$state` + `$derived` keep filter results always in sync with no manual effects.
- **Responsive**: table on desktop, fewer columns on tablet, cards on mobile (same data, CSS breakpoint).
- **Native `<dialog>`** for the detail view: focus trap, Esc and inert background for free.
- **Plain scoped CSS + tokens**: no extra dependency; Tailwind not needed at this size.
- **Accessibility**: labelled inputs, radio group filter, `role=status/alert`, reduced-motion support.
- **Pinned to SvelteKit 2** to stay compatible with Node 20/22.
