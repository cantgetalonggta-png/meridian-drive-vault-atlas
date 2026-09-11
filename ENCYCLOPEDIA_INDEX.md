# ENCYCLOPEDIA INDEX — Operator skills from full Drive distill
As-of: 2026-09-11T23:45Z
Run: /skill-creator + drive-skill-distiller full ingest

## Meta
| Skill | Path | Triggers |
|-------|------|----------|
| skill-creator | .grok/skills/skill-creator | /skill-creator, skill encyclopedia |
| drive-skill-distiller | .grok/skills/drive-skill-distiller | distill all Drive, ingest every document |
| skill-md-authoring | .grok/skills/skill-md-authoring | SKILL.md format, Codex skill |
| skill-registry-harvest | .grok/skills/skill-registry-harvest | ClaudSkills, registry harvest |
| secret-store-hygiene | .grok/skills/secret-store-hygiene | keys.env, never secrets |

## Investigation / OSINT
| Skill | Path | Triggers |
|-------|------|----------|
| osint-public-ceiling | .grok/skills/osint-public-ceiling | public ceiling, RS/MAYBE |
| east66-acris-vault | .grok/skills/east66-acris-vault | East 66, ACRIS, Indyke |
| eastern-feeder-pipeline | .grok/skills/eastern-feeder-pipeline | Nadia, Karin, Eastern feeder |
| maxwell-line-timeline | .grok/skills/maxwell-line-timeline | Maxwell, Oversight 2026 |
| discovery-methods-dm | .grok/skills/discovery-methods-dm | DM-1..10, discovery method |
| palm-beach-pete-hypothesis | .grok/skills/palm-beach-pete-hypothesis | Palm Beach Pete, Simel |
| archive-unseals-index | .grok/skills/archive-unseals-index | EpsteinDocs, DocumentCloud |
| swarm-ops-desk | .grok/skills/swarm-ops-desk | swarm ops, systems table |
| meridian-globe-atlas | .grok/skills/meridian-globe-atlas | Meridian, globe, waypoints |
| nlla-debate-system | .grok/skills/nlla-debate-system | NLLA, 20 agent debate |
| hitl-governance | .grok/skills/hitl-governance | HITL, re-ask |

## Distill artifacts
- artifacts/drive-distill-2026-09-11/INVENTORY.md
- artifacts/drive-distill-2026-09-11/MASTER_DISTILL.md
- artifacts/drive-distill-2026-09-11/BLOCKLIST.md
- artifacts/drive-distill-2026-09-11/SKILL_MAP.md
- artifacts/MERIDIAN_SEED_DISTILL.md

## Drive dual-persist targets
- skill-tree/ (12_VD_KWRsrhxLrVMXfXvlTKKQ4e11dmY)
- Meridian/ (1K--cWA624bTLR8eQMdgvnmxKawYJejoq)
- Grok-Agent-Vault/

## GitHub
- cantgetalonggta-png/meridian-drive-vault-atlas
- live-online-agent-swarm / truth-engine-integrity

## Package each skill includes
SKILL.md + references/{workflows,tools,examples,deployments}.md (+ encyclopedia where useful)

## Practical step-by-step (operator)
1. Cold-start: read ENCYCLOPEDIA_INDEX.
2. For Drive work: invoke drive-skill-distiller (or this run's artifacts).
3. For new skill: /skill-creator W1.
4. For investigation: osint-public-ceiling first, then domain skill.
5. For globe: meridian-globe-atlas + seed.
6. Always secret-store-hygiene before bulk.
