import { useEffect, useMemo, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";
import { bearingDeg, interpolateGreatCircle, viewForPoints } from "@/lib/geo";
import { useMeridian } from "@/lib/store";
import type { Waypoint } from "@/lib/types";

type GlobeComponent = typeof import("react-globe.gl").default;

type PointDatum = {
  id: string;
  investigationId: string;
  lat: number;
  lng: number;
  name: string;
  city: string;
  color: string;
  radius: number;
  altitude: number;
  kind: "node" | "pin";
};

type ArcDatum = {
  investigationId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  stroke: number;
};

type RingDatum = {
  lat: number;
  lng: number;
  color: string;
  maxR: number;
};

type PlaneDatum = {
  lat: number;
  lng: number;
  bearing: number;
};

function hexAlpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function makePlaneEl(d: object) {
  const plane = d as PlaneDatum;
  const el = document.createElement("div");
  el.className = "plane-marker";
  el.style.transform = `rotate(${plane.bearing}deg)`;
  el.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2.4c.3 0 .5.12.64.34l8.1 12.4c.3.47.04 1.1-.5 1.26l-7.24 2.2v3.1c0 .55-.45 1-1 1s-1-.45-1-1v-3.1l-7.24-2.2a.9.9 0 0 1-.5-1.26l8.1-12.4A.8.8 0 0 1 12 2.4z"/></svg>`;
  return el;
}

export function GlobeView() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const lastPointClick = useRef(0);
  const [Globe, setGlobe] = useState<GlobeComponent | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [plane, setPlane] = useState<PlaneDatum | null>(null);

  const investigations = useMeridian((s) => s.investigations);
  const selectedId = useMeridian((s) => s.selectedId);
  const selectedWaypointId = useMeridian((s) => s.selectedWaypointId);
  const night = useMeridian((s) => s.night);
  const autoRotate = useMeridian((s) => s.autoRotate);
  const playing = useMeridian((s) => s.playing);
  const playIndex = useMeridian((s) => s.playIndex);
  const placing = useMeridian((s) => s.placing);
  const pendingPin = useMeridian((s) => s.pendingPin);
  const composer = useMeridian((s) => s.composer);
  const selectInvestigation = useMeridian((s) => s.selectInvestigation);
  const selectWaypoint = useMeridian((s) => s.selectWaypoint);
  const dropPin = useMeridian((s) => s.dropPin);
  const advancePlay = useMeridian((s) => s.advancePlay);

  const selected = investigations.find((i) => i.id === selectedId) ?? null;

  useEffect(() => {
    let live = true;
    void import("react-globe.gl").then((mod) => {
      if (live) setGlobe(() => mod.default);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready) return;
    g.controls().autoRotate = autoRotate && !playing;
    g.controls().autoRotateSpeed = 0.32;
  }, [autoRotate, playing, ready]);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready || playing || !selected) return;
    const pov = viewForPoints(selected.waypoints);
    g.pointOfView(pov, reduceMotion ? 0 : 1200);
  }, [selectedId, ready, playing, reduceMotion, selected]);

  useEffect(() => {
    if (!playing || !selected || !ready) {
      setPlane(null);
      return;
    }
    const wp = selected.waypoints[playIndex];
    if (!wp) return;
    const from =
      playIndex === 0 ? wp : (selected.waypoints[playIndex - 1] as Waypoint);
    const g = globeRef.current;
    g?.pointOfView(
      { lat: wp.lat, lng: wp.lng, altitude: 1.55 },
      reduceMotion ? 0 : 1800,
    );

    let raf = 0;
    const start = performance.now();
    const dur = playIndex === 0 || reduceMotion ? 200 : 1800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      const p = interpolateGreatCircle(from, wp, eased);
      setPlane({ ...p, bearing: bearingDeg(from, wp) });
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const hold = window.setTimeout(
      () => advancePlay(),
      reduceMotion ? 700 : 2800,
    );
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
    };
  }, [playing, playIndex, selected, ready, reduceMotion, advancePlay]);

  const { points, arcs, rings } = useMemo(() => {
    const pts: PointDatum[] = [];
    const arcsOut: ArcDatum[] = [];
    const ringsOut: RingDatum[] = [];

    for (const inv of investigations) {
      const on = inv.id === selectedId;
      inv.waypoints.forEach((wp, i) => {
        const current = wp.id === selectedWaypointId;
        pts.push({
          id: wp.id,
          investigationId: inv.id,
          lat: wp.lat,
          lng: wp.lng,
          name: wp.name,
          city: wp.city,
          color: current ? "#ececee" : hexAlpha(inv.color, on ? 0.95 : 0.35),
          radius: current ? 0.55 : on ? 0.38 : 0.2,
          altitude: current ? 0.024 : on ? 0.014 : 0.008,
          kind: "node",
        });
        const next = inv.waypoints[i + 1];
        if (next) {
          arcsOut.push({
            investigationId: inv.id,
            startLat: wp.lat,
            startLng: wp.lng,
            endLat: next.lat,
            endLng: next.lng,
            color: hexAlpha(inv.color, on ? 0.9 : 0.22),
            stroke: on ? 0.55 : 0.22,
          });
        }
      });
    }

    if (selectedWaypointId) {
      const wp = investigations
        .flatMap((i) => i.waypoints)
        .find((w) => w.id === selectedWaypointId);
      if (wp) {
        ringsOut.push({
          lat: wp.lat,
          lng: wp.lng,
          color: "rgba(200,204,212,0.55)",
          maxR: 2.8,
        });
      }
    }

    if (pendingPin) {
      pts.push({
        id: "pending",
        investigationId: selectedId,
        lat: pendingPin.lat,
        lng: pendingPin.lng,
        name: "New pin",
        city: pendingPin.city.name,
        color: "#c8ccd4",
        radius: 0.5,
        altitude: 0.03,
        kind: "pin",
      });
      ringsOut.push({
        lat: pendingPin.lat,
        lng: pendingPin.lng,
        color: "rgba(200,204,212,0.7)",
        maxR: 2.2,
      });
    }

    return { points: pts, arcs: arcsOut, rings: ringsOut };
  }, [investigations, selectedId, selectedWaypointId, pendingPin]);

  const onReady = () => {
    const g = globeRef.current;
    if (!g) return;
    g.controls().autoRotate = autoRotate && !playing;
    g.controls().autoRotateSpeed = 0.32;
    g.controls().enableDamping = true;
    g.controls().minDistance = 130;
    g.controls().maxDistance = 420;
    g.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const inv = investigations.find((i) => i.id === selectedId);
    if (inv && inv.waypoints.length) {
      g.pointOfView(viewForPoints(inv.waypoints), 0);
    } else {
      g.pointOfView({ lat: 22, lng: 28, altitude: 2.4 }, 0);
    }
    setReady(true);
  };

  const globeImage = night
    ? "/globe/earth-night.jpg"
    : "/globe/earth-blue-marble.jpg";

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 bg-bg"
      style={{ touchAction: "none" }}
    >
      {Globe && size.w > 0 && size.h > 0 ? (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(9,9,11,1)"
          backgroundImageUrl="/globe/night-sky.png"
          globeImageUrl={globeImage}
          bumpImageUrl="/globe/earth-topology.png"
          showAtmosphere
          atmosphereColor="#9aa3b2"
          atmosphereAltitude={0.18}
          animateIn={!reduceMotion}
          waitForGlobeReady
          onGlobeReady={onReady}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude="altitude"
          pointRadius="radius"
          pointLabel={(d) => {
            const p = d as PointDatum;
            return `<div style="font:500 11px 'Instrument Sans',sans-serif;padding:6px 8px;background:#121214;color:#ececee;box-shadow:0 0 0 1px rgba(255,255,255,.08);border-radius:8px">${p.city}<div style="color:#8b8b93;font-weight:400">${p.name}</div></div>`;
          }}
          onPointClick={(d) => {
            const p = d as PointDatum;
            lastPointClick.current = Date.now();
            if (p.kind === "pin") return;
            selectInvestigation(p.investigationId);
            selectWaypoint(p.id);
          }}
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcStroke="stroke"
          arcDashLength={0.35}
          arcDashGap={0.8}
          arcDashAnimateTime={reduceMotion ? 0 : 2200}
          arcAltitudeAutoScale={0.4}
          onArcClick={(d) => {
            const a = d as ArcDatum;
            lastPointClick.current = Date.now();
            selectInvestigation(a.investigationId);
          }}
          ringsData={reduceMotion ? [] : rings}
          ringLat="lat"
          ringLng="lng"
          ringColor="color"
          ringMaxRadius="maxR"
          ringPropagationSpeed={2.4}
          ringRepeatPeriod={900}
          labelsData={selected?.waypoints ?? []}
          labelLat="lat"
          labelLng="lng"
          labelText="city"
          labelColor={() => "rgba(236,236,238,0.82)"}
          labelSize={0.55}
          labelDotRadius={0}
          labelAltitude={0.028}
          labelIncludeDot={false}
          labelsTransitionDuration={0}
          htmlElementsData={plane ? [plane] : []}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.12}
          htmlElement={makePlaneEl}
          htmlTransitionDuration={0}
          onGlobeClick={(coords) => {
            if (Date.now() - lastPointClick.current < 280) return;
            if (placing || composer === "waypoint") {
              dropPin(coords.lat, coords.lng);
            }
          }}
        />
      ) : null}
      {!ready ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-display text-2xl italic text-muted">
            Acquiring Earth
          </p>
        </div>
      ) : null}
    </div>
  );
}
