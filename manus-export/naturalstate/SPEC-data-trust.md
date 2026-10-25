# Spec: `data-trust` — USGS Live Water Data

## Objective

Replace the dashboard's fictional telemetry with sourced, current USGS continuous stream observations. The audience is a public-facing reader exploring Arkansas water conditions. Success means every displayed water value can be traced to a USGS monitoring location and observation, preserves the API's unit and timestamp, distinguishes approved from provisional records, and fails honestly rather than falling back to invented data.

The user-approved default is statewide Arkansas coverage, discharge/streamflow (`parameter_code=00060`) as the primary metric, optional gage height (`00065`) and water temperature (`00010`) only where the selected location has data for those series, a 24-hour chart, and a 15-minute refresh cadence. Do not calculate a statewide aggregate or health score.

## Authoritative source and retrieval contract

- Primary source: USGS Water Data APIs **v1**, base `https://api.waterdata.usgs.gov/ogcapi/v1`.
- USGS's v1 OpenAPI exposes the `latest-continuous`, `continuous`, and `monitoring-locations` collections. Continuous records include `monitoring_location_id`, `parameter_code`, `time`, `value`, `unit_of_measure`, `approval_status`, and `qualifier`. The API defines observations as potentially provisional/revisable and notes telemetry may be delayed. See [USGS v1 OpenAPI](https://api.waterdata.usgs.gov/ogcapi/v1/openapi) and [USGS API documentation](https://api.waterdata.usgs.gov/docs/).
- USGS announced v1 in September 2026; WaterServices is scheduled for decommissioning in early 2027. Do not use legacy NWIS/WaterServices endpoints. See [USGS v1 release notice](https://waterdata.usgs.gov/blog/api-v1-release/).
- Geographic server-side filter: `state_code=05` (Arkansas ANSI state code). Flow parameter filter: `parameter_code=00060`. A bounded live query to `continuous/items?state_code=05&parameter_code=00060&time=PT24H&limit=3&f=json` returned HTTP 200, records for `USGS-07064026`, values in `ft^3/s`, and an OGC `next` link. Response included `Access-Control-Allow-Origin: *` on 2026-10-23. The application must still handle CORS/network/provider errors at runtime.
- Discover station choices from `collections/latest-continuous/items` filtered by Arkansas and discharge parameter. Deduplicate by `monitoring_location_id`. Page by following the API-provided `rel=next` URL exactly; do not fabricate a total from the first page. Preserve the record timestamp and returned location identifier. Resolve display names and county/coordinates through `monitoring-locations` only when required by the feature, and cache metadata in memory for the current session.
- For the selected station's graph, query `collections/continuous/items` with its exact `monitoring_location_id`, `parameter_code=00060`, `time=PT24H`, and JSON format. Follow `rel=next` when present and sort observations by `time` ascending for the plotted series. Do not treat repeated 15-minute data as guaranteed; plot the actual timestamps received.
- Fetch current optional metric series with the selected `monitoring_location_id` and code `00065` or `00010`. If a series is absent, show “Not reported at this station” rather than zero, a substitute value, or a statewide estimate.
- Parse `value` as a finite numeric value for plotting/formatting while retaining the original string and unit metadata. Never hard-code a conversion: display the API's `unit_of_measure`; if units differ between stations, preserve the selected station's unit.
- Display observation time localized to `America/Chicago` and a precise “Last observation” timestamp. Display `approval_status` exactly as Approved or Provisional. Show any non-empty qualifier in the observation details. A page refresh timestamp is separate from the measurement time.

## Behavior and boundaries

- Initial load retrieves the first station page and latest flow records. Selecting a station loads its latest optional metrics and the trailing 24-hour flow series.
- Refresh the data at a 15-minute interval while the page is open, and offer a user-triggered refresh. Do not promise readings arrive on that interval; label the observation as “Latest reported” and display its actual time. Avoid overlapping requests; abort/cancel stale requests when station changes or components unmount.
- Retain last successful values in component/session memory if a refresh fails, visibly mark them stale and report that refresh failed. With no successful response, show an explicit loading, empty, or error state. Never synthesize demo readings as a fallback.
- Do not persist observations, expose credentials, implement backend/database services, combine station values into statewide totals, infer trend percentages, or interpret provisional observations as final.
- Out of scope: discrete water-quality samples, forecasts, regulatory/health conclusions, alerting, historical export, authentication, and agency feeds other than USGS.

## Tech stack and commands

React 18, TypeScript 5, Vite 6; existing app commands are `pnpm dev`, `pnpm build`, and `pnpm preview`. Prefer native `fetch` and typed internal records; do not add an API client dependency for these documented GET endpoints. Tests should use deterministic, sanitized fixtures and stub network responses rather than depend on live provider availability.

## Project structure

- `src/data/usgs-water-data.ts`: typed API response parsing, allowlisted USGS v1 endpoint construction, bounded pagination and normalization.
- `src/hooks/useWaterData.ts`: loading, 15-minute refresh lifecycle, station changes, stale/error states, and request cancellation.
- `src/types/water-data.ts`: normalized station, observation, and request-state types.
- `src/components/FlowChart.tsx`: render actual selected-station time/value observations and accessible summary.
- `src/App.tsx`: consume the hook and surface values/provenance; no fixed telemetry constants remain.
- `src/styles/`: preserve the existing Arkansas design tokens and component language while styling honest data states.

## Code style

Use named TypeScript types and small pure parsing helpers. Validate external JSON before use; values from network responses are untrusted data. Keep data retrieval separate from React presentation. Example normalized observation:

```ts
export type WaterObservation = {
  stationId: string;
  parameterCode: '00060' | '00065' | '00010';
  observedAt: string;
  value: number;
  rawValue: string;
  unit: string;
  approval: 'Approved' | 'Provisional';
  qualifier: string | null;
};
```

## Testing strategy

- Unit checks cover malformed/missing properties, non-finite values, unit preservation, approval status and qualifier handling, deduplication, time sorting, and OGC pagination-link behavior.
- Hook/component checks use stubbed fetch responses for loading, success, unavailable optional metrics, empty Arkansas data, 15-minute refresh scheduling, abort on selection change, cached stale display, and hard failure with no fabricated fallback.
- The application must pass `pnpm build`; an optional bounded smoke request may verify provider availability but is not a deterministic test prerequisite.

## Boundaries

- **Always:** use documented v1 URLs and API-supplied next links; bound requests; preserve source timestamps, units, and approval/qualifier fields; keep telemetry source visible; validate and safely format external values; provide honest loading/empty/stale/error states.
- **Ask first:** add a backend, database, credentials, data persistence, another provider, discrete-sample ingestion, forecasting, calculated scores, or a different geographic/metric/refresh scope.
- **Never:** use legacy WaterServices/NWIS query URLs; show hard-coded or fabricated values as live; silently substitute unavailable data; claim all stations are fresh or verified; or present provisional data as final.

## Success criteria

1. Every primary flow value and plotted point comes from a USGS v1 response for the selected Arkansas location and carries its source observation time and API unit.
2. Station selection lists only locations represented by returned Arkansas continuous flow records; list continuation follows USGS `next` links without claiming an unqueried total.
3. Gage height and temperature appear only when their corresponding series return data for the selected station; otherwise the unavailable state is explicit.
4. The 24-hour chart uses actual `time` and numeric `value` pairs in chronological order, exposes a text summary for assistive technology, and contains no synthetic point fallback.
5. Updates run no more often than every 15 minutes unless the user requests refresh; failures preserve prior data as visibly stale or show an explicit initial error.
6. Approved/provisional status and returned qualifiers remain visible, and there are no unsupported statewide health, readiness, or trend claims.
7. The code builds via `pnpm build`, and automated data/hook checks do not require the live USGS service.

## Open questions

None. Source, metrics, coverage, time window, refresh cadence, and provisional-state presentation have been approved by the user.
