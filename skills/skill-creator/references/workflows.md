# Skill Creator — Workflows

## W1 · Stub → full package (default)

1. Collect: skill name, one-sentence goal, trigger phrases, constraints.
2. Choose `skill-id` (kebab-case).
3. Write `SKILL.md` frontmatter + core doctrine.
4. Add `references/examples.md` (basic ×2, advanced ×2, failure ×1).
5. Add `references/workflows.md` (happy path + branch paths).
6. Add `references/tools.md` (exact tool names + argument patterns).
7. Add `references/deployments.md` (workspace path, Drive, GitHub).
8. Smoke: re-read SKILL.md as if cold-start; fix missing triggers.
9. Commit / upload.

**I/O:** stub text → `.grok/skills/<id>/` tree

## W2 · Chat distill → skill

1. Extract standing rules, systems table, next leads, ceilings from chat/master distill.
2. Cluster into skill candidates (one skill = one job + clear triggers).
3. For each candidate run W1.
4. Write `encyclopedia.md` index linking candidates.
5. Dual-persist encyclopedia to Drive `skill-tree/`.

## W3 · Drive folder → skills (use drive-skill-distiller)

1. Inventory folders (list_folder recursive plan).
2. Classify: ingest / index-only / block (secrets, binary noise).
3. Distill text docs → claims + procedures + entities.
4. Map clusters → skill IDs.
5. Generate packages via W1.
6. Version stamp + HITL gates for bulk.

## W4 · Skill upgrade (user: "add examples / make advanced")

1. Locate existing SKILL.md.
2. Diff intent vs current gaps.
3. Append examples/workflows only where missing.
4. Bump As-of date; keep backward-compatible triggers.

## W5 · Failure recovery

| Symptom | Fix |
|---------|-----|
| Agent never routes to skill | Strengthen `description` triggers |
| Skill too long / ignored | Move depth to references/ |
| Leaked secrets in skill | Delete section; re-generate from public ceiling |
| Duplicate skills | Merge into encyclopedia + single canonical id |
