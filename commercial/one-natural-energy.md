# ONE Natural Energy — the trunk

Fence-line baseload nuclear/renewable arbitrage. Captures stranded, off-peak baseload power —
specifically referenced as Arkansas Nuclear One (ANO) in Russellville — and routes it via an
Eidolon-OS AI brain to whichever load pays the most that hour, powering 100%-clean, carbon-negative
AI compute campuses without adding to residential grid demand. This is the cash engine the rest of
the tree grows from.

## Statutory pillar: fence-line interconnect

**Model act:** *The Arkansas Clean Baseload Optimization & Micro-Compute Act*

- Codifies the legal right for high-density compute operators to colocate directly with baseload
  nuclear or hydroelectric facilities under interruptible power purchase agreements (PPAs).
- **Grid safety covenant:** compute operators must maintain sub-second curtailment switches linked
  directly to the regional TSO/MISO grid control — compute load drops to zero within 250ms if the
  residential grid shows stress.
- **Cooperative tax exemption:** energy consumed directly at generation busbars, without
  traversing public high-voltage transmission lines, is exempt from wheeling and congestion
  tariffs.

## Relationship to the Entergy ratepayer fight

ANO's fuel costs get passed through to residential bills via the fuel-adjustment clause, and plant
upgrades get billed to citizens under the GAJA rider. The civic-layer power plan (Rate
Stabilization Fund — see [`../civic/power-plan-and-entergy-docket.md`](../civic/power-plan-and-entergy-docket.md))
is the citizen-side fix to that same plant's cost structure; ONE is the system-side fix. Together
they're framed as restructuring the whole household/utility/state relationship, not two unrelated
initiatives.

Status: blueprint/manifesto stage, not yet filed as statute text.

## Financial dossier (as drafted — unverified, not audited)

- **850+ jobs** projected.
- **$2.5M–$4M** total estimated tax benefit over 5 years.
- **45U Nuclear Power Production Credit:** the draft said ~$262k/yr per MW for co-located nuclear compute. That is about twice the statutory maximum. One MW for a full year is 8,760 MWh, and 45U pays at most 1.5¢/kWh ($15/MWh with the prevailing-wage requirements met; the base rate is 0.3¢), so at most ~$131k/yr per MW, before the phase-down that starts when the plant's gross receipts exceed 2.5¢/kWh (26 U.S.C. § 45U; the cent amounts are inflation-adjusted after 2024). The credit goes to the plant owner that produces and sells the power, not to a compute tenant.
- **30% Investment Tax Credit** applied to qualifying buildout.

## Feedstock anchor — bauxite residue REE/critical-minerals recovery

- **USGS-confirmed** Gallium, Niobium, and rare-earth elements in Arkansas bauxite residues,
  specifically the **central Arkansas bauxite region (Saline and Pulaski counties)** — a named,
  checkable geological anchor, not an abstract claim.
- A "hybrid leach chemistries" patent family is described as tuned specifically to that geology
  (feeds refineRY/ACRN — see [`../commercial/the-six-branches.md`](../commercial/the-six-branches.md)).
- Cited federal support: **DOE rare-earth-element demonstration grants**, and the **45X (Advanced
  Manufacturing Production Credit)** and **48C (Advanced Energy Project Credit)** federal credits,
  plus an unspecified Arkansas state tax credit for recycling equipment.

Source: Qdrant knowledge base (ONE Natural Energy financial dossier) — same unverified/estimate
caveat as the rest of this document. Confirm current figures before citing externally.

## Reality checks adopted 2026-10-07 (from the Manus blueprint and the Wholonomy)

- **Don't market "curtailed nuclear power" until a supply structure is documented.** Power from an existing nuclear plant isn't automatically available to a third-party load at the fence line. A behind-the-meter setup raises transmission-cost, tariff, market and jurisdiction issues. DOE names nuclear/data-center co-location as a possible model, but lists metering and transmission-cost allocation as hurdles. MISO's large-load framework emphasizes flexible load, curtailment ability and telemetry. ([`../research/one-orchard-development-blueprint.md`](../research/one-orchard-development-blueprint.md))
- **ANO's licenses run to May 20, 2034 (Unit 1) and July 17, 2038 (Unit 2)** (Entergy facility profile). That doesn't mean shutdown. It does mean any long-term plan needs a license-renewal, replacement-power or **no-ANO case**.
- **The first commercial wedge is a modest, interruptible load,** paired with controllable thermal loads. It is not a multi-hundred-megawatt campus. The sequence is development capital, then a strategic anchor partner, then construction finance.
- **What ONE is, in the Wholonomy's words:** "an energy arbitrage and public-value infrastructure layer," not an AI company. Every megawatt-hour is meant to be:
  - a revenue event;
  - a grid-stability service (it backs off on signal);
  - a community-dividend payment (the 5% Rural Computational Dividend into County Energy Resilience Trusts, `[conj]`; it has to be written into every interconnection contract);
  - power for the other branches.
- **Still unverified:**
  - 850+ jobs and the tax-benefit range;
  - whether 45U applies to this structure at all (45U pays the plant owner), and at what rate: the drafted "~$262k/yr per MW" is twice the ~$131k statutory maximum (see above);
  - "carbon-negative compute";
  - the 250 ms curtailment figure.

Earlier drafts also included Bitcoin mining as a load class. Treat that as a **historical option**, not a current claim.
