# AINSA — Arkansas Infant Nutrition Security Act
### (The Arkansas Infant Nutrition Security Act)

**Classification:** Family Stabilization & Child Nutrition Infrastructure
**Status:** blueprint stage `[D]` — policy mechanics drafted, not yet drafted as
statute text
**Target:** pre-filing November 2026, for Arkansas's 2027 Regular Legislative
Session — Part III of the **Rural Family Stabilization Trilogy** (Part I:
[`armaws.md`](armaws.md); Part II: [`drivers-license-reform.md`](drivers-license-reform.md))
**Identity:** R.W. Yett, Independent Research, Arkansas

Guarantees that no Arkansas infant on WIC goes unfed in the last days of the
month, by having the state cover the gap between the federal formula ration
and the infant's actual medically indicated demand.

## The problem — "the Month-End Formula Gap"

The federal WIC food package rations powdered formula by a **Monthly Maximum
Allowance (MMA)**: for a fully formula-fed infant aged 0–3 months, up to **9
cans** of 12.4–12.5 oz powder per month (≈806 fl oz reconstituted; 7 CFR
246.10, per USDA's Maximum Monthly Allowances tables; Texas WIC publishes the
same figure as "up to nine cans of 12.5-ounce powder"). A healthy infant's
actual demand over that window is commonly **24–32 oz/day** (American Academy
of Pediatrics rule of thumb: ~2.5 oz per pound of body weight per day, capped
~32 oz/day). At a working mid-range of **30 oz/day**, a month is ~900 fl oz of
appetite against ~800 fl oz of ration.

**The arithmetic lands the same way every month:** roughly **3–4 uncovered
days** at the end of the benefit period — exactly when the household budget
is thinnest. The gap does not stay theoretical; it gets filled unsafely:
formula diluted with extra water (documented cause of infant
hyponatremia and seizures in ER case reports), feedings stretched and
staggered against a newborn's actual hunger, or a too-early switch to
unmodified cow's milk. Federal WIC has a discretionary "more formula"
tailoring exception with medical documentation, but it is state-variable,
paperwork-gated, and not a right — it is a favor, and favors end at 5 p.m. on
a Friday.

The working-class reality the bill is written for: *"Three days of formula
left, six days until the card reloads, and you start doing math with a baby's
bottle."* A $30 can against an ER seizure visit — that asymmetry is the
entire moral and economic case.

## The gap under each formula form (added 2026-10-03)

WIC issues formula in whole containers. Issuance may not exceed the federal Maximum Monthly
Allowance (7 CFR § 246.10, Table 1, Food Package I, fully formula-fed, 0–3 months). The benefit an
infant actually receives therefore depends on the form:

| Form | Federal cap (MMA) | What is actually issued | Monthly benefit |
|---|---|---|---|
| Liquid concentrate | 806 fl oz | 31 × 13-oz cans (26 fl oz each) | **806 fl oz** |
| Ready-to-feed | 832 fl oz | 26 × 32-oz bottles | **832 fl oz** |
| Powder | 870 fl oz | 9 × 12.4-oz cans (~90 fl oz each). A 10th can would make 900 and break the cap. | **~810 fl oz** |

Powder looks most generous on paper (870) but delivers about the same as concentrate. The
whole-can rule leaves roughly 60 fl oz of the cap unusable.

**The gap against demand.** The AAP rule of thumb is about 2.5 fl oz per pound of body weight per
day, capped near 32 fl oz/day. Over a 30-day month:

| Infant weight | Intake | 30-day demand | Concentrate (806) | Ready-to-feed (832) | Powder (~810) |
|---|---|---|---|---|---|
| 10 lb | 25 oz/day | 750 fl oz | covered (56 spare) | covered (82 spare) | covered (60 spare) |
| 11 lb | 27.5 oz/day | 825 fl oz | short 19 oz (0.7 day) | covered (7 spare) | short 15 oz (0.5 day) |
| 12 lb | 30 oz/day | 900 fl oz | short 94 oz (**3.1 days**) | short 68 oz (**2.3 days**) | short 90 oz (**3.0 days**) |
| 13 lb+ | 32 oz/day (cap) | 960 fl oz | short 154 oz (**4.8 days**) | short 128 oz (**4.0 days**) | short 150 oz (**4.7 days**) |

**What this means for the bill.**
- The "3–4 uncovered days" figure holds for a heavier infant (about 12–13 lb) late in the 0–3 month
  window, on concentrate or powder.
- Ready-to-feed families run out about a day later.
- Lighter infants are fully covered on every form.
- A 31-day month adds one more day of demand to every row.
- The Bridge Fund should therefore size its top-up by form and weight, not as a flat amount. The
  fund's cost scales with the share of enrolled infants above about 11 lb.

*Sources:*
- 7 CFR § 246.10, Table 1 (eCFR);
- state WIC formula guides (e.g. Iowa WIC Formula Product Guide, August 2026): a 12.4-oz powder can
  reconstitutes to 90 fl oz, and 9 cans are the full-formula maximum;
- the AAP feeding rule of thumb.

The container counts for concentrate and ready-to-feed are arithmetic on the standard container
sizes and match the MMAs exactly.

## The market structure — the sole-source distortion

The Month-End Gap exists inside a market that is not really a market:

- **WIC is the single largest buyer of infant formula in the United States**
  — roughly half of all formula purchased nationally (USDA ERS estimates).
- **Sole-source rebate contracts:** each state agency awards **one**
  manufacturer the exclusive right to be the WIC brand. Manufacturers bid
  rebates that commonly run **85–95% of wholesale price** (ERS measured ~85%
  average for 2008 contracts; for contracts in effect March 2023, rebates
  **exceeded the wholesale price entirely**). The directive's working figure
  is "90%" — squarely inside the measured range.
- **Winner takes the shelf:** the contract brand typically captures an
  estimated 71–80% of a state's retail market (Cicero Institute analysis), and
  a 2025 GAO review found the winning brand's retail price rises ~1.7%
  (~$0.30) for everyone else — the non-WIC shopper pays the structure's
  spillover.
- **Result:** the shelf price is set in a quasi-captive channel, and the same
  rural household meets that price from both sides — as a WIC family capped
  under the MMA, and as a non-WIC neighbor paying the spillover. The
  distortion and the ration compound on the same family.

AINSA deliberately does **not** attack the federal contract structure
(swinging that is a USDA-level fight). It neutralizes the *household* effect
of the distortion: whatever the shelf costs, the state stands between the
baby and the gap.

## The solution — the General Revenue Bridge Fund

**The Infant Nutrition Bridge:** a state-funded top-up, redeemed on the
existing Arkansas WIC EBT card, equal to the smaller of:

1. (medically indicated demand per the AAP schedule, capped at 32 oz/day) −
   (the federal MMA actually received), or
2. the uncovered final days of the benefit month, at a per-day covered
   volume.

**Funding — the "State Pays First" doctrine:** reallocation of existing
General Revenue surplus, never a new tax. The state cushion stands between
the infant and the gap month — the same doctrine as ARMAWS (the state
absorbs the retrofit through the tire-fee surplus), the License Fleet (the
state supplies the test vehicle), and the Rate Stabilization Fund (the
surplus stands in front of the ratepayer).

**Design teeth:**

1. **Retailer-neutral redemption** — any authorized WIC retailer, no
   contract-brand constraint on bridge volume; the state buys the gap at
   the prevailing shelf price, refusing to let a sole-source rebate lock
   follow the infant into the top-up.
2. **Medical documentation above MMA** — amounts exceeding the standard MMA
   require the existing pediatrician tailoring standard (growth-chart
   documentation); the bridge is a right up to the standard ration's
   shortfall, a documented need above it.
3. **Automatic sunset-and-shrink** — the bridge self-shrinks to zero if and
   when USDA raises the federal MMAs or the contract structure is reformed;
   the state statute is a patch against a known federal defect, not a
   permanent parallel program.
4. **No new agency** — administered by Arkansas DHHS through existing WIC
   clinic and EBT infrastructure; the program is a payment rule, not a
   bureaucracy.

**Federal-note (the statutory honesty clause):** MMAs are set in federal
regulation (7 CFR § 246.10); a state cannot unilaterally raise them inside
WIC. AINSA is therefore structured as a *state supplemental nutrition
program adjacent to WIC* — same card, same clinics, separate state funding
line — precisely so it needs no federal waiver. This is the same
scope-discipline as ARMAWS funding the retrofit rather than compelling
unfunded private machines.

## The economic case (figures as cited estimates, not audited)

- The covered shortfall is small by design: ~1–2 cans/infant/month for the
  eligible tail of the WIC caseload — against formula-dilution ER visits and
  documented long-run costs of infant malnutrition.
- Federal program evaluations of WIC have repeatedly measured net savings
  in Medicaid birth outcomes on the order of multiple dollars per dollar
  administered (USDA program-evaluation literature; carried as an estimate,
  not an Arkansas-specific audit).
- Every figure above (rebate percentages, market shares, feeding guidance,
  gap arithmetic) is cited from its named public source and tagged `[E]`/`[C]`
  per the orchard's standing caveat: unverified until independently audited.

## The Rural Family Stabilization Trilogy

Three small, legible bills; one rural household; one funding signature.

| Part | Bill | The thing it guarantees | The trap it ends |
|---|---|---|---|
| I | **ARMAWS** (see [`armaws.md`](armaws.md)) | Free air at every pump | "the Tire Tax" |
| II | **Driver's License Public Access Guarantee Act** (see [`drivers-license-reform.md`](drivers-license-reform.md)) | A state vehicle for the test | "the Mobility Trap" |
| III | **AINSA** (this bill) | The gap month's formula | "the Month-End Formula Gap" |

Air in the tires, a vehicle for the test, formula in the bottle: the three
recurring month-end shortfalls of the same working family, ended by the
same doctrine — the state pays first, from revenue it already collects.
