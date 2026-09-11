import { useEffect, useState } from "react";
import { GlobeView } from "@/components/globe-view";
import { Overlay } from "@/components/overlay";
import { useMeridian } from "@/lib/store";

export function MeridianApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const s = useMeridian.getState();
      if (e.key === "Escape") {
        if (s.composer !== "closed") s.setComposer("closed");
        else if (s.selectedWaypointId) s.selectWaypoint(null);
        else if (s.playing) s.stopPlay();
        return;
      }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (s.playing) s.stopPlay();
        else s.play();
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= 9) {
        const inv = s.investigations[n - 1];
        if (inv) s.selectInvestigation(inv.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted]);

  if (!mounted) {
    return (
      <main className="flex h-dvh items-center justify-center bg-bg text-fg">
        <div className="text-center">
          <p className="font-display text-4xl italic">Meridian</p>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            Drive vault atlas
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <GlobeView />
      <Overlay />
    </main>
  );
}
