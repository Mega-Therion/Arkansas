# Entergy Arkansas Rider ECR (Rate Schedule No. 38) history, 2009-09 to 2026

File: `entergy_ecr_history.csv`, 19 rows, one per rate period. Built 2026-10-28.

## Sources
Every  `ecr_usd_per_kwh` value comes  from an Entergy  Arkansas  (EAI/EAL)  filing or an APSC order, downloaded from the APSC e-filing system (`apps.apsc.arkansas.gov/olsv2/viewdoc/pdfview.asp?document=...`) and read with pdftotext. The yearly redeterminations were filed in whichever rate-case docket was current:

| Rider cycles | Docket | Filings used |
|---|---|---|
| Sep 2009 – Mar 2011 | 06-101-U | 468 + Order 21 (470), 477, 481 |
| Apr 2011 – Mar 2014 | 09-084-U | 375, 393, 417 |
| Apr 2014 – Mar 2017 | 13-028-U | 460 + Order 23 (443), 561, 589 |
| Apr 2017 – Mar 2027 | 15-015-U | 398, 433, 467, 492, 517, 552 (supersedes 549), 573, 616, 643, 670 |

`filing_number`  is the APSC  "Doc. N" stamp  on  the  PDF. In two places it differs from the row number on the docket listing page: 13-028-U lists the filing as 588 but the stamp says 589, and 15-015-U lists 550 but the stamp says 552. Dockets 20-049-U and 25-049-TF, which current tariff sheets cite, contain no ECR rate filings. The only secondary cross-check is Entergy's Sept-2026 residential bill template (`ark-bill.pdf`), which shows $0.0150800/kWh and matches the 2026 row.

## Coverage
- The record runs continuously from 2009-09-01 to the present, so every month of 2010–2026 is covered.
- **Interims.** There are two: Sep 2009 (a cut) and Oct 2010 (a "stair-step" increase). Two independent checks show there were no others from April 2011 through 2026:
  1. Searching the docket listings of all four dockets for ECR, "Energy Cost" and "interim" turns up no other interim filing.
  2. Each annual letter names the current rate as the one "implemented with the first billing cycle of April [prior year]", and that chain is unbroken. The 2011 letter names the Oct-2010 interim.
- **No 2022 interim.** The idea that EAL filed an interim in 2022 is wrong. The 2023 letter gives the current rate as $0.01639 from April 2022, and EAL's Celino testimony (15-015-U doc 575) says "EAL did not file interim adjustments" for the 2021–22 costs. Instead, the 2022 fuel spike was absorbed through Note-5 adjustments in the annual filings and a $32.0M deferral.
- **2026.** EAL warned (doc 670) that it might file an interim in 2026. None appears in the docket through doc 679 (2026-10-01).

## Gaps and caveats
- **Effective dates.** Only two days are stated exactly in a primary source: 2009-09-01 (Order 21) and 2022-03-31 (doc 552, footnote 1). A third, 2021-04-01, comes from testimony. All the others are entered as nominal dates (YYYY-04-01, or 2010-10-01) meaning "first billing cycle of that month"; the real cycle-1 date can fall a day or two either side (for example 2020-12-31 for January 2021 cycles). `end_date` is the day before the next row starts.
- **Values that needed a choice:**
  - **2014:** the formula gives 0.01880; the billed rate was 0.01566, after the ANO-incident exclusion ordered in Order 23.
  - **2022:** filed at 0.01785 on 3/15, then refiled at 0.01639 on 3/25. The 0.01639 refiling is the rate that was implemented.
  - **2023:** the cover letter says 0.01884; the workpaper and the 2024 letter say 0.01883, and 0.01883 is used.
- **2010–2013 scans.** These filings are scans, so no formula components were extracted for them (columns left blank). Their rates come from the cover letters and are confirmed by the next year's "current rate" statement.

## Does the rate include true-up? Yes.
The  formula in every  filing is ECR  =  (TUA  + PEC·EAF + AS) / PES, where:
- **TUA** is the prior calendar year's over/under-recovery plus carrying charges (the true-up).
- **PEC** is projected energy cost: the prior year's actual fuel and purchased-energy cost, plus the nuclear refueling outage adjustment (NRFA), plus any Note-5 adjustment.
- **EAF** is the retail energy allocation factor (about 0.99999).
- **AS** covers additional sums for the Stuttgart and Chicot solar facilities.
- **PES** is projected kWh sales.

The  CSV carries `tua_usd`,  `pec_usd` and `pes_kwh`  for  2014–2026.  Recomputing (TUA+PEC)/PES reproduces each rate to within about 0.0001 $/kWh. The 2014 components are from before the ANO exclusion.

What  this means for  the stabilization model:
1. **The  ECR  lags.**  It is set once a year from the prior year's costs plus a true-up, so it trails actual fuel cost by roughly 12–15 months. The 2021 gas run-up shows up in the April 2022 and April 2023 rates, not in mid-2022.
2. **It is already smoothed by the regulator.** Discretionary Note-5 adjustments shifted the rate in 2014 (−$65.9M ANO), 2021 (half the storm cost pulled forward), 2022 (storm cost removed plus a $32M deferral), 2024 (+$43.65M), 2025 (PEC replaced by a forecast, +$127.7M) and 2026 (−$46.5M). The unadjusted rates are recorded in `note`.
3. **For a forward fuel-cost signal without the true-up,** use (PEC·EAF)/PES; ≈ PEC/PES is good to well under 0.0001 $/kWh since EAF ≈ 0.99999. That figure still includes NRFA and the Note-5 adjustments.
