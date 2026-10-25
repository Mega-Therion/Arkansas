# Natural State — Arkansas Sovereign Design System

A responsive React showcase for an ultra-refined design system inspired by Arkansas pine, karst springs, novaculite, roadway materials, and state-level verification.

## Run locally

Requires Node.js and pnpm 11.25.0 (pinned in `package.json`). Run `pnpm install`, then `pnpm dev`. The Vite server listens on `0.0.0.0:3000`, matching the managed preview runtime. `pnpm build` runs strict TypeScript checks and creates the static production output in `dist/`.

## Source map

- `src/styles/design-tokens.css` — named Arkansas color primitives, 50–950 Pine/Honey/Spring/Sky/Clay ramps, paired semantic colors, elevation, glass, metallic borders, spacing, and radius tokens.
- `tailwind.config.cjs` — Tailwind extensions for color aliases, typography, blur, shadows, radii, and material easing.
- `src/components/QuartzPanel.tsx` — frosted glass surface with caustic and prismatic edge lighting.
- `src/components/HoneyButton.tsx` — honey-gradient primary and quiet button variants with focus, hover, press, and disabled states.
- `src/components/HighwayBadge.tsx` — tactile pavement badges with text-backed normal, live, verified, info, and alert states.
- `src/components/VerificationSeal.tsx` — platinum-thread state seal with emerald verified pip.
- `src/components/MetricCard.tsx` and `src/components/FlowChart.tsx` — reusable telemetry components.
- `src/App.tsx` — live dashboard, interactions, responsive navigation, and material specimen board.
- `.stitch/DESIGN.md` — implementation-backed Stitch-compatible design-system guide.

The dashboard is a visual prototype; its telemetry values are sample data rather than a connected government data service. The generated visual direction image is referenced from project-managed storage in the showcase.
