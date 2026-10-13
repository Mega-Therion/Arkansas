#!/usr/bin/env python3
"""Would a Rate Stabilization Fund keyed to fuel costs smooth bills instead of postponing them?

Follow-up to rate_stabilization_volatility.py, which found that a fund triggered by every 12-month
rise in the residential price mostly postpones increases (86-92% of its dollars go to rises still
present two years later).

The Commission's fuel adjustment clause history is not in hand, so this uses a proxy [O]: the part of
the Arkansas residential price that moves with the Henry Hub natural gas price. Fit
    p_t = a + b t + c * HH_{t-L}
over 2010-01 .. 2026-07 for each lag L from 0 to 12 months, keep the best fit, and call
    f_t = c * HH_{t-L}
the fuel component. The fund then pays only the part of the 12-month rise in f_t above theta times
last year's price, and households pay everything else.

Data: data/eia861m_arkansas_residential.csv (EIA-861M) and data/eia_henry_hub_monthly.csv
(EIA series RNGWHHD, https://www.eia.gov/dnav/ng/hist_xls/RNGWHHDm.xls). Statewide, all utilities.

Result (2026-10-13): best lag 3 months; R^2 0.789 against 0.764 for the trend alone, so the proxy is weak.
Keyed to the proxy, 18-28% of fund dollars reach rises that reverse (4-13% when keyed to every rise),
but the two worst 12-month rises (2021-02, 22.9%; 2023-02, 15.4%) have almost no proxy component and
go unpaid. The Commission's fuel adjustment clause history is still needed.
"""
import csv
import json
import statistics
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
OUT = HERE / "fuel_keyed_stabilization.json"

rows = list(csv.DictReader((HERE / "data/eia861m_arkansas_residential.csv").open()))
ym = [f"{int(r['year'])}-{int(r['month']):02d}" for r in rows]
p = np.array([float(r["price_cents_per_kwh"]) for r in rows])
s = np.array([float(r["sales_mwh"]) for r in rows])
hh = {r["date"]: float(r["henry_hub_usd_per_mmbtu"]) for r in csv.DictReader((HERE / "data/eia_henry_hub_monthly.csv").open())}
hh_keys = sorted(hh)


def hh_lag(i, L):
    k = hh_keys.index(ym[i]) - L
    return hh[hh_keys[k]]


t = np.arange(len(p), dtype=float)
fits = []
for L in range(13):
    x = np.array([hh_lag(i, L) for i in range(len(p))])
    A = np.column_stack([np.ones_like(t), t, x])
    coef, *_ = np.linalg.lstsq(A, p, rcond=None)
    resid = p - A @ coef
    r2 = 1 - resid.var() / p.var()
    fits.append((r2, L, coef, x))
r2, L, coef, x = max(fits, key=lambda z: z[0])
f = coef[2] * x                                   # fuel component, cents/kWh
r2_trend_only = 1 - (p - np.polyval(np.polyfit(t, p, 1), t)).var() / p.var()


def run(theta, fund0, key):
    """key='fuel': pay the 12-month rise of f above theta*p[t-12]; key='all': the rise of p (row 4)."""
    bal, h, paid, ledger = fund0, p.copy(), np.zeros_like(p), []
    for i in range(12, len(p)):
        rise = (f[i] - f[i - 12]) if key == "fuel" else (p[i] - p[i - 12])
        excess = max(0.0, rise - theta * p[i - 12])
        pay = min(excess * s[i] * 10.0, bal)
        bal -= pay; paid[i] = pay; h[i] = p[i] - pay / (s[i] * 10.0)
        if pay > 0 and i + 24 < len(p):
            tot = p[i] - p[i - 12]
            persist = min(max(p[i + 24] - p[i - 12], 0.0), max(tot, 1e-12)) / max(tot, 1e-12) if tot > 0 else 0.0
            ledger.append((pay, persist))
        elif pay > 0:
            ledger.append((pay, None))
    yh = [100 * (h[i] - h[i - 12]) / h[i - 12] for i in range(12, len(p))]
    res = [l for l in ledger if l[1] is not None]
    trans = sum(a * (1 - b) for a, b in res); pers = sum(a * b for a, b in res)
    return {"key": key, "theta_pct": 100 * theta, "fund_usd": fund0, "paid_usd": round(paid.sum()),
            "months_paid": int((paid > 0).sum()),
            "transient_share_pct": round(100 * trans / (trans + pers), 1) if trans + pers else None,
            "household_yoy_max_pct": round(max(yh), 2), "household_yoy_sd_pct": round(statistics.pstdev(yh), 3),
            "paid_by_year_usd": {y: round(sum(paid[i] for i in range(len(p)) if ym[i][:4] == y))
                                 for y in sorted({m[:4] for m in ym}) if sum(paid[i] for i in range(len(p)) if ym[i][:4] == y) > 0}}


yp = [100 * (p[i] - p[i - 12]) / p[i - 12] for i in range(12, len(p))]
res = {"proxy_fit": {"best_lag_months": L, "r2": round(r2, 3), "r2_trend_only": round(r2_trend_only, 3),
                     "cents_per_kwh_per_usd_mmbtu": round(float(coef[2]), 4),
                     "fuel_component_range_cents": [round(float(f.min()), 3), round(float(f.max()), 3)]},
       "no_fund": {"yoy_max_pct": round(max(yp), 2), "yoy_sd_pct": round(statistics.pstdev(yp), 3)},
       "scenarios": [run(th, F, k) for k in ("fuel", "all") for th, F in ((0.0, 250e6), (0.02, 250e6), (0.05, 250e6), (0.0, 655e6))]}
OUT.write_text(json.dumps(res, indent=1))
print(json.dumps(res["proxy_fit"]), json.dumps(res["no_fund"]))
for sc in res["scenarios"]:
    print(f"{sc['key']:<4} theta {sc['theta_pct']:>3.0f}% fund ${sc['fund_usd']/1e6:>3.0f}M  paid ${sc['paid_usd']/1e6:6.1f}M in {sc['months_paid']:>3} mo  "
          f"transient {sc['transient_share_pct']}%  worst year {sc['household_yoy_max_pct']}%  sd {sc['household_yoy_sd_pct']}  years {list(sc['paid_by_year_usd'])}")
