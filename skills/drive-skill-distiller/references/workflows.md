# Drive Skill Distiller — Step-by-step workflows

## Workflow A · First inventory (30–90 min operator session)

### Steps
1. **Resolve roots**
   - Search folders: `Grok-Agent-Vault`, `investigations`, `Investigations`, `skill-tree`.
   - Record folder_ids in `INVENTORY.md`.
2. **List one level deep** for each root (`google_drive_list_folder`, max 50–200).
3. **Queue subfolders** priority:
   - P0: master distill, CORE/PART*, DISCOVERY_METHODS, procedures
   - P1: timelines, Middlebury, Palm Beach Pete, Hypothesis
   - P2: recap / swarm api (meta only)
   - P3: large PDF archives (index-only)
   - PX: Epstein's shit scripts + env → blocklist names only
4. **Emit tree** markdown with mime counts.
5. **Stop and confirm** if item count > threshold (e.g. 200 files) — selective plan.

### Output
`INVENTORY.md` + prioritized read queue

---

## Workflow B · Selective full distill (investigations)

### Steps
1. Read `INVESTIGATION_MASTER_DISTILL` (Doc) fully.
2. Read CORE + PART1–5 text (dedupe `(1)` copies — read one of each).
3. Read DISCOVERY_METHODS + INVESTIGATION_PROCEDURES.
4. Read theories.txt / recap **for entities only**; strip noise.
5. For PDFs: read first pages / titles; store links (IA, DocumentCloud).
6. Compile `MASTER_DISTILL.md` sections:
   1. Systems table  
   2. Standing files / RS tags / breadcrumbs  
   3. Session investigations  
   4. HITL  
   5. Drive map  
   6. NOT evidence  
   7. Next public leads  
7. Tag each claim: **RS** | **MAYBE** | **CONTRADICTED** | **NOISE**.

### Output
Updated master distill + claim tags

---

## Workflow C · Skill encyclopedia generation

### Steps
1. From distill, list **jobs** (not documents).
2. For each job: name triggers, ceiling, inputs, outputs.
3. Run **skill-creator W1** per job → `.grok/skills/<id>/`.
4. Write `encyclopedia/INDEX.md`:
   - skill | path | triggers | source folders | as-of
5. Cross-link related skills (e.g. feeder → meridian waypoints).
6. Dual-persist INDEX + skills to Drive `skill-tree/`.

### Output
N skill packages + encyclopedia index

---

## Workflow D · Link follow + learn

### Steps
1. Regex URLs from distill.
2. Classify: archive.org, documentcloud, github, news, social.
3. For each P0 URL: `web_search` or fetch summary; attach citation.
4. Update claims with source; never upgrade CONTRADICTED → RS without new public proof.
5. Log dead links in `LINK_ROTTEN.md`.

---

## Workflow E · Meridian / app feed

### Steps
1. Map distill geographies → waypoints (city, lat/lng, stage, exhibits).
2. Patch `src/lib/seed.ts`; bump store persist version.
3. `npm run typecheck` && `npm run build`.
4. Browser smoke; backup Drive + GitHub (see meridian skill / prior ship).

---

## Workflow F · Continuous / daily (automation-ready)

### Prompt skeleton for Automations
> Inventory Grok-Agent-Vault/investigations modified_after yesterday. Classify new files. Distill deltas into MASTER_DISTILL changelog. Do not open *.env. Upload changelog to skill-tree/daily/.

Cadence example: `RRULE:FREQ=DAILY` at 08:05 America/New_York (after pete-epstein-watch).

---

## Workflow G · Advanced multi-pass OCR / bulk PDF

1. **Grant check** (HITL H2/H3 if required).
2. Download selected PDFs to artifacts.
3. Extract text (pdftotext / read_file pages batches ≤20).
4. Entity extract → encyclopedia append.
5. Mark remaining unread pages for next pass — never claim full OCR if truncated.
