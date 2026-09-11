---
name: osint-public-ceiling
description: >
  Enforce public-record-only OSINT ceiling, claim tags (RS/MAYBE/CONTRADICTED/NOISE),
  never-list (secrets, doxx, CSAM), and HITL bulk gates. Use when investigating,
  distilling Drive vaults, tagging claims, or user says public ceiling / never secrets /
  HITL / rock-solid vs contradicted.
metadata:
  short-description: "Public-record OSINT rules + claim tags + never-list"
user-invocable: true
---

# OSINT Public Ceiling

As-of: 2026-09-11 · Source: INVESTIGATION_MASTER_DISTILL §5–7

## Ceiling (IN)
- Public court filings, ACRIS, DocumentCloud, Internet Archive, press, Wikipedia, FOIA products
- Discovery methods as *method playbooks* (not secret bypass)
- Timelines and geographies for Meridian atlas

## Ceiling (OUT / never)
- API keys, `.env`, secret-store bodies
- Private doxx of living private parties
- CSAM / exploitation methods
- H7 non-public / barrier bypass
- Promoting CONTRADICTED identity claims as solid

## Claim tags
| Tag | Meaning | Action |
|-----|---------|--------|
| **RS** | Rock-solid public exhibit | Cite + map |
| **MAYBE** | Pattern / unproven | Label clearly |
| **CONTRADICTED** | Fails public record | Pause; hygiene only |
| **NOISE** | Not evidence | Filter out |

## Standing never-list
keys.env · god_tier_keys.env · fourth_round.env · Key_loader* · api-keys-secret-store

## HITL (see also hitl-governance)
Expired grants → re-ask for H1 bulk, H3 big Drive, H8 publish, H10 PACER, H11 contact living.

## Do
1. Tag every claim before elevating to seed/skill.
2. Prefer selective distill over blind download.
3. Dual-persist public notes only.

## Don't
1. Paste keys into chat or skills.
2. Upgrade CONTRADICTED → RS without new public proof.
3. Treat jailbreak wrappers as case evidence.
