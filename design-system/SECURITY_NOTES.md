# Security notes: dependency audit

## 2026-10-22: Tailwind 4 migration (clears the dev-tool findings)

- `npm audit` (including build tools): **0 vulnerabilities**, down from 5 high and 2 moderate. All of the old findings came in through Tailwind CSS 3.4 (`braces` via `chokidar`/`micromatch`/`fast-glob`, and `postcss-selector-parser` 6.x).
- `npm audit --omit=dev --audit-level=high`: 0, as before.
- What changed: `tailwindcss` 3.4 → 4.3 with `@tailwindcss/postcss`; the theme moved from `tailwind.config.cjs` into `@theme` in `src/styles/design-tokens.css`. `autoprefixer` was dropped, because Tailwind 4 handles vendor prefixes itself.
- One behaviour difference, fixed: Tailwind 4 makes `text-*` line heights ratios of the font size. `.stat-pill` pairs `text-xs` with its own 8.5px font, so it shrank about 5px and shifted everything below it. `@theme` restores Tailwind 3's fixed line heights.
- Visual parity: full-page screenshots at 1280 px, at 390 px, and at 390 px with reduced motion, before and after, are pixel-identical (0% of pixels differ by more than 40/255; identical page heights). 0 console errors and no horizontal scroll.
- Checks: `npm ci`, `npm run build`, `npm run check:dist` pass.

Dependabot groups `tailwindcss` with `@tailwindcss/*`.

## Earlier record (2026-10-22, main 363b3ab)

The full audit showed 5 high and 2 moderate, all through Tailwind 3.4 and none in shipped code. They were accepted until this migration.
