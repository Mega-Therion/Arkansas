# Natural State design system

Natural State presents public water information as a living Arkansas landscape: editorially precise, pine-anchored, spring-lit, and calm enough for careful reading. The visual system is implemented in `src/styles/design-tokens.css`, `src/styles/global.css`, `src/styles/components.css`, `src/styles/live-dashboard.css`, `src/styles/design-reference.css`, and the reusable components in `src/components/`. This guide documents those sources; it does not claim that visual treatment itself verifies a measurement.

## Brand essence

Warm Sheep’s Wool surfaces and Ouachita Pine structure establish a grounded institutional voice. Spring and sky accents identify water and information; Clover Honey is reserved for primary actions; Delta Clay signals important alerts. Material effects—quartz translucency, mineral edges, and restrained reflections—support that hierarchy rather than replace it.

The interface should feel modern and place-aware, not rustic or ornamental. Keep content left-aligned, data labels distinct from values, and decoration subordinate to reading and source context.

## Design principles

- **Make meaning legible.** Pair a state color with visible text or another cue. Do not ask color alone to communicate status.
- **Use color by role.** Pine carries structure and primary text; Spring marks water-related emphasis; Bluejay carries links and information; Honey identifies the primary action; Clay is reserved for alerts.
- **Keep material effects quiet.** Quartz blur, caustic highlights, gradients, and shadows frame information without lowering text contrast.
- **Keep controls accessible.** Use visible labels, keyboard-operable native controls, clear focus indicators, and touch targets of at least 44px where practical.
- **Treat provenance as part of the interface.** A polished card or verification-style illustration never substitutes for the measurement source, time, units, or approval state.

## Color and semantic tokens

These examples name existing CSS custom properties and their current values. Prefer the semantic properties for component styling so a surface or state can change coherently with the theme.

| CSS token | Current value | Role |
|---|---|---|
| `--surface-canvas` | `#FAF9F6` | Sheep’s Wool page ground. |
| `--text-primary` | `#11291F` | Ouachita Pine primary text and structure. |
| `--surface-card` | `#FFFFFF` | Cotton White card surface. |
| `--surface-secondary` | `#E2F3E9` | Ozark Mint supportive or selected surface. |
| `--surface-accent` | `#E0F7F6` | Spring Water Glaze information surface. |
| `--action-primary` | `#D48B18` | Raw Clover Honey primary action; pair with pine foreground. |
| `--action-link` | `#175892` | Link blue, also used by `--ring-focus`. |
| `--state-success` | `#097969` | Emerald Seal success foreground. |
| `--state-alert` | `#803A28` | Deep Clay alert foreground/surface pairing. |
| `--state-warning` | `#61420C` | Dark warning text; use with `--state-warning-surface`. |
| `--state-info` | `#175892` | Informational text and link blue. |
| `--line-subtle` | `#D9E1DC` | Quiet dividers and boundaries. |
| `--ring-focus` | `#175892` | Visible keyboard focus ring. |

The source also defines complete Pine, Honey, Spring, Sky, and Clay ramps and named material primitives. Highway yellow (`--retroreflective-yellow: #FEE12B`) is a reflective detail on pavement-dark badges, not small text on a pale surface. Use a tested foreground/background pairing rather than assuming a decorative accent is readable as text.

## Type, spacing, and shape

Manrope is the primary interface family. Display headings use a responsive 31–48px scale with tight tracking; body copy uses a readable 14px baseline and 1.55 line-height. DM Mono is for compact metadata, timestamps, and uppercase labels—not paragraphs or essential instructions. Keep metadata secondary without making it too small to read.

The spacing tokens follow a 4px base rhythm: `--space-1` is 0.25rem, `--space-2` is 0.5rem, `--space-4` is 1rem, and `--space-6` is 1.5rem. Common radii progress from `--radius-micro` (0.25rem), through `--radius-control` (0.75rem) and `--radius-panel` (1.125rem), to `--radius-hero` (1.5rem). `--touch-target` is 2.75rem (44px).

## Components in the source

### `QuartzPanel`

`src/components/QuartzPanel.tsx` exposes light, pine, and quiet tones plus an optional sheen. The corresponding component styles use a panel radius, a 16px quartz blur, a prism edge, and restrained pine-toned shadows. Keep foregrounds readable over translucent surfaces and do not use a panel treatment as a trust claim.

### `HoneyButton`

`src/components/HoneyButton.tsx` is a native button with primary and quiet variants and optional leading/trailing content. The primary variant uses the Honey action treatment and a 44px minimum height. It includes hover, active, disabled, and `:focus-visible` styling. Preserve the native button semantics and visible focus ring.

### `HighwayBadge`

`src/components/HighwayBadge.tsx` supports `live`, `normal`, `verified`, `alert`, `info`, and `neutral` tones. Each tone has visible text in addition to its color; the small yellow marker is decorative. These are generic presentation states, not evidence that a USGS record is approved or independently certified. Use the record’s actual approval status for observation provenance.

### `VerificationSeal`

`src/components/VerificationSeal.tsx` supports a certified default for suitable product usage and an explicit `decorative` mode for the dashboard's material gallery. Decorative mode changes the text to “SPECIMEN” and the accessible role/name to say it is not a verification claim. Neither visual mode is evidence that a water observation has been approved by USGS; observation approval comes from the source record.

### `MetricCard` and `FlowChart`

`MetricCard` separates its label, displayed value, optional unit, trend copy, detail, and tone. Its generic trend affordance is not used for live water readings because no trend is inferred. `FlowChart` plots only the selected station’s returned discharge observations as discrete markers in chronological order. It labels the observed time span in Central time and exposes the returned-point count and units to assistive technology; it draws no connecting line or filled area between records. After the eight-page series bound, the interface displays an explicit partial-result warning whenever the USGS response still has a safe next link.

## Interaction, responsive layout, and motion

The shared global styles provide a 3px high-contrast `:focus-visible` outline. The live dashboard uses a sticky glass header on wider screens and a fixed bottom navigation bar on narrow screens; station selection, search, readings, chart, and source context stack without horizontal page overflow. The reference guide uses ordinary anchors for in-page navigation and keyboard-scrollable regions around wide tables and code examples.

The shared stylesheet reduces scroll, animation, and transition durations under `prefers-reduced-motion: reduce`. Preserve that behavior in new interactions. Motion should clarify state change or material response, never be required to understand a value or status.

## Accessibility and contrast

Use a logical heading order, landmarks, descriptive link text, visible focus, and native semantic controls. Keep table headers associated with their columns and make horizontally overflowing examples keyboard-scrollable. Content should remain usable at 320px without forcing the full page to scroll sideways.

Pine Ink (`#11291F`) on Sheep’s Wool (`#FAF9F6`) is approximately 14.7:1; Pine Ink on Raw Clover Honey (`#D48B18`) is approximately 5.5:1. Treat these as the documented pairings, not as proof for every combination. Check the actual foreground/background pair, including hover, disabled, dark-theme, and translucent states. Do not use pale highway yellow as small text against a pale surface.

## USGS data provenance and status conventions

When displaying stream observations, use the approved USGS Water Data APIs v1 source (`https://api.waterdata.usgs.gov/ogcapi/v1`) and retain the relationship between each value and its returned monitoring location and observation. The approved primary measure is discharge (`parameter_code=00060`) for Arkansas (`state_code=05`); optional gage height (`00065`) and water temperature (`00010`) appear only when records exist for the selected location.

For each displayed observation—including optional gage-height and temperature values—preserve the returned unit, timestamp, approval state, and any non-empty qualifier. Format the time for `America/Chicago` while retaining a precise “Last observation” time. Present `approval_status` as **Approved** or **Provisional** exactly. Keep the measurement time distinct from any page-refresh time. A 15-minute refresh schedule does not mean a new observation is guaranteed every 15 minutes.

If an optional series has no returned observation for the selected station in the trailing 24-hour window, say “Not reported at this station” and identify that window. For refresh errors, visibly identify retained data as stale; with no prior successful record, show an explicit loading, empty, or error state. Never substitute zero, fabricated sample values, statewide aggregates, inferred health scores, or provisional values presented as final. Do not claim that a station or record is current, verified, or approved unless the underlying source fields support that exact claim.

## Code example

Use semantic tokens at the point of styling rather than hard-coding another color into a component:

```css
.example-surface {
  background: var(--surface-card);
  color: var(--text-primary);
  border: 1px solid var(--line-subtle);
}

.example-link:focus-visible {
  outline: 3px solid var(--ring-focus);
  outline-offset: 3px;
}
```
