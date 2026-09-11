---
name: meridian-globe-atlas
description: >
  Operate Meridian 3D interactive globe: 8 investigation pipelines, 46 waypoints,
  great-circle arcs, stages (lead/transit/field/evidence/analysis), case dossiers,
  timeline replay, add-node, Zustand persist, react-globe.gl + Three.js. Publish,
  backup Drive/GitHub, infographic. Use for Meridian, globe, waypoints, atlas.
metadata:
  short-description: "Meridian 3D globe atlas ops + publish/backup"
user-invocable: true
---

# Meridian Globe Atlas

As-of: 2026-09-11

## Stack
TanStack Start + React 19 + Tailwind v4 + Zustand (persist meridian.v3) + react-globe.gl + Three.js

## Pipelines (8)
E66-01 · EF-02 · MX-03 · PBP-04 (paused CONTRADICTED) · DW-05 · AU-06 · SW-07 · PO-08

## Stages
lead · transit · field · evidence · analysis

## Key files
- `src/lib/seed.ts` — waypoints
- `src/lib/store.ts` — persist + migrate
- `src/lib/cities.ts` — geo lookup
- `src/components/globe-view.tsx` — arcs/points/rings/plane
- `src/components/overlay.tsx` / composer.tsx / meridian-app.tsx

## Ops
labelsData = selected.waypoints only · placing banner for add-node · public ceiling in dossiers
