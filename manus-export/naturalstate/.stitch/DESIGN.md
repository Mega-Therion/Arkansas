---
name: Natural State — Arkansas Water Observations
colors:
  canvas: '#FAF9F6'
  cotton-white: '#FFFFFF'
  pine-ink: '#11291F'
  pine-structure: '#1B3D2F'
  ozark-mint: '#E2F3E9'
  lichen-sage: '#9FB3A5'
  spring-aqua: '#00A896'
  spring-caustic: '#38E1D3'
  spring-glaze: '#E0F7F6'
  bluejay: '#1D70B8'
  sky-pale: '#EBF5FB'
  clover-honey: '#D48B18'
  honey-light: '#F5B041'
  delta-clay: '#9E4732'
  novaculite: '#EFECE6'
  pavement: '#2B2D2F'
  road-yellow: '#FEE12B'
  emerald-seal: '#097969'
  platinum-thread: '#B0C4DE'
typography:
  display:
    fontFamily: Manrope
    fontSize: 'clamp(34px, 4vw, 56px)'
    fontWeight: '650'
    lineHeight: '1.03'
    letterSpacing: '-0.065em'
  section-heading:
    fontFamily: Manrope
    fontSize: 'clamp(21px, 2.15vw, 28px)'
    fontWeight: '750'
    lineHeight: '1.18'
    letterSpacing: '-0.05em'
  body:
    fontFamily: Manrope
    fontSize: '12px'
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: '0'
  metadata:
    fontFamily: DM Mono
    fontSize: '8px'
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: '0.13em'
rounded:
  micro: '0.25rem'
  tight: '0.5rem'
  control: '0.75rem'
  panel: '1.125rem'
  hero: '1.5rem'
  pill: '999px'
spacing:
  unit: '4px'
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  page-gutter-desktop: '24px'
  touch-target: '44px'
---

# Design System: Natural State — Arkansas Water Observations
**Project ID:** wdp_80dbcd1ba7361e390375b4e4

## 1. Visual Theme & Atmosphere

Natural State translates Arkansas geology, spring water, pine structure, and highway material into a contemporary public-information interface. Sheep’s Wool and Cotton White keep the canvas warm and open; Ouachita Pine supplies the institutional frame; spring aqua and sky blue distinguish water and information; clover honey reserves emphasis for the primary action. The result is high-modernist organic minimalism—place-aware, quietly sovereign, and precise rather than rustic, folksy, or generic SaaS blue.

Quartz translucency, caustic edge light, platinum hairlines, and soft pine shadows provide tactile material depth without competing with measurement or provenance. The desktop composition gives the editorial hero room to breathe above an observation console. At smaller sizes the panels stack, station controls remain native and labeled, and a fixed bottom navigation bar preserves access to the four primary destinations.

## 2. Color Palette & Roles

### Primary Foundation

| Descriptive name | Hex | Functional role |
|---|---|---|
| Sheep’s Wool | `#FAF9F6` | Warm application canvas. |
| Cotton White | `#FFFFFF` | Card surfaces and crystal highlights. |
| Ouachita Pine Needle | `#11291F` | Primary text and deep structural surfaces. |
| Soft Pine | `#1B3D2F` | Secondary dark surfaces and pine shadow depth. |
| Ozark Mint | `#E2F3E9` | Selected states and supportive surface fields. |
| Lichen Sage | `#9FB3A5` | Muted boundaries, metadata, and quiet dividers. |
| Novaculite Whetstone | `#EFECE6` | Warm mineral framing. |

### Accent & Interactive

| Descriptive name | Hex | Functional role |
|---|---|---|
| Spring Liquid Aqua | `#00A896` | Water-related emphasis and observed-series accent. |
| Spring Caustic | `#38E1D3` | Prismatic highlights and restrained chart color. |
| Spring Water Glaze | `#E0F7F6` | Quiet supporting water surface. |
| Bluejay | `#1D70B8` | Information and source-link accent. |
| High-Sky Azure | `#85C1E9` | Secondary informational detail. |
| Raw Clover Honey | `#D48B18` | Primary action base and focal energy. |
| Honey Light | `#F5B041` | Luminous button gradient and hover energy. |

### Typography & Text Hierarchy

| Descriptive name | Hex | Functional role |
|---|---|---|
| Pine Ink | `#11291F` | Headlines, values, and high-priority labels on light grounds. |
| Field Note | `#506158` | Muted supporting copy. |
| Link Blue | `#175892` | Accessible links and keyboard focus. |
| Cotton White | `#FFFFFF` | Text on deep pine and pavement surfaces. |

### Functional States

| Descriptive name | Hex | Functional role |
|---|---|---|
| Delta Alluvial Clay | `#9E4732` | Alert emphasis. |
| Deep Clay | `#803A28` | Dark alert pairing with white foreground. |
| Emerald Seal | `#097969` | Success color when source semantics support it. |
| Pavement Charcoal | `#2B2D2F` | Sharp badge substrate. |
| Retroreflective Highway Yellow | `#FEE12B` | Reflective badge detail over dark pavement only. |
| Platinum Thread | `#B0C4DE` | Fine prism borders and decorative seal trim. |
| Platinum Highlight | `#E5E4E2` | Metallic gradient highlight. |

Complete Pine, Honey, Spring, Sky, and Clay 50–950 ramps are in `src/styles/design-tokens.css`. Semantic properties pair foreground and surface deliberately: pine ink over Sheep’s Wool; dark pine over honey; deep mineral text over pale spring; white over deep clay. Highway yellow is a reflective marker over charcoal, not small text over pale surfaces. Source approval states are always spelled out, not communicated by color alone.

## 3. Typography Rules

### Hierarchy & Weights

**Manrope** is the primary interface family: contemporary and geometric-humanist, with open counters that stay clear in compact data surfaces. The desktop hero scales from 34px to 56px, uses weight 650, a 1.03 line height, and tight `-0.065em` tracking. Section headings range from roughly 21px to 28px; body copy is 11–12px in compact dashboard components and 13–14px in the long-form guide, with generous line-height. Values use tabular numerals where available and remain visually attached to their units.

**DM Mono** marks timestamps, units, station IDs, compact metadata, and uppercase section eyebrows. It is a supporting technical voice, not a paragraph face. The site loads both font families from the stylesheet entry point and maps them to `font-sans` and `font-mono` in Tailwind.

### Spacing Principles

A 4px base rhythm underlies the token scale. Component interiors favor 8–16px, cards approximately 14–22px, and section spacing 28–42px. The desktop content is capped near 1480px with 24px side gutters. Controls provide a 43–44px minimum height; icon-only details receive visible focus and a larger interactive hit area.

## 4. Component Stylings

### Buttons

`HoneyButton` is a native button with a 44px minimum height, clover-honey gradient, fine metallic border, inset highlight, and soft gold shadow. Hover adds a restrained liquid lift and reflection; active compresses slightly; focus uses a 3px high-contrast Bluejay ring; disabled controls lose motion and contrast. In the dashboard it performs a genuine manual USGS refresh. Navigation uses ordinary anchors, not button-shaped faux links.

### Cards & Domain-Specific Containers

`QuartzPanel` is the core card material: translucent Cotton White, `16px` backdrop blur, prismatic hairline, radial caustic highlights, and soft pine-toned depth. The live observation console presents the selected station and discharge, API-returned unit, observed time, source approval state, and qualifier as a single information hierarchy. Optional gage-height and water-temperature cards preserve their own approval and qualifier metadata and remain explicit about the 24-hour window when no record is returned.

### Navigation

A sticky, frosted header contains the geometric river/diamond lockup, four primary anchors, and a visible USGS source link. At widths of 740px and below, the navigation becomes a fixed bottom bar with Overview, Observations, Stations, and Design system. The selected destination gains an aqua rule; labels remain visible rather than relying on icon color.

### Inputs & Forms

The Arkansas monitoring-location selector is a labeled native `<select>` and station search is a labeled native search input. Both use warm-white surfaces, readable pine text, a hairline border, clear keyboard focus, and approximately 43px height. Search filters returned station names and IDs. “Load next USGS station page” follows the provider’s `next` link and the interface states that the list contains only loaded pages rather than asserting a complete statewide total.

### Domain-Specific Components

- **`FlowChart`** filters to finite source records, sorts observations chronologically, and draws only returned discharge points as discrete markers—no connecting stroke or filled area bridges unknown intervals. Its accessible summary states the observation span in Central time, point count, and unit. It does not draw a fictional “normal range.” An expandable semantic table exposes timestamps, values, approval states, and qualifiers. If a safe USGS next link remains after the bounded series page budget, the dashboard marks the loaded result partial.
- **`HighwayBadge`** uses sharp pavement geometry, a beaded white rule, reflective yellow detail, and visible state text. It is a presentation primitive and does not establish measurement provenance.
- **`VerificationSeal`** retains a certified default only for suitable product usage. The dashboard’s specimen mode displays “SPECIMEN” and an accessible name that explicitly says it is not a verification claim.
- **`MetricCard`** is reusable, but the live water display does not use its generic trend affordance to invent a trend.

## 5. Layout Principles

### Grid & Structure

The 1480px fluid shell aligns the page to the left on an open Sheep’s Wool ground. The hero balances a clear headline and data-scope description with a restrained abstract contour study explicitly labeled as not a monitoring map. The observation section places the main discharge panel beside the reported station list; material specimens sit below the live-data task. This is a purpose-specific console rather than a generic centered landing page.

### Whitespace Strategy

Editorial hierarchy alternates generous section gaps with compact, carefully grouped measurement details. Hairline dividers and mono eyebrows organize content; source, observation time, units, and approval state travel with the value. Translucent surfaces and caustic highlights are used sparingly.

### Alignment & Visual Balance

Headlines and supporting descriptions are left-aligned. The discharge value anchors the selected-station card, with its unit and observation time close by. Optional readings are visually subordinate, while the chart shows only the observations actually returned. Information and action colors remain role-bound accents rather than full-panel floods.

### Responsive Behavior & Touch

The main panels use two columns on wide screens, then stack by 860px; navigation becomes a fixed bottom bar at 740px. Material specimens shift to two columns by 1120px and one column at 420px. At 320px the hero, controls, cards, and observation list remain in a single column without forcing page-wide horizontal scroll. Wide observation and design-guide tables use their own keyboard-focusable horizontal scroll containers.

## 6. Design System Notes for Stitch Generation

### Language to Use

High-modernist Arkansas institutional minimalism; Swiss typographic precision; Ouachita Pine structure; karst-spring aqua; quartz glass; warm Cotton White; quiet sovereignty; public-data provenance that stays visible.

### Color References

Keep primary roles aligned to the tokens in `src/styles/design-tokens.css`: Sheep’s Wool `#FAF9F6`, Ouachita Pine Needle `#11291F`, Spring Liquid Aqua `#00A896`, Bluejay `#1D70B8`, and Raw Clover Honey `#D48B18`. Reserve Clay `#9E4732` for alerts. Use Highway Yellow `#FEE12B` only as a reflective detail on pavement-dark surfaces.

### Component Prompts

1. “Create a desktop Arkansas water-observation console in high-modernist organic minimalism: warm cotton-white canvas, Ouachita Pine hierarchy, a clearly labeled selected USGS station, discharge with returned units and observation time, and a restrained abstract contour illustration—not a map.”
2. “Design a responsive source-backed discharge panel using frosted quartz edges and pine shadow. Keep the returned measurement, unit, observation time, Approved/Provisional state, and USGS attribution together. Draw only observed data points and provide explicit empty and stale states.”
3. “Present quartz, reflective pavement, clover honey, and the sovereign seal as material specimens beneath the observation task. Label any seal specimen as decorative and never as certification of a water reading.”

### Incremental Iteration

Preserve the existing token names and 4px baseline. Refine one material or state at a time. Check the visible keyboard ring, foreground/background pairs, mobile touch targets, and reduced-motion behavior. Do not add fabricated telemetry, statewide totals, inferred health scores, or mockup readings to runtime UI. Treat generated desktop/mobile images as concept references only.
