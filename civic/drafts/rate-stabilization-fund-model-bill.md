# MODEL BILL: Arkansas Residential Rate Stabilization Act

*Model text for BLR and counsel review. Not filed. Must match [`../POWER_PLAN_CANON.md`](../POWER_PLAN_CANON.md) before any change ships. Built from RY's rules in [`../power-manifesto-in-his-words.md`](../power-manifesto-in-his-words.md). See [`README.md`](README.md). Complete draft 2026-10-28; every bracket and `[VERIFY]` must be resolved by BLR and counsel.*

> *Drafting note (2026-10-28).* Section 3(5) was keyed to any [__]% twelve-month rise. The 2010–2026 analysis showed that version mostly postpones increases: 86–92% of its dollars go to rises still present two years later ([`../analysis/rate_stabilization_volatility.py`](../analysis/rate_stabilization_volatility.py)). It now keys to the event costs Rule 2 of the canon names (fuel, storm, any isolated event), matching the 26-001-U public comment, and leaves permanent base-rate changes to the rate case (Rule 1).
>
> Sizing comes from Entergy Arkansas's filed fuel rider (Rider ECR) for every period 2009–2026, read from APSC filings ([`../analysis/data/entergy_ecr_history.csv`](../analysis/data/entergy_ecr_history.csv)), run through the fund rule in [`../analysis/ecr_keyed_stabilization.py`](../analysis/ecr_keyed_stabilization.py). Keyed to the real rider, **70–82% of fund dollars went to rises that later reversed** (against 4–13% for a fund keyed to every bill increase), so it smooths instead of postponing. A **$250 million fund with a 2% threshold** would have paid $165 million over 2011–2026, at most $59 million in any twelve months, and still held $85 million at the end. Full coverage with no threshold would have cost $325 million over sixteen years (about $20 million a year). Entergy's residential kWh are approximated as 49% of statewide residential sales (738,000 of about 1.51 million customers); the other utilities' fuel riders are not yet in the model.
>
> *Canon map.* Rule 1 → §§ 3(5)(B), 10. Rule 2 → §§ 3(5), 6. Rule 3 → § 6 (order kept exactly). Rule 4 → § 4(e). Rule 5 → § 8. Rule 6 → § 12. Rule 7 → §§ 3(5)(A), 4(d), 10. Rule 8 → §§ 9, 10(c).

---

**AN ACT TO CREATE THE RESIDENTIAL RATE STABILIZATION FUND; TO REQUIRE THAT TEMPORARY FUEL, PURCHASED-POWER, STORM, AND OTHER SINGLE-EVENT ELECTRIC COSTS BE ABSORBED BY STATE SURPLUS, THEN BY THE UTILITY, THEN BY FUND EARNINGS, BEFORE ANY REMAINDER IS SHARED STATEWIDE ON HOUSEHOLD BILLS; TO CAP HOW MUCH A RESIDENTIAL BILL MAY RISE FROM SUCH COSTS; AND FOR OTHER PURPOSES.**

**Subtitle:** To create the Residential Rate Stabilization Fund and protect captive residential electric customers from temporary cost spikes.

BE IT ENACTED BY THE GENERAL ASSEMBLY OF THE STATE OF ARKANSAS:

*[Codification: BLR to place §§ 1–4 and 6–14 as a new subchapter of Arkansas Code Title 23, Chapter 4, and § 5 in Title 19, Chapter 5. **[VERIFY]**]*

**SECTION 1. Title.** This act shall be known and may be cited as the "Arkansas Residential Rate Stabilization Act".

**SECTION 2. Findings and purpose.**
(a) The General Assembly finds that:
(1) The state grants each public utility an exclusive service territory, so a residential customer cannot choose an electric provider;
(2) Riders and adjustments approved by the state can raise every residential bill at once, regardless of how much power a household used;
(3) Fuel, purchased-power, and storm-restoration costs rise and fall with events outside any household's control, and a cost caused by a disaster in one region is billed to households in every region served by the same utility;
(4) A fixed customer charge raises the bills of low-usage households the most;
(5) The state carries general revenue surpluses in many years, including six hundred fifty-five million dollars ($655,000,000) at the close of fiscal year 2026; and
(6) An analysis of an Arkansas utility's filed fuel rider for 2009 through 2026 found that a fund keyed to temporary fuel costs pays mostly for increases that later reverse, while a fund keyed to every bill increase mostly postpones permanent ones.
(b) The purpose of this act is that the state, which created the captive service territory, stands in front of a temporary cost shock before the household does, while the utility is still paid in full and the lights stay on.

**SECTION 3. Definitions.** As used in this act:
(1) "Commission" means the Arkansas Public Service Commission;
(2) "Covered utility" means a public utility that provides retail electric service to residential customers under rates subject to the jurisdiction of the Commission, including an electric cooperative corporation whose rates are subject to Commission jurisdiction **[VERIFY the cooperative and municipal coverage with counsel; municipal utilities are not Commission-rate-regulated]**;
(3) "Fund" means the Residential Rate Stabilization Fund created in Section 4;
(4) "Event cost" means a residential cost that the Commission approves for recovery through:
   (A) a fuel or energy cost adjustment rider, including Entergy Arkansas, LLC's Energy Cost Recovery Rider;
   (B) a purchased-power cost adjustment;
   (C) a storm or disaster restoration rider; or
   (D) any other one-time cost of a single identifiable event;
   **[VERIFY the rider names in each covered utility's tariff]**;
(5) "Extraordinary cost" means the part of an event cost by which the average residential bill of a covered utility, in a month, exceeds its level in the same month of the prior year by more than the threshold. It does not include:
   (A) any cost of new or under-construction generating plant, including recovery under Act 373 of 2025;
   (B) any change to base rates or to the customer charge set in a general rate case; or
   (C) any rider amount the Commission moves into base rates;
(6) "Threshold" means [two percent (2%)] of the covered utility's average residential price per kilowatt-hour over the prior twelve (12) months;
(7) "Utility operating reserve" means money of a covered utility that the Commission identifies as available to absorb an extraordinary cost before it is billed to customers, including any storm reserve and any earnings above the utility's allowed return **[VERIFY the mechanism with Commission staff and counsel]**;
(8) "Unused-usage offset" means the reduction, under Section 7, of an extraordinary cost otherwise billed to a residential customer whose consumption in the month fell below the customer's own twelve-month average; and
(9) "Statewide remainder charge" means the per-kilowatt-hour charge under Section 6(a)(4).

**SECTION 4. Fund created.**
(a) There is created on the books of the Treasurer of State, the Auditor of State, and the Chief Fiscal Officer of the State a trust fund to be known as the "Residential Rate Stabilization Fund". The fund is not a source of general revenue and is held in trust for residential electric customers.
(b) The fund consists of:
   (1) Transfers under Section 5;
   (2) Investment earnings under subsection (c); and
   (3) Any gifts, grants, or other money provided by law.
(c) The Treasurer of State shall invest the fund. Investment earnings shall be credited to a separate earnings account within the fund.
(d) The fund principal may not exceed [two hundred fifty million dollars ($250,000,000)]. The fund is to be spent when needed under this act; it is not an endowment, and it shall not be used to build, acquire, or finance generating plant.
(e) Unspent balances, including the earnings account, carry forward from month to month and from fiscal year to fiscal year and do not revert to general revenue.

**SECTION 5. Transfers from surplus.**
(a) At the close of each fiscal year, before any other transfer of general revenue surplus into a restricted reserve, the Chief Fiscal Officer of the State shall transfer from the General Revenue Allotment Reserve Fund, Arkansas Code § 19-5-1004 **[VERIFY current citation]**, to the fund the lesser of:
   (1) The amount needed to restore the fund principal to the cap in Section 4(d); or
   (2) [Fifty percent (50%)] of the general revenue surplus for that fiscal year.
(b) The initial transfer on the effective date of this act shall be [two hundred fifty million dollars ($250,000,000)] from the General Revenue Allotment Reserve Fund.
(c) Transfers under this section are subject to appropriation. **[VERIFY: Arkansas requires a separate appropriation act; BLR to prepare the companion appropriation.]**

**SECTION 6. Order of payment.**
(a) When the Commission approves an extraordinary cost, the residential portion shall be paid in this order:
   (1) **First,** by the fund principal, up to a monthly draw limit set by the Commission under Section 11;
   (2) **Second,** by the system's own slack: first the utility operating reserve, and then the unused-usage offset under Section 7, so that a customer who used less than the customer's own average is never charged extra for a cost the customer did not cause;
   (3) **Third,** by the fund's earnings account; and
   (4) **Last,** any remainder is spread per kilowatt-hour across residential customers of all covered utilities statewide, so that a cost falling on one region is shared by every region and no area carries a disaster alone **[VERIFY with Commission staff how to apply one statewide charge across Entergy, the other investor-owned utilities, and the cooperatives]**.
(b) The fund shall pay a covered utility directly. A payment under this section is a credit against the event cost the utility would otherwise bill to residential customers and shall appear as a line credit on each residential bill.

**SECTION 7. Unused-usage offset.** For each month in which an extraordinary cost is billed, a residential customer whose kilowatt-hour use fell below the customer's own twelve-month average shall not be billed any part of the extraordinary cost attributable to that month. The Commission shall set by rule how the offset is calculated and how a customer without twelve months of history is treated **[VERIFY the offset methodology with Commission staff]**.

**SECTION 8. Hard cap.**
(a) No residential customer's bill shall rise in any month because of extraordinary costs by more than the lesser of [five dollars ($5.00)] or [three percent (3%)] of the customer's average monthly bill over the prior twelve (12) months.
(b) An amount above the cap is deferred. A deferred amount is recovered later under Section 6, in the same order of payment, and not as a separate surcharge on the household.

**SECTION 9. Utility made whole.** A covered utility shall recover every extraordinary cost the Commission approves, through the payments in Section 6 and the deferrals in Section 8, together with carrying costs on deferred amounts at a rate the Commission sets. Nothing in this act reduces the revenue a covered utility is entitled to recover for prudently incurred costs.

**SECTION 10. Not a subsidy of plant or of returns.**
(a) Nothing in this act changes the Commission's duty to set just and reasonable rates under Arkansas Code § 23-4-101 et seq. **[VERIFY]**.
(b) The fund pays only costs the Commission has already found reasonable. It does not raise any allowed return, and it does not pay for new or under-construction generating plant, including recovery under Act 373 of 2025.
(c) The fund does not replace the base rates or customer charge set in a general rate case. Those remain subject to the Commission's ordinary review.

**SECTION 11. Commission rules.** Within one hundred eighty (180) days after the effective date of this act, the Commission shall adopt rules that set:
(1) The monthly draw limit on the fund principal;
(2) How each covered utility reports event costs and identifies its utility operating reserve;
(3) The unused-usage offset calculation;
(4) The statewide remainder charge method across covered utilities; and
(5) The carrying-cost rate on deferred amounts.

**SECTION 12. Transparency.** Each month the Commission shall publish on its website, in plain language that a customer can follow without legal or technical training:
(1) The event costs in effect for each covered utility and the threshold applied;
(2) The amounts paid by the fund principal, the utility operating reserve, the unused-usage offset, and the earnings account;
(3) The amount billed to customers, including any statewide remainder charge and any deferred amount; and
(4) The fund balance and the earnings account balance.

**SECTION 13. Audit.** The fund is subject to annual audit by Arkansas Legislative Audit. The audit report shall be filed with the Legislative Council and published by the Commission.

**SECTION 14. Review.** The Commission shall report to the General Assembly three (3) years after the effective date of this act, and every three (3) years after that, on whether the fund reduced bill volatility or only delayed increases, using the same measures as the analysis in Section 2(a)(6). Payments under Section 6 continue in the same order unless and until the General Assembly acts to change or end them.

**SECTION 15. Severability.** If any provision of this act or its application to any person or circumstance is held invalid, the invalidity does not affect other provisions or applications of the act that can be given effect without the invalid provision or application, and to this end the provisions of this act are severable.

**SECTION 16. Effective date.** This act is effective on [July 1, 2027]. The Commission's rules under Section 11 apply to bills rendered on and after [the first billing cycle of January 2028].
