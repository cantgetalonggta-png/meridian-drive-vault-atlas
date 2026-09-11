---
name: drive-skill-distiller
description: >
  Distill and ingest Google Drive vaults into structured master distills and
  separate agent skills (encyclopedias). Use when the user asks to "read all my
  Drive", "distill investigations", "build skills from every document", "follow
  links and learn", "skill encyclopedia", dual-persist vaults, or map folders
  like Grok-Agent-Vault / Investigations into OSINT or operator skills.
  Includes inventory → classify → read → distill → skill-map → dual backup.
  Respects public ceiling, HITL bulk gates, and never ingests secrets.
metadata:
  short-description: "Drive vault → distill → skill encyclopedia (safe bulk)"
user-invocable: true
---

# Drive Skill Distiller

**Goal:** Turn Drive trees into **actionable skills + distills**, not a raw dump.

As-of template: stamp every run with ISO date and folder IDs used.

## Hard ceiling (non-negotiable)

### IN (allowed)
- Public-record OSINT notes, procedures, timelines, discovery methods
- Systems maps, next-leads lists, architecture of swarms
- App/source backups without secrets
- Audio **metadata** (titles, NLLA rules) — not private unreleased PII dumps

### OUT (blocked)
- `api-keys-secret-store`, `keys.env`, `god_tier_keys.env`, any credential files
- H7 non-public material, barrier bypass, private doxx of living private parties
- CSAM / exploitation content (refuse; do not summarize methods)
- Jailbreak / "uncensored wrapper" noise as evidence
- Promoting contradicted identity claims as rock-solid (e.g. Simel=Epstein → tag CONTRADICTED / paused)

### HITL / bulk
Large Drive crawls, OCR campaigns, PACER paid, force-push, publish, contact living people → require explicit operator grant if vault policy says so. Prefer **selective** distill + encyclopedia over blind "every byte".

## Core pipeline (always)

```text
1. INVENTORY   list_folder / search → tree map
2. CLASSIFY    ingest | index-only | block
3. READ        google_drive_read_file / download_artifact (batched)
4. DISTILL     master markdown: systems, claims, RS tags, next leads
5. SKILL-MAP   cluster → one skill per job + triggers
6. AUTHOR      skill-creator package per cluster
7. DUAL-PERSIST  Drive skill-tree + GitHub (+ app seed if Meridian-class)
8. VERIFY      re-list uploads; cold-read SKILL triggers
```

## Classification rubric

| Class | Examples | Action |
|-------|----------|--------|
| **ingest** | CORE.txt, PART1–5, DISCOVERY_METHODS, MASTER_DISTILL, procedures | Full read → distill |
| **index-only** | Huge PDFs (Part 22 of 22), torrents, duplicate mirrors | URL + title + purpose; no full dump |
| **block** | `*.env`, secret-store, key loaders | Name only in blocklist; never body |
| **noise** | Literary tangents, WPS Office mis-saves, unrelated Leonov essays | Noise filter node |

## Skill map pattern (investigations vault)

| Skill id | Source cluster | Job |
|----------|----------------|-----|
| `osint-public-ceiling` | MASTER_DISTILL §5–7 | Rules / HITL / never-list |
| `east66-acris-vault` | §2 + BC-PIPE + ACRIS | NYC vertical stack OSINT |
| `eastern-feeder-pipeline` | CORE + PART1–5 + timeline | Recruiter→fixer→pilot map |
| `maxwell-line-timeline` | Maxwell inheritance/cleanup | Timeline skill |
| `discovery-methods-dm` | DISCOVERY_METHODS 1–10 | Method playbooks |
| `palm-beach-pete-hypothesis` | §3B + Middlebury | Contradicted-identity hygiene |
| `swarm-ops-desk` | §1 systems + recap swarm | Swarm locations / cadence |
| `meridian-globe-atlas` | Meridian app + seed | 3D atlas ops + publish/backup |
| `archive-unseals-index` | IA link + DocumentCloud | Public dump index |

## Link following (automatic learning)

1. Extract URLs from distill (IA, DocumentCloud, GitHub, news).
2. `web_search` / fetch **public** pages only.
3. Attach citations to claims; mark MAYBE vs RS.
4. Do not scrape behind logins or paywalls without grant.
5. Cap follow depth (default: 1 hop from vault docs, 2 for canonical archives).

## Output artifacts

```text
artifacts/drive-distill-<date>/
  INVENTORY.md
  MASTER_DISTILL.md          # or merge into existing
  BLOCKLIST.md
  SKILL_MAP.md
  encyclopedia/SKILL_*.md    # generated skills
```

## Relationship to Meridian

Geographic / pipeline skills should feed `src/lib/seed.ts` waypoints (public ceiling). After seed change: persist migrate version bump + typecheck/build.

## Start here

1. Open `references/workflows.md` for step-by-step.
2. Open `references/tools.md` for exact calls.
3. Open `references/examples.md` for basic→advanced.
4. Open `references/deployments.md` for Drive/GitHub ship.
5. Open `references/encyclopedia-schema.md` for index format.
