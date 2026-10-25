export const MISSING_SENTINEL = -999999;

export type Station = {
  siteId: string;
  name: string;
  lat: number | null;
  lon: number | null;
  valueCfs: number | null;
  unit: string;
  observedAt: string | null;
  qualifiers: string[];
  tz: string;
  countyCd: string | null;
  hucCd: string | null;
};

type IvPayload = {
  value?: {
    timeSeries?: Array<{
      sourceInfo?: {
        siteName?: string;
        siteCode?: Array<{ value?: string }>;
        timeZoneInfo?: { defaultTimeZone?: { zoneAbbreviation?: string } };
        geoLocation?: {
          geogLocation?: { latitude?: number; longitude?: number };
        };
        siteProperty?: Array<{ name?: string; value?: string }>;
      };
      variable?: { unit?: { unitCode?: string } };
      values?: Array<{
        value?: Array<{
          value?: string;
          dateTime?: string;
          qualifiers?: string[];
        }>;
      }>;
    }>;
  };
};

export function numericOrMissing(raw: string | undefined): number | null {
  if (raw == null || raw.trim() === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n === MISSING_SENTINEL) return null;
  return n;
}

function prop(
  list: Array<{ name?: string; value?: string }> | undefined,
  name: string,
): string | null {
  const hit = list?.find((item) => item.name === name);
  return hit?.value ?? null;
}

export function parseInventory(payload: IvPayload): Station[] {
  const series = payload.value?.timeSeries ?? [];
  const byId = new Map<string, Station>();
  for (const row of series) {
    const info = row.sourceInfo;
    const siteId = info?.siteCode?.[0]?.value;
    if (!siteId) continue;
    const latest = row.values?.[0]?.value?.at(-1);
    const lat = info?.geoLocation?.geogLocation?.latitude;
    const lon = info?.geoLocation?.geogLocation?.longitude;
    const station: Station = {
      siteId,
      name: info?.siteName ?? siteId,
      lat: typeof lat === "number" ? lat : null,
      lon: typeof lon === "number" ? lon : null,
      valueCfs: numericOrMissing(latest?.value),
      unit: row.variable?.unit?.unitCode ?? "ft3/s",
      observedAt: latest?.dateTime ?? null,
      qualifiers: latest?.qualifiers ?? [],
      tz: info?.timeZoneInfo?.defaultTimeZone?.zoneAbbreviation ?? "",
      countyCd: prop(info?.siteProperty, "countyCd"),
      hucCd: prop(info?.siteProperty, "hucCd"),
    };
    byId.set(siteId, station);
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function siteFromHash(hash: string): string | null {
  const query = hash.startsWith("#") ? hash.slice(1) : hash;
  const id = new URLSearchParams(query).get("site");
  return id && /^[0-9]{8,15}$/.test(id) ? id : null;
}

export function filterStations(
  rows: Station[],
  query: string,
  county: string,
  huc: string,
): Station[] {
  const q = query.trim().toLowerCase();
  return rows.filter((row) => {
    if (county && row.countyCd !== county) return false;
    if (huc && !(row.hucCd ?? "").startsWith(huc)) return false;
    if (!q) return true;
    return row.name.toLowerCase().includes(q) || row.siteId.includes(q);
  });
}

export function hasCoordinates(row: Station): boolean {
  return row.lat != null && row.lon != null;
}

export type HistoryPoint = { t: string; valueCfs: number | null };

export function parseHistory(payload: IvPayload): HistoryPoint[] {
  const values = payload.value?.timeSeries?.[0]?.values?.[0]?.value ?? [];
  return values.map((point) => ({
    t: point.dateTime ?? "",
    valueCfs: numericOrMissing(point.value),
  }));
}

export type DayMean = { day: string; meanCfs: number; n: number };

export function dailyMeans(points: HistoryPoint[]): DayMean[] {
  const buckets = new Map<string, number[]>();
  for (const point of points) {
    if (point.valueCfs == null || point.t.length < 10) continue;
    const day = point.t.slice(0, 10);
    const list = buckets.get(day) ?? [];
    list.push(point.valueCfs);
    buckets.set(day, list);
  }
  return [...buckets.entries()].map(([day, values]) => ({
    day,
    meanCfs: values.reduce((sum, n) => sum + n, 0) / values.length,
    n: values.length,
  }));
}

export function storyFromHistory(
  points: HistoryPoint[],
): { high: DayMean; low: DayMean; mid: DayMean } | null {
  const days = dailyMeans(points);
  if (days.length < 3) return null;
  const sorted = [...days].sort((a, b) => a.meanCfs - b.meanCfs);
  const mid = sorted[Math.floor(sorted.length / 2)];
  return { low: sorted[0], high: sorted[sorted.length - 1], mid };
}
