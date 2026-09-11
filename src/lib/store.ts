import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nearestCity, type City } from "./cities";
import { SEED_INVESTIGATIONS } from "./seed";
import type { Investigation, InvestigationStatus, Stage, Waypoint } from "./types";

export type PendingPin = { lat: number; lng: number; city: City };

type ComposerMode = "closed" | "waypoint" | "investigation";

type MeridianState = {
  investigations: Investigation[];
  selectedId: string;
  selectedWaypointId: string | null;
  night: boolean;
  autoRotate: boolean;
  playing: boolean;
  playIndex: number;
  placing: boolean;
  pendingPin: PendingPin | null;
  composer: ComposerMode;
  selected: () => Investigation | null;
  selectInvestigation: (id: string) => void;
  selectWaypoint: (id: string | null) => void;
  setNight: (v: boolean) => void;
  setAutoRotate: (v: boolean) => void;
  setPlacing: (v: boolean) => void;
  dropPin: (lat: number, lng: number) => void;
  clearPin: () => void;
  setComposer: (m: ComposerMode) => void;
  play: () => void;
  stopPlay: () => void;
  advancePlay: () => void;
  addInvestigation: (input: {
    title: string;
    subtitle: string;
    summary: string;
    status: InvestigationStatus;
  }) => string;
  addWaypoint: (input: {
    investigationId: string;
    name: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    stage: Stage;
    date: string;
    notes: string;
  }) => void;
  removeWaypoint: (investigationId: string, waypointId: string) => void;
  removeInvestigation: (id: string) => void;
  resetDesk: () => void;
};

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function nextCode(title: string, existing: Investigation[]): string {
  const letters =
    title.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "IX";
  const used = new Set(existing.map((i) => i.code));
  let n = existing.length + 1;
  let code = `${letters}-${String(n).padStart(2, "0")}`;
  while (used.has(code)) {
    n += 1;
    code = `${letters}-${String(n).padStart(2, "0")}`;
  }
  return code;
}

const PALETTE = ["#e4dfd4", "#9aadc2", "#a8b8a4", "#c9bba6", "#c8ccd4"];

function sortWaypoints(ws: Waypoint[]): Waypoint[] {
  return [...ws].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export const useMeridian = create<MeridianState>()(
  persist(
    (set, get) => ({
      investigations: SEED_INVESTIGATIONS,
      selectedId: SEED_INVESTIGATIONS[0]!.id, // east66-vault
      selectedWaypointId: null,
      night: true,
      autoRotate: true,
      playing: false,
      playIndex: 0,
      placing: false,
      pendingPin: null,
      composer: "closed",
      selected: () => get().investigations.find((i) => i.id === get().selectedId) ?? null,
      selectInvestigation: (id) => {
        const inv = get().investigations.find((i) => i.id === id);
        if (!inv) return;
        set({
          selectedId: id,
          selectedWaypointId: null,
          playing: false,
          playIndex: 0,
        });
      },
      selectWaypoint: (id) => set({ selectedWaypointId: id, playing: false }),
      setNight: (v) => set({ night: v }),
      setAutoRotate: (v) => set({ autoRotate: v }),
      setPlacing: (v) => set({ placing: v, composer: v ? "waypoint" : get().composer }),
      dropPin: (lat, lng) => {
        const city = nearestCity(lat, lng);
        set({
          pendingPin: { lat, lng, city },
          placing: false,
          composer: "waypoint",
        });
      },
      clearPin: () => set({ pendingPin: null }),
      setComposer: (m) =>
        set({
          composer: m,
          placing: m === "waypoint" ? get().placing : false,
          pendingPin: m === "closed" ? null : get().pendingPin,
        }),
      play: () => {
        const inv = get().selected();
        if (!inv || inv.waypoints.length === 0) return;
        set({
          playing: true,
          playIndex: 0,
          selectedWaypointId: inv.waypoints[0]!.id,
          autoRotate: false,
        });
      },
      stopPlay: () => set({ playing: false }),
      advancePlay: () => {
        const inv = get().selected();
        if (!inv) {
          set({ playing: false });
          return;
        }
        const next = get().playIndex + 1;
        if (next >= inv.waypoints.length) {
          set({ playing: false, playIndex: 0 });
          return;
        }
        set({
          playIndex: next,
          selectedWaypointId: inv.waypoints[next]!.id,
        });
      },
      addInvestigation: (input) => {
        const id = uid("inv");
        const inv: Investigation = {
          id,
          code: nextCode(input.title, get().investigations),
          title: input.title.trim() || "Untitled",
          subtitle: input.subtitle.trim() || "New pipeline",
          status: input.status,
          color: PALETTE[get().investigations.length % PALETTE.length]!,
          summary: input.summary.trim() || "No briefing yet.",
          waypoints: [],
        };
        set({
          investigations: [...get().investigations, inv],
          selectedId: id,
          selectedWaypointId: null,
          composer: "waypoint",
        });
        return id;
      },
      addWaypoint: (input) => {
        const wp: Waypoint = {
          id: uid("wp"),
          name: input.name.trim() || input.city,
          city: input.city,
          country: input.country,
          lat: input.lat,
          lng: input.lng,
          stage: input.stage,
          date: input.date,
          notes: input.notes.trim(),
          exhibits: [],
        };
        set({
          investigations: get().investigations.map((inv) =>
            inv.id === input.investigationId
              ? { ...inv, waypoints: sortWaypoints([...inv.waypoints, wp]) }
              : inv,
          ),
          selectedId: input.investigationId,
          selectedWaypointId: wp.id,
          composer: "closed",
          pendingPin: null,
          placing: false,
        });
      },
      removeWaypoint: (investigationId, waypointId) => {
        set({
          investigations: get().investigations.map((inv) =>
            inv.id === investigationId
              ? { ...inv, waypoints: inv.waypoints.filter((w) => w.id !== waypointId) }
              : inv,
          ),
          selectedWaypointId:
            get().selectedWaypointId === waypointId ? null : get().selectedWaypointId,
        });
      },
      removeInvestigation: (id) => {
        const rest = get().investigations.filter((i) => i.id !== id);
        const fallback = rest[0]?.id ?? "";
        set({
          investigations: rest,
          selectedId: get().selectedId === id ? fallback : get().selectedId,
          selectedWaypointId: get().selectedId === id ? null : get().selectedWaypointId,
        });
      },
      resetDesk: () =>
        set({
          investigations: SEED_INVESTIGATIONS,
          selectedId: SEED_INVESTIGATIONS[0]!.id, // east66-vault
          selectedWaypointId: null,
          playing: false,
          playIndex: 0,
          pendingPin: null,
          composer: "closed",
          placing: false,
        }),
    }),
    {
      name: "meridian.v3",
      version: 3,
      partialize: (s) => ({
        investigations: s.investigations,
        selectedId: s.selectedId,
        night: s.night,
        autoRotate: s.autoRotate,
      }),
      migrate: (persisted: unknown, version: number) => {
        // v3 = full Drive crawl (8 pipelines, denser waypoints)
        // v2 = first Drive vault seed
        if (version < 3) {
          return {
            investigations: SEED_INVESTIGATIONS,
            selectedId: SEED_INVESTIGATIONS[0]!.id,
            night: true,
            autoRotate: true,
          };
        }
        return persisted as {
          investigations: typeof SEED_INVESTIGATIONS;
          selectedId: string;
          night: boolean;
          autoRotate: boolean;
        };
      },
    },
  ),
);
