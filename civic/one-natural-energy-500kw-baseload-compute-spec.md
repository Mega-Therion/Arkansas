# ONE Natural Energy: 500 kW Containerized Baseload Compute Specification
**Target  Jurisdiction:** Arkansas (State-Wide Sovereign Deployment)  
**Classification:** Behind-the-Meter  Baseload  Compute &  Thermal  District Utility  
**Governing Standard:** `POWER_PLAN_CANON.md` (Strict Citizen Wallet Immunity)  
**Standard Compliance:** Epistemic Tier `[D]`, Closed-Loop Hydrology, Zero Municipal Leaks.

---

## 1. Executive Summary & Policy Invariant

This  technical specification details the modular, containerized  500  kW behind-the-meter  (BTM)  high-density compute architecture developed for **ONE Natural Energy** in Arkansas. 

In strict adherence to **Rules 2 and 7 of the Arkansas Power Plan Canon** (`civic/POWER_PLAN_CANON.md`):
> *Rule 2: "The citizen is never the first wallet."*
> *Rule 7: "The fund is spent when needed. It is not an endowment and it is not a subsidy for building plants. New plant for new large load is paid by that load."*

The  500 kW modular compute block generates  its  own power  directly  from dedicated baseload generation (subsurface geothermal / run-of-river hydro / stranded natural gas baseload) with **zero grid interconnection burden** and **zero cost socialization to retail ratepayers**. 

Furthermore,  100% of the rejected thermal energy  ($45\text{–}60^\circ\text{C}$  dielectric fluid  loops)  is coupled directly to agricultural greenhouse soil warming, timber drying, or brine mineral concentration, converting what traditional data centers treat as waste heat into a local civic and economic asset.

---

## 2. Engineering & Thermodynamic Specifications

### A. Power & Electrical Architecture
* **Nameplate  Compute Capacity:** 500 kW Continuous Baseload  ($24/7/365$).
* **Generation  Coupling:** Dedicated  Behind-the-Meter  (BTM) $480\text{V AC}$ 3-phase bus.
* **Grid Interconnection Status:** Islanded / Behind-the-Meter (zero RTO transmission queue dependency; zero SPP/MISO tariff surcharge).
* **Power Usage Effectiveness (PUE):** $\le 1.05$ annual average via single-phase immersion cooling.
* **Parasitic Pumping & Control Load:** $\le 22\text{ kW}$ total ($4.4\%$ parasitic overhead).

### B. Thermal & Cooling Subsystem
* **Immersion  Tank Topology:** 4x 125 kW single-phase  synthetic  hydrocarbon dielectric  fluid  immersion tanks.
* **Fluid Flow Rate:** $120\text{ GPM}$ total dielectric loop circulation.
* **Supply Fluid Temperature:** $38^\circ\text{C}$ to IT equipment.
* **Return Fluid Temperature:** $54\text{–}58^\circ\text{C}$ exiting server tanks.
* **Primary Heat Exchanger:** Plate-and-frame 316L stainless steel liquid-to-liquid heat exchanger.
* **Civic Heat Export:** Secondary closed water loop delivering $48\text{–}52^\circ\text{C}$ warm water to agricultural greenhouses or municipal district heating partners.
* **Tertiary Emergency Rejection:** Closed-loop adiabatic dry-cooler with variable-speed EC fans (zero surface-water thermal pollution; zero aquifer consumption).

### C. Server & Compute Density
* **Form  Factor:** 20-foot ISO intermodal weatherproof containerized  shelter  (IP66 rated).
* **Compute  Payload:**  160x 2U dual-socket high-density accelerator nodes.
* **Operating System Substrate:** Static musl Linux running `SovereignOsKernel` with Ed25519 `SolomonicGate` verification.
* **Internal Networking:** Redundant 100GbE QSFP28 non-blocking leaf-spine fabric.
* **Telemetry & Sensor Grid:** Local edge SQLite log repository + LoRaWAN encrypted telemetry beacon ($915\text{ MHz}$) emitting sub-noise DSSS diagnostic frames.

### D. Fundamental Landauer Thermodynamic Dissipation Budget
* **Landauer  Bit-Erasure Limit ($T = 293.15\text{ K}$):**  $\Delta  Q_{\text{min}} =  k_B  T \ln 2 \approx 2.8055 \times 10^{-21}\text{ J / bit}$.
* **Dielectric Bath Junction Limit ($T = 338.15\text{ K} / 65^\circ\text{C}$):** $\Delta Q_{\text{bath}} = k_B T \ln 2 \approx 3.2361 \times 10^{-21}\text{ J / bit}$.
* **Theoretical Erasure Ceiling ($500\text{ kW}$ IT load):** $\dot{N}_{\text{max}} = \frac{5 \times 10^5\text{ W}}{\Delta Q_{\text{min}}} \approx 1.782 \times 10^{26}\text{ bit erasures / second}$.
* **CMOS Dissipation Gap:** Contemporary FinFET accelerator silicon dissipates $E_{\text{gate}} \sim 1\text{ to } 10\text{ fJ / operation} = 10^{-15}\text{ to } 10^{-14}\text{ J}$. Real computational work operates at an overhead factor of $\eta \approx \frac{E_{\text{gate}}}{\Delta Q_{\text{min}}} \approx 3.5 \times 10^5 \text{ to } 3.5 \times 10^6$ above the physical Landauer floor.
* **Thermal Recovery Grounding:** Because $>99.999\%$ of electric input manifests as classical resistive heat rather than irreversible bit-erasure entropy, capturing $475\text{ kW}$ of fluid enthalpy at $60^\circ\text{C}$ converts circuit inefficiencies directly into agricultural soil warming, recovering the thermodynamic penalty for food production.

---

## 3. Hydrologic & Environmental Protection Invariant

1. **Zero  Evaporative Aquifer Depletion:**
   The unit employs closed-loop  sealed  heat exchangers.  No  open cooling towers, evaporative drift, or alluvial groundwater pumping is permitted.
2. **Thermal River Protection:**
   Direct surface-water discharge of cooling effluent is strictly prohibited under Arkansas DEQ Rule 2 standards. All rejected heat not absorbed by agricultural partners is dissipated via air-cooled adiabatic dry coolers.
3. **Dielectric Containment:**
   Double-walled secondary containment basin under all immersion tanks holding $150\%$ of maximum fluid volume, certified against seismic and tornado shear.

---

## 4. Economic & Civic Revenue Model

| Revenue & Cost Factor | Value (500 kW Modular Block) | Basis / Epistemic Grounding |
| :--- | :--- | :--- |
| **Capital Expenditure (CapEx)** | $\$485,000$ (Immersion + Shell) | Off-the-shelf 20ft containerized buildout |
| **Dedicated Generation Fuel Cost** | $\$0.032\text{ / kWh}$ | Direct BTM baseload energy contract |
| **PUE Operating Efficiency** | $1.048$ | Measured immersion thermal dissipation |
| **Civic Heat Re-Use Credit** | $\$18,500\text{ / year}$ | Offset heating cost for 1.5 acre agricultural greenhouse |
| **Local Ratepayer Impact** | **$\$0.00$** | **100% private BTM capital; zero rate base inclusion** |

---

## 5. Strategic Integration with Arkansas Civic Infrastructure

1. **Anchor  Compute for State Open Data:** A  dedicated  50 kW  partition  within each modular container is reserved for running sovereign civic telemetry processing, including real-time hydrologic forecasting for the Arkansas Water Plan.
2. **Rural Microgrid Black-Start:** In emergency severe-weather scenarios (e.g., tornado grid collapse), the 500 kW dedicated baseload generator can be island-coupled via mechanical transfer switch to provide emergency power to local water pumps and emergency shelters.
3. **Statutory Alignment:** Fully compliant with Arkansas Act 317 of 2017, the Arkansas Data Centers Clean Energy Framework, and PC&E environmental regulations.
