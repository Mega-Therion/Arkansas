import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { StationMap } from "./StationMap";
import { civicPages } from "./civic";
import {
  filterStations,
  hasCoordinates,
  parseHistory,
  parseInventory,
  siteFromHash,
  storyFromHistory,
  type HistoryPoint,
  type Station,
} from "./parse";

const INVENTORY =
  "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=AR&parameterCd=00060&siteStatus=active";

function historyUrl(siteId: string, period: "P7D" | "P30D") {
  return `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteId}&parameterCd=00060&period=${period}`;
}

function sourceUrl(siteId: string) {
  return `https://waterdata.usgs.gov/monitoring-location/${siteId}/`;
}

async function getJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`USGS ${response.status}`);
  return response.json();
}

function Chart({ points }: { points: HistoryPoint[] }) {
  const values = points
    .filter((p) => p.valueCfs != null)
    .map((p) => p.valueCfs as number);
  if (values.length < 2)
    return <p>Not enough numeric points in this window.</p>;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / span) * 100;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      className="chart"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Discharge over the requested window. The line is the numeric points only."
    >
      <path
        d={d}
        fill="none"
        stroke="#1e3a2f"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function App() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const [retrievedAt, setRetrievedAt] = useState("");
  const [stations, setStations] = useState<Station[]>([]);
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("");
  const [huc, setHuc] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unknown, setUnknown] = useState<string | null>(null);
  const [mapError, setMapError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [period, setPeriod] = useState<"P7D" | "P30D">("P7D");
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [historyState, setHistoryState] = useState<
    "idle" | "loading" | "ready" | "error" | "stale"
  >("idle");
  const [compare, setCompare] = useState<string[]>([]);
  const [page, setPage] = useState<string | null>(null);
  const [scrub, setScrub] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [watch, setWatch] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ns-watch") || "[]");
      return Array.isArray(saved)
        ? saved.filter((id) => typeof id === "string")
        : [];
    } catch {
      return [];
    }
  });

  const load = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const payload = await getJson(INVENTORY);
      const rows = parseInventory(payload);
      setStations(rows);
      setRetrievedAt(new Date().toISOString());
      setStatus("ready");
      const fromUrl = siteFromHash(window.location.hash);
      if (fromUrl) {
        if (rows.some((row) => row.siteId === fromUrl)) setSelectedId(fromUrl);
        else setUnknown(fromUrl);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onHash = () => {
      const id = siteFromHash(window.location.hash);
      if (!id) return;
      if (stations.some((row) => row.siteId === id)) {
        setSelectedId(id);
        setUnknown(null);
      } else if (stations.length) setUnknown(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [stations]);

  const visible = useMemo(
    () => filterStations(stations, query, county, huc),
    [stations, query, county, huc],
  );
  const selected = stations.find((row) => row.siteId === selectedId) ?? null;
  const counties = useMemo(
    () =>
      [
        ...new Set(stations.map((s) => s.countyCd).filter(Boolean)),
      ].sort() as string[],
    [stations],
  );
  const hucs = useMemo(
    () =>
      [
        ...new Set(stations.map((s) => s.hucCd?.slice(0, 4)).filter(Boolean)),
      ].sort() as string[],
    [stations],
  );

  function choose(siteId: string) {
    setSelectedId(siteId);
    setUnknown(null);
    const url = `${window.location.pathname}${window.location.search}#site=${siteId}`;
    window.history.replaceState(null, "", url);
    document.getElementById("console")?.focus();
  }

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    setHistoryState("loading");
    getJson(historyUrl(selected.siteId, period))
      .then((payload) => {
        if (cancelled) return;
        setHistory(parseHistory(payload));
        setHistoryState("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setHistoryState(history.length ? "stale" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [selected, period]);

  function onListKey(event: KeyboardEvent<HTMLUListElement>) {
    const ids = visible.map((row) => row.siteId);
    const index = Math.max(0, ids.indexOf(selectedId ?? ""));
    if (event.key === "ArrowDown") {
      event.preventDefault();
      choose(ids[Math.min(ids.length - 1, index + 1)]);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      choose(ids[Math.max(0, index - 1)]);
    }
    if (event.key === "Enter" && ids[index]) choose(ids[index]);
  }

  function csv() {
    if (!selected) return;
    const header =
      "site_id,name,value_cfs,unit,observed_at,timezone,qualifiers,retrieved_at,source";
    const line = [
      selected.siteId,
      JSON.stringify(selected.name),
      selected.valueCfs ?? "",
      selected.unit,
      selected.observedAt ?? "",
      selected.tz,
      selected.qualifiers.join("|"),
      retrievedAt,
      sourceUrl(selected.siteId),
    ].join(",");
    const blob = new Blob([`${header}\n${line}\n`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${selected.siteId}-latest.csv`;
    a.click();
  }

  useEffect(() => {
    localStorage.setItem("ns-watch", JSON.stringify(watch));
  }, [watch]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const compared = compare
    .map((id) => stations.find((row) => row.siteId === id))
    .filter(Boolean) as Station[];
  const story = storyFromHistory(history);
  const freshest = [...stations]
    .filter((row) => row.observedAt && row.valueCfs != null)
    .sort((a, b) => (b.observedAt ?? "").localeCompare(a.observedAt ?? ""))[0];
  const civic = civicPages.find((item) => item.id === page);
  const numericHistory = history.filter((point) => point.valueCfs != null);
  const scrubPoint =
    numericHistory[Math.min(scrub, Math.max(0, numericHistory.length - 1))];

  return (
    <div className="wrap">
      <header className="hero">
        <p className="mono">Natural State</p>
        <h1>Arkansas, measured where water moves.</h1>
        <svg className="flow" viewBox="0 0 400 28" aria-hidden="true">
          <path d="M0 18 C 40 6, 80 26, 120 14 S 200 4, 240 16 320 26, 400 12" />
        </svg>
        <p>
          This page shows USGS stream-discharge observations for Arkansas
          stations. It serves anyone checking a single station. It does not
          claim a statewide total, a health score, a flood warning, or a trend.
        </p>
        <p>
          The water console is the front door. The civic drafts already in the
          repository are the second door. They are drafts, not statutes.
        </p>
        {freshest && (
          <p className="mono">
            Freshest numeric reading in this response: {freshest.siteId} at{" "}
            {freshest.observedAt}. Inventory count {stations.length}. This is
            not a statewide discharge total.
          </p>
        )}
        <div className="row">
          <button type="button" onClick={() => setPage(null)}>
            Console
          </button>
          <button type="button" onClick={() => setPage("survey")}>
            USGS notes
          </button>
          {civicPages.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setPage(item.id)}
            >
              {item.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              setTheme((mode) => (mode === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </header>
      {page === "survey" && (
        <article className="panel">
          <h2>What the repository records from USGS</h2>
          <p>
            This is not a new survey and not a mine plan. The live console is
            stream discharge, parameter 00060. The notes below are the USGS
            findings already written in the repo, with the correction the longer
            notes apply to the short ONE draft.
          </p>
          <h3>Water</h3>
          <p>
            Continuous discharge from USGS Water Services for Arkansas
            monitoring locations. Values stay provisional when the source says
            so. No flood, health, or statewide-total claim.
          </p>
          <h3>Bauxite district, critical elements</h3>
          <p>
            The central Arkansas bauxite district is real and documented by
            USGS. The notes record about 76 ppm gallium in raw ore, about 662
            ppm niobium in ore, and about 1,075 ppm niobium in processed
            residues. Rare-earth concentrations are present. The same USGS work,
            as recorded here, says additional rare-earth processing looked
            uneconomic in the foreseeable future. That is not a commercial
            rare-earth deposit.
          </p>
          <h3>Quartz</h3>
          <p>
            Arkansas quartz is a feedstock and assay question. No trace-element
            assay of this deposit has been run against the archive grade table.
            Clarity of a specimen is not that assay.
          </p>
          <p>
            The ONE draft in this repo says USGS confirmed rare earths in
            residues in a stronger way than the longer notes allow. This page
            follows the longer notes.
          </p>
        </article>
      )}
      {civic && (
        <article className="panel">
          <h2>{civic.title}</h2>
          <p>
            Text copied from the repository file. It is a draft, not enacted
            law. The infant act is AINSA. The license act is DL-ACCESS. RSF is
            the Rate Stabilization Fund. 5D-EFS is 5-dimensional encoded fused
            silica, the quartz-archive plate. RSF was assigned on 2026-10-25.
            The files still use the long names. recoveRY, refineRY, deliveRY,
            memoRY, libraRY, and factoRY open the same six-branch note. ForestRY
            and TreasuRY open the ConservatoRY note. ArboRY is not a button.
            That spelling was withdrawn.
          </p>
          <pre className="prose">{civic.body}</pre>
        </article>
      )}
      <div className="row" style={{ marginTop: 12 }}>
        <button type="button" onClick={() => void load()}>
          Refresh inventory
        </button>
        <button type="button" onClick={() => setShowMap(true)}>
          Load map
        </button>
        <span className="mono">
          {status === "ready"
            ? `${stations.length} stations in this response`
            : status}
        </span>
      </div>
      {status === "error" && (
        <p className="warn" role="alert">
          Inventory request failed ({error}). No cached inventory is being shown
          as fresh.
        </p>
      )}
      {status === "loading" && <p role="status">Loading the USGS inventory.</p>}
      <div className="grid">
        <section className="panel">
          <label>
            Search name or USGS id{" "}
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <label>
            County code{" "}
            <select value={county} onChange={(e) => setCounty(e.target.value)}>
              <option value="">All</option>
              {counties.map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
          </label>
          <label>
            HUC prefix{" "}
            <select value={huc} onChange={(e) => setHuc(e.target.value)}>
              <option value="">All</option>
              {hucs.map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCounty("");
              setHuc("");
            }}
          >
            Reset
          </button>
          <ul
            className="list"
            role="listbox"
            aria-label="Stations"
            tabIndex={0}
            onKeyDown={onListKey}
          >
            {visible.map((row) => (
              <li key={row.siteId}>
                <button
                  type="button"
                  role="option"
                  aria-selected={row.siteId === selectedId}
                  onClick={() => choose(row.siteId)}
                >
                  <span className="mono">{row.siteId}</span> {row.name}
                  {!hasCoordinates(row) && (
                    <span className="badge"> no coordinates</span>
                  )}
                  {row.valueCfs == null && (
                    <span className="badge"> no reading</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          {status === "ready" && visible.length === 0 && (
            <p>No stations match. Reset restores the inventory.</p>
          )}
        </section>
        <section>
          {showMap && !mapError && (
            <StationMap
              stations={visible}
              selectedId={selectedId}
              onSelect={choose}
              onFail={setMapError}
            />
          )}
          {mapError && (
            <p className="warn" role="alert">
              Map unavailable ({mapError}). The list still selects stations.
            </p>
          )}
          {!showMap && (
            <p>
              The map stays unloaded until you ask for it. Pins use only
              coordinates USGS sent.
            </p>
          )}
          <article className="panel" id="console" tabIndex={-1}>
            <h2>Observation</h2>
            {unknown && (
              <p className="warn" role="alert">
                Station {unknown} is not in this inventory. Pick one from the
                list.
              </p>
            )}
            {!selected && <p>No station selected.</p>}
            {selected && (
              <>
                <h3>{selected.name}</h3>
                <p className="mono">
                  {selected.siteId} · county{" "}
                  {selected.countyCd ?? "not provided"} · HUC{" "}
                  {selected.hucCd ?? "not provided"}
                </p>
                <p>
                  {selected.valueCfs == null
                    ? "No numeric discharge in the latest value. Missing is not zero."
                    : `${selected.valueCfs} ${selected.unit}`}
                </p>
                <p>
                  Observed {selected.observedAt ?? "time not provided"}{" "}
                  {selected.tz}. Qualifiers{" "}
                  {selected.qualifiers.join(", ") || "none"}.
                </p>
                <p>
                  Retrieved {retrievedAt}. A pin does not mean this reading is
                  current.
                </p>
                <p>
                  <a href={sourceUrl(selected.siteId)}>
                    USGS monitoring location
                  </a>
                </p>
                {!hasCoordinates(selected) && (
                  <p>
                    This station has no coordinates in the feed, so it is not on
                    the map. It stays in the list.
                  </p>
                )}
                <div className="row">
                  <button type="button" onClick={() => setPeriod("P7D")}>
                    7-day window
                  </button>
                  <button type="button" onClick={() => setPeriod("P30D")}>
                    30-day window
                  </button>
                  <button type="button" onClick={csv}>
                    Download this latest row as CSV
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(window.location.href)
                    }
                  >
                    Copy station link
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCompare((ids) =>
                        ids.includes(selected.siteId)
                          ? ids
                          : [...ids, selected.siteId].slice(-3),
                      )
                    }
                  >
                    Add to comparison
                  </button>
                </div>
                <p>
                  History window {period}.{" "}
                  {historyState === "stale" &&
                    "The refresh failed. The line still on screen is the previous fetch, not a new reading."}{" "}
                  {historyState === "error" &&
                    "History request failed. No line is shown."}{" "}
                  {historyState === "loading" && "Loading history."}
                </p>
                {historyState !== "error" && <Chart points={history} />}
                {numericHistory.length > 1 && (
                  <label>
                    Move through this window
                    <input
                      type="range"
                      min={0}
                      max={numericHistory.length - 1}
                      value={Math.min(scrub, numericHistory.length - 1)}
                      onChange={(event) => setScrub(Number(event.target.value))}
                    />
                  </label>
                )}
                {scrubPoint && (
                  <p className="mono">
                    At {scrubPoint.t}: {scrubPoint.valueCfs} {selected.unit}.
                    This is one point in the fetched window, not a forecast.
                  </p>
                )}
                {story && (
                  <div>
                    <h3>Three days from this station's fetched window</h3>
                    <p>
                      Highest daily mean {story.high.day}:{" "}
                      {story.high.meanCfs.toFixed(1)} {selected.unit} (
                      {story.high.n} points).
                    </p>
                    <p>
                      Lowest daily mean {story.low.day}:{" "}
                      {story.low.meanCfs.toFixed(1)} {selected.unit} (
                      {story.low.n} points).
                    </p>
                    <p>
                      Day nearest the median daily mean {story.mid.day}:{" "}
                      {story.mid.meanCfs.toFixed(1)} {selected.unit} (
                      {story.mid.n} points).
                    </p>
                    <p>
                      These are ranks inside the fetched window. They are not a
                      flood warning, a drought declaration, or a trend.
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setWatch((ids) =>
                      ids.includes(selected.siteId)
                        ? ids.filter((id) => id !== selected.siteId)
                        : [...ids, selected.siteId],
                    )
                  }
                >
                  {watch.includes(selected.siteId)
                    ? "Remove from this browser's list"
                    : "Save on this browser"}
                </button>
              </>
            )}
            {compared.length > 0 && (
              <div>
                <h3>Comparison, latest value only</h3>
                <ul>
                  {compared.map((row) => (
                    <li key={row.siteId}>
                      {row.siteId}:{" "}
                      {row.valueCfs == null
                        ? "no reading"
                        : `${row.valueCfs} ${row.unit}`}{" "}
                      at {row.observedAt}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => setCompare([])}>
                  Clear comparison
                </button>
              </div>
            )}
          </article>
        </section>
      </div>
      {watch.length > 0 && (
        <section className="panel">
          <h2>Saved on this browser</h2>
          <p>
            No email and no push are sent. The list stays in this browser only.
          </p>
          <ul>
            {watch.map((id) => {
              const row = stations.find((station) => station.siteId === id);
              return (
                <li key={id}>
                  <button type="button" onClick={() => choose(id)}>
                    {id}
                  </button>{" "}
                  {row
                    ? row.valueCfs == null
                      ? "no reading"
                      : `${row.valueCfs} ${row.unit} at ${row.observedAt}`
                    : "not in the current inventory"}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <footer>
        <p role="status">
          Feed status {status}. Last inventory retrieval{" "}
          {retrievedAt || "not yet"}.
        </p>
        <p>
          Map tiles &copy; OpenStreetMap contributors. Discharge from USGS Water
          Services, parameter 00060. Qualifier P means provisional.
        </p>
        <p>Mark · &copy; 2026 RWY</p>
      </footer>
    </div>
  );
}
