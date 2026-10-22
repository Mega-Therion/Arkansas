# Security notes: dependency audit

Checked 2026-10-22 on main (363b3ab).

- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities. Nothing that ships to the site is affected.
- `npm audit` (including build tools): 5 high, 2 moderate. All of them come in through Tailwind CSS 3.4:
  - `braces` <=3.0.3 (GHSA-vfj7-8cjw-p6xm), reached through `chokidar`, `micromatch` and `fast-glob`: a crafted brace pattern can exhaust the stack. No fixed 3.x release exists, so an `overrides` pin cannot clear it.
  - `postcss-selector-parser` <7.1.6 (GHSA-rj75-hqrm-r3gf): quadratic parsing of hostile selectors. Tailwind 3 needs the 6.x line.

Why this is accepted for now: both are slowdowns triggered by hostile input to the build. The build only reads this repository's own `tailwind.config.cjs` globs and CSS, so the input is ours. The built site in `dist/` contains none of these packages.

The fix is Tailwind 4, which drops `chokidar` and the 6.x parser. It is a migration, not a version bump: it needs `@tailwindcss/postcss` in place of the `tailwindcss` PostCSS plugin, the config moved to CSS (`@theme`), and a check of every utility the site uses. Do it in its own PR. Before merging that PR:
1. `npm ci && npm run build && npm run check:dist` pass.
2. `npm audit` shows 0 high.
3. The built pages are compared side by side with production at phone and desktop widths, including reduced motion.

Dependabot ignores Tailwind major versions until then (`.github/dependabot.yml`).
