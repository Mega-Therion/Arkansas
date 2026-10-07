# ARK Lane — the powered freight road

**Branch:** deliveRY
**Status:** engineering design study (2026-09-20). No segment has been built and no coil has been energized.
**Full spec:** [`ark-lane-dwpt-spec.md`](ark-lane-dwpt-spec.md), copied unchanged from `Research_and_Data/01_Engineering_and_Inventions/`.

## The idea

Trucks pick up power from the road while they drive. Coils buried under the pavement send energy across a short gap to a pad under the truck by **magnetic resonance at 85 kHz**, the SAE J2954 band `[C]`. No wire crosses the gap, and nothing electrical is exposed at the surface. This is Dynamic Wireless Power Transfer (DWPT).

An early framing, "Orchard 2.0", described *quartz* road surfaces that conduct charge into tires. That doesn't work, because quartz is an insulator; see [`../wholonomy/arkansas-orchard-2-0.md`](../wholonomy/arkansas-orchard-2-0.md). ARK Lane is the corrected version: inductive coils, with no quartz in the power path.

## The signature design choice: the 4-inch armor

At least **4 inches (101.6 mm)** of polymer-modified asphalt sits over the coils, about double a normal wear course. The spec checks this claim by claim:

| Claim | Verdict |
|---|---|
| The 4 inches protect the coils | **Holds.** Simple load-spreading math (Boussinesq) gives **34.5% less compressive stress** on the coil encapsulation, the part that can't be replaced `[D]` |
| The 4 inches give a ">200,000 V barrier" | **Wrong measure.** At 85 kHz the real failure is partial discharge, not DC breakdown, and wet pavement changes everything. It needs a lab measurement `[O]` |
| The armor is free | **No.** It costs **25.2% of magnetic coupling** (44% of k²Q) and **doubles the temperature rise** across the cover (6.3 → 12.6 K) `[D]` |
| Piezo layers feed the grid | **About 1,000× short.** 49–245 W per km-lane, enough for sensors, not for power `[D]` |
| Shielding is about heating | **Wrong objective.** The binding limit is the human field-exposure limit (ICNIRP, 27 µT), which is about 37× stricter `[D]` |

Safety layers named in the spec: a Faraday ground plane with a U-cradle, a ferrite flux mirror, and axle-mass gating so coils only arm under trucks above a weight threshold, plus a telemetry daisy chain between trucks. Foreign-object and living-object detection is **named but not yet specified**. The spec calls that out as a safety gap (A-05).

## How big a load it is

At 90 kW per truck at highway speed, a 350 km corridor draws **63–158 MW**, which is 7.5–19% of an ANO reactor unit `[D]`. A fully used corridor is utility-scale infrastructure. It has to be planned with generation and transmission from the start, and that's where it meets ONE Natural Energy.

## Build order: one segment first

The program's own rule is *"do not build statewide before a controlled segment."*
- **Phase 0:** bench and materials tests.
- **Phase 1:** one static pad in a pit.
- **Phase 2:** **one instrumented 1 km segment** under real traffic and weather for 12 months.
- **Phase 3:** core the pavement and measure.
- **Phase 4:** decide whether to build a corridor.

Each phase has a pass/fail gate, and the corridor is a decision, not a milestone.

## Open items (from the spec)

- **A-01, highest priority:** partial-discharge inception voltage of the armor mix, wet, dry and freeze-thaw.
- **A-02:** heavy-duty power classes above 22 kW aren't standardized.
- **A-05:** object detection.
- **A-06:** the "250 ms ANO curtailment" figure is unverified.
- **A-07:** **cost per km-lane**, which isn't in the spec yet and is likely the deciding variable.

## Earlier corpus material (as recorded, not engineered)

The 2026-09-12 master excavation records RY's corridor safety ideas:
- 16–20 ft "Safe Haven" reinforced shoulders;
- weigh-in-motion telemetry gateways that check tire pressure and brake heat at speed;
- corridor-wide **graduated speed throttling** when a hazard is detected (inbound trucks drop from 65 to 35 to 20 mph instead of rerouting);
- a truck-to-truck "bucket brigade" that relays LiDAR and suspension telemetry.

These are design concepts `[conj]` and aren't sized in the spec.
