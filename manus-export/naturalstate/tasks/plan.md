# Implementation Plan — `multisignal-visualization`

Source of truth: `SPEC-multisignal-visualization.md`. This plan covers only the first dependency-ordered follow-up module. `external-deployment-package` follows after this module is implemented and verified.

## Approach

Extend the existing in-memory water state with the selected station's complete normalized `WaterObservation[]` from the response already fetched by `fetchWaterSeries`, plus the timestamp anchoring the query window. Keep the existing `series` property dedicated to discharge so `FlowChart` and its callers remain stable. Do not add a USGS request, parameter, dependency, server, database, or persisted state.

Add `SignalTimeline`, which groups the returned records into the three approved parameter families and then by the exact returned unit. Plot only finite source values with parseable timestamps. Every plot uses the same trailing-24-hour window in `America/Chicago`; each parameter/unit group receives its own vertical scale. Render point markers only—no path, fill, smoothing, normal band, or interpolated value. Add accessible titles/summaries and a semantic observation table retaining source time, raw value, unit, approval, and qualifier. A parameter/unit group with no rows gets an explicit message; a capped response reuses the existing partial-series signal.

Integrate the section after the observation console and before material studies, preserving the Natural State token system, responsive behavior, and reduced-motion preference. Document that the section reports source observations rather than water quality, forecast, or health.

## Project structure

- `src/types/water-data.ts` — observation collection and query-window state contract.
- `src/hooks/useWaterData.ts` — expose all returned observations from the existing query; leave current latest-value and discharge-series behavior intact.
- `src/hooks/useWaterData.test.tsx` — assert the returned observation set and query window survive the hook lifecycle and retain partial status.
- `src/components/SignalTimeline.tsx` — parameter/unit grouping, independent scales, shared time axis, marker-only small multiples, empty states, and accessible data details.
- `src/components/SignalTimeline.test.tsx` — deterministic rendering, time placement, units, provenance, empty/partial states, and no invented geometry.
- `src/App.tsx`, `src/App.test.tsx`, and `src/styles/live-dashboard.css` — place and style the section; test live-state integration.
- `README.md` and `docs/design-system.md` — document the new visualization and its data boundaries.

## Dependency graph and implementation order

1. **Data contract:** add typed `signalObservations` and query-window-end fields, populate them from the existing successful request, and update hook fixtures. This is the producer contract for the chart.
2. **Chart component:** build `SignalTimeline` against the agreed fields, then add deterministic component tests. This may proceed in parallel with the hook's internal implementation once the exported type is fixed.
3. **Dashboard integration:** add the section and responsive styles after the component contract is stable. Add app-level tests for the selected-station data and visible partial/empty messaging.
4. **Documentation and delivery checks:** update README/design guide; run tests/build and inspect preview at desktop, 390px, and 320px. After this module is complete, the independent packaging module may use the final build output.

## Dependencies and risks

No new package is needed. Reuse React, TypeScript, SVG, current normalized observations, existing CSS tokens, and current Vitest/Testing Library setup. Group exact returned units separately so a unit change cannot silently create an invalid scale. Reuse the eight-page completeness state so pagination caps remain visible. If all observations are absent for a family, show a clear empty state. Avoid animating data geometry; static plots already satisfy reduced-motion behavior, while any section reveal must have an immediate reduced-motion equivalent.

## Serving and integration

This remains a client-only route inside the current Vite static SPA. The section consumes the selected station's already-loaded in-memory response. Preserve the existing `public/manus-routes.json` routes; no route change is required. A later packaging module will bundle the build output and hosting instructions from the final source state.
