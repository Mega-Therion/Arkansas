# Spec: `dashboard-experience` — Responsive Water Dashboard

## Objective

Make the Natural State dashboard function as a trustworthy live Arkansas streamflow interface rather than a static telemetry-themed mock. Replace dead controls and hard-coded data with useful station selection, search, chart and refresh behavior. Preserve the approved visual system. Success means a visitor can find a reported stream site, inspect its latest discharge and trailing 24-hour series, understand data provenance/quality, and operate every control by keyboard and screen reader on desktop or mobile.

## Commands

- Development: `pnpm dev`
- Production/type build: `pnpm build`
- Preview build: `pnpm preview`
- Use the generated desktop/mobile mockups as the target and the data hook contract in `SPEC-data-trust.md` as the source of all observations.

## Product requirements

- Replace unbacked metric cards (“verified state assets,” “watershed health,” “system readiness”), fake status dots, static station names/counts, and fabricated percent-change labels with data-derived information or remove them. Do not calculate statewide aggregates.
- Provide a native, keyboard-accessible Arkansas station selector populated from the data module. Search filters actual returned station names/identifiers; selecting a station updates the current-flow and optional data readouts and chart. Remove fake region choices that do not filter data.
- Keep one 24-hour range, whose chart axis labels derive from observation timestamps rather than fixed 06:00–NOW labels. Display actual units and an accessible text summary/table or equivalent for chart content. Do not mislabel the area fill as a “normal range” unless USGS supplies a defined normal band; otherwise label the series “Observed discharge.”
- A manual refresh control invokes the data hook and reports refresh state. Show the last API refresh separately from the latest observation time. Show source attribution with a link to the USGS Water Data APIs. Explain that telemetry may be delayed and that provisional data can change.
- Keep site navigation truthful: remove inert buttons, route them to real page anchors or pages, and give the new Design System route a visible navigation affordance. Search and notification controls must do a real task or be removed. Do not imply user authentication or secure state systems.
- Provide clear loading, empty, stale, and retryable error states. Preserve last successful values as visibly stale if a background refresh fails; do not show demo readings.
- Use explicit labels and `aria-live` status for refresh/result changes without repeatedly announcing the entire chart. Respect focus order, visible focus, reduced motion, contrast, and responsive layouts down to 320px.
- Apply restrained GSAP feedback to purposeful UI state changes only; use `gsap.utils` where relevant (for example, clamping chart coordinate normalization), scoped selectors, and cleanup. Honor `prefers-reduced-motion` in JavaScript and keep a CSS fallback. Avoid entrance animation that delays access to data.

## Tech stack and dependencies

React 18, TypeScript 5, Vite 6, Tailwind 3, existing Lucide icons. Add `gsap` for the explicitly requested `gsap.utils` / controlled feedback; do not add a routing or chart library. Use native HTML controls and the existing SVG chart. Data access/types are owned by `data-trust`.

## Project structure

- `src/App.tsx`: assemble dashboard with live data state and meaningful navigation.
- `src/components/FlowChart.tsx`: SVG time-series chart, dynamic labels and accessible summary.
- `src/components/`: existing reusable cards, badges and control primitives, revised only where needed.
- `src/hooks/useWaterData.ts`: consume the `data-trust` module's public state contract.
- `src/styles/global.css` and `src/styles/components.css`: responsive and accessible dashboard styling; retain reduced-motion rules.
- `public/manus-routes.json`: declare every implemented page route.

## Code style

Use semantic native elements, controlled React state, stable station/time identifiers, and reusable typed components. Do not select DOM nodes globally for animation; scope to a component ref and clean up animation work. Example chart normalization contract:

```ts
const clampY = gsap.utils.clamp(0, chartHeight);
const y = clampY(rawY);
```

## Testing strategy

Use automated component checks with mocked USGS hook states for initial load, selected station, missing optional metrics, stale background refresh, empty data, and errors. Check keyboard interactions and accessible naming in station selection, search, refresh, chart summary, and navigation. Test 320px/mobile/desktop responsive behavior and reduced motion. Run `pnpm build`; do not rely on live API responses for deterministic tests.

## Boundaries

- **Always:** use only API-backed values for live visual claims; keep station scope, measurement time, unit, approval status, and source visible; preserve the Natural State token system; ensure controls work by keyboard and assistive technology; honor reduced motion.
- **Ask first:** introduce another provider, new route/framework, authentication, persistent user settings, a new map service, forecasts, composite metrics, or revised user-approved data scope.
- **Never:** leave visible dead controls, label fake values live, show “verified” for provisional readings, imply all Arkansas water systems are monitored, or animate away essential information.

## Success criteria

1. All displayed telemetry values/statuses are sourced from the selected station's normalized USGS v1 records, with units and actual timestamps; hard-coded fictitious metrics and station lists are removed.
2. Station selection and search operate on returned API data, and station changes update metric values and the 24-hour plot.
3. Every primary control is meaningful and keyboard accessible; no search/region/navigation action only displays a preview toast.
4. The graph is chronological, labeled from its observations, accessible without color-only cues, and accurately names observed versus unavailable data.
5. Refresh/empty/stale/error conditions communicate their state, and reduced-motion users do not receive nonessential animation.
6. Desktop and mobile layouts remain legible without horizontal overflow at 320px; `pnpm build` succeeds.

## Open questions

None. The module consumes the approved data contract in `SPEC-data-trust.md` and visual direction in `SPEC-visual-direction.md`.
