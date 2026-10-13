#!/usr/bin/env python3
"""Does a surplus-funded Rate Stabilization Fund reduce bill volatility, or only delay increases?

Data: EIA-861M monthly sales and revenue by state (public, no key), Arkansas residential sector,
2010-01 onward: https://www.eia.gov/electricity/data/eia861m/xls/sales_revenue.xlsx
The Arkansas rows are saved in data/eia861m_arkansas_residential.csv so the run is reproducible offline.

Rule simulated (model bill, civic/drafts/rate-stabilization-fund-model-bill.md, sections 3 and 5(1)):
  An "extraordinary" increase is the part of the 12-month rise in the residential price above a
  threshold theta. Each month the fund pays that part for every kWh sold, while it has money.
  Households pay the rest. The bill leaves theta and the fund size blank; both are scanned here.

Not modelled: section 5(2) (offsetting against low users' unused margin moves cost between households
inside the class, so it does not change the class total), the section 6 cap, utility-specific rates
(this is the statewide average across all Arkansas utilities), and usage changes (the price, not the
bill, is the quantity the bill's trigger is about).

How "delay" and "reduction" are separated: for each month the fund pays, look at the price 24 months
later. The share of that month's 12-month rise that is still there is called persistent, the rest
transient. Paying a transient rise removes it from household bills for good (smoothing). Paying a
persistent rise only postpones it: once the rise is a year old it becomes the new baseline, the fund
stops, and households pay the full new level.

Usage:  python3 rate_stabilization_volatility.py [--refresh]   (--refresh re-downloads the EIA file)
"""
import csv
import io
import json
import math
import statistics
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data" / "eia861m_arkansas_residential.csv"
OUT = HERE / "rate_stabilization_volatility.json"
URL = "https://www.eia.gov/electricity/data/eia861m/xls/sales_revenue.xlsx"


def refresh():
    import openpyxl  # only needed to re-extract from the EIA workbook
    req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
    raw = urllib.request.urlopen(req, timeout=120).read()
    wb = openpyxl.load_workbook(io.BytesIO(raw), read_only=True)
    rows = []
    for i, r in enumerate(wb["Monthly-States"].iter_rows(values_only=True)):
        if i < 3 or not r or r[2] != "AR":
            continue
        rows.append({"year": int(r[0]), "month": int(r[1]), "status": r[3], "revenue_thousand_usd": r[4],
                     "sales_mwh": r[5], "customers": r[6], "price_cents_per_kwh": r[7]})
    rows.sort(key=lambda x: (x["year"], x["month"]))
    DATA.parent.mkdir(exist_ok=True)
    with DATA.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader(); w.writerows(rows)


def load():
    with DATA.open() as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        for k in ("revenue_thousand_usd", "sales_mwh", "customers", "price_cents_per_kwh"):
            r[k] = float(r[k])
        r["year"], r["month"] = int(r["year"]), int(r["month"])
    return rows


def simulate(rows, theta, fund0, topup_july=0.0):
    """Return household price path and fund ledger. Dollars: cents/kWh x MWh x 10 = USD."""
    p = [r["price_cents_per_kwh"] for r in rows]
    s = [r["sales_mwh"] for r in rows]
    n = len(p)
    h, paid, bal, ledger = list(p), [0.0] * n, fund0, []
    for t in range(n):
        if rows[t]["month"] == 7 and t > 0:
            bal += topup_july
        if t < 12:
            continue
        excess = max(0.0, p[t] - (1 + theta) * p[t - 12])         # cents/kWh above the threshold
        want = excess * s[t] * 10.0                                  # USD
        pay = min(want, bal)
        bal -= pay
        paid[t] = pay
        h[t] = p[t] - pay / (s[t] * 10.0)
        if pay > 0:
            rise = p[t] - p[t - 12]
            if t + 24 < n:
                persist = min(max(p[t + 24] - p[t - 12], 0.0), rise) / rise
                kind = "resolved"
            else:
                persist, kind = None, "unresolved"
            ledger.append({"ym": f"{rows[t]['year']}-{rows[t]['month']:02d}", "paid_usd": pay,
                           "yoy_rise_pct": 100 * rise / p[t - 12], "persistent_share": persist, "kind": kind})
    return h, paid, bal, ledger


def yoy(series):
    return [100 * (series[t] - series[t - 12]) / series[t - 12] for t in range(12, len(series))]


def summarize(rows, theta, fund0, topup=0.0):
    p = [r["price_cents_per_kwh"] for r in rows]
    h, paid, bal, ledger = simulate(rows, theta, fund0, topup)
    yp, yh = yoy(p), yoy(h)
    total = sum(paid)
    trans = sum(e["paid_usd"] * (1 - e["persistent_share"]) for e in ledger if e["kind"] == "resolved")
    pers = sum(e["paid_usd"] * e["persistent_share"] for e in ledger if e["kind"] == "resolved")
    unres = sum(e["paid_usd"] for e in ledger if e["kind"] == "unresolved")
    months_over = lambda ys, lim: sum(1 for v in ys if v > lim)
    return {
        "theta_pct": 100 * theta, "fund_initial_usd": fund0, "topup_each_july_usd": topup,
        "fund_paid_total_usd": round(total), "fund_left_usd": round(bal),
        "paid_on_transient_rises_usd": round(trans), "paid_on_persistent_rises_usd": round(pers),
        "paid_unresolved_usd": round(unres),
        "transient_share_of_resolved_pct": round(100 * trans / (trans + pers), 1) if trans + pers else None,
        "months_fund_paid": sum(1 for x in paid if x > 0),
        "household_yoy_max_pct": round(max(yh), 2), "no_fund_yoy_max_pct": round(max(yp), 2),
        "household_yoy_sd_pct": round(statistics.pstdev(yh), 3), "no_fund_yoy_sd_pct": round(statistics.pstdev(yp), 3),
        "months_household_yoy_over_theta": months_over(yh, 100 * theta),
        "months_no_fund_yoy_over_theta": months_over(yp, 100 * theta),
        "household_price_end_cents": round(h[-1], 3), "no_fund_price_end_cents": round(p[-1], 3),
        "fund_paid_by_year_usd": {str(y): round(sum(paid[t] for t in range(len(rows)) if rows[t]["year"] == y))
                                  for y in sorted({r["year"] for r in rows})
                                  if sum(paid[t] for t in range(len(rows)) if rows[t]["year"] == y) > 0},
    }


def self_test():
    """Synthetic checks of the mechanism: a permanent step is paid for exactly 12 months (delay);
    a one-month spike never reaches households (smoothing)."""
    base = [{"year": 2000 + t // 12, "month": t % 12 + 1, "price_cents_per_kwh": 10.0, "sales_mwh": 1e6,
             "customers": 1e6, "revenue_thousand_usd": 0.0} for t in range(72)]
    step = [dict(r) for r in base]
    for t in range(30, 72):
        step[t]["price_cents_per_kwh"] = 12.0                       # +20% permanent at month 30
    h, paid, _, _ = simulate(step, 0.05, 1e12)
    step_months = sum(1 for x in paid if x > 0)
    step_ok = step_months == 12 and abs(h[41] - 10.5) < 1e-9 and abs(h[42] - 12.0) < 1e-9
    spike = [dict(r) for r in base]
    spike[30]["price_cents_per_kwh"] = 13.0                          # one-month +30% spike
    h2, paid2, _, _ = simulate(spike, 0.05, 1e12)
    spike_ok = abs(h2[30] - 10.5) < 1e-9 and sum(1 for x in paid2 if x > 0) == 1
    return {"permanent_step_paid_months": step_months, "permanent_step_ok": step_ok, "one_month_spike_ok": spike_ok}


def main():
    if "--refresh" in sys.argv or not DATA.exists():
        refresh()
    rows = load()
    res = {"data": {"source": URL, "file": str(DATA.relative_to(HERE)), "state": "AR", "sector": "residential",
                    "first": f"{rows[0]['year']}-{rows[0]['month']:02d}", "last": f"{rows[-1]['year']}-{rows[-1]['month']:02d}",
                    "months": len(rows), "preliminary_months": sum(1 for r in rows if r["status"] == "Preliminary"),
                    "price_first_cents": rows[0]["price_cents_per_kwh"], "price_last_cents": rows[-1]["price_cents_per_kwh"]},
           "self_test": self_test(), "scenarios": []}
    for theta, fund0 in ((0.05, 100e6), (0.05, 250e6), (0.05, 655e6), (0.03, 250e6), (0.10, 250e6)):
        res["scenarios"].append(summarize(rows, theta, fund0))
    res["scenarios"].append(summarize(rows, 0.05, 100e6, topup=50e6))
    p = [r["price_cents_per_kwh"] for r in rows]
    yp = yoy(p)
    res["history"] = {"yoy_rise_over_5pct_months": [f"{rows[t]['year']}-{rows[t]['month']:02d}"
                                                    for t in range(12, len(rows)) if yp[t - 12] > 5],
                      "yoy_max_pct": round(max(yp), 2)}
    OUT.write_text(json.dumps(res, indent=1))
    print(json.dumps(res["self_test"]))
    print(json.dumps(res["data"]))
    for sc in res["scenarios"]:
        print(f"theta {sc['theta_pct']:>4.0f}%  fund ${sc['fund_initial_usd']/1e6:>4.0f}M (+${sc['topup_each_july_usd']/1e6:.0f}M/yr)  "
              f"paid ${sc['fund_paid_total_usd']/1e6:7.1f}M in {sc['months_fund_paid']:>3} months  "
              f"transient {sc['transient_share_of_resolved_pct']}% of resolved  unresolved ${sc['paid_unresolved_usd']/1e6:.1f}M  "
              f"YoY max {sc['no_fund_yoy_max_pct']}% -> {sc['household_yoy_max_pct']}%  "
              f"months over theta {sc['months_no_fund_yoy_over_theta']} -> {sc['months_household_yoy_over_theta']}")
    print("history:", res["history"])
    ok = all(res["self_test"][k] for k in ("permanent_step_ok", "one_month_spike_ok"))
    print("SELF-TEST", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
