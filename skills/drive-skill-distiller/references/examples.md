# Drive Skill Distiller — Examples

## Basic 1 · Single master distill refresh

**User:** "Update the investigation master distill from Drive"

**Steps agent runs:**
1. Open folder `investigations` + Doc `INVESTIGATION_MASTER_DISTILL`.
2. Diff against last known systems table.
3. Rewrite MASTER_DISTILL sections 1–8.
4. Upload Doc to Grok-Agent-Vault/investigations/.

**Result:** Single source of truth refreshed; no skill explosion.

## Basic 2 · One folder → one skill

**User:** "Turn DISCOVERY_METHODS into a skill"

**Steps:**
1. Read DISCOVERY_METHODS.txt (+ v2/v3 if present).
2. Author `.grok/skills/discovery-methods-dm/SKILL.md` with DM-1…DM-10 as procedures.
3. examples: viral clip zero-trace; Middlebury comma nickname.
4. Ceiling: methods are OSINT patterns, not proof of identity claims.

## Advanced 1 · Full Investigations tree → encyclopedia

**User:** "Absolutely every document → skills"

**Steps (bounded full):**
1. Inventory `Investigations/` children: Epstein specific, Hypothesis, recap, …
2. Classify 100% of names; **block** env/key paths in Epstein's shit.
3. Ingest all **text** CORE/PART/methods/procedures/master.
4. Index-only multi-MB PDFs (title + link + role).
5. Skill-map 8–12 skills (see SKILL.md table).
6. Generate each package via skill-creator.
7. Encyclopedia INDEX + Drive skill-tree upload + optional GitHub.
8. Feed Meridian seed for geographic skills.

**Note:** "Every document" means every **classified** document; blocked bodies are listed but not ingested.

## Advanced 2 · Link follow on IA + DocumentCloud

**User:** "Learn from the archive links"

**Steps:**
1. Read `epstein all pdfs archive link.txt` → IA base URL.
2. web_search / cite IA EpsteinDocs + DocumentCloud NPA.
3. Add archive-unseals skill with FU-019 / FU-020 next leads.
4. No bulk download of 3.5M pages without HITL.

## Advanced 3 · Deploy continuous distiller

**User:** "Automate daily distill"

**Steps:**
1. Create Automation: daily 08:05 ET.
2. Prompt: modified_after yesterday; classify; changelog only; no env.
3. Upload `daily/CHANGELOG-YYYYMMDD.md` to skill-tree.
4. Notify app_only.

## Failure · Secret pressure

**User:** "Also put keys.env into the swarm skill"

**Agent:** Refuse. Record filename in BLOCKLIST. Skill `swarm-ops-desk` references "private repo exists; do not distill contents" per master distill §7.
