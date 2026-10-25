import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import type { Station } from "./parse";
import { hasCoordinates } from "./parse";

type Props = {
  stations: Station[];
  selectedId: string | null;
  onSelect: (siteId: string) => void;
  onFail: (message: string) => void;
};

export function StationMap({ stations, selectedId, onSelect, onFail }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;
    const node = host.current;
    if (!node) return;
    import("leaflet")
      .then((L) => {
        if (cancelled || mapRef.current) return;
        const map = L.map(node, { scrollWheelZoom: false });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 16,
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
      })
      .catch((error: unknown) => {
        onFail(error instanceof Error ? error.message : "Map failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [onFail]);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    let dead = false;
    import("leaflet")
      .then((L) => {
        if (dead) return;
        layer.clearLayers();
        const placed = stations.filter(hasCoordinates);
        for (const station of placed) {
          const selected = station.siteId === selectedId;
          const marker = L.circleMarker(
            [station.lat as number, station.lon as number],
            {
              radius: selected ? 9 : 6,
              color: "#1e3a2f",
              weight: selected ? 3 : 1,
              fillColor: station.valueCfs == null ? "#c4a15a" : "#1e3a2f",
              fillOpacity: 0.85,
            },
          );
          marker.bindTooltip(
            `${station.siteId} ${station.valueCfs == null ? "no reading" : station.valueCfs}`,
            { permanent: selected },
          );
          marker.on("click", () => onSelectRef.current(station.siteId));
          marker.addTo(layer);
        }
        if (placed.length) {
          const bounds = L.latLngBounds(
            placed.map((s) => [s.lat as number, s.lon as number]),
          );
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          map.fitBounds(bounds.pad(0.1), { animate: !reduce });
        }
      })
      .catch((error: unknown) => {
        onFail(error instanceof Error ? error.message : "Map failed to draw");
      });
    return () => {
      dead = true;
    };
  }, [stations, selectedId, onFail]);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
    },
    [],
  );

  return (
    <div
      ref={host}
      className="map"
      role="application"
      aria-label="Station map. The list beside it selects the same stations."
    />
  );
}
