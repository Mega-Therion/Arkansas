# Spec: `visual-direction` — Natural State Live Dashboard

## Objective

Create a coherent desktop and mobile high-fidelity UI mockup that guides improvements to the existing Natural State dashboard without replacing its approved visual identity. Audience: visitors inspecting Arkansas water observations and the design-system showcase. Success is a legible, technically plausible dashboard direction that makes the selected station, live-data source, actual observation time, units, and provisional/approved status visible.

## Commands and design workflow

Use the approved UI mockup workflow with a UI-only prompt (no physical devices, hands, desks, or photographed screens). Produce one desktop direction at approximately 1440px and one mobile direction at approximately 390px. Preserve the existing dashboard's Arkansas palette and component motifs. Save generated assets within the project as design references; do not use mockup raster content as the shipped interactive dashboard.

## Project structure

- `design-reference/` (or `.stitch/`): generated desktop/mobile mockup references and concise implementation notes.
- Existing implementation remains in `src/`; the mockup does not replace React components.

## Code style

No application code is required by this module. The design annotation should use exact token names from `.stitch/DESIGN.md` and identify component roles rather than introducing an unapproved visual vocabulary.

## Visual requirements

- High-modernist organic minimalism: Swiss typographic precision, Ouachita pine structure, Cotton White and Novaculite grounds, quartz surfaces, spring aqua telemetry, sky-blue informational accents, limited honey actions.
- Retain crisp hierarchy, open spacing, restrained material effects, hairline details, and clear keyboard-focus affordances; no rustic props, generic blue SaaS styling, or ornamental clutter.
- The selected station is a first-class control. The main readout is current discharge with API-returned units, “Latest reported” observation time, a clear Approved/Provisional marker, and a 24-hour chart. Optional gage-height and water-temperature tiles are conditional on station availability.
- Show source attribution (“USGS Water Data APIs”) and honest stale/loading/unavailable/error states in the mockup variants. Do not show fabricated system-readiness, watershed-health scores, fixed station counts, or guaranteed freshness.
- Mobile layout stacks data, exposes controls without horizontal overflow, and keeps touch targets comfortable. No fixed desktop sidebar that consumes the mobile content width.

## Testing strategy

Review both mockup images at their intended sizes against these visual and data-trust requirements before implementation. The images serve as design evidence; they are not a runtime test or the implementation deliverable.

## Boundaries

- **Always:** build on the existing approved token system and use UI-only mockups; treat all telemetry as traceable to the selected station and source.
- **Ask first:** change the approved aesthetic, add geographic map tiles or a new imagery provider, introduce a new brand palette, or alter the selected metrics/source.
- **Never:** represent generated mockup values as production data, depict a physical device, or ship a static mockup in place of accessible React UI.

## Success criteria

1. Both desktop and mobile mockups exist in the project and visibly share one component/token language.
2. The main observation, station context, unit, timestamp, data quality state, source attribution, and optional-metric availability are legible in each layout.
3. The design preserves the Natural State visual identity and presents explicit stale/error/empty states without fabricated telemetry.

## Open questions

None. The existing design system and user-approved USGS scope define the visual direction.
