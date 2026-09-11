# BLOCKLIST — never body-ingest
As-of: 2026-09-11

## Credential / secret files (name-only allowed in inventory)
- keys.env
- god_tier_keys.env
- fourth_round.env
- Key_loader_beast.py (and any Key_loader*)
- api-keys-secret-store (private repo — do not open contents into skills)
- Any file matching `*keys*.env`, `*.pem`, `credentials.json` with secrets

## Content types blocked from skill bodies
- Live API keys (including any hardcoded keys found in swarm prompts — strip if encountered)
- Private doxx of living private parties
- CSAM / exploitation methods
- H7 non-public / barrier-bypass instructions
- Jailbreak "uncensored wrapper" text promoted as evidence

## Rule
If a path is on this list: record **name + purpose + block** in INVENTORY; never paste body into MASTER_DISTILL or SKILL.md.
