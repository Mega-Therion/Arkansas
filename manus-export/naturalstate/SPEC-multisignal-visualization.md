# Spec: Multi-signal 24-hour visualization

## Objective

Add a responsive hydrologic-signal section for the currently selected Arkansas monitoring location. It will let visitors inspect USGS-returned discharge (`00060`), gage height (`00065`), and water temperature (`00010`) on a shared trailing-24-hour timeline. This is a visualization enhancement, not a new data source: use the existing USGS Water Data APIs v1 request, selected station, refresh cadence, and provenance fields.

Success means visitors can compare when the three kinds of measurements were observed without mistaking different units for a shared scale or interpreting gaps as measured values. The dashboard must retain source truth for approval, qualifier, and incomplete-result state.

## Assumptions for approval

- Reuse only records already returned by the selected station's existing USGS v1 24-hour query; do not increase the API request count or add an endpoint.
- Use three vertically aligned, discrete-point charts with a common Central-time x-axis and independent y-scales for each measurement type.
- Group records by their exact returned unit. If one parameter arrives in more than one unit, keep those groups separate; do not convert, merge, or imply direct numeric comparability.
- Keep the existing discharge visualization and station controls. Add the signal section after the observation console and before the material studies.
- Preserve the existing Arkansas design language and reduced-motion behavior.

## Tech Stack

React 18, TypeScript, Vite, SVG, existing GSAP utilities, CSS custom properties, Vitest, and React Testing Library. Do not add a new charting or data dependency.

## Commands

- Install from lockfile: `pnpm install --frozen-lockfile`
- Test: `pnpm test`
- Production build: `pnpm build`
- Development preview: `pnpm dev`

## Project Structure

- `src/types/water-data.ts` — expose the already-returned observations for all three supported parameters without removing the existing discharge-series contract.
- `src/hooks/useWaterData.ts` — pass the normalized selected-station observations through the existing single request and completeness state.
- `src/components/SignalTimeline.tsx` — render the three parameter groups as aligned point-only SVG plots, including accessible summaries and table alternatives.
- `src/components/SignalTimeline.test.tsx` — deterministic cases for time placement, units, provenance, missing data, and partial-result display.
- `src/App.tsx` and `src/styles/live-dashboard.css` — add the new section, navigation anchor where useful, responsive layout, and focus/reduced-motion details.
- `README.md` and `docs/design-system.md` — document the additional real-data visualization and its limitations.

## Code Style

Match the existing typed React components and source-data filtering. A plot may include only finite values with parseable source timestamps; sort without mutating the input and do not synthesize points:

```ts
const points = observations
  .filter((row) => row.parameterCode === parameterCode
    && Number.isFinite(row.value)
    && Number.isFinite(Date.parse(row.observedAt)))
  .slice()
  .sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
```

Keep parameter-code handling exhaustive, preserve original values and units, and use semantic labels rather than relying on color alone.

## Testing Strategy

Use Vitest and React Testing Library with fixed observation fixtures; do not depend on live USGS responses. Cover all three parameters, multiple exact units, timestamps on the shared 24-hour axis, source approval and qualifiers, empty parameter groups, partial-series state, and reduced-motion-safe behavior. Assert that output contains measured markers but no connector path or filled area. Run the full suite and production build after integration, then inspect desktop and narrow mobile layouts.

## Boundaries

- **Always do:** Plot only real returned records; retain timestamps, units, `Approved`/`Provisional` state, qualifiers, and partial-series messaging; show each parameter's scale separately; provide readable non-color-only labels and a semantic table alternative.
- **Ask first:** Add new data sources, measurements, time windows, polling behavior, dependencies, derived statistics, or persistent storage.
- **Never do:** Interpolate or bridge sample gaps; fabricate data for empty periods; convert or combine unlike units silently; describe observations as water quality, station health, forecasts, or verified agency conclusions.

## Success Criteria

1. The selected station's returned discharge, gage-height, and temperature records appear in separate plots on one trailing-24-hour timeline; a parameter with no observations has an explicit empty message.
2. Every plotted marker corresponds to an actual finite USGS record. No line, area fill, synthetic baseline, smoothed value, or trend score is rendered.
3. Time labels use `America/Chicago`. Each parameter and exact returned unit has its own value scale; mixed units are never combined on a single scale.
4. Approval status and qualifier remain available in a per-observation table or equivalent accessible detail. A capped series continues to be visibly marked partial.
5. The new section uses only the existing USGS query and refresh process, preserves current source attribution and no-data/error/stale behavior, and works at 320px, 390px, and desktop widths.
6. All deterministic tests and `pnpm build` pass; desktop and mobile previews show no horizontal overflow.

## Open Questions

None beyond approval of the assumptions above.
