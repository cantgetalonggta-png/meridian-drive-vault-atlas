import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { searchCities, type City } from "@/lib/cities";
import { useMeridian } from "@/lib/store";
import { STAGES, STAGE_LABEL, type Stage } from "@/lib/types";

const today = () => new Date().toISOString().slice(0, 10);

export function Composer() {
  const composer = useMeridian((s) => s.composer);
  if (composer === "investigation") return <InvestigationForm />;
  if (composer === "waypoint") return <WaypointForm />;
  return null;
}

function InvestigationForm() {
  const setComposer = useMeridian((s) => s.setComposer);
  const addInvestigation = useMeridian((s) => s.addInvestigation);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-end justify-center bg-bg/50 p-3 sm:items-center">
      <form
        className="panel w-full max-w-md rounded-xl p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          addInvestigation({
            title,
            subtitle,
            summary,
            status: "active",
          });
        }}
      >
        <h2 className="font-display text-2xl italic">New investigation</h2>
        <p className="mt-1 text-sm text-muted">
          A blank pipeline. Add cities next, or drop a pin on the globe.
        </p>
        <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-muted">
          Title
          <input
            className="field mt-1.5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nightjar"
            autoFocus
            required
          />
        </label>
        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-muted">
          Subtitle
          <input
            className="field mt-1.5"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Antiquities corridor"
          />
        </label>
        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-muted">
          Briefing
          <textarea
            className="field mt-1.5"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What is this pipeline tracking?"
          />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setComposer("closed")}
          >
            Cancel
          </Button>
          <Button type="submit">Open case</Button>
        </div>
      </form>
    </div>
  );
}

function WaypointForm() {
  const investigations = useMeridian((s) => s.investigations);
  const selectedId = useMeridian((s) => s.selectedId);
  const pendingPin = useMeridian((s) => s.pendingPin);
  const placing = useMeridian((s) => s.placing);
  const setComposer = useMeridian((s) => s.setComposer);
  const setPlacing = useMeridian((s) => s.setPlacing);
  const addWaypoint = useMeridian((s) => s.addWaypoint);
  const addInvestigation = useMeridian((s) => s.addInvestigation);

  const [investigationId, setInvestigationId] = useState(
    selectedId || investigations[0]?.id || "",
  );
  const [query, setQuery] = useState(
    pendingPin ? pendingPin.city.name : "",
  );
  const [picked, setPicked] = useState<City | null>(
    pendingPin ? pendingPin.city : null,
  );
  const [name, setName] = useState("");
  const [stage, setStage] = useState<Stage>("lead");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [openList, setOpenList] = useState(false);

  const matches = useMemo(() => searchCities(query, 6), [query]);
  const lat = pendingPin?.lat ?? picked?.lat;
  const lng = pendingPin?.lng ?? picked?.lng;
  const city = pendingPin?.city.name ?? picked?.name ?? "";
  const country = pendingPin?.city.country ?? picked?.country ?? "";

  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-end justify-center bg-bg/50 p-3 sm:items-center">
      <form
        className="panel w-full max-w-md rounded-xl p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (lat == null || lng == null || !city) return;
          let target = investigationId;
          if (!target) {
            target = addInvestigation({
              title: "Untitled",
              subtitle: "New pipeline",
              summary: "",
              status: "active",
            });
          }
          addWaypoint({
            investigationId: target,
            name: name || city,
            city,
            country,
            lat,
            lng,
            stage,
            date,
            notes,
          });
        }}
      >
        <h2 className="font-display text-2xl italic">Add node</h2>
        <p className="mt-1 text-sm text-muted">
          Search a city, or click the globe to drop a pin.
        </p>

        {investigations.length > 0 ? (
          <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-muted">
            Pipeline
            <select
              className="field mt-1.5"
              value={investigationId}
              onChange={(e) => setInvestigationId(e.target.value)}
            >
              {investigations.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.code} · {inv.title}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="relative mt-3 block text-xs uppercase tracking-[0.14em] text-muted">
          City
          <input
            className="field mt-1.5"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPicked(null);
              setOpenList(true);
            }}
            onFocus={() => setOpenList(true)}
            placeholder="London, Lagos, Singapore"
            autoComplete="off"
          />
          {openList && matches.length > 0 ? (
            <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md bg-elevated py-1 shadow-[var(--shadow-border)]">
              {matches.map((c) => (
                <li key={`${c.name}-${c.country}`}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between px-3 text-left text-sm hover:bg-surface"
                    onClick={() => {
                      setPicked(c);
                      setQuery(c.name);
                      setOpenList(false);
                    }}
                  >
                    <span className="normal-case text-fg">{c.name}</span>
                    <span className="normal-case text-muted">{c.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </label>

        <p className="mt-2 font-mono text-xs tabular-nums text-subtle">
          {lat != null && lng != null
            ? `${lat.toFixed(2)}°, ${lng.toFixed(2)}° · ${city}, ${country}`
            : placing
              ? "Click the globe to set coordinates"
              : "Pick a city or place a pin"}
        </p>

        <Button
          type="button"
          variant={placing ? "primary" : "outline"}
          size="sm"
          className="mt-2"
          onClick={() => setPlacing(!placing)}
        >
          {placing ? "Listening for a click" : "Click globe instead"}
        </Button>

        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-muted">
          Site name
          <input
            className="field mt-1.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Warehouse, gallery, exchange"
          />
        </label>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="block text-xs uppercase tracking-[0.14em] text-muted">
            Stage
            <select
              className="field mt-1.5"
              value={stage}
              onChange={(e) => setStage(e.target.value as Stage)}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-[0.14em] text-muted">
            Date
            <input
              className="field mt-1.5"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-muted">
          Notes
          <textarea
            className="field mt-1.5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What happened here?"
          />
        </label>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setPlacing(false);
              setComposer("closed");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={lat == null || lng == null}>
            Place on globe
          </Button>
        </div>
      </form>
    </div>
  );
}
