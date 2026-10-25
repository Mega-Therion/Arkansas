# Task List — `multisignal-visualization`

- [ ] Task: Extend the selected-station observation contract
  - Acceptance: Expose all normalized observations returned by the existing request and the timestamp anchoring its trailing-24-hour window; keep the current discharge `series` contract and latest-value behavior unchanged; carry the existing partial-series state through the hook.
  - Verify: `pnpm exec vitest run src/hooks/useWaterData.test.tsx`
  - Files: `src/types/water-data.ts`, `src/hooks/useWaterData.ts`, `src/hooks/useWaterData.test.tsx`

- [ ] Task: Build the accessible multi-signal plot component
  - Acceptance: Add `SignalTimeline` with three parameter groups and exact-unit subgroups on one shared Central-time 24-hour axis; use independent numeric scales and only source-point markers; preserve returned approval and qualifiers in accessible details; show explicit empty/partial states; never draw paths or areas.
  - Verify: `pnpm exec vitest run src/components/SignalTimeline.test.tsx`
  - Files: `src/components/SignalTimeline.tsx`, `src/components/SignalTimeline.test.tsx`

- [ ] Task: Integrate the section into the live dashboard
  - Acceptance: Place the new section after the observation console and before material studies; connect it to the selected station's existing response; preserve the existing dashboard controls/status behavior and readable focus/mobile/reduced-motion treatment.
  - Verify: `pnpm exec vitest run src/App.test.tsx src/components/SignalTimeline.test.tsx`
  - Files: `src/App.tsx`, `src/App.test.tsx`, `src/styles/live-dashboard.css`

- [ ] Task: Align documentation and verify the finished module
  - Acceptance: README, design guide, and Stitch reference describe the three source-backed signals, independent units/scales, marker-only semantics, and partial/empty limitations without claiming water quality, forecasts, or station health. Desktop, 390px, and 320px previews render without horizontal overflow.
  - Verify: `pnpm test && pnpm build`; inspect the existing dashboard and design-system routes at desktop and narrow mobile widths.
  - Files: `README.md`, `docs/design-system.md`, `.stitch/DESIGN.md`, `TODO.md`
