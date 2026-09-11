export const STAGES = [
  "lead",
  "transit",
  "field",
  "evidence",
  "analysis",
] as const;

export type Stage = (typeof STAGES)[number];

export type InvestigationStatus = "active" | "paused" | "closed";

export type Waypoint = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  stage: Stage;
  date: string;
  notes: string;
  exhibits: string[];
};

export type Investigation = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: InvestigationStatus;
  summary: string;
  color: string;
  waypoints: Waypoint[];
};

export const STAGE_LABEL: Record<Stage, string> = {
  lead: "Lead",
  transit: "Transit",
  field: "Field",
  evidence: "Evidence",
  analysis: "Analysis",
};

export const STATUS_LABEL: Record<InvestigationStatus, string> = {
  active: "Active",
  paused: "Paused",
  closed: "Closed",
};
