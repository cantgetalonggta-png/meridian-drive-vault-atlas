# Skill Creator — Deployments

## D1 · Workspace only (fast)
Write under `.grok/skills/<id>/`. Available to agent on next turn in this project.

## D2 · Drive dual-persist
1. Ensure folder `Grok-Agent-Vault/skill-tree/` (id may vary; search exact_name).
2. Create subfolder `<skill-id>-<YYYYMMDD>`.
3. Upload `SKILL.md` + each reference as Docs or `.md` files.
4. Add `INDEX.md` linking all skills in the encyclopedia.

## D3 · GitHub
1. Repo e.g. `operator-skill-encyclopedia` or per-skill repo.
2. Path `skills/<id>/SKILL.md`.
3. README table: skill | triggers | ceiling | as-of.

## D4 · App-coupled skills
If skill drives a product (Meridian): keep skill in workspace + mirror distill in app `src/lib/seed.ts` or docs; ship via Vercel/publish gates.

## Versioning
- Filename stamp: `SKILL_v3_2026-09-11.md` optional
- Inside: `As-of: 2026-09-11`
- Breaking trigger changes → new skill-id or explicit migrate note
