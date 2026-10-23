import { useState } from 'react';
import {
  Activity,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Database,
  Droplets,
  ExternalLink,
  Factory,
  FileText,
  FlaskConical,
  Gauge,
  Layers3,
  Leaf,
  Lock,
  MapPin,
  Recycle,
  Scale,
  ShieldCheck,
  Sparkles,
  Trees,
  Truck,
  Waves,
  Zap
} from 'lucide-react';
import { HighwayBadge, type BadgeTone } from './components/HighwayBadge';
import { HoneyButton } from './components/HoneyButton';
import { MetricCard } from './components/MetricCard';
import { QuartzPanel } from './components/QuartzPanel';
import { VerificationSeal } from './components/VerificationSeal';


const navItems = [
  { label: 'Overview', icon: Compass, href: '#overview' },
  { label: 'Civic Trilogy', icon: ShieldCheck, href: '#civic', count: 'Ring 1' },
  { label: 'The Orchard Tree', icon: Trees, href: '#tree', count: 'Wholonomy' },
  { label: 'The Six Moves', icon: Layers3, href: '#moves', count: '6' },
  { label: 'Energy & Power', icon: Zap, href: '#energy', count: 'Ring 3' },
  { label: 'Sovereign Defense', icon: Scale, href: '#defense', count: 'State Base' },
  { label: 'Diamond Foundation', icon: Sparkles, href: '#foundation', count: '6 Invariants' },
  { label: 'Material Studies', icon: Droplets, href: '#specimens' }
];


const civicInitiatives = [
  {
    code: 'ARMAWS',
    statute: 'Funding: Ark. Code Ann. § 8-9-401 et seq.',
    title: 'Arkansas Rural Mobility Air Standard',
    badge: 'PRE-FILING 2027',
    badgeTone: 'info' as BadgeTone,
    desc: 'Would require free compressed air for tire inflation at retail fuel stations statewide, with no purchase required. Modeled on Connecticut’s free-air law, in force since 1979 (Conn. Gen. Stat. § 14-325a).',
    quote: '“Two bald tires and a plug in the third, while the fourth has a slow leak they wait until payday to patch... a few dollars of air stands between a job and a blowout.”',
    proof: 'Small independent retailers would have equipment costs covered from existing state tire-fee revenue.',
    link: 'https://github.com/Mega-Therion/Arkansas/blob/main/civic/armaws.md'
  },
  {
    code: 'DL-ACCESS',
    statute: 'Ark. Code Ann. § 27-16-704 & § 27-16-705',
    title: 'Driver’s License Public Access Guarantee Act',
    badge: 'COUNSEL REVIEW PENDING',
    badgeTone: 'info' as BadgeTone,
    desc: 'Arkansas statute requires a driving skills test but does not require applicants to supply their own vehicle. That requirement is agency practice, and it keeps people without a car from getting licensed.',
    quote: '“A barrier everyone assumed was law was only administrative practice. We supply the test vehicle at regional depots so lack of a car never blocks legal work.”',
    proof: 'Precedent: Washington, D.C. offers a DMV road-test vehicle at no extra fee. Opens a direct path toward a commercial license.',
    link: 'https://github.com/Mega-Therion/Arkansas/blob/main/civic/drivers-license-reform.md'
  },
  {
    code: 'AINSA',
    statute: '7 CFR § 246.10 & AAP Standards',
    title: 'Arkansas Infant Nutrition Security Act',
    badge: 'MODEL BILL · COUNSEL REVIEW',
    badgeTone: 'info' as BadgeTone,
    desc: 'Closes the documented WIC formula gap where infants over 4 months on concentrate run short by 4 to 7 days each month, preventing infant ER admissions and dangerous formula dilution.',
    quote: '“The arithmetic is honest: heavier infants on powder or concentrate run short before the month ends. The state formula bridge ensures no bottle goes diluted.”',
    proof: 'Sizes funding strictly to infant weight curves; automatically phases down if federal WIC caps expand.',
    link: 'https://github.com/Mega-Therion/Arkansas/blob/main/civic/infant-nutrition-security-act.md'
  },
  {
    code: 'RSF-POWER',
    statute: 'APSC Docket No. 26-001-U',
    title: 'Rate Stabilization Fund & Fuel Clause Shield',
    badge: 'MODEL BILL · COUNSEL REVIEW',
    badgeTone: 'info' as BadgeTone,
    desc: 'Would shield households from fuel-clause spikes and storm costs. Payment order: the state surplus fund first, the utility’s own slack second, fund interest third, and only then a small statewide share. Households never pay first.',
    quote: '“The citizen is never the emergency fund. The state surplus fund pays first; utility operational slack second; fund interest third; statewide tiny spread last.”',
    proof: 'The fund is spent when needed, not held as an endowment. New plants for new large loads, such as data centers, are paid for by that load.',
    link: 'https://github.com/Mega-Therion/Arkansas/blob/main/civic/POWER_PLAN_CANON.md'
  }
];

const treeBranches = [
  { name: 'recoveRY', icon: Recycle, role: 'Liability Flip', desc: 'Converts tire dumps, bauxite red mud, and poultry litter into chemical feedstock.' },
  { name: 'refineRY', icon: FlaskConical, role: 'ACRN Separation', desc: 'High-purity domestic processing of Smackover lithium brine and critical minerals.' },
  { name: 'deliveRY', icon: Truck, role: 'Autonomous Logistics', desc: 'Regional depot transportation network linking rural manufacturing to interstate freight.' },
  { name: 'memoRY', icon: Database, role: 'Distributed Edge', desc: 'Repairable, ruggedized compute deployed directly at rural grain elevators and substations.' },
  { name: 'libraRY', icon: BookOpen, role: 'Process Passport', desc: 'Cryptographic provenance ledger tracking every lot, assay, and public dollar.' },
  { name: 'factoRY', icon: Factory, role: 'Precision Tooling', desc: 'Arkansas-owned CNC fabrication, coil housings, and hardware fixtures.' }
];

const sixMoves = [
  {
    num: '01',
    title: 'The State Pays First',
    principle: 'State reserves buffer citizens from state-regulated burdens.',
    example: 'ARMAWS air vouchers, license testing fleet, AINSA formula bridge, with the state’s general-revenue surplus ($655M at the FY2026 close) proposed as the Rate Stabilization Fund’s first payer.'
  },
  {
    num: '02',
    title: 'Rule vs. Law Audit',
    principle: 'Find the barrier everyone assumes is statute and prove it is merely agency habit.',
    example: 'Ark. Code Ann. § 27-16-704 requires examiners to test skills, not require applicants to own or insure the vehicle.'
  },
  {
    num: '03',
    title: 'The Liability Flip',
    principle: 'Assume an unmanaged environmental liability in exchange for the wealth inside it.',
    example: 'Tire dumps converted to rubber crumb & carbon black; bauxite residue neutralized for rare-earth extraction; poultry litter to biogas.'
  },
  {
    num: '04',
    title: 'Fence-Line Value Capture',
    principle: 'Capture energy, heat, and compute at the physical perimeter of generation.',
    example: 'ONE Natural Energy co-located at Arkansas Nuclear One (ANO) off-peak baseload, and ARK Lane powered freight.'
  },
  {
    num: '05',
    title: 'Labor Pipeline as Payoff',
    principle: 'Transform cost-center correctional custody into credentialed high-skill careers.',
    example: 'Project RENEW: Voluntary, paid highway and site reclamation leading directly into recoveRY, deliveRY, and CDL driving jobs.'
  },
  {
    num: '06',
    title: 'Provenance Ledger',
    principle: 'Every state dollar, mineral assay, and transition sealed on a verified audit trail.',
    example: 'libraRY Process Passports ensure no untested lot enters manufacturing and no public funds drift into unmonitored subsidies.'
  }
];

const invariants = [
  { id: 'i', name: 'Gentle Authority', desc: 'Segment → Authenticate → Consent → Tune → Promote Slowly → Power-Down. Systems grow only at the speed of earned trust.' },
  { id: 'ii', name: 'Beneficial to Everyone', desc: 'Not just corporate shareholders: benefits the driver with a slow leak, the reentry apprentice, and the host county.' },
  { id: 'iii', name: 'Closed Value Loop', desc: 'Dividends recycle through foundRY’s capital structure rather than siphoning out-of-state to Wall Street.' },
  { id: 'iv', name: 'Arkansas-First', desc: 'The sovereign soil the tree is rooted in is the state that reaps the harvest first: jobs, power, and civic security.' },
  { id: 'v', name: 'Redundancy by Design', desc: 'Six autonomous branches and local cooperative generation, designed so no single failure takes the system down.' },
  { id: 'vi', name: 'Waste into Wealth', desc: 'recoveRY and refineRY turn hazardous abandoned liabilities into the high-value feedstock for tomorrow’s industry.' }
];

function WatershedIllustration() {
  return (
    <div className="hero-visual" aria-label="Arkansas Watershed and Mineral Basins Map">
      <div className="hero-visual__topline">
        <span>SOVEREIGN NETWORK · ARKANSAS</span>
        <span className="hero-visual__coords">34° 44′ N / 92° 17′ W</span>
      </div>
      <svg className="watershed-map" viewBox="0 0 520 290" role="img" aria-label="Arkansas river networks, mineral formations, and baseload hubs">
        <defs>
          <linearGradient id="riverFlow" x1=".05" y1=".08" x2=".95" y2=".8">
            <stop offset="0" stopColor="#38E1D3" />
            <stop offset=".58" stopColor="#85C1E9" />
            <stop offset="1" stopColor="#F5B041" />
          </linearGradient>
          <radialGradient id="mapGlow">
            <stop offset="0" stopColor="#38E1D3" stopOpacity=".22" />
            <stop offset="1" stopColor="#38E1D3" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="352" cy="130" r="148" fill="url(#mapGlow)" />
        <path className="map-contour map-contour--one" d="M28 82c43-47 111-54 159-21 44 30 83 36 119 12 60-40 130-23 184 25" />
        <path className="map-contour map-contour--two" d="M20 112c50-38 96-34 145-4 52 32 101 47 144 13 45-35 109-47 183 4" />
        <path className="map-contour map-contour--three" d="M42 142c38-27 82-19 122 9 44 31 93 54 141 26 58-34 96-42 154-8" />
        <path className="map-contour map-contour--four" d="M54 178c40-25 74-13 115 16 46 33 83 61 136 43 56-19 94-30 148 2" />
        <path className="map-river map-river--back" d="M78 55c31 33 61 11 90 43 28 32 23 64 53 75 41 16 62-5 92 20 25 21 28 48 63 55" />
        <path className="map-river" d="M96 39c27 29 55 16 80 47 21 26 24 54 54 65 35 13 55-8 82 15 23 20 27 49 55 59" />
        <path className="map-river map-river--tributary" d="M265 151c10-27 39-37 44-65 5-22-5-34 11-52" />
        <path className="map-river map-river--tributary" d="M230 141c-18 1-35 11-47 28-12 17-20 34-39 44" />
        <g className="map-station map-station--a"><circle r="8" /><circle r="3" /></g>
        <g className="map-station map-station--b"><circle r="8" /><circle r="3" /></g>
        <g className="map-station map-station--c"><circle r="8" /><circle r="3" /></g>
        <g className="map-station map-station--d"><circle r="8" /><circle r="3" /></g>
      </svg>
      <div className="map-legend">
        <span><i className="map-legend__spring" /> KARST SPRINGS</span>
        <span><i className="map-legend__verified" /> BASELOAD NODES</span>
      </div>
      <div className="map-scale"><span>0</span><i /><span>75 COUNTIES</span></div>
    </div>
  );
}


function App() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [toast, setToast] = useState('');
  const syncLabel = 'Evidence Status: Draft / In Review';

  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: '2-digit', year: 'numeric', timeZone: 'America/Chicago'
  }).format(now).toUpperCase();
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Chicago'
  }).format(now);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3500);
  };

  const scrollTo = (id: string, label: string) => {
    setActiveNav(label);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="app-sidebar" aria-label="Primary navigation">
        <a className="brand-lockup" href="#overview" onClick={(e) => { e.preventDefault(); scrollTo('#overview', 'Overview'); }}>
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <span className="brand-name">THE ARKANSAS ORCHARD</span>
            <span className="brand-caption">CIVIC & ENERGY BLUEPRINT</span>
          </span>
        </a>
        <div className="sidebar-divider" />
        <p className="nav-eyebrow">Portfolio Navigation</p>
        <nav className="primary-nav">
          {navItems.map(({ label, icon: Icon, href, count }) => (
            <button
              className="nav-button"
              key={label}
              type="button"
              aria-current={activeNav === label ? 'page' : undefined}
              onClick={() => scrollTo(href, label)}
            >
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
              {count ? <span className="nav-count">{count}</span> : null}
            </button>
          ))}
        </nav>

        <p className="nav-eyebrow nav-section-gap">Statutory Governance</p>
        <nav className="secondary-nav">
          <a
            className="nav-button text-decoration-none"
            href="https://github.com/Mega-Therion/Arkansas/blob/main/AUDIT_STATUTORY_RECONCILIATION_2026-10-03.md"
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>Statutory Audit</span>
            <ExternalLink size={12} className="ml-auto opacity-60" />
          </a>
          <a
            className="nav-button text-decoration-none"
            href="https://github.com/Mega-Therion/Arkansas/blob/main/SYNTHESIS.md"
            target="_blank"
            rel="noreferrer"
          >
            <Layers3 size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>Master Synthesis</span>
            <ExternalLink size={12} className="ml-auto opacity-60" />
          </a>
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-footer-card">
          <span className="eyebrow">Diamond Foundation</span>
          <strong>Not fragile. Clear.</strong>
          <p>Named after Crater of Diamonds, Murfreesboro. Inspectable from any facet.</p>
        </div>
        <div className="sidebar-meta"><span className="sidebar-meta-dot" /> RESEARCH DRAFTS · EVIDENCE-TIERED <span>·</span> 2026</div>
      </aside>

      {/* Content Stage */}
      <div className="content-stage">
        {/* Top Header */}
        <header className="app-topbar">
          <div className="topbar-crumbs">
            <span>The Natural State</span>
            <span className="crumb-slash" aria-hidden="true">/</span>
            <span>Arkansas Orchard</span>
            <span className="crumb-slash" aria-hidden="true">/</span>
            <strong>{activeNav}</strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-status"><i className="status-dot" /> DRAFTS · VERIFY BEFORE RELIANCE</span>
          </div>
        </header>

        {/* Dashboard Main Scrollable Area */}
        <main className="dashboard-main mx-auto w-full">
          <div className="page-kicker-row">
            <div className="page-kicker">
              <span className="kicker-rule" /> {dateLabel} <span>·</span> {timeLabel} CT
            </div>
            <span className="live-chip"><i className="status-dot" /> 2027 LEGISLATIVE PRE-FILING BLUEPRINT</span>
          </div>

          {/* 1. HERO SECTION */}
          <section id="overview" className="hero-panel" aria-labelledby="hero-title">
            <div className="hero-copy-block">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow-mark" /> CIVIC & ENERGY INFRASTRUCTURE BLUEPRINT
              </p>
              <h1 id="hero-title" className="hero-title">
                The Arkansas Orchard:<br />
                <em>Sovereign Infrastructure & Civic Abundance.</em>
              </h1>
              <p className="hero-copy">
                One integrated portfolio, two faces of one body: a commercial tree that funds itself, and a civic fruit layer that hands the yield back to the people the tree grows among. Grounded in the soil, minerals, and working families of Arkansas.
              </p>

              <div className="hero-actions-multi">
                <HoneyButton
                  trailingIcon={<ArrowUpRight size={15} />}
                  onClick={() => scrollTo('#civic', 'Civic Trilogy')}
                >
                  Explore Civic Bills
                </HoneyButton>
                <button
                  className="hero-btn-secondary"
                  type="button"
                  onClick={() => scrollTo('#moves', 'The Six Moves')}
                >
                  The Six Moves <ArrowRight size={14} />
                </button>
                <button
                  className="hero-btn-secondary"
                  type="button"
                  onClick={() => scrollTo('#energy', 'Energy & Power')}
                >
                  Power Plan Canon <Zap size={14} />
                </button>
              </div>

              <div className="hero-footnote">
                <span className="hero-footnote-rule" /> Tested against the Diamond Foundation — named after Crater of Diamonds, Murfreesboro.
              </div>
            </div>
            <WatershedIllustration />
            <div className="hero-coordinate" aria-hidden="true">AR · CRATER OF DIAMONDS TO THE DELTA</div>
          </section>

          {/* 2. VITAL SYSTEM SIGNALS */}
          <section className="metric-section" aria-label="Arkansas infrastructure metrics">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">System Baseline / 01</p>
                <h2 className="section-title">The Four Sovereign Signals.</h2>
              </div>
              <button className="text-link" type="button" onClick={() => notify('Citations point to the Arkansas Code. Confirm current law and docket status before relying on them.')}>
                Statutory Citations <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="metrics-grid">
              <MetricCard
                label="Statewide Air Network"
                value="75"
                unit="Counties"
                trend="Proposed"
                detail="Zero-fee compressed air for working drivers"
                icon={<Droplets size={16} />}
                tone="spring"
              />
              <MetricCard
                label="Licensing Test Access"
                value="75"
                unit="Counties"
                trend="Proposed · § 27-16-704"
                detail="State testing fleet removes car ownership barrier"
                icon={<ShieldCheck size={16} />}
                tone="pine"
              />
              <MetricCard
                label="State Surplus Shield"
                value="$655M"
                unit="Surplus Base"
                trend="DFA · FY2026 close"
                detail="Proposed first payer: the state pays before households do"
                icon={<Waves size={16} />}
                tone="sky"
              />
              <MetricCard
                label="Sovereign Baseload"
                value="Goal"
                unit="Arkansas Owned"
                trend="Smackover + Quartz"
                detail="Behind-the-meter industrial & defense power"
                icon={<Gauge size={16} />}
                tone="honey"
              />
            </div>
          </section>

          {/* 3. CIVIC TRILOGY (Ring 1 - Household Ring) */}
          <section id="civic" className="mt-8" aria-labelledby="civic-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Ring 1 · The Household Ring / 02</p>
                <h2 id="civic-title" className="section-title">The Rural Family Stabilization Trilogy.</h2>
              </div>
              <span className="specimen-note">
                <Lock size={13} /> 2027 General Assembly Pre-Filing
              </span>
            </div>
            <p className="section-copy mb-4">
              Four answers to the same month-end squeeze in the same working household. Funded from surplus funds the state already holds and existing appropriations, requiring zero new taxes.
            </p>

            <div className="trilogy-grid">
              {civicInitiatives.map((item) => (
                <QuartzPanel key={item.code} className="trilogy-card" tone="light" sheen>
                  <div className="trilogy-card__header">
                    <div>
                      <span className="trilogy-card__code">{item.code} · {item.statute}</span>
                      <h3 className="trilogy-card__title">{item.title}</h3>
                    </div>
                    <HighwayBadge tone={item.badgeTone} mark="●">{item.badge}</HighwayBadge>
                  </div>
                  <p className="trilogy-card__desc">{item.desc}</p>
                  <blockquote className="trilogy-card__quote">{item.quote}</blockquote>
                  <div className="trilogy-card__footer">
                    <span>{item.proof}</span>
                    <a className="text-link flex items-center gap-1" href={item.link} target="_blank" rel="noreferrer">
                      View Model Bill <ExternalLink size={11} />
                    </a>
                  </div>
                </QuartzPanel>
              ))}
            </div>
          </section>

          {/* 4. THE ORCHARD TREE */}
          <section id="tree" className="mt-12" aria-labelledby="tree-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Structural Wholonomy / 03</p>
                <h2 id="tree-title" className="section-title">The Architecture of the Tree.</h2>
              </div>
              <span className="specimen-note">
                <Trees size={13} /> Roots · Trunk · Six Branches · Civic Fruit · Canopy
              </span>
            </div>

            <div className="tree-container">
              {/* Canopy */}
              <QuartzPanel className="p-4" tone="pine" sheen>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-honey-400" />
                    <strong className="text-sm">Canopy · ConservatoRY</strong>
                  </div>
                  <span className="stat-pill text-xs">The Test Every Branch Must Pass</span>
                </div>
                <p className="text-xs text-pine-100 opacity-90 m-0 leading-relaxed">
                  The Diamond Foundation governance. Closed-loop reinvestment: ForestRY planting for environmental restitution and TreasuRY university scholarships for Arkansas youth.
                </p>
              </QuartzPanel>

              {/* Six Branches */}
              <div className="tree-level">
                <span className="tree-level__tag">The Six Commercial Branches (Value Creation)</span>
                <div className="tree-branches-row">
                  {treeBranches.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div className="branch-node" key={b.name}>
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">{b.name}</strong>
                          <Icon size={14} className="text-honey-600" />
                        </div>
                        <span className="font-semibold text-xs text-pine-900">{b.role}</span>
                        <span className="text-xs">{b.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trunk */}
              <QuartzPanel className="p-4" tone="light" sheen>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-honey-600" />
                    <strong className="text-sm text-pine-950">Trunk · ONE Natural Energy</strong>
                  </div>
                  <HighwayBadge tone="live" mark="⚡">INTERRUPTIBLE BASELOAD LOAD</HighwayBadge>
                </div>
                <p className="text-xs text-pine-900 leading-relaxed m-0">
                  Fence-line nuclear and renewable baseload arbitrage co-located at power sources. Flexible, interruptible demand funding clean compute while backing off instantly during peak grid strain.
                </p>
              </QuartzPanel>

              {/* Roots */}
              <div className="p-4 bg-white/75 border border-pine-900/10 rounded-lg flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Layers3 size={16} className="text-pine-800" />
                  <div>
                    <strong className="text-sm text-pine-950">Roots · foundRY</strong>
                    <p className="text-xs text-pine-700 m-0">Holding company, patent fortress, Gentle Authority corporate charter.</p>
                  </div>
                </div>
                <VerificationSeal compact label="Sovereign Root" sublabel="Ark. Charter" />
              </div>
            </div>
          </section>

          {/* 5. THE SIX MOVES */}
          <section id="moves" className="mt-12" aria-labelledby="moves-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">The Underlying Pattern / 04</p>
                <h2 id="moves-title" className="section-title">Six Moves That Turn Friction Into Yield.</h2>
              </div>
              <span className="specimen-note">
                <Activity size={13} /> Arkansas Already Pays For Friction
              </span>
            </div>
            <p className="section-copy mb-4">
              Arkansas pays for friction every day in blown tires, missed road tests, short formula months, surprise electric bills, and idle mineral waste. Every initiative here turns one of those frictions into an input for the next.
            </p>

            <div className="moves-grid">
              {sixMoves.map((m) => (
                <QuartzPanel key={m.num} className="move-card" tone="light" sheen={false}>
                  <div className="flex items-center justify-between">
                    <span className="move-card__num">{m.num}</span>
                    <span className="text-[10px] uppercase font-mono text-pine-600 tracking-wider">Operational Move</span>
                  </div>
                  <h3 className="move-card__title">{m.title}</h3>
                  <p className="move-card__body"><strong>Principle:</strong> {m.principle}</p>
                  <p className="move-card__body"><strong>In Action:</strong> {m.example}</p>
                  <div className="move-card__proof">Evidence-Grounded Invariant</div>
                </QuartzPanel>
              ))}
            </div>
          </section>

          {/* 6. ENERGY & RESOURCE SOVEREIGNTY */}
          <section id="energy" className="mt-12" aria-labelledby="energy-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Ring 3 · The Resource Ring / 05</p>
                <h2 id="energy-title" className="section-title">Energy Sovereignty & Critical Minerals.</h2>
              </div>
              <HighwayBadge tone="live" mark="●">GRID RESILIENCE</HighwayBadge>
            </div>

            <div className="resource-pillars-grid">
              <QuartzPanel className="pillar-card" tone="light" sheen>
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-honey-600" />
                  <strong>Behind-the-Meter Baseload</strong>
                </div>
                <p>
                  Dedicated geothermal, micro-turbines, and closed-loop natural gas powering defense and compute clusters off-grid. Production lines run 24/7/365 without placing a single watt of stress on public ratepayer transmission.
                </p>
                <div className="stat-pill mt-auto">Shields Citizens from Act 373 Surcharges</div>
              </QuartzPanel>

              <QuartzPanel className="pillar-card" tone="light" sheen>
                <div className="flex items-center gap-2">
                  <Droplets size={18} className="text-spring-600" />
                  <strong>Smackover Lithium Brine</strong>
                </div>
                <p>
                  South Arkansas’s Smackover brine is one of the largest lithium resources in North America. Vertically integrate direct chemical refinement on Arkansas soil rather than shipping raw slurry out-of-state to third-party processors.
                </p>
                <div className="stat-pill mt-auto">Keeps Refining Value in Arkansas</div>
              </QuartzPanel>

              <QuartzPanel className="pillar-card" tone="light" sheen>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-sky-600" />
                  <strong>Mount Ida Quartz & 5D Optical</strong>
                </div>
                <p>
                  Laser-inscribed 5D optical data storage in fused silica melted from Ouachita quartz. Write-once archival media; published lab aging tests project very long lifetimes. Feedstock purity assay pending.
                </p>
                <div className="stat-pill mt-auto">Laser Optical Archival Storage</div>
              </QuartzPanel>
            </div>
          </section>

          {/* 7. SOVEREIGN DEFENSE POSTURE */}
          <section id="defense" className="mt-12" aria-labelledby="defense-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">State Capacity · National Defense / 06</p>
                <h2 id="defense-title" className="section-title">Arkansas-Owned Prime Contracts, Not Assembly Outposts.</h2>
              </div>
              <VerificationSeal compact label="Sovereign Defense" sublabel="Camden Corridor" />
            </div>

            <QuartzPanel className="sovereign-banner" tone="pine" sheen>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="highway-badge highway-badge--live"><span className="highway-badge__paint" /><span className="highway-badge__mark">●</span> SOVEREIGN DEFENSE INDUSTRIAL BASE</span>
                <span className="text-xs font-mono text-pine-200">Camden · Highland Park · Pine Bluff</span>
              </div>

              <blockquote className="sovereign-banner__quote">
                “All of these things can be done by Arkansas, within Arkansas, for Arkansas, and fully from sovereign ground self sustaining ecosystem inside Arkansas. Without bringing in outside companies and their relocated factory workers. What needs to happen is Arkansas-based defense contractors bid for the contracts subcontracted to our State from our federal government.”
              </blockquote>
              <p className="text-xs text-pine-300 font-mono">— Principal directive, 2026-10-21</p>

            </QuartzPanel>
          </section>

          {/* 8. DIAMOND FOUNDATION (The Six Invariants) */}
          <section id="foundation" className="mt-12" aria-labelledby="foundation-title">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">ConservatoRY / 07</p>
                <h2 id="foundation-title" className="section-title">The Six Invariants of Gentle Authority.</h2>
              </div>
              <span className="specimen-note">
                <ShieldCheck size={13} /> The Diamond Test
              </span>
            </div>

            <div className="invariants-grid">
              {invariants.map((inv) => (
                <div className="invariant-card" key={inv.id}>
                  <strong>
                    <span className="text-honey-600 font-mono text-xs">{inv.id}.</span> {inv.name}
                  </strong>
                  <p>{inv.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. MATERIAL STUDIES & VERIFICATION SEALS */}
          <section id="specimens" className="specimen-section mt-12" aria-labelledby="specimen-title">
            <div className="section-heading-row specimen-heading-row">
              <div>
                <p className="eyebrow">Material Studies / 08</p>
                <h2 id="specimen-title" className="section-title">Tactile Natural State Substrates.</h2>
              </div>
              <span className="specimen-note">
                <Sparkles size={13} /> Quartz · Pavement · Honey · Platinum
              </span>
            </div>

            <div className="specimen-grid">
              <QuartzPanel className="specimen-card specimen-card--glass" sheen>
                <div className="specimen-card__meta">
                  <span>01 / SURFACE</span>
                  <span className="specimen-card__icon"><Layers3 size={15} /></span>
                </div>
                <div className="glass-sample">
                  <span className="glass-sample__glint" />
                  <span className="glass-sample__word">QUARTZ</span>
                  <span className="glass-sample__line" />
                </div>
                <div className="specimen-card__caption">
                  <strong>Ouachita quartz</strong>
                  <span>16px blur · caustic refractive edge</span>
                </div>
              </QuartzPanel>

              <div className="specimen-card specimen-card--pavement">
                <div className="specimen-card__meta">
                  <span>02 / SIGNALS</span>
                  <span className="specimen-card__icon"><MapPin size={15} /></span>
                </div>
                <p className="specimen-label">HIGHWAY BADGES</p>
                <div className="badge-stack">
                  <HighwayBadge tone="live" mark="●">ACT 373 REPEAL</HighwayBadge>
                  <HighwayBadge tone="normal" mark="↗">FLOW NORMAL</HighwayBadge>
                  <HighwayBadge tone="alert" mark="!">SURPLUS SHIELD</HighwayBadge>
                </div>
                <div className="specimen-card__caption">
                  <strong>Reflective pavement</strong>
                  <span>Beaded retroreflective yellow line</span>
                </div>
              </div>

              <div className="specimen-card specimen-card--honey">
                <div className="specimen-card__meta">
                  <span>03 / ACTION</span>
                  <span className="specimen-card__icon"><Sparkles size={15} /></span>
                </div>
                <p className="specimen-label">CLOVER HONEY</p>
                <HoneyButton trailingIcon={<ArrowUpRight size={14} />} onClick={() => notify('HoneyButton tactile elevation preview.')}>
                  Take action
                </HoneyButton>
                <div className="specimen-card__caption">
                  <strong>Liquid gold</strong>
                  <span>Viscous hover sheen · metallic edge</span>
                </div>
              </div>

              <QuartzPanel className="specimen-card specimen-card--seal" tone="pine" sheen>
                <div className="specimen-card__meta">
                  <span>04 / TRUST</span>
                  <span className="specimen-card__icon"><ShieldCheck size={15} /></span>
                </div>
                <p className="specimen-label">SOVEREIGN SEAL</p>
                <VerificationSeal label="Design specimen" sublabel="Diamond Foundation Seal" />
                <div className="specimen-card__caption">
                  <strong>Platinum thread</strong>
                  <span>Emerald status pip</span>
                </div>
              </QuartzPanel>
            </div>
          </section>

          {/* 10. CLOSING BAND */}
          <section className="closing-band mt-12" aria-label="State system integrity">
            <div className="closing-band__left">
              <span className="closing-band__symbol"><Leaf size={18} /></span>
              <span>
                <span className="eyebrow">The Natural State Sovereign Blueprint</span>
                <strong>Precision for the places and people we hold in common.</strong>
              </span>
            </div>
            <div className="closing-band__right">
              <VerificationSeal compact label="Draft · Not Certified" />
              <button className="sync-button" type="button" onClick={() => notify('Evidence status is mixed: this interface is not a live audit or legal certification. See the repository audit and source index.')}>
                <span className="sync-dot" /> {syncLabel} <ArrowUpRight size={13} />
              </button>
            </div>
          </section>

          {/* Concept strip */}
          <section className="concept-strip mt-6" aria-label="Visual design direction concept">
            <img src="./INGKAc1a6c0y.jpg" alt="Visual study for the Arkansas Sovereign Design System" />
            <div className="concept-strip__copy">
              <span className="eyebrow">Direction study / 05</span>
              <strong>Arkansas, rendered with clarity.</strong>
              <p>Swiss typographic precision meets karst water, pine needle structure, and the light of the Delta.</p>
            </div>
            <span className="concept-strip__index">AR — 2026/2027</span>
          </section>

          {/* Footer */}
          <footer className="app-footer mt-10">
            <span className="app-footer__mark">
              <picture>
                <source type="image/webp" srcSet="./resh-omega-y-28.webp 1x, ./resh-omega-y-56.webp 2x" />
                <img src="./resh-omega-y-28.png" srcSet="./resh-omega-y-28.png 1x, ./resh-omega-y-56.png 2x" alt="Resh–Omega–Y mark" className="rwy-mark" width={55} height={28} loading="lazy" decoding="async" />
              </picture>
              © 2026 RWY
            </span>
            <span>CHYREN · Ψ/Φ CONSTELLATION <i /> PSIMODULO–PHIMODUS INVARIANT</span>
            <a
              href="https://github.com/Mega-Therion/Arkansas"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none text-inherit hover:underline"
            >
              GITHUB.COM/MEGA-THERION/ARKANSAS
            </a>
          </footer>
        </main>
      </div>

      {/* Floating Toast */}
      {toast ? (
        <div className="toast-message" role="status">
          <span className="toast-message__pip" />
          <span>{toast}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}>×</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;