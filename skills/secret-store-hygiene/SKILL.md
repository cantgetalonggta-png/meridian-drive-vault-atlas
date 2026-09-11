---
name: secret-store-hygiene
description: >
  Block credential leakage during Drive distill and skill authoring. Recognize
  keys.env, god_tier_keys.env, Key_loader*, api-keys-secret-store; never paste
  bodies into skills or chat. Use when keys.env, secret store, never ingest secrets,
  redact credentials.
metadata:
  short-description: "Block keys/env from distills and skills"
user-invocable: true
---

# Secret Store Hygiene

As-of: 2026-09-11 · Source: Epstein's shit blocklist + master distill

## Always block body-ingest
- keys.env
- god_tier_keys.env
- fourth_round.env
- Key_loader_beast.py / Key_loader*
- api-keys-secret-store private repo contents
- Hardcoded API keys in swarm prompt dumps (strip if encountered)

## Allowed
- Name of file in BLOCKLIST.md
- Architecture description without secrets
- "Key loading module exists" without values

## Agent actions on encounter
1. Stop before read_file body (or discard body).
2. Log name → BLOCKLIST.
3. Continue distill on non-secret files.
4. If key already in context from prior dump: do not reproduce; redact.
