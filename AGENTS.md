# AGENTS.md

Next.js 16 App Router app (code in `src/`), React 19. Single-page assignment starter — no tests, no CI.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000. Dev route types are generated into `.next/dev/types`.
- `npx tsc --noEmit` — typecheck only; passes clean on a fresh checkout (strict mode, alias `@/*` → `src/*`).
- `npm run build` — typecheck + production build. Next 16 no longer runs ESLint during build (and `next lint` is removed), so lint is a separate step.
- `npm run lint` — **broken out of the box**: `eslint.config.mjs` imports `eslint-config-next/core-web-vitals`, but `package.json` pins `eslint-config-next@^0.2.4`, which is an unrelated 2017 package (author Manuel Vila) with no such export — it dies with `ERR_MODULE_NOT_FOUND` before linting anything. Repair first: `npm i -D eslint-config-next@16.4.4` (keep it in sync with the `next` version). Then plain `eslint` lints the whole tree (ESLint 10 flat config).
- Verification order once lint is repaired: `npm run lint -- --fix` → `npx tsc --noEmit` → `npm run build`.

## Quirks

- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`). Don't add manual `useMemo`/`useCallback`/memo; components must stay strictly Rules-of-React-compliant (`"use client"` boundaries included).
- **Tailwind v4 with no config file.** Theme tokens are CSS variables in `src/app/globals.css` (`@theme inline` + shadcn variable block). Colors/fonts are referenced as `bg-primary`, `text-muted-foreground`, etc., not arbitrary Tailwind defaults.
- **shadcn uses the `base-nova` style on `@base-ui/react` primitives** (see `components.json`) — not Radix and not the default `new-york` style. The full component set is already generated in `src/components/ui/`. Don't hand-edit those files; add missing ones with `npx shadcn add <name>` so `components.json` stays authoritative.
- Code highlighting goes through `src/lib/highlighter.tsx` (Shiki with the JS regex engine and lazily imported languages) — don't import `shiki` full bundle directly.

## Layout

- `src/app/` — routes (`page.tsx` is the sole entry page, `layout.tsx` loads fonts + globals).
- `src/components/ui/` — generated shadcn components; `src/hooks/`, `src/lib/` — shared hooks and utils.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
