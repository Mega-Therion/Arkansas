# Capability Map — Natural State Website Improvements

## Approved scope and constraints

- Preserve and refine the approved Natural State high-modernist Arkansas design system.
- Generate high-fidelity desktop and mobile UI mockups before implementing the revised dashboard.
- Integrate the **USGS Water Data APIs v1** directly for continuous Arkansas stream observations. Use Arkansas state code `05`; discharge/streamflow (`00060`) is the primary measure. Show gage height (`00065`) and water temperature (`00010`) only when the selected station publishes those series. Use a 24-hour chart and refresh on a 15-minute cadence. Always show the source observation time and approval/provisional status.
- Do not invent composite watershed scores, network readiness, statewide totals, station health, or changes/trends. Only display values calculated from returned source records, with their scope and units; otherwise remove them.
- Continuous sensor observations and historical discrete water-quality samples are separate products. This scope uses continuous USGS readings only; EPA/WQX sample integration remains deferred.
- Add restrained interaction motion and respect `prefers-reduced-motion`. Use GSAP utilities only where they support purposeful data/UI feedback.
- Add a Markdown-rendered design-system reference page and keep the route manifest synchronized.

## Modules

| Module id | Responsibility | Depends on |
|---|---|---|
| `visual-direction` | Produce desktop and mobile UI mockups grounded in the approved palette and the live-data truth/provenance requirements; use them as implementation references. | Existing approved design system |
| `data-trust` | Fetch, normalize, validate, and expose USGS v1 continuous observations; preserve station, timestamp, units, approval and qualifier metadata; define loading, stale, empty, and error states without synthetic fallback values. | USGS API documentation; existing dashboard |
| `dashboard-experience` | Implement the revised responsive dashboard and real station/search/time interactions using the data contract; provide accessible controls, source attribution, and reduced-motion-aware GSAP feedback. | `visual-direction`, `data-trust` |
| `design-reference` | Add a Markdown-rendered design reference page describing the tokens, real component roles, data provenance, accessibility, and motion rules; sanitize rendered output and synchronize the route manifest. | `dashboard-experience`, existing design tokens and component APIs |

## Build order

`visual-direction` → `data-trust` → `dashboard-experience` → `design-reference`.

## Deferred

- Discrete sample water-quality integration through the USGS Samples API / Water Quality Portal.
- Forecasting, risk scoring, trend percentages, or any composite score without a specified formula and authoritative inputs.
- Backend, database, API keys, or data persistence. A bounded live probe of the documented USGS v1 API returned JSON with `Access-Control-Allow-Origin: *`; use anonymous browser GET requests unless implementation evidence disproves that pattern.
- Matplotlib static figures and SymPy calculations: not required for this interactive observation dashboard.


## Follow-up modules — proposed, awaiting approval

| Module id | Responsibility | Depends on |
|---|---|---|
| `multisignal-visualization` | Add a responsive, accessible 24-hour small-multiples section for the selected Arkansas station: discharge, gage height, and temperature, each only when returned by the existing USGS v1 query. Keep independent units/scales, show discrete observations only, preserve approval/qualifier context, and expose missing/partial states without inferred trends. | `dashboard-experience`, `data-trust` |
| `external-deployment-package` | Produce a versioned ZIP containing the finished project source and ready-to-upload static build, with provider-neutral external-hosting instructions and SPA fallback guidance; omit Git history, installed dependencies, and secrets. | `multisignal-visualization`, existing static build contract |

### Proposed follow-up build order

`multisignal-visualization` → `external-deployment-package`.

### Assumptions for review

- Reuse only the already-approved USGS Water Data APIs v1 observations for Arkansas (`state_code=05`) and the existing 24-hour/15-minute behavior; do not add endpoints, derived scores, external datasets, or backend services.
- Use three vertically aligned marker-only charts with a shared time axis but independent measurement scales/units; show each observation's returned approval and qualifier, and no-data/partial labels.
- The ZIP will include `dist/` for direct static upload plus source and build instructions; exclude `.git`, `node_modules`, `.env*`, and any credentials.
