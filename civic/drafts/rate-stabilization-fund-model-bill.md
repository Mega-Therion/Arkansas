# MODEL BILL: Arkansas Residential Rate Stabilization Fund

*Model text for BLR and counsel review. Not filed. Must match [`../POWER_PLAN_CANON.md`](../POWER_PLAN_CANON.md) before any change ships. Built from RY's rules in [`../power-manifesto-in-his-words.md`](../power-manifesto-in-his-words.md). See [`README.md`](README.md).*

**AN ACT TO CREATE THE RESIDENTIAL RATE STABILIZATION FUND, SO THAT EXTRAORDINARY RESIDENTIAL ELECTRIC RATE ADJUSTMENTS ARE ABSORBED BY STATE SURPLUS, THEN BY THE UTILITY, THEN BY FUND EARNINGS, BEFORE ANY REMAINDER IS SHARED STATEWIDE ON HOUSEHOLD BILLS; AND FOR OTHER PURPOSES.**

**SECTION 1. Title.** "Arkansas Residential Rate Stabilization Act".

**SECTION 2. Findings.** The General Assembly finds that:
(1) Residential customers of a public utility with an exclusive service territory cannot choose their electric provider;
(2) Riders and adjustments approved by the state can raise every residential bill at once, regardless of how much power a household used;
(3) A fixed customer charge raises the bills of low-usage households the most; and
(4) The state carries general revenue surpluses in many years, including $655 million at the close of fiscal year 2026.

**SECTION 3. Definitions.**
(1) "Extraordinary cost" means a residential cost that the Arkansas Public Service Commission approves for recovery through a fuel or energy cost adjustment, a purchased-power adjustment, a storm or disaster restoration rider, or any other one-time cost of a single identifiable event **[VERIFY the rider names in each utility's tariff]**, to the extent it raises the average residential bill above its level in the same month of the prior year by more than [2] percent of that year's average residential price. It does not include:
   (A) any cost of new or under-construction generating plant, including recovery under Act 373 of 2025;
   (B) any change to base rates or to the customer charge set in a general rate case; or
   (C) any rider amount the Commission moves into base rates;
(2) "Fund" means the Residential Rate Stabilization Fund;
(3) "Utility operating reserve" means funds of the utility that the Commission identifies as available to absorb an extraordinary cost before it is billed to customers, including any storm reserve and the utility's earnings above its allowed return **[VERIFY the mechanism with Commission staff and counsel]**.

> *Drafting note (2026-10-28).* Section 3(1) was keyed to any [__]% twelve-month rise. The 2010–2026 analysis showed that version mostly postpones increases: 86–92% of its dollars go to rises still present two years later ([`../analysis/rate_stabilization_volatility.py`](../analysis/rate_stabilization_volatility.py)). It now keys to the event costs Rule 2 of the canon names (fuel, storm, any isolated event), matching the 26-001-U public comment, and leaves permanent base-rate changes to the rate case (Rule 1).
>
> Sizing comes from Entergy Arkansas's filed fuel rider (Rider ECR) for every period 2009–2026, read from APSC filings ([`../analysis/data/entergy_ecr_history.csv`](../analysis/data/entergy_ecr_history.csv)), run through the fund rule in [`../analysis/ecr_keyed_stabilization.py`](../analysis/ecr_keyed_stabilization.py). Keyed to the real rider, **70–82% of fund dollars went to rises that later reversed** (against 4–13% for a fund keyed to every bill increase), so it smooths instead of postponing. A **$250 million fund with a 2% threshold** would have paid $165 million over 2011–2026, at most $59 million in any twelve months, and still held $85 million at the end. Full coverage with no threshold would have cost $325 million over sixteen years (about $20 million a year). Entergy's residential kWh are approximated as 49% of statewide residential sales (738,000 of about 1.51 million customers); the other utilities' fuel riders are not yet in the model.

**SECTION 4. Fund created.**
(a) There is created in the State Treasury the Residential Rate Stabilization Fund.
(b) The fund consists of amounts transferred from general revenue surplus as provided by the Revenue Stabilization Law. The fund balance may not exceed [$250 million].
(c) The State Treasurer shall invest the fund. Investment earnings are held in a separate earnings account within the fund.
(d) Unspent balances roll over from month to month and from year to year.

**SECTION 5. Order of payment.** When the Commission approves an extraordinary cost, the residential portion shall be paid in this order:
(1) **First,** by the fund's principal, up to the monthly draw limit set by the Commission;
(2) **Second,** by the system's own slack: the utility operating reserve, and then by offsetting against the unused usage of residential customers whose consumption fell below their own twelve-month average, so that a customer who used less is never charged extra for a cost they did not cause **[VERIFY the offset methodology with Commission staff]**;
(3) **Third,** by the fund's earnings account;
(4) **Last,** any remainder is spread per kilowatt-hour across residential customers statewide, so that a cost falling on one region is shared by every region and no area carries a disaster alone **[VERIFY with Commission staff how to apply one statewide charge across Entergy, the other investor-owned utilities and the cooperatives]**.

**SECTION 6. Hard cap.** No residential customer's bill shall rise in any month because of extraordinary adjustments by more than [$__ or __%]. Amounts above the cap are deferred and recovered under Section 5.

**SECTION 7. Transparency.** Each month the Commission shall publish, in plain language: the adjustments in effect, the amounts paid by the fund principal, the utility operating reserve and the earnings account, the amount billed to customers, and the fund balance.

**SECTION 8. Not a subsidy of utility returns.** Nothing in this act changes the Commission's duty to set just and reasonable rates under § 23-4-101 et seq. The fund pays costs the Commission has already found reasonable. It never raises an allowed return.

**SECTION 9. Review.** The Commission shall report after three years on whether the fund reduced bill volatility or only delayed increases, and shall file the report with the General Assembly. Payments under Section 5 continue in the same order unless and until the General Assembly acts to change or end them.
