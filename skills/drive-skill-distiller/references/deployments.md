# Drive Skill Distiller — Deployments

## Ship checklist

- [ ] INVENTORY.md complete with folder_ids
- [ ] BLOCKLIST.md reviewed
- [ ] MASTER_DISTILL.md stamped As-of
- [ ] SKILL_MAP.md ↔ actual `.grok/skills/*` folders
- [ ] Each skill has triggers + ≥2 examples
- [ ] No secrets in any uploaded body
- [ ] Drive skill-tree folder updated
- [ ] GitHub mirror pushed (if used)
- [ ] Meridian/app seed bumped if geo pipelines changed

## Drive target layout

```text
Grok-Agent-Vault/
  skill-tree/
    INDEX.md
    encyclopedia-2026-09-11/
      osint-public-ceiling/
      eastern-feeder-pipeline/
      ...
    daily/
      CHANGELOG-*.md
  investigations/
    INVESTIGATION_MASTER_DISTILL (canonical)
  Meridian/                    # app backups, infographics
```

## GitHub target layout

```text
operator-skill-encyclopedia/
  README.md
  skills/
    <id>/SKILL.md
    <id>/references/...
  distills/
    MASTER_DISTILL.md
    INVENTORY.md
```

## Rollback
- Skills are files: revert git commit or re-upload prior Drive version.
- App seed: store migrate version pin; `resetDesk` to SEED.
