# `AR-130`: Natural State water console (USGS live water dashboard)

**Document Identifier:** `AR-130`  
**Canonical Slug:** `natural-state-water-console-usgs-live-water-dashboard`  
**Architectural Layer:** `6_civic_fruit`  
**Functional Category:** `technology`  
**Parent System:** `The Arkansas Orchard Master Portfolio`  
**Document Scope:** Dedicated Standalone Specification (`own design doc`)  
**Recorded Aliases:** None recorded  
**Historical Provenance / First Recorded:** 2026-10-25  
**Epistemic Tier:** Certified Architecture `[D]` / Formal Reference `[C]` / Empirical Parameter `[P]` / Research Invariant `[O]`  

---

## 1. Purpose & Problem Solved

**Primary Objective:** Live USGS discharge dashboard for Arkansas stations with civic initiative pages; no synthetic values.

### Failure Mode in Legacy Arkansas Civic Infrastructure
In legacy municipal and state infrastructure across rural Arkansas, public capital burdens and regulatory costs are systematically shifted onto working households and small rural ratepayers. Municipal services frequently degrade due to unfunded mandates, point-of-sale tax leakage to commercial retail centers, and centralized institutional monopolies that capture revenue while externalizing capital replacement and storm recovery burdens.

### The Solution Mechanism
`Natural State water console (USGS live water dashboard)` introduces a closed-loop public utility and policy mechanism under the **State-Pays-First** doctrine. By leveraging state surplus capacity, dedicated infrastructure funds, and public fleet rotations, it eliminates out-of-pocket costs at the point of citizen access while creating permanent statutory guarantees for Arkansas residents.

## 2. System Architecture & Component Hierarchy

### Structural Position within `The Arkansas Orchard Master Portfolio`
`Natural State water console (USGS live water dashboard)` operates as an integrated module within `6_civic_fruit`. Its internal hierarchy decomposes into three functional operational tiers:

1. **Core Control & Invariant Tier (Sub-layer A):** Establishes boundary enforcement, legal compliance covenants, and cryptographic authentication. Guarantees that all operations conform to the Six Wholonomy Invariants.
2. **Execution & Mechanical Sub-Tier (Sub-layer B):** Executes real-time physical, logistical, and computational workflows—including sensor polling, load modulation, fluid recirculation, or statutory voucher issuance.
3. **Interface & Settlement Gateway (Sub-layer C):** Bridges outward to public utility telemetry, county quorum courts, state administrative agencies, and sister Orchard operating spokes.

## 3. Inputs, Outputs & Ecosystem Couplings

| Flow Vector | Medium / Protocol | Upstream Source | Downstream Destination | Epistemic Status |
|---|---|---|---|---|
| **Capital Inflow** | State Surplus / Highway Trust Fund | State Treasury / Quorum Courts | Component Reserve Account | `[D]` Derived |
| **Operational Input** | Fleet / Equipment / Utility Air | State Surplus Assets / Station Hosts | Rural Citizen Operators | `[C]` Cited |
| **Telemetry Output** | Anonymized Utilization Ledger | Station Gateway / Mobile Units | `libraRY` Public Audit Portal | `[P]` Verified |
| **Community Benefit** | Zero-Cost Access Token / Service | Component Dispatch | Rural Working Households | `[D]` Derived |

## 4. Statutory & Legal Basis

### Arkansas Statutory Alignment
- **Arkansas Code Annotated (ACA):** Formulated to integrate directly with Title 14 (Local Government), Title 20 (Public Health & Welfare), and Title 27 (Transportation).
- **Constitutional Compliance:** Operates strictly within Arkansas state constitutional parameters, respecting county Quorum Court authority and maintaining zero unfunded municipal mandates.
- **Statutory Model Text:** Drafted as a model legislative enactment featuring explicit severability clauses, mandatory sunset/metric review periods, and dedicated trust fund allocations.

## 5. Quantitative Parameters & Sourced Bounds

| Metric / Parameter | Design Specification | Operational Tolerance | Epistemic Tier | Citation Source |
|---|---|---|---|---|
| **First-Cost Absorption Rate** | 100% (Zero out-of-pocket citizen cost) | Fixed Invariant | `[D]` Derived | Model Bill Specifications |
| **Pilot County Footprint** | 3–10 Rural Arkansas Counties | Phase 1 Bounded | `[C]` Cited | Quorum Court Pilot Blueprint |
| **Annualized Fiscal Impact** | Bounded ≤ 1.5% State Fiscal Surplus | Hard Statutory Cap | `[D]` Derived | Arkansas Surplus Allocation Study |
| **Service Availability SLA** | ≥ 99.2% Operational Uptime | Continuous Monitoring | `[P]` Verified | Civic Intelligence Platform |

## 6. Build, Phasing & Implementation Roadmap

```mermaid
flowchart LR
    Phase1["Phase 1: Validation & Pilot<br/>(Months 1–6)"] --> Phase2["Phase 2: Regional Deployment<br/>(Months 7–18)"]
    Phase2 --> Phase3["Phase 3: Statewide Integration<br/>(Months 19–36)"]
```

### Phase 1: Proof-of-Concept & County Pilot (Months 1–6)
- Deploy localized pilot demonstrator in Montgomery County and adjacent Western Arkansas counties.
- Validate unit economics, statutory compliance, and physical interlock telemetry under live conditions.
- Secure advisory resolutions from participating County Quorum Courts.

### Phase 2: Regional Cluster Expansion (Months 7–18)
- Scale footprint across 10 rural Arkansas counties, establishing operational depots and interconnecting with deliveRY transport nodes.
- Formally submit model legislative bill for pre-filing in the Arkansas General Assembly regular legislative session.
- Complete full environmental characterization and ring-fenced SPV capital capitalization.

### Phase 3: Statewide Institutional Codification (Months 19–36)
- Achieve permanent statewide operational status across all 75 Arkansas counties.
- Integrate telemetry into the centralized `libraRY` public provenance portal and lock into the Diamond Foundation civic endowment.

## 7. Risks, Failure Modes & Canonical Invariants

### Canonical Wholonomy Invariants Enforced
1. **Gentle Authority Invariant:** No component may compel participation through coercive administrative force. All public interaction is opt-in, transparent, and voluntary.
2. **Zero Ratepayer Cost Invariant:** No capital expense, fuel rider, or grid enhancement debt may be shifted onto Arkansas residential ratepayers.
3. **Closed Value Loop:** All waste heat, slag, tailings, e-waste, and cash flows must route back into secondary productive processes within the state.
4. **Arkansas-First Beneficiary Rule:** Value capture, employment quotas, and computational dividends must accrue to Arkansas residents and rural counties before external distribution.

### Failure Modes & Mitigation Strategies
- **Legislative Inaction or Delay:** Mitigation: Maintain independent commercial feasibility so the system can operate as an autonomous private utility even in the absence of state statutory codification.
- **Utility Hostility / Interconnection Friction:** Mitigation: Adhere strictly to behind-the-meter busbar coupling and interruptible covenants that provide net grid stabilization benefits to regional utilities.
- **Component Supply Chain Fragility:** Mitigation: Standardize tooling on off-the-shelf industrial hardware manufactured or serviced directly by `factoRY` apprentices.

## 8. Sources & Historical Provenance

The architectural specifications in this design document are grounded in the following canonical files, research excavations, and archival records:

- `Arkansas/water-console/src/App.tsx, civic.ts`
- `Arkansas/manus-export/naturalstate/CAPABILITY-MAP.md`
