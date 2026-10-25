# TODO — Natural State Design System

## 1. Design tokens and palette foundation — complete
- [x] Deliver a design-token foundation as CSS custom properties in `:root` and a Tailwind config extension, covering the specified Arkansas-inspired color primitives, semantic aliases, elevation and pine-shadow scales, blur filters, border treatments, and radius scales.
- [x] Preserve the named color families and values in the source brief: Ozark Mint `#E2F3E9`, `#C5E7D4`; Ouachita Pine Needle `#11291F`, `#1B3D2F`; Pine Bark Brown `#3B2920`, `#5A3E31`; Ozark Lichen/Sage `#9FB3A5`; Delta Alluvial Clay `#9E4732`; Bluejay/Sky Blue `#1D70B8`, `#EBF5FB`, `#85C1E9`; Spring Liquid Aqua `#00A896`, `#38E1D3`, `#E0F7F6`; Mammoth Karst Cyan/Deep Mineral Pool `#0A3641`; Cotton White `#FAF9F6`, `#FFFFFF`; Wild Cherry Blossom `#FCE4EC`, `#F8BBD0`; Raw Clover Honey `#D48B18`, `#F5B041`; Highway Pavement Grey `#2B2D2F`, `#4A4D50`, `#8E9297`; highway paint `#FEE12B`, `#FFF275`; Novaculite Whetstone `#EFECE6`; Emerald Fire `#00C853`, `#097969`; Platinum thread `#E5E4E2`, `#FFFFFF`, `#B0C4DE`; Gold `#FFDF73`, `#D4AF37`.
- [x] Ensure semantic foreground/background pairs and usable focus, hover, disabled, success, warning, and alert states.

## 2. QuartzPanel glass component — complete
- [x] Deliver a reusable translucent frosted-glass card with `16px` backdrop blur, dimensional caustic edge lighting, prismatic hairline border sheen, crystal highlight gradients, and soft pine-toned depth.

## 3. Pavement and Highway badge suite — complete
- [x] Deliver modular, sharp-edged tactile badges using pavement greys, retroreflective highway yellow, beaded white rules, and accessible state variations.

## 4. HoneyButton primary action — complete
- [x] Deliver a reusable primary action button with viscous clover-honey gradients, metallic gold edge stroke, luminous focus treatment, and smooth fluid hover and press elevation.

## 5. Sovereign Verification Seal — complete
- [x] Deliver an official state-capacity verification badge with platinum thread border, diamond-like caustic shine, emerald verified pip, and clear certified-state semantics. The dashboard specimen explicitly identifies itself as decorative and not a verification claim.

## 6. Responsive Hero Showcase / Living Dashboard — complete
- [x] Deliver an interactive responsive preview featuring a frosted Ouachita Quartz header, Pine Needle/Sky Blue/Honey Gold data accents, Cotton White canvases, and Novaculite framing.
- [x] Include restrained refraction, liquid elevation, focus, hover, active, and reduced-motion behavior across the showcase and components.
- [x] Ship clean, modular React component, Tailwind, and CSS source structure with reusable APIs and a cohesive live showcase demonstrating the full aesthetic system in motion.

## 7. Desktop and mobile visual direction — complete
- [x] Generate a UI-only high-fidelity desktop mockup at approximately 1440px and a mobile mockup at approximately 390px before application-code changes; keep both as project design references, not as shipped dashboard content.
- [x] Preserve the approved high-modernist Arkansas palette and material language. Make the selected Arkansas monitoring location, latest discharge, API-returned unit, actual observation time, source, and Approved/Provisional status legible. Show optional gage-height and water-temperature tiles only where data exist.
- [x] Include explicit loading, stale, empty, and error examples; do not show fabricated health/readiness scores, fixed system totals, station freshness guarantees, or generated readings as live data. Show a responsive mobile layout with no horizontal overflow.

## 8. USGS Water Data APIs v1 integration — complete
- [x] Use only the documented USGS Water Data APIs v1 at `https://api.waterdata.usgs.gov/ogcapi/v1`; retrieve Arkansas using `state_code=05` and discharge using parameter code `00060`. Do not use legacy NWIS/WaterServices endpoints.
- [x] Populate station choices from returned Arkansas latest-continuous discharge records, deduplicate by `monitoring_location_id`, and follow provider-supplied `rel=next` pagination links. Do not claim a complete station total if pages have not been loaded.
- [x] For the selected station, retrieve its actual continuous discharge records over the preceding 24 hours. Plot returned timestamps and finite numeric values in chronological order; preserve the API-provided unit. Retain measurement timestamps, source IDs, `approval_status`, and qualifiers.
- [x] Bound series retrieval to at most eight source pages of 500 records each. If a safe source-provided `rel=next` remains after that bound, keep the returned observations but visibly identify the result as partial; never imply it includes every 24-hour record. Reject unsafe series-page links rather than following them or describing the response as complete.
- [x] Retrieve gage height (`00065`) and water temperature (`00010`) only where the selected station returns those series. When a series is unavailable, show “Not reported at this station,” not zero or an estimated replacement.
- [x] Show an actual “Latest reported” observation timestamp localized to `America/Chicago`, the returned unit, Approved/Provisional state, and any qualifier. Show the page's last successful refresh separately. Explain that provider telemetry may be delayed.
- [x] Refresh on a 15-minute interval while the page is open and provide a user-triggered refresh. Prevent overlapping requests, cancel obsolete station requests, and clean up timers. On a failed background refresh, preserve the last successful in-memory observation and mark it stale; with no successful data, show an explicit loading/empty/error state. Never render hard-coded demo data as a fallback.

## 9. Functional and accessible dashboard — complete
- [x] Remove hard-coded or unsubstantiated “verified state assets,” “watershed health,” “system readiness,” fixed active-site counts, fake station statuses, and fictional trend percentages. Do not calculate statewide aggregates or scores.
- [x] Replace the fake region options with an accessible Arkansas station selector populated from USGS data. Search filters the actual returned station names or identifiers. Selecting a station updates its current discharge, optional measures, timestamps, quality state, and 24-hour chart.
- [x] Make visible navigation, search, refresh, and support controls perform their stated function or remove them. Do not imply authentication, a secure state network, or an official certification of provisional sensor measurements. Attribute the observations to USGS with a working source link.
- [x] Build an accessible SVG time-series chart with observation-derived time labels and an accessible textual summary. Label the series “Observed discharge”; do not imply a “normal range” unless the source supplies one. Provide visible focus, keyboard operation, meaningful screen-reader labels, and non-color-only status cues.
- [x] Preserve the Natural State token system and responsive layout down to 320px. Use restrained GSAP feedback only for purposeful interactions, scope and clean up animations, and respect `prefers-reduced-motion` with an immediate/nonanimated equivalent.
- [x] Cover loading, no-data, error, stale-data, station-change, optional-series-unavailable, and refresh states using deterministic test fixtures; test logic does not depend on live USGS availability.

## 10. Markdown design-system reference page — complete
- [x] Create `docs/design-system.md` documenting the implemented Natural State brand, token roles, component examples, data provenance/status conventions, accessibility, and motion rules.
- [x] Render first-party GFM Markdown at `/design-system` with headings, paragraphs, lists, tables, links, and code fences. Sanitize generated HTML with DOMPurify before DOM insertion; block scripts, inline event handlers, and unsafe URL schemes while preserving safe semantic content.
- [x] Provide a keyboard-accessible link from the dashboard; support direct navigation and browser history at `/design-system`. Update `public/manus-routes.json` to declare the implemented `/` and `/design-system` pages.
- [x] Test safe rendering and page navigation using representative Markdown fixtures, and ensure the page remains readable on narrow screens.

## 11. Project documentation and truthfulness — complete
- [x] Update README and `.stitch/DESIGN.md` to reflect the USGS v1 source, actual data scope/limitations, status semantics, local commands, and design-reference route. Distinguish test-only synthetic records and mockup references from runtime observations.
- [x] Keep all documentation aligned with implemented behavior; remove claims that the live interface is a secured or fully connected statewide system where no such capability exists.
- [x] Keep pnpm lockfile and project configuration consistent with the approved GSAP, Markdown/sanitization, and deterministic test dependencies. The production build passes `pnpm build`.


## 12. Multi-signal 24-hour visualization — open
- [ ] Add a responsive hydrologic-signal section for the currently selected Arkansas monitoring location using USGS-returned discharge (`00060`), gage height (`00065`), and water temperature (`00010`) records from the existing selected-station 24-hour request; do not add an endpoint or increase the API request count.
- [ ] Show three vertically aligned discrete-point charts on one trailing-24-hour `America/Chicago` time axis. Give each parameter and exact returned unit its own value scale. If a parameter has multiple returned units, keep those unit groups separate; do not convert, merge, or imply direct numeric comparability.
- [ ] Plot only finite source values with parseable source timestamps. Do not render connector lines, filled areas, synthetic baselines, smoothed values, interpolations, or trend scores.
- [ ] Keep source time, raw value, returned unit, `Approved`/`Provisional` status, and qualifier available in accessible details. Keep the existing capped-series partial signal visible; show an explicit empty state for any parameter/unit group with no observations.
- [ ] Preserve the current selected-station controls, discharge-series contract, attribution, loading/empty/error/stale behavior, responsive Arkansas design, and reduced-motion support. Add the section after the observation console and before material studies.
- [ ] Keep tests deterministic and independent of live USGS availability. The full `pnpm test` suite and `pnpm build` must pass; desktop, 390px, and 320px preview layouts must have no horizontal overflow.
