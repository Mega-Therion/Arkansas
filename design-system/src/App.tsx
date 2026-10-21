import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Compass,
  Droplets,
  Gauge,
  Layers3,
  Leaf,
  MapPin,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trees,
  Waves
} from 'lucide-react';
import { FlowChart } from './components/FlowChart';
import { HighwayBadge, type BadgeTone } from './components/HighwayBadge';
import { HoneyButton } from './components/HoneyButton';
import { MetricCard } from './components/MetricCard';
import { QuartzPanel } from './components/QuartzPanel';
import { VerificationSeal } from './components/VerificationSeal';

type Range = '24H' | '7D' | '30D';

const navItems = [
  { label: 'Overview', icon: Compass },
  { label: 'Water systems', icon: Waves, count: '42' },
  { label: 'Land & habitat', icon: Trees },
  { label: 'Public works', icon: Layers3 },
  { label: 'Field telemetry', icon: Activity }
];

const regions = ['Ozark region', 'Ouachita region', 'Delta region', 'Central Arkansas'];

const stations = [
  { name: 'Blanchard Springs', region: 'Ozark highlands', level: 'Flow normal', tone: 'normal' as BadgeTone, time: '2 min ago' },
  { name: 'Buffalo River', region: 'Upper basin', level: 'Verified', tone: 'verified' as BadgeTone, time: '8 min ago' },
  { name: 'Lake Ouachita', region: 'Ouachita range', level: 'Flow normal', tone: 'normal' as BadgeTone, time: '14 min ago' }
];

function WatershedIllustration() {
  return (
    <div className="hero-visual" aria-label="Abstract watershed monitoring map">
      <div className="hero-visual__topline">
        <span>WATERSHED NETWORK</span>
        <span className="hero-visual__coords">34° 44′ N / 92° 17′ W</span>
      </div>
      <svg className="watershed-map" viewBox="0 0 520 290" role="img" aria-label="Live river-flow network with verified monitoring points">
        <defs>
          <linearGradient id="riverFlow" x1=".05" y1=".08" x2=".95" y2=".8">
            <stop offset="0" stopColor="#38E1D3" />
            <stop offset=".58" stopColor="#85C1E9" />
            <stop offset="1" stopColor="#F5B041" />
          </linearGradient>
          <radialGradient id="mapGlow">
            <stop offset="0" stopColor="#38E1D3" stopOpacity=".18" />
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
      <div className="map-legend"><span><i className="map-legend__spring" /> SPRING FLOW</span><span><i className="map-legend__verified" /> VERIFIED SENSOR</span></div>
      <div className="map-scale"><span>0</span><i /><span>60 MI</span></div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [range, setRange] = useState<Range>('24H');
  const [region, setRegion] = useState(regions[0]);
  const [regionOpen, setRegionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [syncLabel, setSyncLabel] = useState('All systems synchronized');

  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: '2-digit', year: 'numeric', timeZone: 'America/Chicago'
  }).format(now).toUpperCase();
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Chicago'
  }).format(now);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3200);
  };

  const handleSync = () => {
    setSyncLabel('Synchronized just now');
    notify('State systems refreshed. All monitored layers are current.');
    window.setTimeout(() => setSyncLabel('All systems synchronized'), 4000);
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar" aria-label="Primary navigation">
        <a className="brand-lockup" href="#top" aria-label="Natural State home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <span className="brand-name">NATURAL STATE</span>
            <span className="brand-caption">ARKANSAS / PUBLIC SYSTEMS</span>
          </span>
        </a>
        <div className="sidebar-divider" />
        <p className="nav-eyebrow">Command center</p>
        <nav className="primary-nav">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button
              className="nav-button"
              key={label}
              type="button"
              aria-current={activeNav === label ? 'page' : undefined}
              aria-label={count ? `${label}, ${count} connected systems` : label}
              onClick={() => {
                setActiveNav(label);
                if (label !== 'Overview') notify(`${label} view selected in this living preview.`);
              }}
            >
              <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
              {count ? <span className="nav-count">{count}</span> : null}
            </button>
          ))}
        </nav>
        <p className="nav-eyebrow nav-section-gap">Stewardship</p>
        <nav className="secondary-nav">
          <button className="nav-button" type="button" onClick={() => notify('State seal is current and cryptographically attested.')}>
            <ShieldCheck size={16} strokeWidth={1.7} aria-hidden="true" /><span>Verification</span>
          </button>
          <button className="nav-button" type="button" onClick={() => notify('System preferences are ready for configuration.')}>
            <Settings2 size={16} strokeWidth={1.7} aria-hidden="true" /><span>System settings</span>
          </button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-footer-card">
          <span className="eyebrow">State capacity / 2026</span>
          <strong>Built for the long view.</strong>
          <p>Clear measures. Shared stewardship. Durable trust.</p>
        </div>
        <div className="sidebar-meta"><span className="sidebar-meta-dot" /> SECURE STATE NETWORK <span>·</span> V.04</div>
      </aside>

      <div className="content-stage" id="top">
        <header className="app-topbar">
          <div className="topbar-crumbs">
            <span>Arkansas</span><span className="crumb-slash" aria-hidden="true" /><strong>{activeNav}</strong>
          </div>
          <div className="topbar-actions">
            {searchOpen ? (
              <label className="quick-search">
                <Search size={14} aria-hidden="true" />
                <input autoFocus aria-label="Search state systems" placeholder="Search state systems…" onKeyDown={(event) => { if (event.key === 'Enter') notify(`Searching for “${event.currentTarget.value}”.`); }} />
              </label>
            ) : null}
            <button className="icon-button" type="button" aria-label={searchOpen ? 'Close search' : 'Open search'} onClick={() => setSearchOpen((open) => !open)}>
              <Search size={16} strokeWidth={1.8} />
            </button>
            <button className="icon-button icon-button--notify" type="button" aria-label="View system notifications" onClick={() => notify('No outstanding alerts. The state network is operating normally.')}>
              <Bell size={16} strokeWidth={1.8} /><span />
            </button>
            <span className="topbar-status"><i className="status-dot" /> Network secure</span>
            <div className="topbar-user" aria-label="Signed in as State operations">
              <span className="avatar-seal">AR</span>
              <span className="topbar-user-copy"><strong>State operations</strong><span>ADMINISTRATOR</span></span>
            </div>
          </div>
        </header>

        <main className="dashboard-main mx-auto w-full">
          <div className="page-kicker-row">
            <div className="page-kicker"><span className="kicker-rule" /> {dateLabel} <span>·</span> {timeLabel} CT</div>
            <span className="live-chip"><i className="status-dot" /> LIVE STATE PICTURE</span>
          </div>

          <section className="hero-panel" aria-labelledby="hero-title">
            <div className="hero-copy-block">
              <p className="hero-eyebrow"><span className="hero-eyebrow-mark" /> NATURAL STATE / PUBLIC SYSTEMS</p>
              <h1 id="hero-title" className="hero-title">A clearer view of<br /><em>the Natural State.</em></h1>
              <p className="hero-copy">One live picture of Arkansas’ water, land, and public systems—grounded in the places we steward.</p>
              <div className="hero-actions">
                <HoneyButton trailingIcon={<ArrowUpRight size={15} />} onClick={() => notify('Your state systems brief is ready to explore.')}>Explore the system</HoneyButton>
                <button className="hero-secondary" type="button" onClick={() => document.getElementById('watershed-flow')?.scrollIntoView({ behavior: 'smooth' })}>View live measures <ArrowRight size={14} /></button>
              </div>
              <div className="hero-footnote"><span className="hero-footnote-rule" /> Trusted across 42 connected watersheds</div>
            </div>
            <WatershedIllustration />
            <div className="hero-coordinate" aria-hidden="true">N 34° / E 92°</div>
          </section>

          <section className="metric-section" aria-label="Arkansas system metrics">
            <div className="section-heading-row">
              <div><p className="eyebrow">State signals / 01</p><h2 className="section-title">The measures that matter.</h2></div>
              <button className="text-link" type="button" onClick={() => notify('Showing all state measures in this preview.')}>All measures <ArrowUpRight size={14} /></button>
            </div>
            <div className="metrics-grid">
              <MetricCard label="Spring discharge" value="18.6" unit="k ft³/s" trend="8.2%" detail="42 active monitoring sites" icon={<Droplets size={16} />} tone="spring" />
              <MetricCard label="Verified state assets" value="1,284" trend="12.4%" detail="Across 75 counties" icon={<ShieldCheck size={16} />} tone="pine" />
              <MetricCard label="Watershed health" value="96.8" unit="/ 100" trend="3.1%" detail="Water quality index" icon={<Waves size={16} />} tone="sky" />
              <MetricCard label="System readiness" value="98.4" unit="%" trend="2.6%" detail="Critical services available" icon={<Gauge size={16} />} tone="honey" />
            </div>
          </section>

          <section className="workspace-grid" aria-label="Water and state-system detail">
            <QuartzPanel className="flow-panel" tone="light" sheen>
              <div className="panel-topline">
                <div>
                  <p className="eyebrow">Spring network / 02</p>
                  <h2 className="panel-title">Flow, at a glance.</h2>
                </div>
                <div className="region-control-wrap">
                  <button className="region-select" type="button" aria-expanded={regionOpen} onClick={() => setRegionOpen((open) => !open)}>
                    <MapPin size={13} /><span>{region}</span><ChevronDown size={13} />
                  </button>
                  {regionOpen ? (
                    <div className="region-menu" role="menu">
                      {regions.map((name) => <button type="button" role="menuitem" key={name} onClick={() => { setRegion(name); setRegionOpen(false); notify(`Monitoring region changed to ${name}.`); }}>{name}</button>)}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flow-readout-row" id="watershed-flow">
                <div className="flow-current"><strong>18.6</strong><span>k ft³/s</span><span className="flow-positive">↗ 8.2%</span></div>
                <span className="flow-readout-note">Aggregate spring discharge <span>·</span> {region}</span>
              </div>
              <div className="chart-frame"><FlowChart range={range} /></div>
              <div className="chart-axis"><span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span><span>22:00</span><span>NOW</span></div>
              <div className="chart-footer">
                <div className="range-control" role="group" aria-label="Choose chart time range">
                  {(['24H', '7D', '30D'] as const).map((period) => <button type="button" key={period} aria-pressed={range === period} onClick={() => setRange(period)}>{period}</button>)}
                </div>
                <div className="chart-legend"><i /> NORMAL RANGE <span>·</span> LIVE MEASURE</div>
              </div>
            </QuartzPanel>

            <QuartzPanel className="station-panel" tone="light" sheen={false}>
              <div className="station-heading">
                <div><p className="eyebrow">Field telemetry / 03</p><h2 className="panel-title">Connected now.</h2></div>
                <button className="subtle-icon-button" type="button" aria-label="View telemetry help" onClick={() => notify('Live readings refresh every five minutes.') }><CircleHelp size={15} /></button>
              </div>
              <div className="station-summary"><span className="station-summary__icon"><Activity size={15} /></span><span><strong>42 / 42</strong><small>sites reporting in</small></span><span className="station-summary__ring" aria-hidden="true">100%</span></div>
              <div className="station-list">
                {stations.map((station, index) => (
                  <div className="station-row" key={station.name}>
                    <span className={`station-index station-index--${index + 1}`}>0{index + 1}</span>
                    <span className="station-copy"><strong>{station.name}</strong><small>{station.region} <span>·</span> {station.time}</small></span>
                    <span className={`station-state station-state--${station.tone}`}><i />{station.level}</span>
                  </div>
                ))}
              </div>
              <button className="station-all" type="button" onClick={() => notify('42 sites are reporting. No data gaps found.')}>Open all 42 sites <ChevronRight size={14} /></button>
            </QuartzPanel>
          </section>

          <section className="specimen-section" aria-labelledby="specimen-title">
            <div className="section-heading-row specimen-heading-row">
              <div><p className="eyebrow">Material studies / 04</p><h2 id="specimen-title" className="section-title">A system with substance.</h2></div>
              <span className="specimen-note"><Sparkles size={13} /> Quartz · Pavement · Honey · Platinum</span>
            </div>
            <div className="specimen-grid">
              <QuartzPanel className="specimen-card specimen-card--glass" sheen>
                <div className="specimen-card__meta"><span>01 / SURFACE</span><span className="specimen-card__icon"><Layers3 size={15} /></span></div>
                <div className="glass-sample"><span className="glass-sample__glint" /><span className="glass-sample__word">QUARTZ</span><span className="glass-sample__line" /></div>
                <div className="specimen-card__caption"><strong>Ouachita quartz</strong><span>16 px · refractive edge</span></div>
              </QuartzPanel>
              <div className="specimen-card specimen-card--pavement">
                <div className="specimen-card__meta"><span>02 / SIGNALS</span><span className="specimen-card__icon"><RouteIcon /></span></div>
                <p className="specimen-label">HIGHWAY BADGES</p>
                <div className="badge-stack"><HighwayBadge tone="live" mark="●">NORTH BASIN</HighwayBadge><HighwayBadge tone="normal" mark="↗">FLOW NORMAL</HighwayBadge><HighwayBadge tone="alert" mark="!">ACTION REQUIRED</HighwayBadge></div>
                <div className="specimen-card__caption"><strong>Reflective pavement</strong><span>Signal made unmistakable</span></div>
              </div>
              <div className="specimen-card specimen-card--honey">
                <div className="specimen-card__meta"><span>03 / ACTION</span><span className="specimen-card__icon"><Sparkles size={15} /></span></div>
                <p className="specimen-label">CLOVER HONEY</p>
                <HoneyButton trailingIcon={<ArrowUpRight size={14} />} onClick={() => notify('HoneyButton interaction preview.')}>Take action</HoneyButton>
                <div className="specimen-card__caption"><strong>Liquid gold</strong><span>Raised on hover · pressed on tap</span></div>
              </div>
              <QuartzPanel className="specimen-card specimen-card--seal" tone="pine" sheen>
                <div className="specimen-card__meta"><span>04 / TRUST</span><span className="specimen-card__icon"><ShieldCheck size={15} /></span></div>
                <p className="specimen-label">SOVEREIGN SEAL</p>
                <VerificationSeal label="State verified" sublabel="Arkansas system seal" />
                <div className="specimen-card__caption"><strong>Platinum thread</strong><span>Emerald verified pip</span></div>
              </QuartzPanel>
            </div>
          </section>

          <section className="closing-band" aria-label="State system integrity">
            <div className="closing-band__left"><span className="closing-band__symbol"><Leaf size={18} /></span><span><span className="eyebrow">Designed for stewardship</span><strong>Precision for the places we hold in common.</strong></span></div>
            <div className="closing-band__right"><VerificationSeal compact label="State verified" /><button className="sync-button" type="button" onClick={handleSync}><span className="sync-dot" /> {syncLabel} <ArrowUpRight size={13} /></button></div>
          </section>

          <section className="concept-strip" aria-label="Visual design direction concept">
            <img src="/INGKAc1a6c0y.jpg" alt="Generated visual study for the Natural State dashboard design" />
            <div className="concept-strip__copy"><span className="eyebrow">Direction study / 05</span><strong>Arkansas, rendered with clarity.</strong><p>Swiss precision meets karst water, pine structure, and the light of the Delta.</p></div>
            <span className="concept-strip__index">NS — 2026</span>
          </section>

          <footer className="app-footer"><span>© 2026 NATURAL STATE / ARKANSAS</span><span>BUILT FOR CLARITY <i /> GROUNDED IN PLACE</span><button type="button" onClick={() => notify('Natural State design-system preview v1.0')}>DESIGN SYSTEM V1.0</button></footer>
        </main>
      </div>

      {toast ? <div className="toast-message" role="status"><span className="toast-message__pip" /><span>{toast}</span><button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}>×</button></div> : null}
    </div>
  );
}

function RouteIcon() {
  return <MapPin size={15} />;
}

export default App;
