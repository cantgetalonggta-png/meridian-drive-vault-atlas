const R = 6371;

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function pipelineKm(
  points: { lat: number; lng: number }[],
): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineKm(points[i - 1]!, points[i]!);
  }
  return total;
}

export function interpolateGreatCircle(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
  t: number,
): { lat: number; lng: number } {
  const lat1 = toRad(a.lat);
  const lon1 = toRad(a.lng);
  const lat2 = toRad(b.lat);
  const lon2 = toRad(b.lng);
  const d = 2 * Math.asin(
    Math.sqrt(
      Math.sin((lat1 - lat2) / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon1 - lon2) / 2) ** 2,
    ),
  );
  if (d < 1e-8) return { lat: a.lat, lng: a.lng };
  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);
  const x =
    A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
  const y =
    A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
  const z = A * Math.sin(lat1) + B * Math.sin(lat2);
  return {
    lat: (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI,
    lng: (Math.atan2(y, x) * 180) / Math.PI,
  };
}

export function bearingDeg(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

export function viewForPoints(
  points: { lat: number; lng: number }[],
): { lat: number; lng: number; altitude: number } {
  if (points.length === 0) return { lat: 18, lng: 12, altitude: 2.4 };
  const mid = points[Math.floor(points.length / 2)]!;
  let maxKm = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      maxKm = Math.max(maxKm, haversineKm(points[i]!, points[j]!));
    }
  }
  const altitude = Math.min(3.1, Math.max(1.45, maxKm / 6200 + 1.2));
  return { lat: mid.lat, lng: mid.lng, altitude };
}

export function formatKm(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k km`;
  return `${Math.round(n).toLocaleString("en-GB")} km`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function clampLatLng(lat: number, lng: number) {
  return {
    lat: Math.max(-85, Math.min(85, lat)),
    lng: ((((lng + 180) % 360) + 360) % 360) - 180,
  };
}
