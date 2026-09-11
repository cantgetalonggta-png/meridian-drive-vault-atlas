import {
  ChevronUp,
  MapPin,
  Moon,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Composer } from "@/components/composer";
import { Button } from "@/components/ui/button";
import { formatDate, formatKm, pipelineKm } from "@/lib/geo";
import { useMeridian } from "@/lib/store";
import { STAGE_LABEL, STATUS_LABEL, type Stage } from "@/lib/types";
import { cn } from "@/lib/utils";

function ClockFace() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const iso = now.toISOString().slice(0, 19).replace("T", " ");
  return (
    <time
      dateTime={now.toISOString()}
      className="px-2 font-mono text-xs tabular-nums text-muted"
    >
      {iso}Z
    </time>
  );
}

export function Overlay() {
  const investigations = useMeridian((s) => s.investigations);
  const selectedId = useMeridian((s) => s.selectedId);
  const selectedWaypointId = useMeridian((s) => s.selectedWaypointId);
  const night = useMeridian((s) => s.night);
  const autoRotate = useMeridian((s) => s.autoRotate);
  const playing = useMeridian((s) => s.playing);
  const placing = useMeridian((s) => s.placing);
  const composer = useMeridian((s) => s.composer);
  const selectInvestigation = useMeridian((s) => s.selectInvestigation);
  const selectWaypoint = useMeridian((s) => s.selectWaypoint);
  const setNight = useMeridian((s) => s.setNight);
  const setAutoRotate = useMeridian((s) => s.setAutoRotate);
  const setPlacing = useMeridian((s) => s.setPlacing);
  const setComposer = useMeridian((s) => s.setComposer);
  const play = useMeridian((s) => s.play);
  const stopPlay = useMeridian((s) => s.stopPlay);
  const resetDesk = useMeridian((s) => s.resetDesk);
  const removeInvestigation = useMeridian((s) => s.removeInvestigation);
  const removeWaypoint = useMeridian((s) => s.removeWaypoint);

  const selected = investigations.find((i) => i.id === selectedId) ?? null;
  const waypoint =
    selected?.waypoints.find((w) => w.id === selectedWaypointId) ?? null;
  const km = selected ? pipelineKm(selected.waypoints) : 0;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-fg">
      <header className="pointer-events-auto absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:px-5">
        <div className="panel flex items-center gap-3 rounded-xl px-3 py-2">
          <div>
            <p className="font-display text-xl leading-none italic tracking-tight">
              Meridian
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-muted">
              Drive vault atlas
            </p>
          </div>
        </div>
        <div className="panel hidden items-center gap-1 rounded-xl p-1 sm:flex">
          <ClockFace />
          <span className="mx-1 h-4 w-px bg-border" />
          <Button
            variant="ghost"
            size="iconSm"
            aria-label={night ? "Switch to daylight" : "Switch to night"}
            onClick={() => setNight(!night)}
          >
            {night ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant={autoRotate ? "ghost" : "muted"}
            size="iconSm"
            aria-label={autoRotate ? "Stop rotation" : "Auto-rotate"}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            <RotateCcw />
          </Button>
        </div>
      </header>

      <aside className="pointer-events-auto absolute bottom-[7.5rem] left-4 top-20 hidden w-[min(22rem,32vw)] flex-col lg:flex">
        <div className="panel flex min-h-0 flex-1 flex-col rounded-xl p-3">
          <div className="flex items-start justify-between gap-2 px-1 pb-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Docket
              </p>
              <p className="mt-1 text-sm text-fg">
                {investigations.length} pipeline
                {investigations.length === 1 ? "" : "s"}
              </p>
            </div>
            <Button
              variant="outline"
              size="iconSm"
              aria-label="New investigation"
              onClick={() => setComposer("investigation")}
            >
              <Plus />
            </Button>
          </div>
          <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {investigations.map((inv) => {
              const on = inv.id === selectedId;
              return (
                <li key={inv.id}>
                  <button
                    type="button"
                    onClick={() => {
                      selectInvestigation(inv.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-[background-color,box-shadow] duration-[150ms]",
                      on
                        ? "bg-elevated shadow-[var(--shadow-border)]"
                        : "hover:bg-elevated/60",
                    )}
                  >
                    <span
                      className="mt-1 size-2 shrink-0 rounded-full"
                      style={{ background: inv.color }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] tabular-nums text-muted">
                          {inv.code}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.12em] text-subtle">
                          {STATUS_LABEL[inv.status]}
                        </span>
                      </span>
                      <span className="mt-0.5 block font-medium leading-snug">
                        {inv.title}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        {inv.subtitle}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] tabular-nums text-subtle">
                        {inv.waypoints.length} nodes ·{" "}
                        {formatKm(pipelineKm(inv.waypoints))}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => resetDesk()}
            className="mt-2 h-11 px-2 text-left text-xs text-muted hover:text-fg"
          >
            Reload full Drive vault
          </button>
        </div>
      </aside>

      {selected ? (
        <aside className="pointer-events-auto absolute bottom-[7.5rem] right-4 top-20 hidden w-[min(22rem,32vw)] flex-col lg:flex">
          <div className="panel flex min-h-0 flex-1 flex-col rounded-xl p-4">
            {waypoint ? (
              <>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    {STAGE_LABEL[waypoint.stage]}
                  </p>
                  <Button
                    variant="muted"
                    size="iconSm"
                    aria-label="Close dossier"
                    onClick={() => selectWaypoint(null)}
                  >
                    <X />
                  </Button>
                </div>
                <h2 className="font-display mt-2 text-2xl leading-tight italic">
                  {waypoint.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {waypoint.city}, {waypoint.country}
                </p>
                <p className="mt-2 font-mono text-xs tabular-nums text-subtle">
                  {formatDate(waypoint.date)} · {waypoint.lat.toFixed(2)}°,{" "}
                  {waypoint.lng.toFixed(2)}°
                </p>
                <p className="mt-4 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-fg">
                  {waypoint.notes || "No field notes yet."}
                </p>
                {waypoint.exhibits.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {waypoint.exhibits.map((ex) => (
                      <li
                        key={ex}
                        className="rounded-sm bg-elevated px-2 py-1 text-[11px] text-muted shadow-[var(--shadow-border)]"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Button
                  variant="muted"
                  size="sm"
                  className="mt-4 self-start"
                  onClick={() => removeWaypoint(selected.id, waypoint.id)}
                >
                  Remove node
                </Button>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] tabular-nums text-muted">
                  {selected.code}
                </p>
                <h2 className="font-display mt-2 text-2xl leading-tight italic">
                  {selected.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{selected.subtitle}</p>
                <p className="mt-4 flex-1 overflow-y-auto text-sm leading-relaxed">
                  {selected.summary}
                </p>
                <p className="mt-4 font-mono text-xs tabular-nums text-subtle">
                  {selected.waypoints.length} nodes · {formatKm(km)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComposer("waypoint")}
                  >
                    Add node
                  </Button>
                  <Button
                    variant="muted"
                    size="sm"
                    onClick={() => removeInvestigation(selected.id)}
                  >
                    Remove case
                  </Button>
                </div>
              </>
            )}
          </div>
        </aside>
      ) : null}

      <div className="pointer-events-auto absolute inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] lg:inset-x-auto lg:bottom-5 lg:left-1/2 lg:w-[min(52rem,70vw)] lg:-translate-x-1/2">
        <div className="panel rounded-xl p-2 lg:p-3">
          <div className="flex items-center gap-2 px-1">
            <Button
              variant="outline"
              size="icon"
              aria-label={playing ? "Stop replay" : "Replay route"}
              disabled={!selected || selected.waypoints.length === 0}
              onClick={() => (playing ? stopPlay() : play())}
            >
              {playing ? <Pause /> : <Play className="ml-px" />}
            </Button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {selected ? selected.title : "No case selected"}
              </p>
              <p className="truncate text-xs text-muted">
                {selected
                  ? selected.waypoints.map((w) => w.city).join(" → ") ||
                    "Empty pipeline"
                  : "Open a pipeline from the docket"}
              </p>
            </div>
            <Button
              variant={placing ? "primary" : "ghost"}
              size="icon"
              className="lg:hidden"
              aria-label="Place pin"
              onClick={() => setPlacing(!placing)}
            >
              <MapPin />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Hide docket" : "Show docket"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <ChevronUp
                className={cn(
                  "transition-transform duration-150",
                  mobileOpen && "rotate-180",
                )}
              />
            </Button>
            <Button
              variant={placing ? "primary" : "outline"}
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => {
                if (placing) setPlacing(false);
                else {
                  setComposer("waypoint");
                  setPlacing(true);
                }
              }}
            >
              <MapPin />
              Place pin
            </Button>
          </div>
          {selected && selected.waypoints.length > 0 ? (
            <ol className="mt-2 flex gap-1 overflow-x-auto pb-1">
              {selected.waypoints.map((wp, i) => {
                const on = wp.id === selectedWaypointId;
                return (
                  <li key={wp.id} className="flex min-w-0 items-center">
                    {i > 0 ? (
                      <span
                        className="mx-1 h-px w-4 shrink-0 bg-border"
                        aria-hidden
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => selectWaypoint(wp.id)}
                      className={cn(
                        "min-w-[7.5rem] rounded-md px-3 py-2 text-left transition-[background-color] duration-150",
                        on ? "bg-elevated" : "hover:bg-elevated/60",
                      )}
                    >
                      <span className="block text-[11px] uppercase tracking-[0.12em] text-muted">
                        {STAGE_LABEL[wp.stage as Stage]}
                      </span>
                      <span className="mt-0.5 block truncate text-sm">
                        {wp.city}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : null}
          {mobileOpen ? (
            <ul className="mt-2 max-h-[40vh] space-y-1 overflow-y-auto border-t border-border pt-2 lg:hidden">
              {investigations.map((inv) => (
                <li key={inv.id}>
                  <button
                    type="button"
                    onClick={() => {
                      selectInvestigation(inv.id);
                      setMobileOpen(false);
                    }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-elevated"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: inv.color }}
                    />
                    <span className="font-mono text-xs text-muted">
                      {inv.code}
                    </span>
                    <span className="truncate text-sm">{inv.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setComposer("investigation");
                    setMobileOpen(false);
                  }}
                  className="flex min-h-11 w-full items-center gap-2 px-3 text-sm text-muted"
                >
                  <Plus className="size-4" /> New investigation
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>

      {composer !== "closed" && !placing ? <Composer /> : null}
      {placing ? (
        <div className="pointer-events-none absolute inset-x-0 top-[4.5rem] flex justify-center">
          <p className="panel rounded-sm px-3 py-2 text-sm text-fg">
            Click the globe to drop a node
          </p>
        </div>
      ) : null}
    </div>
  );
}
