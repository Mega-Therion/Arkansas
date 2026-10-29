#!/usr/bin/env python3
"""Rate Stabilization Fund keyed to Entergy Arkansas's actual Rider ECR (fuel and purchased power).

Follow-up to fuel_keyed_stabilization.py, which had to use a Henry Hub proxy (R^2 0.789 vs 0.764 for
trend alone). This uses the filed ECR rate history instead: data/entergy_ecr_history.csv, every rate
period 2009-09 .. 2026, each read from an APSC filing (see data/entergy_ecr_history.md).

Fund rule (same as the proxy run): each month, the fund pays the part of the 12-month rise in the ECR
rate above theta * last year's residential price, on Entergy's residential kWh, until the fund is empty.
Household price p_t is the EIA-861M Arkansas residential average (all utilities). Entergy's residential
kWh are approximated as ENTERGY_SHARE of statewide residential sales (about 738,000 of 1,510,599
residential customers in 2026-07); that scaling is an assumption [O].

Note: the ECR already lags fuel costs by 12-15 months and includes a true-up of the prior year's
over/under-recovery, so it is smoother than spot fuel. A rise in the ECR is a rise households would
actually see on the bill line, which is what the fund is meant to absorb.
"""
import csv
import json
import statistics
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "ecr_keyed_stabilization.json"
ENTERGY_SHARE = 738_000 / 1_510_599

rows = list(csv.DictReader((HERE / "data/eia861m_arkansas_residential.csv").open()))
months = [date(int(r["year"]), int(r["month"]), 1) for r in rows]
p = [float(r["price_cents_per_kwh"]) for r in rows]
s = [float(r["sales_mwh"]) * ENTERGY_SHARE for r in rows]

ecr_rows = list(csv.DictReader((HERE / "data/entergy_ecr_history.csv").open()))
periods = [(date.fromisoformat(r["effective_date"]), 100 * float(r["ecr_usd_per_kwh"])) for r in ecr_rows]


def ecr_at(m):
    """ECR in cents/kWh in force at the start of month m (a rate effective mid-month counts from the next month)."""
    val = None
    for eff, cents in periods:
        if eff <= m:
            val = cents
    return val


f = [ecr_at(m) for m in months]
n = len(p)


def run(theta, fund0):
    bal, h, paid, ledger = fund0, p[:], [0.0] * n, []
    for i in range(12, n):
        rise = f[i] - f[i - 12]
        excess = max(0.0, rise - theta * p[i - 12])
        pay = min(excess * s[i] * 10.0, bal)          # cents/kWh * MWh * 10 = USD
        bal -= pay
        paid[i] = pay
        h[i] = p[i] - (pay / (s[i] * 10.0) if s[i] else 0.0) * ENTERGY_SHARE
        if pay > 0:
            if i + 24 < n:
                persist = min(max(f[i + 24] - f[i - 12], 0.0), rise) / rise if rise > 0 else 0.0
                ledger.append((pay, persist))
            else:
                ledger.append((pay, None))
    yh = [100 * (h[i] - h[i - 12]) / h[i - 12] for i in range(12, n)]
    res = [x for x in ledger if x[1] is not None]
    trans = sum(a * (1 - b) for a, b in res)
    pers = sum(a * b for a, b in res)
    by_year = {}
    for i in range(n):
        if paid[i] > 0:
            by_year[str(months[i].year)] = by_year.get(str(months[i].year), 0) + paid[i]
    return {"theta_pct": 100 * theta, "fund_usd": fund0, "paid_usd": round(sum(paid)),
            "months_paid": sum(1 for x in paid if x > 0), "fund_left_usd": round(bal),
            "transient_share_pct": round(100 * trans / (trans + pers), 1) if trans + pers else None,
            "largest_12mo_draw_usd": round(max(sum(paid[j] for j in range(i - 11, i + 1)) for i in range(11, n))),
            "household_yoy_max_pct": round(max(yh), 2), "household_yoy_sd_pct": round(statistics.pstdev(yh), 3),
            "paid_by_year_usd": {k: round(v) for k, v in sorted(by_year.items())}}


steps = [(periods[i][0].isoformat(), round(periods[i][1] - periods[i - 1][1], 3)) for i in range(1, len(periods))]
yp = [100 * (p[i] - p[i - 12]) / p[i - 12] for i in range(12, n)]
out = {"entergy_share_of_residential_kwh": round(ENTERGY_SHARE, 3),
       "ecr_range_cents": [min(x for _, x in periods), max(x for _, x in periods)],
       "ecr_step_changes_cents": steps,
       "no_fund": {"yoy_max_pct": round(max(yp), 2), "yoy_sd_pct": round(statistics.pstdev(yp), 3)},
       "scenarios": [run(th, F) for F in (100e6, 250e6, 655e6) for th in (0.0, 0.02, 0.05)]}
OUT.write_text(json.dumps(out, indent=1))
print("ECR range", out["ecr_range_cents"], "cents/kWh; no fund", out["no_fund"])
for sc in out["scenarios"]:
    print(f"theta {sc['theta_pct']:>3.0f}% fund ${sc['fund_usd']/1e6:>3.0f}M paid ${sc['paid_usd']/1e6:6.1f}M in {sc['months_paid']:>3} mo"
          f" | max 12-mo draw ${sc['largest_12mo_draw_usd']/1e6:5.1f}M | transient {sc['transient_share_pct']}% | left ${sc['fund_left_usd']/1e6:5.1f}M | years {list(sc['paid_by_year_usd'])}")
