# Implementation Plan — Natural State Live Water Dashboard

## Scope and source of truth

Implement the four approved module specifications in `SPEC-visual-direction.md`, `SPEC-data-trust.md`, `SPEC-dashboard-experience.md`, and `SPEC-design-reference.md`. Preserve the existing Arkansas design tokens and React component suite. Replace the current demo-only telemetry and preview-only controls with a real, read-only USGS Water Data APIs v1 experience and a rendered design-system page.

The API contract is `https://api.waterdata.usgs.gov/ogcapi/v1`. Filter Arkansas using `state_code=05`; use discharge `00060` as the primary measure, with optional gage height `00065` and water temperature `00010` only for stations that return those series. The selected station's chart spans 24 hours. Refresh at most every 15 minutes on the timer, with an explicit user refresh. Preserve returned units, observation time, approval state, and qualifiers. Follow server-provided `next` links. Do not infer statewide totals, readiness, health scores, percent changes, sensor freshness, or verification.

A bounded query against the documented v1 `continuous/items` endpoint succeeded with JSON and `Access-Control-Allow-Origin: *` on 2026-10-23. The application can therefore use anonymous browser `fetch` GET requests without a proxy, API key, backend, database, or persisted data. If runtime provider access fails, the UI must show explicit loading, empty, stale, or error states; it must not substitute mock values. The USGS API and data remain outside the website's control and may delay or revise observations.

## Design direction

**Design movement:** High-modernist Arkansas institutional minimalism, combining Swiss editorial precision with the physical palette and material cues of the Natural State.

**Core principles:** Keep measurements traceable to their source; make status and units explicit; use tactile material treatments sparingly; make the page calm, legible, and fully operable across input modes.

**Color philosophy:** Warm Cotton White and Novaculite grounds preserve reading comfort. Ouachita Pine supplies institutional structure. Spring Aqua denotes water activity, Sky Blue denotes information, Honey marks deliberate actions, and Delta Clay is reserved for actual alerts. Emerald remains a semantic verification cue and must not imply that provisional sensor data are certified.

**Layout paradigm:** Retain the left-anchored dashboard shell, but make the selected Arkansas monitoring location the main reading context. Place the latest discharge and source time above a real 24-hour trace; show station-available companion measures nearby and the reporting-station list alongside or below. Stack these deliberately on narrow screens. Retire decorative system counts and fictional agency sections rather than disguising them as data.

**Signature elements:** Refractive quartz panel edges around observation details; fine topographic/river contours that do not masquerade as a real geospatial map; pavement-backed labels for discrete source/data-quality states.

**Interaction philosophy:** Every search, station picker, refresh button, link, and range/control label performs a clear task. Station selection changes every station-scoped reading. Source time and page refresh time remain distinct. Failure never erases known values silently or invents replacements.

**Animation:** Use short, restrained GSAP feedback for selection and successful refresh only. Use `gsap.utils` for bounded numeric mapping if needed; do not animate essential values in ways that obscure a change. Clean up effects on unmount and disable nonessential motion when `prefers-reduced-motion` is active. Keep an equivalent immediate CSS state.

**Typography system:** Retain Manrope for headings, readings, and body; retain DM Mono for timestamps, coordinates, parameter labels, and short status tags. Do not rely on tiny mono labels for critical instructions.

**Brand essence:** A precise public view of Arkansas water, for people who need to understand what USGS reports and when. Personality: grounded, exact, quietly sovereign.

**Brand voice:** Headlines are editorial but concrete; control labels name the action; data microcopy states source, timing, units, and uncertainty. Examples: “Latest reported discharge.” “Provisional observation · reported 14:30 CT.” “No flow series is currently available for this station.”

**Wordmark and mark:** Retain the Natural State wordmark and existing geometric river mark; do not introduce a competing logo. Use the mark as a compact navigation identity, not as a measurement or certification seal.

**Signature brand color:** Spring Liquid Aqua `#00A896`, reserved for water activity and active-series emphasis.

## Architecture and implementation approach

1. **Visual direction.** Generate two UI-only high-fidelity references (desktop and mobile) using the approved mockup workflow. Keep generated images in the project as design references; they are not shipped dashboard content. Review them against source attribution, selected-station context, status visibility, and mobile readability before code changes.
2. **Dependencies and diagnostics.** Before editing application source, inspect the project's registered TypeScript/JavaScript/CSS/JSON diagnostics and complete missing registration. Keep pnpm `11.25.0` and the existing Vite/React/TypeScript toolchain. Add `gsap` for the requested utilities/limited motion, `marked` plus `dompurify` for safely rendering the authored Markdown guide, and a Vite-compatible Vitest + Testing Library + jsdom setup for deterministic unit/component checks. Do not add a charting or routing framework.
3. **USGS data boundary.** Add typed USGS v1 request/response handling in `src/data/` and normalized records in `src/types/`. Centralize URL construction and parameter allowlists. Use native `fetch`, request cancellation, bounded page handling, API-provided pagination links, station deduplication, numeric validation, timestamp ordering, and exact source metadata. Add a React hook to manage initial load, station changes, 15-minute polling, manual refresh, and stale/empty/error states. Keep the integration read-only and in memory.
4. **Dashboard experience.** Use the mockups and hook contract to update `src/App.tsx`, `FlowChart`, and existing components. Make the station selector/search operate on returned sites; chart the selected station's actual 24-hour discharge; show its unit, actual local observation time, approval state, qualifiers, source, refresh time, and optional companion metrics only when returned. Replace false live claims and make navigation and actions functional. Preserve responsive layout, keyboard and assistive-technology access, focus visibility, and reduced-motion behavior.
5. **Design reference.** Author `docs/design-system.md` from existing tokens and implemented behavior. Add a `DesignSystemPage` and small pathname/popstate route switch for `/design-system`; render Markdown with `marked` and sanitize through DOMPurify before insertion. Link it from the main navigation. Update `public/manus-routes.json` to declare `/` and `/design-system`.
6. **Docs and integration.** Update README statements that currently call telemetry a prototype and document the USGS v1 source, local commands, data limitations, status semantics, and guide route. Keep `.stitch/DESIGN.md` aligned with the actual implementation rather than aspirational UI states.

## Project structure

- `src/data/usgs-water-data.ts` — documented v1 endpoint construction, schema validation/normalization, safe pagination, station lookup, and observation retrieval.
- `src/types/water-data.ts` — normalized station, observation, availability, and request-state types.
- `src/hooks/useWaterData.ts` — station list/detail loading, refresh interval, abort lifecycle, and stale/error states.
- `src/components/FlowChart.tsx` — responsive SVG built only from real observation timestamps/values, with accessible text summary.
- `src/components/` — existing Natural State UI primitives; update only as needed for real source/status and no-data states.
- `src/pages/DesignSystemPage.tsx` — accessible reference page.
- `src/lib/markdown.ts` — GFM parser and sanitization boundary.
- `docs/design-system.md` — first-party Markdown guide.
- `tests/` or colocated `*.test.ts(x)` — deterministic tests for parsing, pagination, hook and accessible page behavior; fixtures contain synthetic records labeled as test fixtures only.
- `public/manus-routes.json` — synchronized page route declaration.
- `plan.md`, `TODO.md`, `SPEC-*.md`, and `CAPABILITY-MAP.md` — project planning and approved requirements.

## Dependencies, risks, and mitigations

The selected USGS API is external and may change availability, rate limits, response shape within additive version changes, or station coverage. Validate returned fields and keep a visible source link; handle network failures without fake fallback values. Use only documented v1 URLs and API-provided pagination URLs. A provider response can include provisional data or qualifiers, so keep these attached to each observation and visible in context.

Direct browser GET is appropriate based on the successful CORS probe; do not add a proxy preemptively. If browser requests fail despite the probe, stop and report the concrete blocker before introducing backend infrastructure. Poll only every 15 minutes, prevent request overlap, cancel stale station requests, and use modest page sizes. Bound selected-station series to eight pages of 500 records; if USGS supplies a next link beyond that bound, visibly mark the returned observations as partial. Do not claim completeness if the API has more pages than were loaded.

The chart and dashboard have no current automated test framework. Introduce deterministic mocked-fetch tests with the planned Vitest/Testing Library setup. Synthetic fixtures exist only inside tests and are never rendered as runtime fallback data. Markdown is bundled first-party content but still gets sanitized to preserve the rendering boundary.

## Work sequencing and checkpoints

Complete the visual mockups first, then data types/retrieval and deterministic parsing tests, then the hook and state lifecycle, then the dashboard/chart and accessible interactions. Finish with the Markdown reference route, synchronized manifest, project documentation, and end-to-end build. Start the managed Preview server after the interface is substantive and verify that the page and route manifest respond successfully. Build with `pnpm build`, run the focused unit/component suite, and correct observed defects before recording the intended Git checkpoint on the canonical `main` branch. Keep generated mockup assets separate from production UI assets. Do not publish unless the project's existing authorization/configuration explicitly permits it.

## Boundaries

- **Always:** Preserve user/concurrent project changes, the Natural State visual language, source attribution, actual measurement metadata, and all approved module acceptance criteria. Keep runtime data sourced from USGS v1 only, use no synthetic runtime fallback, preserve local project versioning, and keep the route manifest synchronized.
- **Ask first:** Add a proxy/backend, database, credentials, durable data storage, external map tiles, another data provider, discrete water-quality samples, forecast/scoring logic, authentication, or materially different metrics/geography/update policy.
- **Never:** Use legacy NWIS/WaterServices endpoints; claim a statewide composite or system status without a specified source/formula; misrepresent provisional observations; store secrets in client bundles; overwrite concurrent work; or replace the accessible React implementation with static mockup imagery.


## Follow-up implementation plan — `multisignal-visualization`

Add a source-backed signal section after the observation console and before the material studies. Extend the existing selected-station state with all normalized observations from the same USGS response plus the query-window end; keep the existing discharge `series` contract unchanged. Render discharge, gage height, and temperature in vertically aligned SVG small multiples using one trailing-24-hour Central-time x-axis and independent value scales per parameter and exact returned unit. Preserve discrete markers only, with semantic value/time/approval/qualifier details; keep empty and truncated-series messaging explicit. Use the existing Arkansas tokens and responsive/reduced-motion rules without adding dependencies or endpoints.

Implementation order: (1) typed hook state and deterministic hook fixtures; (2) `SignalTimeline` grouping, scaling, accessible summary/table, and isolated component tests; (3) dashboard integration, responsive styles, and user-visible partial/empty states; (4) update source/design documentation and validate with tests, build, and desktop/mobile preview. Data-state and plotting code may proceed in parallel only after the new hook/component boundary is fixed; dashboard integration follows both. The later approved-map package module depends on this feature and is not part of this plan.

Primary risks are mixed units, a capped USGS response, and no observations for companion parameters. Keep each exact-unit group on its own scale, reuse the hook's partial flag, and render an explicit unavailable message rather than a substitute value. Preserve `America/Chicago`, exact source values, approval and qualifier metadata, and `prefers-reduced-motion` behavior. The implementation stays in the existing static React/Vite app and adds no server, persistence, credentials, or external chart library.
